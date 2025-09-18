import type { Opportunity } from "../../../types";

type Props = { opportunities: Opportunity[] };

export default function OpportunitiesTable({ opportunities }: Props) {
  if (opportunities.length === 0) {
    return <div className="p-4 text-gray-500">No opportunities yet.</div>;
  }
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-3">Opportunities</h2>
      <div className="overflow-x-auto rounded border border-gray-200 bg-white shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-sm text-gray-700">
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Account</th>
              <th className="p-3 border-b">Stage</th>
              <th className="p-3 border-b">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {opportunities.map((opp) => (
              <tr key={opp.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{opp.name}</td>
                <td className="p-3 border-b">{opp.accountName}</td>
                <td className="p-3 border-b">{opp.stage}</td>
                <td className="p-3 border-b">
                  {opp.amount ? `$${opp.amount.toLocaleString()}` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
