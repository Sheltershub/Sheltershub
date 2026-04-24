
import React from 'react';
import AdminLayout from './AdminLayout';

interface AdminUsersProps {
  onNavigate: (page: string) => void;
  userRole?: string;
}

const AdminUsers: React.FC<AdminUsersProps> = ({ onNavigate, userRole = 'admin' }) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@gmail.com', role: 'Buyer', joined: '2023-01-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@yahoo.com', role: 'Seller', joined: '2023-02-20', status: 'Suspended' },
    { id: 3, name: 'Admin User', email: 'admin@sheltershub.com', role: 'Admin', joined: '2022-11-01', status: 'Active' },
  ];

  return (
    <AdminLayout onNavigate={onNavigate} activePage="admin-users" title="User Management" userRole={userRole}>
       <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
             <div className="relative w-full md:w-96">
                <input type="text" placeholder="Search users..." className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" />
                <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>
        </div>
        <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
                <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Joined</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {users.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">{user.role}</span></td>
                        <td className="px-6 py-4">{user.joined}</td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{user.status}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button className="text-blue-600 hover:underline text-xs mr-3">Edit</button>
                            <button className="text-red-600 hover:underline text-xs">Suspend</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
