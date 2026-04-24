
import React from 'react';
import AgentLayout from './AgentLayout';

interface AgentSettingsProps {
  onNavigate: (page: string) => void;
}

const AgentSettings: React.FC<AgentSettingsProps> = ({ onNavigate }) => {
  return (
    <AgentLayout onNavigate={onNavigate} activePage="agent-settings" title="Profile Settings">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-3xl">
            <h3 className="text-lg font-bold text-[#0A2B4C] mb-6 border-b pb-2">Personal Information</h3>
            
            <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden border border-gray-200">
                     <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded hover:bg-gray-50">Upload New Photo</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" defaultValue="Michael Ofori" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" defaultValue="michael@example.com" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" defaultValue="+233 24 000 0000" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                     <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                        <option>English</option>
                        <option>French</option>
                        <option>Twi</option>
                     </select>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea rows={3} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" defaultValue="Experienced real estate agent specializing in residential properties in Accra..."></textarea>
                </div>
            </div>

            <h3 className="text-lg font-bold text-[#0A2B4C] mb-6 border-b pb-2">Security</h3>
            
            <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div>
                        <p className="font-medium text-gray-700">Password</p>
                        <p className="text-xs text-gray-500">Last changed 3 months ago</p>
                    </div>
                    <button className="text-sm text-[#F9A826] hover:underline font-medium">Change Password</button>
                </div>
                <div className="flex items-center justify-between py-2">
                    <div>
                        <p className="font-medium text-gray-700">Two-Factor Authentication (2FA)</p>
                        <p className="text-xs text-gray-500">Secure your account with an extra code</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A2B4C]"></div>
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <button className="px-6 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                <button className="px-6 py-2 bg-[#F9A826] text-white font-bold rounded hover:bg-[#d88d15]">Save Profile</button>
            </div>
        </div>
    </AgentLayout>
  );
};

export default AgentSettings;
