import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="pagina">
      <h1>Bem-vindo(a)!</h1>
      <p>
        Organize as séries que você já assistiu: cadastre, pesquise, edite e
        exclua quando quiser.
      </p>

      <div className="botoes">
        <button onClick={() => navigate("/cadastro")}>Cadastrar série</button>
        <button className="secundario" onClick={() => navigate("/series")}>
          Ver minhas séries
        </button>
      </div>
    </section>
  );
}

export default Home;
