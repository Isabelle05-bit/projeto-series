import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import SaveIcon from "@mui/icons-material/Save";
import { categorias, formVazio, validarSerie } from "../../utils/validacao";

// Formulário usado no cadastro e na edição.
// onSalvar recebe os dados e deve retornar uma Promise (requisição à API).
function SerieForm({ serieInicial, onSalvar, onCancelar, textoBotao = "Cadastrar série" }) {
  const [form, setForm] = useState(() => ({ ...formVazio, ...serieInicial }));
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  function alterarCampo(nome, valor) {
    setForm((atual) => ({ ...atual, [nome]: valor }));
    // Remove o erro do campo assim que o usuário mexe nele
    setErros((atuais) => ({ ...atuais, [nome]: undefined }));
    setMensagem(null);
  }

  function handleChange(e) {
    alterarCampo(e.target.name, e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const novosErros = validarSerie(form);
    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      setMensagem({ tipo: "error", texto: "Preencha corretamente os campos destacados." });
      return;
    }

    const dados = {
      ...form,
      title: form.title.trim(),
      director: form.director.trim(),
      production: form.production.trim(),
      category: form.category.trim(),
      seasons: Number(form.seasons),
    };

    setEnviando(true);
    try {
      await onSalvar(dados);
      setMensagem({ tipo: "success", texto: `"${dados.title}" foi salva com sucesso!` });
      // No cadastro, limpa o formulário para uma nova série
      if (!serieInicial) setForm(formVazio);
    } catch (error) {
      setMensagem({ tipo: "error", texto: error.message || "Não foi possível salvar a série." });
    } finally {
      setEnviando(false);
    }
  }

  // Propriedades comuns a todos os campos de texto
  function campo(nome, label, extras = {}) {
    return {
      id: nome,
      name: nome,
      label,
      value: form[nome],
      onChange: handleChange,
      error: Boolean(erros[nome]),
      helperText: erros[nome] || extras.helperText || " ",
      required: true,
      disabled: enviando,
      ...extras,
    };
  }

  const campoData = { slotProps: { inputLabel: { shrink: true } } };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate aria-label="Formulário de série">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          columnGap: 2,
          rowGap: 0.5,
        }}
      >
        <Box sx={{ gridColumn: { sm: "1 / -1" } }}>
          <TextField {...campo("title", "Título", { placeholder: "Ex: Dark", autoFocus: !serieInicial })} />
        </Box>

        <TextField
          {...campo("seasons", "Número de temporadas", {
            type: "number",
            slotProps: { htmlInput: { min: 1, step: 1 } },
          })}
        />

        <Autocomplete
          freeSolo
          options={categorias}
          inputValue={form.category}
          onInputChange={(_, valor) => alterarCampo("category", valor)}
          disabled={enviando}
          renderInput={(params) => (
            <TextField
              {...params}
              id="category"
              name="category"
              label="Categoria"
              required
              error={Boolean(erros.category)}
              helperText={erros.category || "Escolha da lista ou digite uma nova"}
            />
          )}
        />

        <TextField {...campo("releaseDate", "Data de lançamento da temporada", { type: "date", ...campoData })} />
        <TextField {...campo("watchedAt", "Data em que assistiu", { type: "date", ...campoData })} />

        <TextField {...campo("director", "Diretor", { placeholder: "Nome do diretor" })} />
        <TextField {...campo("production", "Produtora", { placeholder: "Ex: Netflix, HBO, AMC" })} />
      </Box>

      {mensagem && (
        <Alert severity={mensagem.tipo} variant="filled" sx={{ mt: 1, mb: 2 }} role="alert">
          {mensagem.texto}
        </Alert>
      )}

      <Box sx={{ display: "flex", gap: 1.5, mt: 1, flexWrap: "wrap" }}>
        <Button type="submit" variant="contained" size="large" startIcon={<SaveIcon />} loading={enviando}>
          {textoBotao}
        </Button>
        {onCancelar && (
          <Button variant="outlined" color="inherit" size="large" onClick={onCancelar} disabled={enviando}>
            Cancelar
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default SerieForm;
