import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Rodapé exibido em todas as páginas
function Footer() {
  return (
    <Box
      component="footer"
      sx={{ mt: "auto", px: { xs: 2, md: 6 }, py: 4, borderTop: 1, borderColor: "divider" }}
    >
      <Typography variant="body2" color="text.secondary">
        Minhas Séries · Projeto Fase 2 — Desenvolvimento Frontend · Dados da serieJournal-api
      </Typography>
    </Box>
  );
}

export default Footer;
