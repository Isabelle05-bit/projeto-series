import axios from "axios";

// Endereço da serieJournal-api. Pode ser alterado pela variável VITE_API_URL (.env)
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

// A API roda com nodemon e reinicia sempre que o arquivo series.json é gravado.
// Por isso, logo após um POST/PUT/DELETE a próxima requisição pode falhar por
// alguns instantes. Quando não há resposta do servidor, tentamos de novo.
const MAX_TENTATIVAS = 3;

api.interceptors.response.use(undefined, async (error) => {
  const config = error.config;
  const semResposta = !error.response;

  if (!config || !semResposta) return Promise.reject(error);

  config.__tentativa = (config.__tentativa || 0) + 1;
  if (config.__tentativa > MAX_TENTATIVAS) return Promise.reject(error);

  await new Promise((resolve) => setTimeout(resolve, 600 * config.__tentativa));
  return api(config);
});

// Converte os dados do formulário para o formato que a API espera
function paraApi(serie) {
  return { ...serie, seasons: Number(serie.seasons) };
}

export async function listarSeries() {
  const { data } = await api.get("/series");
  return data;
}

export async function buscarSerie(id) {
  const { data } = await api.get(`/series/${id}`);
  return data;
}

export async function criarSerie(serie) {
  const { data } = await api.post("/series", paraApi(serie));
  return data;
}

export async function atualizarSerie(serie) {
  const { data } = await api.put("/series", { ...paraApi(serie), id: Number(serie.id) });
  return data;
}

export async function excluirSerie(id) {
  const { data } = await api.delete(`/series/${id}`);
  return data;
}

// Mensagem amigável para exibir ao usuário
export function mensagemDeErro(error) {
  if (error?.response?.status === 404) return "Série não encontrada.";
  if (!error?.response) {
    return `Não foi possível conectar à API em ${API_URL}. Verifique se a serieJournal-api está rodando (npm start).`;
  }
  return "Ocorreu um erro ao comunicar com a API. Tente novamente.";
}
