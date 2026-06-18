import React from 'react'

const members = [
  { name: 'Adam Gasim', role: 'Director of Administration' },
  { name: 'Aboobakuru Gasim', role: 'Managing Director' },
  { name: 'Abdul Rahman Gasim', role: 'Director of Technology' },
  { name: 'Faiz Gasim', role: 'Director of Commercial & Tendering' },
  { name: 'Ibrahim Gasim', role: 'Director of Projects & Maintenance' },
];

function Avatar({ name }) {
  const initials = name.split(' ').map(n => n[0]).slice(0,2).join('');
  return (
    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-300 flex items-center justify-center text-white text-lg font-semibold">
      {initials}
    </div>
  );
}

export default function BoardMembers() {
  return (
    <main className="max-w-7xl mx-auto p-6 lg:p-8">
      <h1 className="text-3xl font-semibold mb-2">Management</h1>
      <p className="text-sm text-gray-500 mb-6">Executive Leadership Team</p>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {/* Placeholder executive tiles - reuse first two members as exec examples */}
        {members.slice(0,4).map((m) => (
          <div key={m.name} className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-sm">
            <Avatar name={m.name} />
            <h3 className="mt-3 font-semibold">{m.name}</h3>
            <p className="text-sm text-gray-500">{m.role}</p>
          </div>
        ))}
      </section>

      <h2 className="text-2xl font-semibold mb-3">Board of Directors</h2>
      <p className="text-sm text-gray-500 mb-6">Leadership and governance</p>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
        {members.map((m) => (
          <div key={m.name} className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-sm">
            <Avatar name={m.name} />
            <h3 className="mt-3 font-semibold">{m.name}</h3>
            <p className="text-sm text-gray-500">{m.role}</p>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Responsibilities</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mt-2">Managing Director</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-700">
              <li>Overall company leadership</li>
              <li>Approving tenders and contracts</li>
              <li>Client relationships</li>
              <li>Strategic decisions</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mt-2">Director – Administration & Human Resources</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-700">
              <li>Office administration</li>
              <li>Staff management</li>
              <li>Documentation</li>
              <li>Licensing and compliance</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mt-2">Director – Software Development & Digital Solutions</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-700">
              <li>Software development</li>
              <li>Data entry systems</li>
              <li>Website and mobile apps</li>
              <li>IT infrastructure</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mt-2">Director – Estimation, Costing & Tendering</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-700">
              <li>Price comparisons</li>
              <li>BOQ preparation</li>
              <li>Supplier quotations</li>
              <li>Tender submissions</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mt-2">Director – Projects, Maintenance & Quality Control</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-700">
              <li>Site inspections</li>
              <li>Project supervision</li>
              <li>Maintenance operations</li>
              <li>Quality and safety checks</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
