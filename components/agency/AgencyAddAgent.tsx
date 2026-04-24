
import React from 'react';
import AgencyLayout from './AgencyLayout';

interface AgencyAddAgentProps {
  onNavigate: (page: string) => void;
}

const AgencyAddAgent: React.FC<AgencyAddAgentProps> = ({ onNavigate }) => {
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert("Agent invitation sent!");
      onNavigate('agency-team');
  };

  return (
    <AgencyLayout onNavigate={onNavigate} activePage="agency-add-agent" title="Add New Agent">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-[#0A2B4C] mb-6">Onboard New Agent</h2>
            <p className="text-gray-500 mb-8">
                Invite a new agent to your agency. They will receive an email to complete their profile and verification.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                        <input type="text" required placeholder="e.g. John" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                        <input type="text" required placeholder="e.g. Doe" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                        <input type="email" required placeholder="agent@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input type="tel" placeholder="+233" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                        <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]">
                            <option value="Agent">Agent</option>
                            <option value="Senior Agent">Senior Agent</option>
                            <option value="Admin">Agency Admin</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Assign Properties (Optional)</label>
                        <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]">
                            <option>Select Properties to Assign</option>
                            <option>The Royal Gardens</option>
                            <option>Atlantic View</option>
                        </select>
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-4 border-t border-gray-100 mt-6">
                    <button type="button" onClick={() => onNavigate('agency-team')} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15]">Send Invitation</button>
                </div>
            </form>
        </div>
    </AgencyLayout>
  );
};

export default AgencyAddAgent;
