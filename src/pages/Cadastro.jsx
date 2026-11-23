import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Pagina from "../Components/Pagina/Pagina";
import SerieForm from "../Components/SerieForm/SerieForm";
import { criarSerie, mensagemDeErro } from "../services/api";

// Página de cadastro: envia a nova série para a API (POST /series)
function Cadastro() {
  const navigate = useNavigate();

  async function handleSalvar(serie) {
    try {
      await criarSerie(serie);
    } catch (error) {
      throw new Error(mensagemDeErro(error), { cause: error });
    }
  }

  return (
    <Pagina titulo="Cadastrar série" subtitulo="Todos os campos são obrigatórios." larguraMaxima={900}>
      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        <SerieForm onSalvar={handleSalvar} onCancelar={() => navigate("/series")} />
      </Paper>
    </Pagina>
  );
}

export default Cadastro;
