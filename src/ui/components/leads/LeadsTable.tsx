import type { Lead } from "../../../types";

type Props = {
  rows: Lead[];
  onRowClick?: (lead: Lead) => void;
};

export default function LeadsTable({ rows, onRowClick }: Props) {
  // Enhanced status chip with better design
  const statusChip = (s: Lead["status"]) => {
    const statusConfig = {
      New: {
        bg: "bg-blue-100/80 text-blue-700",
        icon: "🆕",
        ring: "ring-blue-500/30",
      },
      Contacted: {
        bg: "bg-amber-100/80 text-amber-700",
        icon: "📞",
        ring: "ring-amber-500/30",
      },
      Qualified: {
        bg: "bg-emerald-100/80 text-emerald-700",
        icon: "✅",
        ring: "ring-emerald-500/30",
      },
      Unqualified: {
        bg: "bg-red-100/80 text-red-700",
        icon: "❌",
        ring: "ring-red-500/30",
      },
    };

    const config = statusConfig[s];

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${config.bg} ${config.ring} ring-1 backdrop-blur-sm transition-all duration-200 hover:scale-105`}
      >
        <span className="text-sm">{config.icon}</span>
        {s}
      </span>
    );
  };

  // Empty state
  if (rows.length === 0) {
    return (
      <div className="bg-white/60 border border-slate-200 rounded-2xl p-12 text-center shadow-lg backdrop-blur-sm">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full mb-6">
          <svg
            className="w-10 h-10 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-700 mb-3">
          No leads found
        </h3>
        <p className="text-slate-500 max-w-md mx-auto">
          Try adjusting your search criteria or filters to find the leads you're
          looking for.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile: Enhanced cards */}
      <div className="sm:hidden space-y-4">
        {rows.map((l, index) => (
          <div
            key={l.id}
            className="group bg-white/60 border border-slate-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/80 cursor-pointer backdrop-blur-sm"
            onClick={() => onRowClick?.(l)}
            style={{
              animationDelay: `${index * 100}ms`,
              animation: "fadeInUp 0.6s ease-out forwards",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {l.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors text-lg">
                      {l.name}
                    </h3>
                    <p className="text-slate-600 font-medium">{l.company}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-slate-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">{l.email}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {statusChip(l.status)}
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-full font-medium">
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
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                        {l.source}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full">
                      <svg
                        className="w-4 h-4 text-amber-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-lg font-bold text-amber-700">
                        {l.score}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Enhanced table */}
      <div className="hidden sm:block bg-white/60 border border-slate-200 rounded-2xl shadow-lg backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Leads table">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50/50 to-slate-100/50 border-b border-slate-200">
                <th scope="col" className="px-6 py-4 text-left">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    Contact
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    Company
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    Email
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-purple-600"
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
                    Source
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-amber-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    Score
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-pink-600"
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
                    Status
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50">
              {rows.map((l, index) => (
                <tr
                  key={l.id}
                  className={`group transition-all duration-300 hover:bg-white/80 ${
                    onRowClick ? "cursor-pointer" : ""
                  } border-l-4 border-transparent hover:border-l-indigo-500`}
                  onClick={() => onRowClick?.(l)}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-200">
                          {l.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors text-lg">
                          {l.name}
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                          Lead Profile
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-semibold text-slate-700 text-base">
                      {l.company}
                    </div>
                    <div className="text-sm text-slate-500">Organization</div>
                  </td>
                  <td className="px-6 py-5">
                    <a
                      href={`mailto:${l.email}`}
                      className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors group/email font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover/email:bg-indigo-100 transition-colors">
                        <svg
                          className="w-4 h-4 text-slate-500 group-hover/email:text-indigo-600 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <span className="group-hover/email:underline">
                        {l.email}
                      </span>
                    </a>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-2 text-sm text-slate-600 bg-slate-100/80 px-3 py-2 rounded-xl font-medium">
                      <svg
                        className="w-4 h-4 text-slate-500"
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
                      {l.source}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="inline-flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl">
                      <svg
                        className="w-5 h-5 text-amber-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-xl font-bold text-amber-700">
                        {l.score}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">{statusChip(l.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
