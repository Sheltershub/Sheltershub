
import React from 'react';
import AgencyLayout from './AgencyLayout';

interface AgencyDashboardProps {
  onNavigate: (page: string) => void;
}

const KPICard: React.FC<{ title: string; value: string; subtext: string; color: string; icon: React.ReactNode }> = ({ title, value, subtext, color, icon }) => (
    <div className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${color} border-gray-200 border-t border-r border-b`}>
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                {icon}
            </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">{subtext}</p>
    </div>
);

const AgencyDashboard: React.FC<AgencyDashboardProps> = ({ onNavigate }) => {
  return (
    <AgencyLayout onNavigate={onNavigate} activePage="agency-dashboard" title="Agency Dashboard">
       
       {/* KPI Section */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
           <KPICard 
                title="Total Agents" 
                value="12" 
                subtext="2 new this month" 
                color="border-blue-500" 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
           />
           <KPICard 
                title="Active Listings" 
                value="36" 
                subtext="+5 from last week" 
                color="border-green-500" 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
           />
           <KPICard 
                title="Total Leads" 
                value="458" 
                subtext="Across all agents" 
                color="border-[#F9A826]" 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
           />
           <KPICard 
                title="Revenue (YTD)" 
                value="$125k" 
                subtext="+12% annual growth" 
                color="border-purple-500" 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
           />
       </div>

       {/* Recent Activity & Top Agents */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <div className="bg-white rounded-xl shadow-sm border border-gray-200">
               <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                   <h3 className="font-bold text-[#0A2B4C]">Recent Activities</h3>
                   <button className="text-sm text-[#F9A826] font-medium hover:underline">View All</button>
               </div>
               <div className="divide-y divide-gray-100">
                   {[1, 2, 3, 4].map((item) => (
                       <div key={item} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                           <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                           </div>
                           <div className="flex-1">
                               <p className="text-sm font-medium text-gray-900">Sarah Jenkins added a new property</p>
                               <p className="text-xs text-gray-500">Luxury Villa in East Legon</p>
                           </div>
                           <span className="text-xs text-gray-400">2h ago</span>
                       </div>
                   ))}
               </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-gray-200">
               <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                   <h3 className="font-bold text-[#0A2B4C]">Top Performing Agents</h3>
                   <button 
                        onClick={() => onNavigate('agency-team')}
                        className="text-sm text-[#F9A826] font-medium hover:underline"
                   >
                       Manage Team
                   </button>
               </div>
               <div className="divide-y divide-gray-100">
                   {[
                       { name: "Sarah Jenkins", sales: 12, leads: 45, image: "https://randomuser.me/api/portraits/women/44.jpg" },
                       { name: "Michael Ofori", sales: 8, leads: 32, image: "https://randomuser.me/api/portraits/men/32.jpg" },
                       { name: "Jessica Boateng", sales: 6, leads: 28, image: "https://randomuser.me/api/portraits/women/68.jpg" },
                   ].map((agent, i) => (
                       <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                           <div className="flex items-center gap-3">
                               <img src={agent.image} alt={agent.name} className="w-10 h-10 rounded-full object-cover" />
                               <div>
                                   <p className="text-sm font-bold text-[#0A2B4C]">{agent.name}</p>
                                   <p className="text-xs text-gray-500">{agent.sales} Sales Closed</p>
                               </div>
                           </div>
                           <div className="text-right">
                               <span className="block font-bold text-green-600 text-sm">{agent.leads}</span>
                               <span className="text-xs text-gray-400">Leads</span>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
       </div>

    </AgencyLayout>
  );
};

export default AgencyDashboard;
    