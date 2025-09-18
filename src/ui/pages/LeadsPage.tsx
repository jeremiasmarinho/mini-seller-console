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
import { PageSkeleton } from "../components/common/Skeleton";
import { ThemeToggle } from "../components/common/ThemeToggle";

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

  if (loading) return <PageSkeleton />;

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Something went wrong
          </h2>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  if (leads.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-amber-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-2-2m0 0l-2 2m2-2v6"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-amber-600 mb-2">
            No leads found
          </h2>
          <p className="text-amber-500">
            Start by adding your first lead to get started
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen transition-all duration-500 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-blue-600 bg-clip-text text-transparent dark:bg-none dark:text-slate-100 transition-all duration-500">
                Sales Dashboard
              </h1>
            </div>
            
            {/* Theme Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600 dark:text-slate-300 font-medium hidden sm:block transition-colors duration-500">Theme</span>
              <ThemeToggle />
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-lg transition-colors duration-500">
            Manage your leads and track opportunities in one place
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 rounded-xl p-4 shadow-lg transition-all duration-500">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg transition-colors duration-500">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-colors duration-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium transition-colors duration-500">
                    Total Leads
                  </p>
                  <p className="text-2xl font-bold text-slate-700 dark:text-slate-200 transition-colors duration-500">
                    {leads.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 rounded-xl p-4 shadow-lg transition-all duration-500">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    Qualified
                  </p>
                  <p className="text-2xl font-bold text-slate-700">
                    {leads.filter((l) => l.status === "Qualified").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <svg
                    className="w-5 h-5 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    In Progress
                  </p>
                  <p className="text-2xl font-bold text-slate-700">
                    {leads.filter((l) => l.status === "Contacted").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    Opportunities
                  </p>
                  <p className="text-2xl font-bold text-slate-700">
                    {opps.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-6">
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
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <LeadsTable rows={visible} onRowClick={setSelected} />

          <LeadDetailPanel
            lead={selected}
            onClose={() => setSelected(null)}
            onRequestSave={({
              id,
              email,
              status,
            }: {
              id: string;
              email: string;
              status: LeadStatus;
            }) => save(id, { email, status })}
            onConvert={(lead: Lead) => {
              fromLead(lead);
              setSelected(null);
            }}
          />

          <OpportunitiesTable opportunities={opps} />
        </div>
      </div>
    </div>
  );
}
