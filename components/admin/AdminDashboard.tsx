
import React from 'react';
import AdminLayout from './AdminLayout';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  userRole: string;
}

const KPICard: React.FC<{ title: string; value: string; trend: string; isPositive: boolean; icon: React.ReactNode }> = ({ title, value, trend, isPositive, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-[#0A2B4C]">{value}</h3>
            </div>
            <div className={`p-3 rounded-lg ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {icon}
            </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
            <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '+' : ''}{trend}
            </span>
            <span className="text-gray-400 ml-2">vs last month</span>
        </div>
    </div>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, userRole }) => {
  const isAdmin = userRole === 'admin';

  return (
    <AdminLayout onNavigate={onNavigate} activePage="admin-dashboard" title="Dashboard Overview" userRole={userRole}>
      
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard 
            title="Total Properties" 
            value="12,845" 
            trend="12.5%" 
            isPositive={true} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
        />
        
        {/* Only Admins see Revenue */}
        {isAdmin && (
            <KPICard 
                title="Total Revenue" 
                value="$48,250" 
                trend="8.2%" 
                isPositive={true} 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
        )}

        {/* Only Admins see New Users */}
        {isAdmin && (
            <KPICard 
                title="New Users" 
                value="3,200" 
                trend="-2.4%" 
                isPositive={false} 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
            />
        )}

        <KPICard 
            title="Active Agents" 
            value="845" 
            trend="5.1%" 
            isPositive={true} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
        />
      </div>

      {/* Charts Section Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
         {isAdmin && (
             <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-[#0A2B4C] mb-4">Revenue Analytics</h3>
                <div className="h-64 flex items-end justify-between gap-2 px-2">
                    {[40, 60, 45, 70, 85, 65, 90, 80, 95, 100, 85, 95].map((h, i) => (
                        <div key={i} className="w-full bg-blue-100 hover:bg-[#F9A826] transition-colors rounded-t" style={{ height: `${h}%` }}></div>
                    ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                </div>
             </div>
         )}
         
         {/* Editors see full width traffic stats or different layout */}
         <div className={`${isAdmin ? '' : 'lg:col-span-3'} bg-white p-6 rounded-xl shadow-sm border border-gray-200`}>
             <h3 className="font-bold text-[#0A2B4C] mb-4">Traffic Sources</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Organic Search</span>
                    <span className="font-bold">45%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-[#0A2B4C] h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Social Media</span>
                    <span className="font-bold">25%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-[#F9A826] h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Direct</span>
                    <span className="font-bold">20%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Referral</span>
                    <span className="font-bold">10%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
             </div>
         </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-[#0A2B4C]">Recent Activities</h3>
              <button className="text-sm text-[#F9A826] font-medium hover:underline">View All</button>
          </div>
          <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
                  <tr>
                      <th className="px-6 py-3">Action</th>
                      <th className="px-6 py-3">User</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Status</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">New Property Listing</td>
                      <td className="px-6 py-4">Sarah Jenkins</td>
                      <td className="px-6 py-4">2 mins ago</td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span></td>
                  </tr>
                  {isAdmin && (
                      <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">User Registration</td>
                          <td className="px-6 py-4">John Doe</td>
                          <td className="px-6 py-4">15 mins ago</td>
                          <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
                      </tr>
                  )}
                  {isAdmin && (
                      <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">Subscription Renewal</td>
                          <td className="px-6 py-4">Prime Real Estate</td>
                          <td className="px-6 py-4">1 hour ago</td>
                          <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
                      </tr>
                  )}
                  <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Blog Post Update</td>
                      <td className="px-6 py-4">Editor User</td>
                      <td className="px-6 py-4">3 hours ago</td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Published</span></td>
                  </tr>
              </tbody>
          </table>
      </div>

    </AdminLayout>
  );
};

export default AdminDashboard;
