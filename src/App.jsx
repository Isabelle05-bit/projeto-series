import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Cadastro from "./pages/Cadastro";
import Lista from "./pages/Lista";
import Editar from "./pages/Editar";
import seriesIniciais from "./data/seriesIniciais";
import "./App.css";

function App() {

  const [series, setSeries] = useState(seriesIniciais);

  function adicionarSerie(serie) {
    setSeries([...series, { ...serie, id: Date.now() }]);
  }

  function atualizarSerie(serieAtualizada) {
    setSeries(
      series.map((serie) =>
        serie.id === serieAtualizada.id ? serieAtualizada : serie
      )
    );
  }

  function excluirSerie(id) {
    setSeries(series.filter((serie) => serie.id !== id));
  }

  return (
    <>
      <NavBar />

      <main className="conteudo">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route
            path="/cadastro"
            element={<Cadastro onAdicionar={adicionarSerie} />}
          />
          <Route
            path="/series"
            element={<Lista series={series} onExcluir={excluirSerie} />}
          />
          <Route
            path="/editar/:id"
            element={<Editar series={series} onAtualizar={atualizarSerie} />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
