import { useMemo, useState } from "react";
import type { Lead, LeadStatus } from "../../types";
import { LeadRepoMemory } from "../../infra/memory/LeadRepoMemory";
import { OppRepoMemory } from "../../infra/memory/OppRepoMemory";
import { useLeads } from "../hooks/useLeads";
import { useOpps } from "../hooks/useOpps";
import { useLeadFilters } from "../hooks/useLeadFilters";
import { useLeadData } from "../hooks/useLeadData";
import { AppHeader } from "../components/common/AppHeader";
import { StatisticsGrid } from "../components/common/StatisticsGrid";
import { ErrorState, EmptyState } from "../components/common/States";
import { PageSkeleton } from "../components/common/Skeleton";
import LeadsTable from "../components/leads/LeadsTable";
import LeadFilters from "../components/leads/LeadFilters";
import LeadDetailPanel from "../components/leads/LeadDetailPanel";
import OpportunitiesTable from "../components/opps/OpportunitiesTable";

export default function LeadsPage() {
  // Repository instances
  const leadRepo = useMemo(() => new LeadRepoMemory(), []);
  const oppRepo = useMemo(() => new OppRepoMemory(), []);

  // Data hooks
  const { all: leads, loading, error, save } = useLeads(leadRepo);
  const { opps, fromLead } = useOpps(oppRepo);

  // UI state
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Filter management
  const { search, status, setSearch, setStatus, resetFilters } =
    useLeadFilters();

  // Computed data
  const { filteredLeads, statistics } = useLeadData(
    leads,
    { search, status },
    opps.length
  );

  // Event handlers
  const handleLeadSave = async ({
    id,
    email,
    status,
  }: {
    id: string;
    email: string;
    status: LeadStatus;
  }) => {
    await save(id, { email, status });
  };

  const handleLeadConvert = (lead: Lead) => {
    fromLead(lead);
    setSelectedLead(null);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  // Loading state
  if (loading) {
    return <PageSkeleton />;
  }

  // Error state
  if (error) {
    return <ErrorState message={error} onRetry={handleRetry} />;
  }

  // Empty state
  if (leads.length === 0) {
    return (
      <EmptyState
        title="No leads found"
        message="Start by adding your first lead to get started"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <AppHeader
        title="Mini Seller Console"
        subtitle="Lead Management Platform"
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <StatisticsGrid
          total={statistics.total}
          qualified={statistics.qualified}
          opportunities={statistics.opportunities}
          conversionRate={statistics.conversionRate}
        />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Lead Pipeline
                </h2>
                <p className="text-sm text-slate-600 font-medium">
                  Manage and track your sales leads
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
          <div className="p-6 border-b border-slate-200/50">
            <LeadFilters
              search={search}
              onSearch={setSearch}
              status={status}
              onStatus={setStatus}
              onReset={resetFilters}
            />
          </div>

          <div className="overflow-hidden">
            <LeadsTable rows={filteredLeads} onRowClick={setSelectedLead} />
          </div>
        </div>

        {opps.length > 0 && (
          <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
            <div className="p-6 border-b border-slate-200/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
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
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Active Opportunities
                  </h3>
                  <p className="text-sm text-slate-600 font-medium">
                    Converted leads in your sales pipeline
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-hidden">
              <OpportunitiesTable opportunities={opps} />
            </div>
          </div>
        )}

        <LeadDetailPanel
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onRequestSave={handleLeadSave}
          onConvert={handleLeadConvert}
        />
      </div>
    </div>
  );
}
