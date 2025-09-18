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
      <div className="rounded border border-gray-200 bg-white p-6 text-sm text-gray-600">
        No results. Try clearing filters.
      </div>
    );
  }

  return (
    <>
      {/* Mobile: cards */}
      <div className="sm:hidden space-y-3">
        {rows.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => onRowClick?.(l)}
            className="w-full rounded-lg border border-gray-200 bg-white p-4 text-left shadow hover:bg-gray-50"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold">{l.name}</div>
                <div className="text-sm text-gray-600">{l.company}</div>
              </div>
              <div className="text-sm font-semibold">{l.score}</div>
            </div>
            <div className="mt-2 text-sm text-gray-700">{l.email}</div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-500">Source: {l.source}</span>
              {statusChip(l.status)}
            </div>
          </button>
        ))}
      </div>

      {/* Desktop: tabela */}
      <div className="hidden overflow-x-auto rounded border border-gray-200 bg-white shadow sm:block">
        <table className="min-w-full" aria-label="Leads table">
          <thead>
            <tr className="bg-gray-50 text-left text-sm text-gray-700">
              <th scope="col" className="p-3 border-b">
                Name
              </th>
              <th scope="col" className="p-3 border-b">
                Company
              </th>
              <th scope="col" className="p-3 border-b">
                Email
              </th>
              <th scope="col" className="p-3 border-b">
                Source
              </th>
              <th scope="col" className="p-3 border-b">
                Score (desc)
              </th>
              <th scope="col" className="p-3 border-b">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rows.map((l) => (
              <tr
                key={l.id}
                className={`${
                  onRowClick ? "cursor-pointer hover:bg-gray-50" : ""
                }`}
                onClick={() => onRowClick?.(l)}
              >
                <td className="p-3 border-b">{l.name}</td>
                <td className="p-3 border-b">{l.company}</td>
                <td className="p-3 border-b">
                  <a
                    href={`mailto:${l.email}`}
                    className="text-blue-600 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {l.email}
                  </a>
                </td>
                <td className="p-3 border-b">{l.source}</td>
                <td className="p-3 border-b">{l.score}</td>
                <td className="p-3 border-b">{statusChip(l.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
