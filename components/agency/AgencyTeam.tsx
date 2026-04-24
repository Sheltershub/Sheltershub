
import React from 'react';
import AgencyLayout from './AgencyLayout';

interface AgencyTeamProps {
  onNavigate: (page: string) => void;
}

const AgencyTeam: React.FC<AgencyTeamProps> = ({ onNavigate }) => {
  const agents = [
    { id: 1, name: "Sarah Jenkins", role: "Senior Agent", email: "sarah@prime.com", phone: "+233 24 000 0001", listings: 12, status: "Active", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 2, name: "Michael Ofori", role: "Agent", email: "michael@prime.com", phone: "+233 24 000 0002", listings: 8, status: "Active", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 3, name: "Jessica Boateng", role: "Agent", email: "jessica@prime.com", phone: "+233 24 000 0003", listings: 5, status: "On Leave", image: "https://randomuser.me/api/portraits/women/68.jpg" },
    { id: 4, name: "David Mensah", role: "Junior Agent", email: "david@prime.com", phone: "+233 24 000 0004", listings: 2, status: "Active", image: "https://randomuser.me/api/portraits/men/85.jpg" },
  ];

  return (
    <AgencyLayout onNavigate={onNavigate} activePage="agency-team" title="Agency Team Members">
       
       <div className="bg-white rounded-xl shadow-sm border border-gray-200">
           <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
               <div className="relative w-full sm:w-72">
                    <input type="text" placeholder="Search agents..." className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" />
                    <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
               </div>
               <button 
                    onClick={() => onNavigate('agency-add-agent')}
                    className="w-full sm:w-auto px-4 py-2 bg-[#F9A826] text-white rounded-lg hover:bg-[#d88d15] font-medium text-sm flex items-center justify-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    Add New Agent
               </button>
           </div>

           <div className="overflow-x-auto">
               <table className="w-full text-left text-sm text-gray-600">
                   <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
                       <tr>
                           <th className="px-6 py-3">Agent</th>
                           <th className="px-6 py-3">Role</th>
                           <th className="px-6 py-3">Contact</th>
                           <th className="px-6 py-3">Listings</th>
                           <th className="px-6 py-3">Status</th>
                           <th className="px-6 py-3 text-right">Actions</th>
                       </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                       {agents.map(agent => (
                           <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                               <td className="px-6 py-4">
                                   <div className="flex items-center gap-3">
                                       <img src={agent.image} alt={agent.name} className="w-10 h-10 rounded-full object-cover" />
                                       <div>
                                           <div className="font-bold text-[#0A2B4C]">{agent.name}</div>
                                           <div className="text-xs text-gray-400">ID: AG-{agent.id}00</div>
                                       </div>
                                   </div>
                               </td>
                               <td className="px-6 py-4">{agent.role}</td>
                               <td className="px-6 py-4">
                                   <div className="text-gray-900">{agent.email}</div>
                                   <div className="text-xs text-gray-400">{agent.phone}</div>
                               </td>
                               <td className="px-6 py-4">
                                   <span className="font-medium text-gray-900">{agent.listings}</span> properties
                               </td>
                               <td className="px-6 py-4">
                                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                       agent.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                   }`}>
                                       {agent.status}
                                   </span>
                               </td>
                               <td className="px-6 py-4 text-right">
                                   <div className="flex items-center justify-end gap-2">
                                       <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">Edit</button>
                                       <button className="text-red-600 hover:text-red-800 text-xs font-medium">Remove</button>
                                   </div>
                               </td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           </div>
       </div>

    </AgencyLayout>
  );
};

export default AgencyTeam;
