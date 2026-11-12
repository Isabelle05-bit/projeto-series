function Sobre() {
  return (
    <section className="pagina texto">
      <h1>Sobre</h1>
      <p>
        Esta aplicação foi desenvolvida em React como projeto da Fase 1 da
        disciplina de Desenvolvimento Frontend.
      </p>
      <p>Funcionalidades:</p>
      <ul>
        <li>Cadastro de séries com validação dos campos;</li>
        <li>Listagem de todas as séries com suas informações;</li>
        <li>Busca por título ou categoria;</li>
        <li>Edição e exclusão de cada série.</li>
      </ul>
      <p>
        Os dados ficam apenas em memória (estado do React): ao recarregar a
        página, a lista volta para as séries de exemplo.
      </p>
    </section>
  );
}

export default Sobre;
