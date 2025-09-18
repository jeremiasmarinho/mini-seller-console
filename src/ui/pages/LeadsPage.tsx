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
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Lead Pipeline
              </h2>
              <p className="text-sm text-slate-600">
                Manage and track your sales leads
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
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
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
            <div className="p-6 border-b border-slate-200/50">
              <h3 className="text-lg font-semibold text-slate-800">
                Active Opportunities
              </h3>
              <p className="text-sm text-slate-600">
                Converted leads in your sales pipeline
              </p>
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
