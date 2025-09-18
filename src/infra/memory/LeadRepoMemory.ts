import type { LeadRepo } from "../../app/ports/LeadRepo";
import type {
  LeadRepository,
  UpdateLeadRequest,
} from "../../domain/repositories";
import type { Lead, LeadStatus } from "../../types";
import { wait } from "../../services/latency";

export class LeadRepoMemory implements LeadRepo, LeadRepository {
  private data: Lead[] | null = null;

  async loadAll(): Promise<Lead[]> {
    return this.findAll();
  }

  async findAll(): Promise<Lead[]> {
    // First call loads from /public/leads.json
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

  async findById(id: string): Promise<Lead | null> {
    const leads = await this.findAll();
    return leads.find((lead) => lead.id === id) || null;
  }

  async update(id: string, data: UpdateLeadRequest): Promise<Lead> {
    await wait(700);
    // ~25% simulated failure
    if (Math.random() < 0.25) throw new Error("Simulated network error");

    const leads = await this.findAll();
    const leadIndex = leads.findIndex((l) => l.id === id);

    if (leadIndex === -1) {
      throw new Error(`Lead with id ${id} not found`);
    }

    const updatedLead = { ...leads[leadIndex], ...data };
    this.data = leads.map((l, index) =>
      index === leadIndex ? updatedLead : l
    );

    return updatedLead;
  }

  async delete(id: string): Promise<void> {
    await wait(500);
    this.data = (this.data ?? []).filter((l) => l.id !== id);
  }

  async patch(
    id: string,
    patch: { email?: string; status?: LeadStatus }
  ): Promise<void> {
    await this.update(id, patch as UpdateLeadRequest);
  }
}
