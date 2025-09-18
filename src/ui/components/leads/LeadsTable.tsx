import type { Lead } from "../../../types";

type Props = {
  rows: Lead[];
  onRowClick?: (lead: Lead) => void;
};

export default function LeadsTable({ rows, onRowClick }: Props) {
  // helpers "privados" (não exportados)
  const statusChip = (s: Lead["status"]) => {
    const base =
      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium";
    const map: Record<Lead["status"], string> = {
      New: "bg-blue-100 text-blue-700",
      Contacted: "bg-amber-100 text-amber-700",
      Qualified: "bg-emerald-100 text-emerald-700",
      Unqualified: "bg-gray-200 text-gray-700",
    };
    return <span className={`${base} ${map[s]}`}>{s}</span>;
  };

  // --- Mobile (cards) ---
  if (rows.length === 0) {
    return (
      <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center shadow-lg">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">No results found</h3>
        <p className="text-slate-500">Try adjusting your search criteria or clearing filters</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile: cards */}
      <div className="sm:hidden space-y-4">
        {rows.map((l, index) => (
          <div
            key={l.id}
            className="group bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/80 cursor-pointer transform"
            onClick={() => onRowClick?.(l)}
            style={{
              animationDelay: `${index * 50}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards'
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {l.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{l.name}</div>
                    <div className="text-sm text-slate-500">{l.company}</div>
                  </div>
                </div>
                <div className="text-sm text-slate-600 mb-3 flex items-center gap-1">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {l.email}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {statusChip(l.status)}
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{l.source}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-lg font-bold text-slate-700">{l.score}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: tabela */}
      <div className="hidden overflow-x-auto bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg sm:block">
        <table className="min-w-full" aria-label="Leads table">
          <thead>
            <tr className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
              <th scope="col" className="p-4 text-left text-sm font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Contact
                </div>
              </th>
              <th scope="col" className="p-4 text-left text-sm font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Company
                </div>
              </th>
              <th scope="col" className="p-4 text-left text-sm font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </div>
              </th>
              <th scope="col" className="p-4 text-left text-sm font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Source
                </div>
              </th>
              <th scope="col" className="p-4 text-right text-sm font-semibold text-slate-700">
                <div className="flex items-center justify-end gap-2">
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Score
                </div>
              </th>
              <th scope="col" className="p-4 text-left text-sm font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Status
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((l, index) => (
              <tr
                key={l.id}
                className={`group transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 ${
                  onRowClick ? "cursor-pointer" : ""
                }`}
                onClick={() => onRowClick?.(l)}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                      {l.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{l.name}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-slate-700">{l.company}</div>
                </td>
                <td className="p-4">
                  <a
                    href={`mailto:${l.email}`}
                    className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors group/email"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4 text-slate-400 group-hover/email:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="group-hover/email:underline">{l.email}</span>
                  </a>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {l.source}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-lg font-bold text-slate-700">{l.score}</span>
                  </div>
                </td>
                <td className="p-4">{statusChip(l.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
