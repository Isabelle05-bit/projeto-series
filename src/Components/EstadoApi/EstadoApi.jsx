import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

// Indicador exibido enquanto uma requisição à API está em andamento
export function Carregando({ texto = "Carregando..." }) {
  return (
    <Box
      role="status"
      sx={{ display: "flex", alignItems: "center", gap: 2, py: 6, justifyContent: "center" }}
    >
      <CircularProgress size={28} />
      <Typography color="text.secondary">{texto}</Typography>
    </Box>
  );
}

// Mensagem de erro de uma requisição, com botão para tentar de novo
export function ErroApi({ mensagem, onTentarNovamente }) {
  return (
    <Alert
      severity="error"
      variant="outlined"
      sx={{ my: 3 }}
      action={
        onTentarNovamente && (
          <Button color="inherit" size="small" onClick={onTentarNovamente}>
            Tentar novamente
          </Button>
        )
      }
    >
      {mensagem}
    </Alert>
  );
}
