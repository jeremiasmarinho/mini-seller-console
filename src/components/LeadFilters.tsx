import type { Lead, LeadStatus } from "../types/domain";

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
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">
          Search (name/company)
        </label>
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Type a name or company..."
          className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-full sm:w-56">
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => onStatus(e.target.value as any)}
          className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:ml-auto">
        <button
          onClick={onReset}
          className="w-full sm:w-auto rounded bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200 border"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
