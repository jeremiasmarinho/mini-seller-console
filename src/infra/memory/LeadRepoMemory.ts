import type { LeadRepo } from "../../app/ports/LeadRepo";
import type { Lead, LeadStatus } from "../../types";
import { wait } from "../../services/latency";

export class LeadRepoMemory implements LeadRepo {
  private data: Lead[] | null = null;

  async loadAll(): Promise<Lead[]> {
    // primeira chamada carrega do /public/leads.json
    if (!this.data) {
      await wait(400);
      const res = await fetch("/leads.json");
      if (!res.ok) throw new Error("Failed to load leads");
      this.data = (await res.json()) as Lead[];
    } else {
      await wait(100);
    }
    return [...this.data];
  }

  async patch(
    id: string,
    patch: { email?: string; status?: LeadStatus }
  ): Promise<void> {
    await wait(700);
    // ~25% falha simulada
    if (Math.random() < 0.25) throw new Error("Simulated network error");
    this.data = (this.data ?? []).map((l) =>
      l.id === id ? ({ ...l, ...patch } as Lead) : l
    );
  }
}
