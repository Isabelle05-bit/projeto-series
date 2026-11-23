// Converte "2024-01-10" em "10/01/2024"
export function formatarData(data) {
  if (!data) return "—";
  const [ano, mes, dia] = data.split("-");
  if (!dia) return data;
  return `${dia}/${mes}/${ano}`;
}

export function anoDe(data) {
  return data ? data.slice(0, 4) : "";
}

// Gera sempre a mesma cor para o mesmo título (usada nos "pôsteres")
export function corDoTitulo(titulo = "") {
  let hash = 0;
  for (const letra of titulo) {
    hash = (hash * 31 + letra.charCodeAt(0)) % 360;
  }
  return hash;
}

// Ordena as séries da assistida mais recentemente para a mais antiga
export function maisRecentes(series) {
  return [...series].sort((a, b) => (b.watchedAt || "").localeCompare(a.watchedAt || ""));
}
