import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Cadastro from "./pages/Cadastro";
import Lista from "./pages/Lista";
import Editar from "./pages/Editar";
import NaoEncontrada from "./pages/NaoEncontrada";

// Volta ao topo sempre que a rota muda
function RolarParaTopo() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <RolarParaTopo />
      <NavBar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/series" element={<Lista />} />
          <Route path="/editar/:id" element={<Editar />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
