
import React from 'react';
import DeveloperLayout from './DeveloperLayout';

interface DeveloperSettingsProps {
  onNavigate: (page: string) => void;
}

const DeveloperSettings: React.FC<DeveloperSettingsProps> = ({ onNavigate }) => {
  return (
    <DeveloperLayout onNavigate={onNavigate} activePage="developer-settings" title="Profile Settings">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-3xl">
            <h3 className="text-lg font-bold text-[#0A2B4C] mb-6 border-b pb-2">Personal Details</h3>
            
            <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                    {/* Placeholder Avatar */}
                    <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>
                <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded hover:bg-gray-50">Change Photo</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input type="text" defaultValue="Empire Builders" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                    <input type="email" defaultValue="contact@empirebuilders.com" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" defaultValue="+233 24 000 0000" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input type="url" defaultValue="https://www.empirebuilders.com" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                </div>
            </div>

            <h3 className="text-lg font-bold text-[#0A2B4C] mb-6 border-b pb-2">Security &amp; Preferences</h3>
            
            <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between py-2">
                    <div>
                        <p className="font-medium text-gray-700">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A2B4C]"></div>
                    </label>
                </div>
                <div className="flex items-center justify-between py-2">
                    <div>
                        <p className="font-medium text-gray-700">Email Notifications</p>
                        <p className="text-xs text-gray-500">Receive updates about new leads and messages</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A2B4C]"></div>
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <button className="px-6 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                <button className="px-6 py-2 bg-[#F9A826] text-white font-bold rounded hover:bg-[#d88d15]">Save Changes</button>
            </div>
        </div>
    </DeveloperLayout>
  );
};

export default DeveloperSettings;
