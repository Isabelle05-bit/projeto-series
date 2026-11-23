import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SerieList from "./SerieList";
import { seriesDeTeste } from "../../test/dados";

function titulosNaTela() {
  return screen.getAllByRole("article").map((card) => card.getAttribute("aria-label"));
}

describe("SerieList", () => {
  it("mostra todas as séries com suas informações", () => {
    render(<SerieList series={seriesDeTeste} onEditar={vi.fn()} onExcluir={vi.fn()} />);

    expect(screen.getAllByRole("article")).toHaveLength(3);
    const card = screen.getByRole("article", { name: "Breaking Bad" });
    expect(within(card).getByText("Vince Gilligan")).toBeInTheDocument();
    expect(within(card).getByText("AMC")).toBeInTheDocument();
    expect(within(card).getByText("Drama/Crime")).toBeInTheDocument();
    expect(within(card).getByText("5 temporadas")).toBeInTheDocument();
    expect(within(card).getByText("20/01/2008")).toBeInTheDocument();
    expect(within(card).getByText("10/03/2023")).toBeInTheDocument();
  });

  it("ordena por assistidas recentemente por padrão", () => {
    render(<SerieList series={seriesDeTeste} onEditar={vi.fn()} onExcluir={vi.fn()} />);
    expect(titulosNaTela()).toEqual(["Fleabag", "Dark", "Breaking Bad"]);
  });

  it("filtra por título, categoria ou produtora", async () => {
    const user = userEvent.setup();
    render(<SerieList series={seriesDeTeste} onEditar={vi.fn()} onExcluir={vi.fn()} />);
    const busca = screen.getByRole("textbox", { name: /buscar/i });

    await user.type(busca, "netflix");
    expect(titulosNaTela()).toEqual(["Dark"]);

    await user.clear(busca);
    await user.type(busca, "drama");
    expect(titulosNaTela()).toEqual(["Fleabag", "Breaking Bad"]);

    await user.clear(busca);
    await user.type(busca, "xyz");
    expect(screen.getByText(/nenhuma série encontrada/i)).toBeInTheDocument();
  });

  it("avisa o componente pai ao clicar em editar e excluir", async () => {
    const user = userEvent.setup();
    const onEditar = vi.fn();
    const onExcluir = vi.fn();
    render(<SerieList series={seriesDeTeste} onEditar={onEditar} onExcluir={onExcluir} />);

    await user.click(screen.getByRole("button", { name: "Editar Dark" }));
    expect(onEditar).toHaveBeenCalledWith(2);

    await user.click(screen.getByRole("button", { name: "Excluir Dark" }));
    expect(onExcluir).toHaveBeenCalledWith(seriesDeTeste[1]);
  });

  it("mostra mensagem quando não há séries", () => {
    render(<SerieList series={[]} onEditar={vi.fn()} onExcluir={vi.fn()} />);
    expect(screen.getByText(/nenhuma série cadastrada/i)).toBeInTheDocument();
  });
});
