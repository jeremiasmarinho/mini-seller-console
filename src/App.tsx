import { useEffect, useMemo, useState } from "react";
import type { Lead, LeadStatus } from "./types/domain";
import LeadFilters from "./components/LeadFilters";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import LeadDetailPanel from "./components/LeadDetailPanel";

function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // filtros
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<LeadStatus | "All">("All");
  const debouncedSearch = useDebouncedValue(search, 250);

  // painel
  const [selected, setSelected] = useState<Lead | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      fetch("/leads.json")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load leads");
          return res.json();
        })
        .then((data: Lead[]) => setLeads(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, 800);
    return () => clearTimeout(id);
  }, []);

  const visibleLeads = useMemo(() => {
    let rows = leads;
    const q = debouncedSearch.trim().toLowerCase();
    if (q) {
      rows = rows.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q)
      );
    }
    if (status !== "All") {
      rows = rows.filter((l) => l.status === status);
    }
    return [...rows].sort((a, b) => b.score - a.score); // score desc
  }, [leads, debouncedSearch, status]);

  const resetFilters = () => {
    setSearch("");
    setStatus("All");
  };

  function handleRowClick(lead: Lead) {
    setSelected(lead);
  }

  function handleSaved(updated: Lead) {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
  }

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
        onReset={resetFilters}
      />

      <div className="overflow-x-auto rounded border border-gray-200 bg-white shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-sm text-gray-700">
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Company</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Source</th>
              <th className="p-3 border-b">Score (desc)</th>
              <th className="p-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {visibleLeads.map((lead) => (
              <tr
                key={lead.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(lead)}
              >
                <td className="p-3 border-b">{lead.name}</td>
                <td className="p-3 border-b">{lead.company}</td>
                <td className="p-3 border-b">{lead.email}</td>
                <td className="p-3 border-b">{lead.source}</td>
                <td className="p-3 border-b">{lead.score}</td>
                <td className="p-3 border-b">{lead.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {visibleLeads.length === 0 && (
          <div className="p-6 text-sm text-gray-600">
            No results. Try clearing filters.
          </div>
        )}
      </div>

      <LeadDetailPanel
        lead={selected}
        onClose={() => setSelected(null)}
        onSaved={handleSaved}
      />
    </div>
  );
}

export default App;
