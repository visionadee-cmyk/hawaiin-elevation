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
  const responsibilities = [
    {
      title: 'Managing Director',
      items: [
        'Overall company leadership',
        'Approving tenders and contracts',
        'Client relationships',
        'Strategic decisions'
      ]
    },
    {
      title: 'Director – Administration & Human Resources',
      items: [
        'Office administration',
        'Staff management',
        'Documentation',
        'Licensing and compliance'
      ]
    },
    {
      title: 'Director – Software Development & Digital Solutions',
      items: [
        'Software development',
        'Data entry systems',
        'Website and mobile apps',
        'IT infrastructure'
      ]
    },
    {
      title: 'Director – Estimation, Costing & Tendering',
      items: [
        'Price comparisons',
        'BOQ preparation',
        'Supplier quotations',
        'Tender submissions'
      ]
    },
    {
      title: 'Director – Projects, Maintenance & Quality Control',
      items: [
        'Site inspections',
        'Project supervision',
        'Maintenance operations',
        'Quality and safety checks'
      ]
    }
  ];

  return (
    <main className="max-w-7xl mx-auto p-6 lg:p-8">
      <h1 className="text-3xl font-semibold mb-6">Management</h1>

      <h2 className="text-2xl font-semibold mb-4">Board of Directors</h2>

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
        <h2 className="text-2xl font-semibold mb-6">Responsibilities</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {responsibilities.map((r) => (
            <div key={r.title} className="bg-white p-6 rounded-lg shadow-md border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold">{r.title.split(' ')[0].slice(0,2)}</div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{r.title}</h3>
                  <ul className="list-disc list-inside mt-2 text-sm text-gray-700 space-y-1">
                    {r.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
