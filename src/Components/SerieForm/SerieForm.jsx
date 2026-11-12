import { useState } from "react";
import "./SerieForm.css";

const formVazio = {
  titulo: "",
  temporadas: "",
  dataLancamento: "",
  diretor: "",
  produtora: "",
  categoria: "",
  dataAssistida: ""
};

const categorias = [
  "Ação",
  "Comédia",
  "Drama",
  "Terror",
  "Ficção científica",
  "Suspense"
];


function SerieForm({ serieInicial, onSalvar, textoBotao = "Cadastrar Série" }) {
  const [form, setForm] = useState(serieInicial || formVazio);
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

    // Remove o erro do campo assim que o usuário mexe nele
    setErros({ ...erros, [name]: "" });
    setMensagem("");
  }

  function validar() {
    const novosErros = {};

    if (form.titulo.trim() === "") novosErros.titulo = "Informe o título.";

    if (form.temporadas === "") {
      novosErros.temporadas = "Informe o número de temporadas.";
    } else if (Number(form.temporadas) < 1) {
      novosErros.temporadas = "Informe pelo menos uma temporada.";
    }

    if (form.dataLancamento === "") novosErros.dataLancamento = "Informe a data de lançamento.";
    if (form.diretor.trim() === "") novosErros.diretor = "Informe o diretor.";
    if (form.produtora.trim() === "") novosErros.produtora = "Informe a produtora.";
    if (form.categoria === "") novosErros.categoria = "Selecione uma categoria.";

    if (form.dataAssistida === "") {
      novosErros.dataAssistida = "Informe a data em que assistiu.";
    } else if (form.dataLancamento && form.dataAssistida < form.dataLancamento) {
      novosErros.dataAssistida = "Não pode ser anterior à data de lançamento.";
    }

    return novosErros;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const novosErros = validar();
    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      setMensagem("Preencha corretamente os campos destacados.");
      setTipoMensagem("erro");
      return;
    }

    onSalvar(form);

    setMensagem("Série salva com sucesso!");
    setTipoMensagem("sucesso");

    // No cadastro, limpa o formulário para uma nova série
    if (!serieInicial) {
      setForm(formVazio);
    }
  }

  // Monta um campo com label, input e mensagem de erro
  function campo(nome, label, props) {
    return (
      <div className="campo">
        <label htmlFor={nome}>{label}</label>
        <input
          id={nome}
          name={nome}
          value={form[nome]}
          onChange={handleChange}
          className={erros[nome] ? "invalido" : ""}
          {...props}
        />
        {erros[nome] && <span className="erro-campo">{erros[nome]}</span>}
      </div>
    );
  }

  return (
    <form className="serie-form" onSubmit={handleSubmit} noValidate>
      {campo("titulo", "Título", { type: "text", placeholder: "Nome da série" })}
      {campo("temporadas", "Número de temporadas", { type: "number", min: "1", placeholder: "Ex: 5" })}
      {campo("dataLancamento", "Data de lançamento da temporada", { type: "date" })}
      {campo("diretor", "Diretor", { type: "text", placeholder: "Nome do diretor" })}
      {campo("produtora", "Produtora", { type: "text", placeholder: "Ex: Netflix" })}

      <div className="campo">
        <label htmlFor="categoria">Categoria</label>
        <select
          id="categoria"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          className={erros.categoria ? "invalido" : ""}
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>{categoria}</option>
          ))}
        </select>
        {erros.categoria && <span className="erro-campo">{erros.categoria}</span>}
      </div>

      {campo("dataAssistida", "Data em que assistiu", { type: "date" })}

      <button type="submit">{textoBotao}</button>

      {mensagem && (
        <div className={`mensagem ${tipoMensagem}`} role="alert">
          {mensagem}
        </div>
      )}
    </form>
  );
}

export default SerieForm;
