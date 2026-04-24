
import React from 'react';
import AgentLayout from './AgentLayout';

interface AgentPerformanceProps {
  onNavigate: (page: string) => void;
}

const KPICard: React.FC<{ title: string; value: string; subtext: string; color: string }> = ({ title, value, subtext, color }) => (
    <div className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${color} border-gray-200 border-t border-r border-b`}>
        <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        <p className="text-xs text-gray-400 mt-2">{subtext}</p>
    </div>
);

const AgentPerformance: React.FC<AgentPerformanceProps> = ({ onNavigate }) => {
  return (
    <AgentLayout onNavigate={onNavigate} activePage="agent-performance" title="Performance Analytics">
       
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
           <KPICard title="Total Property Views" value="2,850" subtext="+15% this month" color="border-blue-500" />
           <KPICard title="Inquiries Received" value="134" subtext="12 new today" color="border-green-500" />
           <KPICard title="Leads Conversion" value="4.2%" subtext="+0.5% vs avg" color="border-[#F9A826]" />
           <KPICard title="Properties Sold" value="8" subtext="This Year" color="border-purple-500" />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-80">
               <div className="flex justify-between items-center mb-6">
                   <h3 className="font-bold text-[#0A2B4C]">Engagement Trends</h3>
                   <select className="text-xs border-gray-300 rounded"><option>Last 30 Days</option></select>
               </div>
               <div className="h-56 flex items-end justify-between px-2 gap-2">
                   {[40, 60, 45, 70, 85, 65, 90, 80, 95, 100, 85, 95].map((h, i) => (
                       <div key={i} className="w-full bg-blue-50 relative group rounded-t">
                           <div className="absolute bottom-0 w-full bg-[#0A2B4C] rounded-t hover:bg-[#F9A826] transition-colors" style={{ height: `${h}%` }}></div>
                       </div>
                   ))}
               </div>
               <div className="flex justify-between mt-2 text-xs text-gray-400">
                   <span>1</span><span>3</span><span>6</span><span>9</span><span>12</span><span>15</span><span>18</span><span>21</span><span>24</span><span>27</span><span>30</span>
               </div>
           </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-80">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="font-bold text-[#0A2B4C]">Top Performing Properties</h3>
                   <button className="text-xs text-[#F9A826] font-medium">Export CSV</button>
               </div>
               <div className="space-y-4 overflow-y-auto h-56 pr-2">
                   {[
                       { name: "Modern Family Home", views: 1240, leads: 45 },
                       { name: "Luxury Apartment", views: 856, leads: 32 },
                       { name: "Seaside Land", views: 2100, leads: 18 },
                       { name: "Commercial Space", views: 450, leads: 5 },
                   ].map((p, i) => (
                       <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                           <div>
                               <p className="font-bold text-sm text-[#0A2B4C]">{p.name}</p>
                               <p className="text-xs text-gray-500">{p.views} Views</p>
                           </div>
                           <div className="text-right">
                               <p className="font-bold text-sm text-green-600">{p.leads} Leads</p>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
       </div>

    </AgentLayout>
  );
};

export default AgentPerformance;
