
import React from 'react';
import AdminLayout from './AdminLayout';

interface AdminAgentsProps {
  onNavigate: (page: string) => void;
  userRole?: string;
}

const AdminAgents: React.FC<AdminAgentsProps> = ({ onNavigate, userRole = 'admin' }) => {
  const agents = [
    { id: 1, name: 'Sarah Jenkins', email: 'sarah@example.com', agency: 'Prime Real Estate', listings: 12, sales: 45, status: 'Active' },
    { id: 2, name: 'Michael Ofori', email: 'michael@example.com', agency: 'Prime Real Estate', listings: 8, sales: 22, status: 'Active' },
    { id: 3, name: 'Jessica Boateng', email: 'jess@example.com', agency: 'Urban Spaces', listings: 15, sales: 60, status: 'On Leave' },
  ];

  return (
    <AdminLayout onNavigate={onNavigate} activePage="admin-agents" title="Manage Agents" userRole={userRole}>
       <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-bold text-gray-700">Agent Directory</h2>
            <button className="px-4 py-2 bg-[#0A2B4C] text-white rounded-lg hover:bg-[#08223c] font-medium text-sm">Add New Agent</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-3">Agent Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Agency</th>
                        <th className="px-6 py-3">Listings</th>
                        <th className="px-6 py-3">Total Sales</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {agents.map(agent => (
                        <tr key={agent.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{agent.name}</td>
                            <td className="px-6 py-4">{agent.email}</td>
                            <td className="px-6 py-4">{agent.agency}</td>
                            <td className="px-6 py-4">{agent.listings}</td>
                            <td className="px-6 py-4">{agent.sales}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${agent.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{agent.status}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-gray-400 hover:text-[#0A2B4C]">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAgents;
