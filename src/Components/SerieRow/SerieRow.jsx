import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SeriePoster from "../SeriePoster/SeriePoster";

// Fileira horizontal de pôsteres, no estilo das "prateleiras" de streaming.
// Clicar em um pôster abre a edição da série.
function SerieRow({ titulo, series }) {
  if (series.length === 0) return null;

  return (
    <Box component="section" sx={{ mb: 4 }} aria-label={titulo}>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 700, px: { xs: 2, md: 6 } }}>
        {titulo}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          overflowX: "auto",
          px: { xs: 2, md: 6 },
          py: 2,
          scrollSnapType: "x mandatory",
        }}
      >
        {series.map((serie) => (
          <Box
            key={serie.id}
            component={RouterLink}
            to={`/editar/${serie.id}`}
            title={`${serie.title} — ${serie.category}`}
            aria-label={serie.title}
            sx={{
              flex: "0 0 auto",
              width: { xs: 160, md: 230 },
              borderRadius: 1,
              overflow: "hidden",
              scrollSnapAlign: "start",
              textDecoration: "none",
              transition: "transform 0.25s ease",
              "&:hover, &:focus-visible": { transform: "scale(1.07)", zIndex: 1 },
            }}
          >
            <SeriePoster serie={serie} altura={130} tamanhoTitulo="1.6rem" />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default SerieRow;
