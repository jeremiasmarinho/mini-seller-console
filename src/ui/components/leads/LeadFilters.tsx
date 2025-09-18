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

export default function LeadFilters({
  search,
  onSearch,
  status,
  onStatus,
  onReset,
}: Props) {
  return (
    <div className="mb-8 relative">
      {/* Background gradient with glass morphism */}
      <div className="relative bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg shadow-blue-500/5">
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          {/* Search Field */}
          <div className="flex-1 group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors">
              🔍 Search Leads
            </label>
            <div className="relative">
              <input
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search by name or company..."
                className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl 
                         outline-none transition-all duration-300 text-gray-700
                         focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:bg-white
                         hover:border-gray-300 hover:shadow-md
                         placeholder:text-gray-400"
              />
              <div className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18L20.29 21.71A1 1 0 0 0 21.71 20.29ZM11 18A7 7 0 1 1 18 11A7 7 0 0 1 11 18Z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-56 group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📊 Status Filter
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => onStatus(e.target.value as LeadStatus | "All")}
                className="w-full pl-4 pr-10 py-3 bg-white/80 border border-gray-200 rounded-xl 
                         outline-none transition-all duration-300 text-gray-700 appearance-none
                         focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:bg-white
                         hover:border-gray-300 hover:shadow-md cursor-pointer"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s === "All" ? "All Statuses" : s}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-3.5 text-gray-400 pointer-events-none group-focus-within:text-blue-500 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="sm:ml-4">
            <button
              onClick={onReset}
              className="w-full sm:w-auto group relative px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 
                       border border-gray-200 rounded-xl text-sm font-medium text-gray-700
                       hover:from-gray-100 hover:to-gray-200 hover:border-gray-300 hover:shadow-lg
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-gray-100"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="group-hover:rotate-180 transition-transform duration-300">
                  <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4 7.58 4 12S7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12S8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z"/>
                </svg>
                Reset Filters
              </span>
            </button>
          </div>
        </div>

        {/* Active filters indicator */}
        {(search || status !== "All") && (
          <div className="mt-4 pt-4 border-t border-gray-200/50">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600 font-medium">Active filters:</span>
              {search && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  Search: "{search}"
                  <button
                    onClick={() => onSearch("")}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
                    </svg>
                  </button>
                </span>
              )}
              {status !== "All" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                  Status: {status}
                  <button
                    onClick={() => onStatus("All")}
                    className="ml-1 hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
                    </svg>
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
