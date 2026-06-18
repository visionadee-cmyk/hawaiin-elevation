import React from 'react'

export default function BoardMembers() {
  return (
    <main className="max-w-7xl mx-auto p-6 lg:p-8">
      <h1 className="text-3xl font-semibold mb-6">Board Members</h1>

      <div className="overflow-x-auto mb-8 bg-white border border-gray-100 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Adam Gasim</td>
              <td className="px-6 py-4 whitespace-nowrap">Director of Administration</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Aboobakuru Gasim</td>
              <td className="px-6 py-4 whitespace-nowrap">Managing Director</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Abdul Rahman Gasim</td>
              <td className="px-6 py-4 whitespace-nowrap">Director of Technology</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Faiz Gasim</td>
              <td className="px-6 py-4 whitespace-nowrap">Director of Commercial & Tendering</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Ibrahim Gasim</td>
              <td className="px-6 py-4 whitespace-nowrap">Director of Projects & Maintenance</td>
            </tr>
          </tbody>
        </table>
      </div>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Responsibilities</h2>

        <h3 className="text-lg font-medium mt-4">Managing Director</h3>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Overall company leadership</li>
          <li>Approving tenders and contracts</li>
          <li>Client relationships</li>
          <li>Strategic decisions</li>
        </ul>

        <h3 className="text-lg font-medium mt-4">Director – Administration & Human Resources</h3>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Office administration</li>
          <li>Staff management</li>
          <li>Documentation</li>
          <li>Licensing and compliance</li>
        </ul>

        <h3 className="text-lg font-medium mt-4">Director – Software Development & Digital Solutions</h3>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Software development</li>
          <li>Data entry systems</li>
          <li>Website and mobile apps</li>
          <li>IT infrastructure</li>
        </ul>

        <h3 className="text-lg font-medium mt-4">Director – Estimation, Costing & Tendering</h3>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Price comparisons</li>
          <li>BOQ preparation</li>
          <li>Supplier quotations</li>
          <li>Tender submissions</li>
        </ul>

        <h3 className="text-lg font-medium mt-4">Director – Projects, Maintenance & Quality Control</h3>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Site inspections</li>
          <li>Project supervision</li>
          <li>Maintenance operations</li>
          <li>Quality and safety checks</li>
        </ul>
      </section>
    </main>
  )
}
