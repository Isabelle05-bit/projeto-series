import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { anoDe, corDoTitulo } from "../../utils/formatadores";
import { fonteTitulo } from "../../theme";

// "Pôster" gerado a partir do título (a API não fornece imagens).
// Cada título gera sempre a mesma combinação de cores.
function SeriePoster({ serie, altura = 170, tamanhoTitulo = "2rem" }) {
  const matiz = corDoTitulo(serie.title);
  const matiz2 = (matiz + 40) % 360;

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "relative",
        height: altura,
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        p: 1.5,
        background: [
          `radial-gradient(circle at 80% 20%, hsla(${matiz}, 85%, 55%, 0.55), transparent 55%)`,
          `radial-gradient(circle at 10% 90%, hsla(${matiz2}, 70%, 35%, 0.7), transparent 60%)`,
          `linear-gradient(135deg, hsl(${matiz}, 45%, 18%), #0b0b0b)`,
        ].join(", "),
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          top: 6,
          right: 10,
          fontFamily: fonteTitulo,
          fontSize: "1rem",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        {anoDe(serie.releaseDate)}
      </Typography>
      <Typography
        sx={{
          fontFamily: fonteTitulo,
          fontSize: tamanhoTitulo,
          lineHeight: 0.95,
          color: "#fff",
          textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          wordBreak: "break-word",
        }}
      >
        {serie.title}
      </Typography>
    </Box>
  );
}

export default SeriePoster;
