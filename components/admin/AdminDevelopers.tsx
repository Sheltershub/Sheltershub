
import React from 'react';
import AdminLayout from './AdminLayout';

interface AdminDevelopersProps {
  onNavigate: (page: string) => void;
  userRole?: string;
}

const AdminDevelopers: React.FC<AdminDevelopersProps> = ({ onNavigate, userRole = 'admin' }) => {
  return (
    <AdminLayout onNavigate={onNavigate} activePage="admin-developers" title="Manage Developers" userRole={userRole}>
       <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-bold text-gray-700">Developer Portfolios</h2>
            <button className="px-4 py-2 bg-[#0A2B4C] text-white rounded-lg hover:bg-[#08223c] font-medium text-sm">Onboard Developer</button>
        </div>
        <div className="p-8 text-center text-gray-500">
            <p>Developer management table placeholder.</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDevelopers;
