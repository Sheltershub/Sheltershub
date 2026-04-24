
import React from 'react';
import AdminLayout from './AdminLayout';

interface AdminReportsProps {
  onNavigate: (page: string) => void;
  userRole: string;
}

const AdminReports: React.FC<AdminReportsProps> = ({ onNavigate, userRole }) => {
  return (
    <AdminLayout onNavigate={onNavigate} activePage="admin-reports" title="Reports & Analytics" userRole={userRole}>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-64 flex flex-col justify-center items-center text-gray-400">
               <span className="mb-2">User Growth Chart</span>
               <div className="w-full h-32 bg-gray-100 rounded"></div>
           </div>
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-64 flex flex-col justify-center items-center text-gray-400">
               <span className="mb-2">Revenue Breakdown</span>
               <div className="w-32 h-32 rounded-full bg-gray-100"></div>
           </div>
       </div>
    </AdminLayout>
  );
};

export default AdminReports;
