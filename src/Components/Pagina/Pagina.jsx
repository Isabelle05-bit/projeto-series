import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Estrutura padrão das páginas internas: título, subtítulo e conteúdo
function Pagina({ titulo, subtitulo, acoes, larguraMaxima = 1400, children }) {
  return (
    <Box
      component="section"
      sx={{ pt: { xs: 11, md: 13 }, pb: 6, px: { xs: 2, md: 6 }, maxWidth: larguraMaxima, mx: "auto", width: "100%" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: { sm: "flex-end" },
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h2" component="h1" sx={{ fontSize: { xs: "2.6rem", md: "3.4rem" } }}>
            {titulo}
          </Typography>
          {subtitulo && (
            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitulo}
            </Typography>
          )}
        </Box>
        {acoes}
      </Box>
      {children}
    </Box>
  );
}

export default Pagina;
