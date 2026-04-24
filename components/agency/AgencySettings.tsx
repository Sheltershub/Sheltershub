
import React from 'react';
import AgencyLayout from './AgencyLayout';

interface AgencySettingsProps {
  onNavigate: (page: string) => void;
}

const AgencySettings: React.FC<AgencySettingsProps> = ({ onNavigate }) => {
  return (
    <AgencyLayout onNavigate={onNavigate} activePage="agency-settings" title="Agency Settings">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-4xl">
            
            <div className="mb-8 border-b border-gray-200 pb-2">
                <nav className="flex gap-6">
                    <button className="text-[#0A2B4C] font-bold border-b-2 border-[#0A2B4C] pb-2">Profile &amp; Branding</button>
                    <button className="text-gray-500 hover:text-gray-800 pb-2">Security</button>
                    <button className="text-gray-500 hover:text-gray-800 pb-2">Notifications</button>
                </nav>
            </div>

            <form className="space-y-8">
                
                {/* Branding */}
                <div>
                    <h3 className="text-lg font-bold text-[#0A2B4C] mb-4">Agency Branding</h3>
                    <div className="flex items-center gap-6 mb-6">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center overflow-hidden">
                             <img src="https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg" alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <button type="button" className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded hover:bg-gray-50 mb-2">Upload New Logo</button>
                            <p className="text-xs text-gray-500">Recommended size: 500x500px</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Agency Name</label>
                            <input type="text" defaultValue="Prime Real Estate" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                            <input type="url" defaultValue="https://www.primerealestate.com" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-bold text-[#0A2B4C] mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Official Email</label>
                            <input type="email" defaultValue="info@primerealestate.com" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input type="tel" defaultValue="+233 30 200 0000" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
                            <input type="text" defaultValue="12 Independence Avenue, Accra" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                        </div>
                    </div>
                </div>

                {/* About */}
                <div>
                    <h3 className="text-lg font-bold text-[#0A2B4C] mb-4">About Agency</h3>
                    <textarea rows={4} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" defaultValue="Leading real estate agency in Accra..."></textarea>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                    <button type="button" className="px-6 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-[#F9A826] text-white font-bold rounded hover:bg-[#d88d15]">Save Changes</button>
                </div>
            </form>
        </div>
    </AgencyLayout>
  );
};

export default AgencySettings;
