import type { LeadStatus } from "../../types";
import type { LeadRepo } from "../ports/LeadRepo";
import { isValidEmail } from "../../domain/lead";

export async function updateLead(
  repo: LeadRepo,
  id: string,
  patch: { email?: string; status?: LeadStatus }
): Promise<void> {
  if (patch.email && !isValidEmail(patch.email)) {
    throw new Error("Invalid email format");
  }
  await repo.patch(id, patch);
}
