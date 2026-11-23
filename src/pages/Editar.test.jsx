import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Editar from "./Editar";
import Cadastro from "./Cadastro";
import * as api from "../services/api";
import { seriesDeTeste } from "../test/dados";

vi.mock("../services/api", async (importOriginal) => {
  const original = await importOriginal();
  return { ...original, buscarSerie: vi.fn(), atualizarSerie: vi.fn(), criarSerie: vi.fn() };
});

function ListaFalsa() {
  const location = useLocation();
  return <p>Lista: {location.state?.mensagem}</p>;
}

function renderizar(rota) {
  return render(
    <MemoryRouter initialEntries={[rota]}>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/editar/:id" element={<Editar />} />
        <Route path="/series" element={<ListaFalsa />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Página Editar", () => {
  beforeEach(() => vi.clearAllMocks());

  it("carrega a série pelo id e salva as alterações com PUT", async () => {
    const user = userEvent.setup();
    api.buscarSerie.mockResolvedValue(seriesDeTeste[0]);
    api.atualizarSerie.mockResolvedValue({});
    renderizar("/editar/1");

    const titulo = await screen.findByLabelText(/título/i);
    expect(api.buscarSerie).toHaveBeenCalledWith("1");
    expect(titulo).toHaveValue("Breaking Bad");

    await user.clear(screen.getByLabelText(/número de temporadas/i));
    await user.type(screen.getByLabelText(/número de temporadas/i), "6");
    await user.click(screen.getByRole("button", { name: /salvar alterações/i }));

    expect(api.atualizarSerie).toHaveBeenCalledWith({ ...seriesDeTeste[0], seasons: 6 });
    expect(await screen.findByText('Lista: "Breaking Bad" foi atualizada.')).toBeInTheDocument();
  });

  it("mostra aviso quando a série não existe", async () => {
    api.buscarSerie.mockRejectedValue({ response: { status: 404 } });
    renderizar("/editar/999");

    expect(await screen.findByText("Série não encontrada.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /voltar para a lista/i })).toBeInTheDocument();
  });
});

describe("Página Cadastro", () => {
  beforeEach(() => vi.clearAllMocks());

  it("mostra a mensagem de erro quando a API está fora do ar", async () => {
    const user = userEvent.setup();
    api.criarSerie.mockRejectedValue(new Error("Network Error"));
    renderizar("/cadastro");

    const nova = { ...seriesDeTeste[2] };
    delete nova.id;
    await user.type(screen.getByLabelText(/título/i), nova.title);
    await user.type(screen.getByLabelText(/número de temporadas/i), String(nova.seasons));
    await user.type(screen.getByLabelText(/categoria/i), nova.category);
    await user.type(screen.getByLabelText(/data de lançamento/i), nova.releaseDate);
    await user.type(screen.getByLabelText(/data em que assistiu/i), nova.watchedAt);
    await user.type(screen.getByLabelText(/diretor/i), nova.director);
    await user.type(screen.getByLabelText(/produtora/i), nova.production);
    await user.click(screen.getByRole("button", { name: /cadastrar série/i }));

    expect(api.criarSerie).toHaveBeenCalledWith(nova);
    expect(await screen.findByRole("alert")).toHaveTextContent(/não foi possível conectar à api/i);
  });
});
