import { useNavigate } from "react-router-dom";
import SerieList from "../Components/SerieList/SerieList";

function Lista({ series, onExcluir }) {
  const navigate = useNavigate();

  function handleExcluir(id) {
    const serie = series.find((s) => s.id === id);
    if (window.confirm(`Excluir a série "${serie.titulo}"?`)) {
      onExcluir(id);
    }
  }

  return (
    <section className="pagina">
      <h1>Minhas Séries</h1>
      <p className="contador">{series.length} série(s) cadastrada(s)</p>
      <SerieList
        series={series}
        onEditar={(id) => navigate(`/editar/${id}`)}
        onExcluir={handleExcluir}
      />
    </section>
  );
}

export default Lista;
