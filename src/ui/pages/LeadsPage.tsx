import { useMemo, useState, useMemo as useReactMemo } from "react";
import type { Lead, LeadStatus } from "../../types";
import { LeadRepoMemory } from "../../infra/memory/LeadRepoMemory";
import { OppRepoMemory } from "../../infra/memory/OppRepoMemory";
import { useLeads } from "../hooks/useLeads";
import { useOpps } from "../hooks/useOpps";
import LeadsTable from "../components/leads/LeadsTable";
import LeadFilters from "../components/leads/LeadFilters";
import LeadDetailPanel from "../components/leads/LeadDetailPanel";
import OpportunitiesTable from "../components/opps/OpportunitiesTable";

export default function LeadsPage() {
  const leadRepo = useMemo(() => new LeadRepoMemory(), []);
  const oppRepo = useMemo(() => new OppRepoMemory(), []);

  const { all: leads, loading, error, save } = useLeads(leadRepo);
  const { opps, fromLead } = useOpps(oppRepo);

  const [selected, setSelected] = useState<Lead | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<LeadStatus | "All">("All");

  const visible = useReactMemo(() => {
    let rows = leads;
    const q = search.trim().toLowerCase();
    if (q)
      rows = rows.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q)
      );
    if (status !== "All") rows = rows.filter((l) => l.status === status);
    return [...rows].sort((a, b) => b.score - a.score);
  }, [leads, search, status]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (leads.length === 0) return <div className="p-6">No leads found.</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Leads</h1>

      <LeadFilters
        search={search}
        onSearch={setSearch}
        status={status}
        onStatus={setStatus}
        onReset={() => {
          setSearch("");
          setStatus("All");
        }}
      />

      <LeadsTable rows={visible} onRowClick={setSelected} />

      <LeadDetailPanel
        lead={selected}
        onClose={() => setSelected(null)}
        onRequestSave={({ id, email, status }: { id: string; email: string; status: LeadStatus }) => save(id, { email, status })}
        onConvert={(lead: Lead) => {
          fromLead(lead);
          setSelected(null);
        }}
      />

      <OpportunitiesTable opportunities={opps} />
    </div>
  );
}
