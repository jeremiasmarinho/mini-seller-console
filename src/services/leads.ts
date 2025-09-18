// Simula um PATCH com latência e chance de falha
export async function patchLead<T extends object>(patch: T): Promise<T> {
  // latência de 700ms
  await new Promise((r) => setTimeout(r, 700));

  // ~20% de chance de erro
  const failed = Math.random() < 0.2;
  if (failed) {
    throw new Error("Simulated network error. Please try again.");
  }
  // neste teste não há backend; apenas retornamos o patch como se tivesse persistido
  return patch;
}
