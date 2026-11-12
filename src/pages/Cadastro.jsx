import SerieForm from "../Components/SerieForm/SerieForm";

function Cadastro({ onAdicionar }) {
  return (
    <section className="pagina">
      <h1>Cadastro de Séries</h1>
      <SerieForm onSalvar={onAdicionar} />
    </section>
  );
}

export default Cadastro;
