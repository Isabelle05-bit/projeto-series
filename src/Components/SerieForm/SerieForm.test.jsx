import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SerieForm from "./SerieForm";
import { validarSerie } from "../../utils/validacao";
import { seriesDeTeste } from "../../test/dados";

async function preencher(user, dados) {
  await user.type(screen.getByLabelText(/título/i), dados.title);
  await user.type(screen.getByLabelText(/número de temporadas/i), String(dados.seasons));
  await user.type(screen.getByLabelText(/categoria/i), dados.category);
  await user.type(screen.getByLabelText(/data de lançamento/i), dados.releaseDate);
  await user.type(screen.getByLabelText(/data em que assistiu/i), dados.watchedAt);
  await user.type(screen.getByLabelText(/diretor/i), dados.director);
  await user.type(screen.getByLabelText(/produtora/i), dados.production);
}

describe("validarSerie", () => {
  it("aceita uma série completa e válida", () => {
    expect(validarSerie(seriesDeTeste[0])).toEqual({});
  });

  it("exige todos os campos obrigatórios", () => {
    const erros = validarSerie({});
    expect(Object.keys(erros).sort()).toEqual(
      ["category", "director", "production", "releaseDate", "seasons", "title", "watchedAt"].sort()
    );
  });

  it("não aceita zero temporadas nem números quebrados", () => {
    expect(validarSerie({ ...seriesDeTeste[0], seasons: 0 }).seasons).toBeDefined();
    expect(validarSerie({ ...seriesDeTeste[0], seasons: 2.5 }).seasons).toBeDefined();
  });

  it("não aceita data assistida anterior ao lançamento", () => {
    const erros = validarSerie({ ...seriesDeTeste[0], watchedAt: "2000-01-01" });
    expect(erros.watchedAt).toMatch(/anterior/i);
  });

  it("não aceita data assistida no futuro", () => {
    const erros = validarSerie({ ...seriesDeTeste[0], watchedAt: "2999-01-01" });
    expect(erros.watchedAt).toMatch(/futura/i);
  });
});

describe("SerieForm", () => {
  it("mostra os erros e não envia quando o formulário está vazio", async () => {
    const user = userEvent.setup();
    const onSalvar = vi.fn();
    render(<SerieForm onSalvar={onSalvar} />);

    await user.click(screen.getByRole("button", { name: /cadastrar série/i }));

    expect(onSalvar).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/preencha corretamente/i);
    expect(screen.getByText("Informe o título.")).toBeInTheDocument();
    expect(screen.getByText("Informe o diretor.")).toBeInTheDocument();
  });

  it("envia os dados no formato da API e limpa o formulário", async () => {
    const user = userEvent.setup();
    const onSalvar = vi.fn().mockResolvedValue({});
    render(<SerieForm onSalvar={onSalvar} />);

    const nova = { ...seriesDeTeste[1] };
    delete nova.id;
    await preencher(user, nova);
    await user.click(screen.getByRole("button", { name: /cadastrar série/i }));

    await waitFor(() => expect(onSalvar).toHaveBeenCalledWith(nova));
    expect(await screen.findByRole("alert")).toHaveTextContent(/salva com sucesso/i);
    expect(screen.getByLabelText(/título/i)).toHaveValue("");
  });

  it("vem preenchido na edição e exibe o erro da API", async () => {
    const user = userEvent.setup();
    const onSalvar = vi.fn().mockRejectedValue(new Error("API fora do ar"));
    render(<SerieForm serieInicial={seriesDeTeste[0]} onSalvar={onSalvar} textoBotao="Salvar alterações" />);

    expect(screen.getByLabelText(/título/i)).toHaveValue("Breaking Bad");
    expect(screen.getByLabelText(/categoria/i)).toHaveValue("Drama/Crime");

    await user.click(screen.getByRole("button", { name: /salvar alterações/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("API fora do ar");
    expect(screen.getByLabelText(/título/i)).toHaveValue("Breaking Bad");
  });
});
