import { createTheme } from "@mui/material/styles";

// Paleta inspirada na Netflix: fundo quase preto, vermelho de destaque
export const cores = {
  vermelho: "#E50914",
  vermelhoEscuro: "#B20710",
  fundo: "#141414",
  superficie: "#1F1F1F",
  superficieClara: "#2A2A2A",
  textoSecundario: "#B3B3B3",
};

export const fonteTitulo = '"Bebas Neue", "Impact", sans-serif';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: cores.vermelho, dark: cores.vermelhoEscuro, contrastText: "#fff" },
    secondary: { main: "#ffffff", contrastText: "#000" },
    background: { default: cores.fundo, paper: cores.superficie },
    text: { primary: "#ffffff", secondary: cores.textoSecundario },
    divider: "rgba(255,255,255,0.12)",
  },
  shape: { borderRadius: 6 },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: { fontFamily: fonteTitulo, letterSpacing: "0.02em", lineHeight: 1 },
    h2: { fontFamily: fonteTitulo, letterSpacing: "0.02em", lineHeight: 1 },
    h3: { fontFamily: fonteTitulo, letterSpacing: "0.02em" },
    h4: { fontFamily: fonteTitulo, letterSpacing: "0.03em" },
    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 4, paddingInline: 20 },
        sizeLarge: { fontSize: "1.05rem", paddingBlock: 10, paddingInline: 28 },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "filled", fullWidth: true },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#333",
          borderRadius: 4,
          "&:hover": { backgroundColor: "#3a3a3a" },
          "&.Mui-focused": { backgroundColor: "#3a3a3a" },
          "&::before, &::after": { display: "none" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiTooltip: {
      styleOverrides: { tooltip: { backgroundColor: "#333", fontSize: "0.8rem" } },
    },
  },
});

export default theme;
