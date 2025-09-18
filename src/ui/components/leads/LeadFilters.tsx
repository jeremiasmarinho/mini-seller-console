import type { LeadStatus } from "../../../types";

type Props = {
  search: string;
  onSearch: (v: string) => void;
  status: LeadStatus | "All";
  onStatus: (v: LeadStatus | "All") => void;
  onReset?: () => void;
};

const statuses: (LeadStatus | "All")[] = [
  "All",
  "New",
  "Contacted",
  "Qualified",
  "Unqualified",
];

const statusConfig = {
  All: { color: "bg-slate-100 text-slate-700", icon: "📊" },
  New: { color: "bg-blue-100 text-blue-700", icon: "🆕" },
  Contacted: { color: "bg-amber-100 text-amber-700", icon: "📞" },
  Qualified: { color: "bg-emerald-100 text-emerald-700", icon: "✅" },
  Unqualified: { color: "bg-red-100 text-red-700", icon: "❌" },
};

export default function LeadFilters({
  search,
  onSearch,
  status,
  onStatus,
  onReset,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search leads by name, company, or email..."
          className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm"
        />
        {search && (
          <button
            onClick={() => onSearch("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => {
            const config = statusConfig[s];
            const isActive = status === s;
            return (
              <button
                key={s}
                onClick={() => onStatus(s)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? `${config.color} ring-2 ring-blue-500/50 shadow-lg transform scale-105`
                    : "bg-white/50 text-slate-600 hover:bg-white hover:shadow-md hover:scale-105"
                }`}
              >
                <span className="text-sm">{config.icon}</span>
                <span>{s}</span>
              </button>
            );
          })}
        </div>

        {/* Reset Button */}
        {(search || status !== "All") && onReset && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white/50 hover:bg-white rounded-full transition-all duration-200 hover:shadow-md hover:scale-105"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset
          </button>
        )}
      </div>

      {/* Active Filters Indicator */}
      {(search || status !== "All") && (
        <div className="flex flex-wrap gap-2 items-center p-4 bg-blue-50/50 border border-blue-200 rounded-xl backdrop-blur-sm">
          <span className="text-sm font-medium text-slate-700">
            Active filters:
          </span>
          {search && (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search: "{search}"
              <button
                onClick={() => onSearch("")}
                className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          )}
          {status !== "All" && (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
              <span>{statusConfig[status].icon}</span>
              Status: {status}
              <button
                onClick={() => onStatus("All")}
                className="ml-1 hover:bg-purple-200 rounded-full p-0.5 transition-colors"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
