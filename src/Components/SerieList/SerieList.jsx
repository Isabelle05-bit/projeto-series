import { useState } from "react";
import "./SerieList.css";

// Converte "2024-01-10" em "10/01/2024"
function formatarData(data) {
  return data.split("-").reverse().join("/");
}

// Recebe a lista de séries via props e avisa o componente pai ao editar/excluir
function SerieList({ series, onEditar, onExcluir }) {
  const [busca, setBusca] = useState("");

  // Busca pelo título ou pela categoria
  const seriesFiltradas = series.filter((serie) =>
    serie.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    serie.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="serie-list">
      <input
        type="text"
        className="busca"
        placeholder="Pesquisar por título ou categoria..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {seriesFiltradas.length === 0 && (
        <p className="vazio">Nenhuma série encontrada!</p>
      )}

      <ul>
        {seriesFiltradas.map((serie) => (
          <li key={serie.id} className="serie-item">
            <div className="serie-info">
              <h3>{serie.titulo}</h3>
              <span className="tag">{serie.categoria}</span>
              <p><strong>Temporadas:</strong> {serie.temporadas}</p>
              <p><strong>Lançamento:</strong> {formatarData(serie.dataLancamento)}</p>
              <p><strong>Diretor:</strong> {serie.diretor}</p>
              <p><strong>Produtora:</strong> {serie.produtora}</p>
              <p><strong>Assistida em:</strong> {formatarData(serie.dataAssistida)}</p>
            </div>

            <div className="serie-acoes">
              <button className="btn-editar" onClick={() => onEditar(serie.id)}>
                Editar
              </button>
              <button className="btn-excluir" onClick={() => onExcluir(serie.id)}>
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SerieList;
