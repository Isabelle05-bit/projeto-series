import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Pagina from "../Components/Pagina/Pagina";
import { API_URL } from "../services/api";

const recursos = [
  { titulo: "Cadastro", texto: "Inclua novas séries com validação de todos os campos obrigatórios." },
  { titulo: "Listagem", texto: "Veja todas as séries salvas na API, com busca e ordenação." },
  { titulo: "Edição", texto: "Altere qualquer informação de uma série já cadastrada." },
  { titulo: "Exclusão", texto: "Remova séries com confirmação para evitar acidentes." },
];

const tecnologias = ["React", "Vite", "React Router", "Material UI", "Axios", "Vitest", "Testing Library"];

// Página informativa sobre o projeto
function Sobre() {
  return (
    <Pagina titulo="Sobre" subtitulo="Projeto da Fase 2 da disciplina de Desenvolvimento Frontend" larguraMaxima={1000}>
      <Typography sx={{ mb: 2, fontSize: "1.05rem" }}>
        <strong>Minhas Séries</strong> é um diário para registrar as séries que você já assistiu. Nesta
        fase, todos os dados são lidos e gravados na <strong>serieJournal-api</strong> (API REST) por meio
        do Axios, então as informações continuam salvas mesmo depois de recarregar a página.
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Endereço da API em uso: <code>{API_URL}</code>
      </Typography>

      <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
        O que dá para fazer
      </Typography>
      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, mb: 4 }}>
        {recursos.map((recurso) => (
          <Paper key={recurso.titulo} sx={{ p: 2.5, borderTop: "3px solid", borderColor: "primary.main" }}>
            <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{recurso.titulo}</Typography>
            <Typography variant="body2" color="text.secondary">
              {recurso.texto}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
        Tecnologias
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {tecnologias.map((tecnologia) => (
          <Chip key={tecnologia} label={tecnologia} variant="outlined" />
        ))}
      </Box>
    </Pagina>
  );
}

export default Sobre;
