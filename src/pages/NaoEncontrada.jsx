import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagina from "../Components/Pagina/Pagina";

// Exibida quando a rota não existe
function NaoEncontrada() {
  return (
    <Pagina titulo="Página não encontrada" larguraMaxima={900}>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        O endereço acessado não existe.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained">
        Voltar ao início
      </Button>
    </Pagina>
  );
}

export default NaoEncontrada;
