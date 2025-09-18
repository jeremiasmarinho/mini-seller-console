import type { Lead, LeadStatus } from "../../types";

export interface LeadRepo {
  loadAll(): Promise<Lead[]>;
  patch(
    id: string,
    patch: { email?: string; status?: LeadStatus }
  ): Promise<void>;
}
