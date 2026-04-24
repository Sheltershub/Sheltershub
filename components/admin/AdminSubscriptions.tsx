
import React from 'react';
import AdminLayout from './AdminLayout';

interface AdminSubscriptionsProps {
  onNavigate: (page: string) => void;
  userRole?: string;
}

const AdminSubscriptions: React.FC<AdminSubscriptionsProps> = ({ onNavigate, userRole = 'admin' }) => {
  return (
    <AdminLayout onNavigate={onNavigate} activePage="admin-subscriptions" title="Subscriptions & Payments" userRole={userRole}>
       <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-bold text-gray-700">Transaction History</h2>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm">Download Report</button>
        </div>
        <div className="p-8 text-center text-gray-500">
            <p>Payment and subscription management table placeholder.</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSubscriptions;
