import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import SerieCard from "../SerieCard/SerieCard";

const texto = (valor) => String(valor ?? "");

const ordenacoes = {
  recentes: {
    label: "Assistidas recentemente",
    comparar: (a, b) => texto(b.watchedAt).localeCompare(texto(a.watchedAt)),
  },
  titulo: {
    label: "Título (A–Z)",
    comparar: (a, b) => texto(a.title).localeCompare(texto(b.title)),
  },
  lancamento: {
    label: "Lançamento mais recente",
    comparar: (a, b) => texto(b.releaseDate).localeCompare(texto(a.releaseDate)),
  },
  temporadas: {
    label: "Mais temporadas",
    comparar: (a, b) => Number(b.seasons) - Number(a.seasons),
  },
};

function contem(valor, busca) {
  return texto(valor).toLowerCase().includes(busca);
}

// Recebe a lista de séries via props, permite buscar/ordenar e
// avisa o componente pai quando o usuário clica em editar/excluir
function SerieList({ series, onEditar, onExcluir }) {
  const [busca, setBusca] = useState("");
  const [ordem, setOrdem] = useState("recentes");

  const seriesFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return series
      .filter(
        (serie) =>
          contem(serie.title, termo) ||
          contem(serie.category, termo) ||
          contem(serie.director, termo) ||
          contem(serie.production, termo)
      )
      .sort(ordenacoes[ordem].comparar);
  }, [series, busca, ordem]);

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexDirection: { xs: "column", sm: "row" } }}>
        <TextField
          label="Buscar"
          placeholder="Título, categoria, diretor ou produtora"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          select
          label="Ordenar por"
          value={ordem}
          onChange={(e) => setOrdem(e.target.value)}
          sx={{ minWidth: { sm: 260 } }}
        >
          {Object.entries(ordenacoes).map(([chave, { label }]) => (
            <MenuItem key={chave} value={chave}>
              {label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {seriesFiltradas.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 6, textAlign: "center" }}>
          {series.length === 0 ? "Nenhuma série cadastrada ainda." : `Nenhuma série encontrada para "${busca}".`}
        </Typography>
      ) : (
        <Box
          component="ul"
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
        >
          {seriesFiltradas.map((serie) => (
            <li key={serie.id}>
              <SerieCard serie={serie} onEditar={onEditar} onExcluir={onExcluir} />
            </li>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default SerieList;
