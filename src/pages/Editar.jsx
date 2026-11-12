import { useParams, useNavigate, Link } from "react-router-dom";
import SerieForm from "../Components/SerieForm/SerieForm";

function Editar({ series, onAtualizar }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const serie = series.find((s) => s.id === Number(id));

  if (!serie) {
    return (
      <section className="pagina">
        <h1>Série não encontrada</h1>
        <Link to="/series">Voltar para a lista</Link>
      </section>
    );
  }

  function handleSalvar(dados) {
    onAtualizar({ ...dados, id: serie.id });
    navigate("/series");
  }

  return (
    <section className="pagina">
      <h1>Editar Série</h1>
      <SerieForm
        serieInicial={serie}
        onSalvar={handleSalvar}
        textoBotao="Salvar Alterações"
      />
    </section>
  );
}

export default Editar;
