import type { Lead, Opportunity } from "../../types";
import type { OppRepo } from "../ports/OppRepo";

export async function convertLead(repo: OppRepo, lead: Lead, amount?: number) {
  const opp: Opportunity = {
    id: crypto.randomUUID?.() ?? String(Date.now()),
    name: lead.name,
    accountName: lead.company,
    stage: "New",
    amount,
  };
  await repo.add(opp);
  return opp;
}
