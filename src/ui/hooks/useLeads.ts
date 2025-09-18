import { useEffect, useState } from "react";
import type { Lead, LeadStatus } from "../../types";
import { updateLead } from "../../app/usecases/updateLead";
import type { LeadRepo } from "../../app/ports/LeadRepo";

export function useLeads(repo: LeadRepo) {
  const [all, setAll] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    repo
      .loadAll()
      .then(setAll)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [repo]);

  async function save(
    id: string,
    patch: { email?: string; status?: LeadStatus }
  ) {
    const prev = all;
    setAll((curr) => curr.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    try {
      await updateLead(repo, id, patch);
    } catch (e) {
      setAll(prev); // rollback
      throw e;
    }
  }

  return { all, loading, error, save };
}
