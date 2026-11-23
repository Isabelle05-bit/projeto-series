// Regras e valores padrão do formulário de séries

// Os nomes dos campos seguem o formato da serieJournal-api
export const formVazio = {
  title: "",
  seasons: "",
  releaseDate: "",
  director: "",
  production: "",
  category: "",
  watchedAt: "",
};

export const categorias = [
  "Ação",
  "Animação",
  "Comédia",
  "Documentário",
  "Drama",
  "Fantasia",
  "Ficção científica",
  "Romance",
  "Suspense",
  "Terror",
];

function hojeISO() {
  const hoje = new Date();
  hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
  return hoje.toISOString().slice(0, 10);
}

// Valida os dados de uma série. Retorna { campo: "mensagem" } (vazio = válido)
export function validarSerie(form) {
  const erros = {};
  const texto = (valor) => String(valor ?? "").trim();

  if (!texto(form.title)) erros.title = "Informe o título.";

  if (texto(form.seasons) === "") {
    erros.seasons = "Informe o número de temporadas.";
  } else if (!Number.isInteger(Number(form.seasons)) || Number(form.seasons) < 1) {
    erros.seasons = "Informe um número inteiro maior que zero.";
  }

  if (!form.releaseDate) erros.releaseDate = "Informe a data de lançamento.";
  if (!texto(form.director)) erros.director = "Informe o diretor.";
  if (!texto(form.production)) erros.production = "Informe a produtora.";
  if (!texto(form.category)) erros.category = "Informe a categoria.";

  if (!form.watchedAt) {
    erros.watchedAt = "Informe a data em que assistiu.";
  } else if (form.releaseDate && form.watchedAt < form.releaseDate) {
    erros.watchedAt = "Não pode ser anterior à data de lançamento.";
  } else if (form.watchedAt > hojeISO()) {
    erros.watchedAt = "Não pode ser uma data futura.";
  }

  return erros;
}
