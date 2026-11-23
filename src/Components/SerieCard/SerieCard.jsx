import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SeriePoster from "../SeriePoster/SeriePoster";
import { formatarData } from "../../utils/formatadores";
import { cores } from "../../theme";

function Info({ rotulo, valor }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, py: 0.3 }}>
      <Typography variant="body2" color="text.secondary">
        {rotulo}
      </Typography>
      <Typography variant="body2" sx={{ textAlign: "right", fontWeight: 500 }}>
        {valor}
      </Typography>
    </Box>
  );
}

// Cartão de uma série com todas as informações e os botões de editar/excluir
function SerieCard({ serie, onEditar, onExcluir }) {
  const temporadas = Number(serie.seasons);

  return (
    <Card
      component="article"
      aria-label={serie.title}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: cores.superficie,
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.7)",
          zIndex: 1,
        },
      }}
    >
      <SeriePoster serie={serie} />

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 1 }}>
          {serie.title}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 1.5, flexWrap: "wrap" }}>
          <Chip label={serie.category} size="small" color="primary" variant="outlined" />
          <Chip label={`${temporadas} temporada${temporadas === 1 ? "" : "s"}`} size="small" />
        </Box>
        <Info rotulo="Lançamento" valor={formatarData(serie.releaseDate)} />
        <Info rotulo="Diretor" valor={serie.director} />
        <Info rotulo="Produtora" valor={serie.production} />
        <Info rotulo="Assistida em" valor={formatarData(serie.watchedAt)} />
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<EditIcon />}
          onClick={() => onEditar(serie.id)}
          aria-label={`Editar ${serie.title}`}
          sx={{ flex: 1 }}
        >
          Editar
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => onExcluir(serie)}
          aria-label={`Excluir ${serie.title}`}
          sx={{ flex: 1 }}
        >
          Excluir
        </Button>
      </CardActions>
    </Card>
  );
}

export default SerieCard;
