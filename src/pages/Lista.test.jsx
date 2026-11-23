import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Lista from "./Lista";
import * as api from "../services/api";
import { seriesDeTeste } from "../test/dados";

// Substitui as chamadas HTTP por funções simuladas
vi.mock("../services/api", async (importOriginal) => {
  const original = await importOriginal();
  return { ...original, listarSeries: vi.fn(), excluirSerie: vi.fn() };
});

function renderizar() {
  return render(
    <MemoryRouter initialEntries={["/series"]}>
      <Routes>
        <Route path="/series" element={<Lista />} />
        <Route path="/editar/:id" element={<p>Página de edição</p>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Página Lista", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("busca as séries na API e mostra a quantidade", async () => {
    api.listarSeries.mockResolvedValue(seriesDeTeste);
    renderizar();

    expect(screen.getByText(/buscando séries na api/i)).toBeInTheDocument();
    expect(await screen.findByText("3 série(s) cadastrada(s)")).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(api.listarSeries).toHaveBeenCalledTimes(1);
  });

  it("mostra erro quando a API não responde e permite tentar novamente", async () => {
    const user = userEvent.setup();
    api.listarSeries.mockRejectedValueOnce(new Error("Network Error")).mockResolvedValueOnce(seriesDeTeste);
    renderizar();

    expect(await screen.findByText(/não foi possível conectar à api/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /tentar novamente/i }));
    expect(await screen.findByText("3 série(s) cadastrada(s)")).toBeInTheDocument();
  });

  it("exclui uma série após a confirmação", async () => {
    const user = userEvent.setup();
    api.listarSeries.mockResolvedValue(seriesDeTeste);
    api.excluirSerie.mockResolvedValue({ message: "Serie removed successfully" });
    renderizar();

    await user.click(await screen.findByRole("button", { name: "Excluir Dark" }));
    const dialogo = screen.getByRole("dialog");
    expect(dialogo).toHaveTextContent('A série "Dark" será removida');

    await user.click(within(dialogo).getByRole("button", { name: "Excluir" }));

    expect(api.excluirSerie).toHaveBeenCalledWith(2);
    await waitFor(() => expect(screen.queryByRole("article", { name: "Dark" })).not.toBeInTheDocument());
    expect(screen.getByText("2 série(s) cadastrada(s)")).toBeInTheDocument();
    expect(await screen.findByText('"Dark" foi excluída.')).toBeInTheDocument();
  });

  it("não exclui quando o usuário cancela", async () => {
    const user = userEvent.setup();
    api.listarSeries.mockResolvedValue(seriesDeTeste);
    renderizar();

    await user.click(await screen.findByRole("button", { name: "Excluir Dark" }));
    await user.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Cancelar" }));

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(api.excluirSerie).not.toHaveBeenCalled();
    expect(screen.getByRole("article", { name: "Dark" })).toBeInTheDocument();
  });

  it("navega para a edição ao clicar em editar", async () => {
    const user = userEvent.setup();
    api.listarSeries.mockResolvedValue(seriesDeTeste);
    renderizar();

    await user.click(await screen.findByRole("button", { name: "Editar Dark" }));
    expect(screen.getByText("Página de edição")).toBeInTheDocument();
  });
});
