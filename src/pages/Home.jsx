import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import SerieRow from "../Components/SerieRow/SerieRow";
import { ErroApi } from "../Components/EstadoApi/EstadoApi";
import { listarSeries, mensagemDeErro } from "../services/api";
import { corDoTitulo, formatarData, maisRecentes } from "../utils/formatadores";
import { cores, fonteTitulo } from "../theme";

// Página inicial: recepciona o usuário e mostra a última série assistida
function Home() {
  const [series, setSeries] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;
    listarSeries()
      .then((dados) => ativo && setSeries(dados))
      .catch((error) => ativo && setErro(mensagemDeErro(error)))
      .finally(() => ativo && setCarregando(false));
    return () => {
      ativo = false;
    };
  }, []);

  const recentes = maisRecentes(series);
  const destaque = recentes[0];
  const matiz = destaque ? corDoTitulo(destaque.title) : 0;
  const longas = [...series].filter((s) => Number(s.seasons) >= 5).sort((a, b) => b.seasons - a.seasons);

  return (
    <>
      {/* Banner principal */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: "78vh", md: "86vh" },
          display: "flex",
          alignItems: "center",
          px: { xs: 2, md: 6 },
          pt: 12,
          pb: { xs: 10, md: 16 },
          overflow: "hidden",
          background: destaque
            ? [
                `radial-gradient(ellipse at 75% 30%, hsla(${matiz}, 80%, 45%, 0.55), transparent 60%)`,
                `radial-gradient(ellipse at 95% 90%, hsla(${(matiz + 50) % 360}, 70%, 30%, 0.6), transparent 55%)`,
                `linear-gradient(135deg, #0a0a0a, hsl(${matiz}, 40%, 12%))`,
              ].join(", ")
            : `radial-gradient(ellipse at 75% 30%, rgba(229,9,20,0.35), transparent 60%), #0a0a0a`,
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: `linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%),
                         linear-gradient(0deg, ${cores.fundo} 0%, transparent 35%)`,
          },
        }}
      >
        {/* Título da série em destaque, grande e esmaecido ao fundo */}
        {destaque && (
          <Typography
            aria-hidden="true"
            sx={{
              position: "absolute",
              right: { xs: -20, md: 40 },
              bottom: { xs: 90, md: 110 },
              fontFamily: fonteTitulo,
              fontSize: { xs: "5rem", md: "11rem" },
              lineHeight: 0.85,
              color: "rgba(255,255,255,0.08)",
              textAlign: "right",
              maxWidth: "60%",
              userSelect: "none",
            }}
          >
            {destaque.title}
          </Typography>
        )}

        <Box sx={{ position: "relative", zIndex: 1, maxWidth: 640 }}>
          <Typography
            sx={{ color: cores.vermelho, fontWeight: 800, letterSpacing: "0.25em", fontSize: "0.85rem", mb: 1 }}
          >
            BEM-VINDO(A)
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: "3.6rem", md: "5.6rem" }, mb: 2 }}>
            Seu diário de séries
          </Typography>
          <Typography sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, color: "#e5e5e5", mb: 3, maxWidth: 520 }}>
            Registre tudo o que você já maratonou: temporadas, diretor, produtora e quando assistiu.
            Busque, edite e organize sua coleção em um só lugar.
          </Typography>

          {carregando ? (
            <Skeleton variant="rounded" width={320} height={56} sx={{ mb: 3 }} />
          ) : (
            destaque && (
              <Box sx={{ mb: 3, pl: 2, borderLeft: `3px solid ${cores.vermelho}` }}>
                <Typography variant="body2" color="text.secondary">
                  Última série assistida · {formatarData(destaque.watchedAt)}
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: "1.25rem" }}>{destaque.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {destaque.seasons} temporada(s) · {destaque.category} · {destaque.production}
                </Typography>
              </Box>
            )
          )}

          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            <Button
              component={RouterLink}
              to="/series"
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<PlayArrowIcon />}
            >
              Ver minhas séries
            </Button>
            <Button
              component={RouterLink}
              to="/cadastro"
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              sx={{ backgroundColor: "rgba(109,109,110,0.7)", "&:hover": { backgroundColor: "rgba(109,109,110,0.5)" } }}
            >
              Cadastrar série
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Fileiras com dados vindos da API */}
      <Box sx={{ mt: { xs: -5, md: -8 }, position: "relative", zIndex: 2 }}>
        {erro && (
          <Box sx={{ px: { xs: 2, md: 6 } }}>
            <ErroApi mensagem={erro} />
          </Box>
        )}
        <SerieRow titulo="Assistidas recentemente" series={recentes.slice(0, 12)} />
        <SerieRow titulo="Maratonas longas · 5+ temporadas" series={longas} />
      </Box>
    </>
  );
}

export default Home;
