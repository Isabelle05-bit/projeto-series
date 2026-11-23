import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import Pagina from "../Components/Pagina/Pagina";
import SerieList from "../Components/SerieList/SerieList";
import ConfirmDialog from "../Components/ConfirmDialog/ConfirmDialog";
import { Carregando, ErroApi } from "../Components/EstadoApi/EstadoApi";
import { excluirSerie, listarSeries, mensagemDeErro } from "../services/api";

// Página de listagem: busca as séries na API (GET /series) e permite excluir (DELETE /series/:id)
function Lista() {
  const navigate = useNavigate();
  const location = useLocation();

  const [series, setSeries] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [paraExcluir, setParaExcluir] = useState(null);
  const [excluindo, setExcluindo] = useState(false);
  const [aviso, setAviso] = useState(() =>
    location.state?.mensagem ? { tipo: "success", texto: location.state.mensagem } : null
  );

  // Incrementado pelo botão "Tentar novamente" para refazer a busca
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let ativo = true;
    listarSeries()
      .then((dados) => ativo && setSeries(dados))
      .catch((error) => ativo && setErro(mensagemDeErro(error)))
      .finally(() => ativo && setCarregando(false));
    return () => {
      ativo = false;
    };
  }, [tentativa]);

  function tentarNovamente() {
    setCarregando(true);
    setErro("");
    setTentativa((n) => n + 1);
  }

  async function confirmarExclusao() {
    setExcluindo(true);
    try {
      await excluirSerie(paraExcluir.id);
      setSeries((atuais) => atuais.filter((s) => s.id !== paraExcluir.id));
      setAviso({ tipo: "success", texto: `"${paraExcluir.title}" foi excluída.` });
    } catch (error) {
      setAviso({ tipo: "error", texto: mensagemDeErro(error) });
    } finally {
      setExcluindo(false);
      setParaExcluir(null);
    }
  }

  return (
    <Pagina
      titulo="Minhas séries"
      subtitulo={carregando ? "Buscando suas séries..." : `${series.length} série(s) cadastrada(s)`}
      acoes={
        <Button component={RouterLink} to="/cadastro" variant="contained" startIcon={<AddIcon />}>
          Cadastrar série
        </Button>
      }
    >
      {carregando && <Carregando texto="Buscando séries na API..." />}
      {erro && <ErroApi mensagem={erro} onTentarNovamente={tentarNovamente} />}
      {!carregando && !erro && (
        <SerieList
          series={series}
          onEditar={(id) => navigate(`/editar/${id}`)}
          onExcluir={(serie) => setParaExcluir(serie)}
        />
      )}

      <ConfirmDialog
        aberto={Boolean(paraExcluir)}
        titulo="Excluir série?"
        mensagem={paraExcluir ? `A série "${paraExcluir.title}" será removida permanentemente.` : ""}
        textoConfirmar="Excluir"
        carregando={excluindo}
        onConfirmar={confirmarExclusao}
        onCancelar={() => setParaExcluir(null)}
      />

      <Snackbar
        open={Boolean(aviso)}
        autoHideDuration={4000}
        onClose={() => setAviso(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {aviso ? (
          <Alert severity={aviso.tipo} variant="filled" onClose={() => setAviso(null)}>
            {aviso.texto}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Pagina>
  );
}

export default Lista;
