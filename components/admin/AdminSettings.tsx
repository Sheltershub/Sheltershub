
import React from 'react';
import AdminLayout from './AdminLayout';

interface AdminSettingsProps {
  onNavigate: (page: string) => void;
  userRole?: string;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ onNavigate, userRole = 'admin' }) => {
  return (
    <AdminLayout onNavigate={onNavigate} activePage="admin-settings" title="Site Settings" userRole={userRole}>
       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-3xl">
          <form className="space-y-6">
              <div>
                  <h3 className="text-lg font-bold text-[#0A2B4C] mb-4">General Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                          <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" defaultValue="Sheltershub" />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                          <input type="email" className="w-full border border-gray-300 rounded px-3 py-2" defaultValue="admin@sheltershub.com" />
                      </div>
                  </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-[#0A2B4C] mb-4">Security</h3>
                  <div className="flex items-center gap-3">
                       <input type="checkbox" id="2fa" className="h-4 w-4 text-[#0A2B4C]" defaultChecked />
                       <label htmlFor="2fa" className="text-sm text-gray-700">Enable Two-Factor Authentication for Admins</label>
                  </div>
              </div>

              <div className="pt-4">
                  <button type="submit" className="px-6 py-2 bg-[#F9A826] text-white font-bold rounded hover:bg-[#d88d15]">Save Changes</button>
              </div>
          </form>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
