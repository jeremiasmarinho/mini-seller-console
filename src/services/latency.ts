export async function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
export async function flaky(probFail = 0.25) {
  if (Math.random() < probFail) throw new Error("Simulated network error");
}
