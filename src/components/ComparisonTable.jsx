import React from 'react';

export default function ComparisonTable({ dataAosDelay = '700' }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={dataAosDelay}
      className="overflow-x-auto py-8"
    >
      <div className="bg-white rounded-lg shadow-md">
        <table className="w-full table-auto text-left border-collapse">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-sm font-bold text-blue-800 uppercase tracking-wider">
                Metric
              </th>
              <th className="px-6 py-3 text-sm font-bold text-blue-800 uppercase tracking-wider">
                Medway
              </th>
              <th className="px-6 py-3 text-sm font-bold text-blue-800 uppercase tracking-wider">
                Thurrock
              </th>
              <th className="px-6 py-3 text-sm font-bold text-blue-800 uppercase tracking-wider">
                Dartford
              </th>
              <th className="px-6 py-3 text-sm font-bold text-blue-800 uppercase tracking-wider">
                Gravesham
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">

            {/* House Price YoY */}
            <tr className="hover:bg-blue-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap font-semibold">
                House Price (YoY %)
              </td>
              <td className="px-6 py-4 whitespace-nowrap">+2.5%</td>
              <td className="px-6 py-4 whitespace-nowrap">+2.6%</td>
              <td className="px-6 py-4 whitespace-nowrap">+3.0%</td>
              <td className="px-6 py-4 whitespace-nowrap">+4.4%</td>
            </tr>

            {/* Rent YoY */}
            <tr className="hover:bg-blue-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap font-semibold">
                Rent (YoY %)
              </td>
              <td className="px-6 py-4 whitespace-nowrap">+13.1%</td>
              <td className="px-6 py-4 whitespace-nowrap">+7.8%</td>
              <td className="px-6 py-4 whitespace-nowrap">+11.2%</td>
              <td className="px-6 py-4 whitespace-nowrap">+9.1%</td>
            </tr>

            {/* Annual Season Ticket */}
            <tr className="hover:bg-blue-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap font-semibold">
                Annual Season Ticket (£)
              </td>
              <td className="px-6 py-4 whitespace-nowrap">£6,784 <br/><small>(Gillingham)</small></td>
              <td className="px-6 py-4 whitespace-nowrap">£3,724 <br/><small>(East Tilbury)</small></td>
              <td className="px-6 py-4 whitespace-nowrap">£6,124 <br/><small>(Dartford)</small></td>
              <td className="px-6 py-4 whitespace-nowrap">£6,124 <br/><small>(Gravesend)</small></td>
            </tr>

            {/* Council Tax (Band D) */}
            <tr className="hover:bg-blue-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap font-semibold">
                Council Tax Band D (£, 2023/24)
              </td>
              <td className="px-6 py-4 whitespace-nowrap">£2,008.56</td>
              <td className="px-6 py-4 whitespace-nowrap">£1,898.91</td>
              <td className="px-6 py-4 whitespace-nowrap">£2,077.98</td>
              <td className="px-6 py-4 whitespace-nowrap">£2,103.76</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}
