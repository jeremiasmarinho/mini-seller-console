import { useEffect, useState } from "react";
import type { Opportunity, Lead } from "../../types";
import type { OppRepo } from "../../app/ports/OppRepo";
import { convertLead } from "../../app/usecases/convertLead";

export function useOpps(repo: OppRepo) {
  const [opps, setOpps] = useState<Opportunity[]>([]);

  useEffect(() => {
    repo
      .list()
      .then(setOpps)
      .catch(() => {});
  }, [repo]);

  async function fromLead(lead: Lead, amount?: number) {
    const opp = await convertLead(repo, lead, amount);
    setOpps((prev) => [...prev, opp]);
  }

  return { opps, fromLead };
}
