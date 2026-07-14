export function filterRows<T extends readonly string[]>(rows: readonly T[], query: string): T[] {
  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
  if (!normalizedQuery) return [...rows];
  return rows.filter((row) => row.some((cell) => cell.toLocaleLowerCase("pt-BR").includes(normalizedQuery)));
}

