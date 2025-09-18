import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  colorScheme: "blue" | "emerald" | "purple" | "amber";
}

const colorSchemes = {
  blue: {
    background: "bg-blue-100",
    text: "text-blue-600",
    value: "text-slate-800",
  },
  emerald: {
    background: "bg-emerald-100",
    text: "text-emerald-600",
    value: "text-emerald-600",
  },
  purple: {
    background: "bg-purple-100",
    text: "text-purple-600",
    value: "text-purple-600",
  },
  amber: {
    background: "bg-amber-100",
    text: "text-amber-600",
    value: "text-amber-600",
  },
};

export function StatCard({ title, value, icon, colorScheme }: StatCardProps) {
  const colors = colorSchemes[colorScheme];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className={`text-2xl font-bold ${colors.value}`}>{value}</p>
        </div>
        <div
          className={`w-12 h-12 ${colors.background} rounded-xl flex items-center justify-center`}
        >
          <div className={colors.text}>{icon}</div>
        </div>
      </div>
    </div>
  );
}

interface StatisticsGridProps {
  total: number;
  qualified: number;
  opportunities: number;
  conversionRate: number;
}

export function StatisticsGrid({
  total,
  qualified,
  opportunities,
  conversionRate,
}: StatisticsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Leads"
        value={total}
        colorScheme="blue"
        icon={
          <svg
            className="w-6 h-6"
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
        }
      />

      <StatCard
        title="Qualified"
        value={qualified}
        colorScheme="emerald"
        icon={
          <svg
            className="w-6 h-6"
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
        }
      />

      <StatCard
        title="Opportunities"
        value={opportunities}
        colorScheme="purple"
        icon={
          <svg
            className="w-6 h-6"
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
        }
      />

      <StatCard
        title="Conversion Rate"
        value={`${conversionRate}%`}
        colorScheme="amber"
        icon={
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
        }
      />
    </div>
  );
}
