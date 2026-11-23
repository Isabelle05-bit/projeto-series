import { useEffect, useState } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Pagina from "../Components/Pagina/Pagina";
import SerieForm from "../Components/SerieForm/SerieForm";
import { Carregando, ErroApi } from "../Components/EstadoApi/EstadoApi";
import { atualizarSerie, buscarSerie, mensagemDeErro } from "../services/api";

// Página de edição: busca a série (GET /series/:id) e salva as alterações (PUT /series)
function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serie, setSerie] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;
    buscarSerie(id)
      .then((dados) => ativo && setSerie(dados))
      .catch((error) => ativo && setErro(mensagemDeErro(error)))
      .finally(() => ativo && setCarregando(false));
    return () => {
      ativo = false;
    };
  }, [id]);

  async function handleSalvar(dados) {
    try {
      await atualizarSerie({ ...dados, id: serie.id });
    } catch (error) {
      throw new Error(mensagemDeErro(error), { cause: error });
    }
    navigate("/series", { state: { mensagem: `"${dados.title}" foi atualizada.` } });
  }

  return (
    <Pagina titulo="Editar série" subtitulo={serie ? serie.title : undefined} larguraMaxima={900}>
      {carregando && <Carregando texto="Carregando série..." />}

      {erro && (
        <>
          <ErroApi mensagem={erro} />
          <Button component={RouterLink} to="/series" variant="outlined" color="inherit">
            Voltar para a lista
          </Button>
        </>
      )}

      {serie && (
        <Paper sx={{ p: { xs: 2, md: 4 } }}>
          <SerieForm
            serieInicial={serie}
            onSalvar={handleSalvar}
            onCancelar={() => navigate("/series")}
            textoBotao="Salvar alterações"
          />
        </Paper>
      )}
    </Pagina>
  );
}

export default Editar;
