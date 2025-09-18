import type { Opportunity } from "../../../types";

type Props = { opportunities: Opportunity[] };

const getStageColor = (stage: string) => {
  const colors = {
    'New': 'bg-blue-100 text-blue-800 border-blue-200',
    'Negotiation': 'bg-orange-100 text-orange-800 border-orange-200',
    'Won': 'bg-green-100 text-green-800 border-green-200',
    'Lost': 'bg-red-100 text-red-800 border-red-200',
  };
  return colors[stage as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const getStageIcon = (stage: string) => {
  const icons = {
    'New': '🆕',
    'Negotiation': '🤝',
    'Won': '🎉',
    'Lost': '❌',
  };
  return icons[stage as keyof typeof icons] || '📊';
};

export default function OpportunitiesTable({ opportunities }: Props) {
  if (opportunities.length === 0) {
    return (
      <div className="mt-8">
        <div className="relative bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg shadow-blue-500/5">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl">💼</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Opportunities Yet</h3>
            <p className="text-gray-500">Start creating opportunities to track your sales pipeline</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* Header with gradient */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm">💼</span>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:bg-none dark:text-purple-300">
          Sales Opportunities
        </h2>
        <div className="ml-auto px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
          {opportunities.length} total
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block relative bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg shadow-purple-500/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <span>💰</span> Opportunity
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <span>🏢</span> Account
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <span>📊</span> Stage
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <span>💵</span> Amount
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50">
              {opportunities.map((opp, index) => (
                <tr 
                  key={opp.id} 
                  className="group hover:bg-gradient-to-r hover:from-purple-25 hover:to-pink-25 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <td className="px-6 py-4 group-hover:translate-x-1 transition-transform duration-300">
                    <div className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors">
                      {opp.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-xs font-semibold text-gray-600">
                        {opp.accountName.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-700 font-medium">{opp.accountName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStageColor(opp.stage)}`}>
                      <span>{getStageIcon(opp.stage)}</span>
                      {opp.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {opp.amount ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-600">
                          ${opp.amount.toLocaleString()}
                        </span>
                        <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Not specified</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {opportunities.map((opp, index) => (
          <div 
            key={opp.id}
            className="relative bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{opp.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-6 h-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-xs font-semibold">
                    {opp.accountName.charAt(0).toUpperCase()}
                  </div>
                  {opp.accountName}
                </div>
              </div>
              {opp.amount && (
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    ${opp.amount.toLocaleString()}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStageColor(opp.stage)}`}>
                <span>{getStageIcon(opp.stage)}</span>
                {opp.stage}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-lg">💰</span>
            </div>
            <div>
              <p className="text-sm text-green-600 font-medium">Total Pipeline</p>
              <p className="text-xl font-bold text-green-700">
                ${opportunities.reduce((sum, opp) => sum + (opp.amount || 0), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-lg">📊</span>
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Active Opps</p>
              <p className="text-xl font-bold text-blue-700">
                {opportunities.filter(opp => opp.stage !== 'Won' && opp.stage !== 'Lost').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-lg">🎯</span>
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">Win Rate</p>
              <p className="text-xl font-bold text-purple-700">
                {opportunities.length > 0 
                  ? Math.round((opportunities.filter(opp => opp.stage === 'Won').length / opportunities.length) * 100)
                  : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
