
import React from 'react';
import DeveloperLayout from './DeveloperLayout';

interface DeveloperPerformanceProps {
  onNavigate: (page: string) => void;
}

const KPICard: React.FC<{ title: string; value: string; subtext: string; color: string }> = ({ title, value, subtext, color }) => (
    <div className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${color} border-gray-200 border-t border-r border-b`}>
        <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        <p className="text-xs text-gray-400 mt-2">{subtext}</p>
    </div>
);

const DeveloperPerformance: React.FC<DeveloperPerformanceProps> = ({ onNavigate }) => {
  return (
    <DeveloperLayout onNavigate={onNavigate} activePage="developer-performance" title="Project Performance">
       
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
           <KPICard title="Total Leads" value="1,245" subtext="+12% from last month" color="border-blue-500" />
           <KPICard title="Sales Closed" value="48" subtext="3 this week" color="border-green-500" />
           <KPICard title="Total Revenue" value="$4.2M" subtext="YTD Performance" color="border-[#F9A826]" />
           <KPICard title="Engagement" value="15.4k" subtext="Views across all projects" color="border-purple-500" />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-80">
               <div className="flex justify-between items-center mb-6">
                   <h3 className="font-bold text-[#0A2B4C]">Sales Trends</h3>
                   <select className="text-xs border-gray-300 rounded"><option>Last 6 Months</option></select>
               </div>
               <div className="h-56 flex items-end justify-between px-2 gap-4">
                   {[30, 45, 35, 60, 50, 75].map((h, i) => (
                       <div key={i} className="w-full bg-blue-50 relative group">
                           <div className="absolute bottom-0 w-full bg-[#0A2B4C] rounded-t hover:bg-[#F9A826] transition-colors" style={{ height: `${h}%` }}></div>
                           <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded pointer-events-none">
                               {h} Sales
                           </div>
                       </div>
                   ))}
               </div>
               <div className="flex justify-between mt-2 text-xs text-gray-400 px-2">
                   <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
               </div>
           </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-80">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="font-bold text-[#0A2B4C]">Project Comparison</h3>
                   <button className="text-xs text-[#F9A826]">Export Report</button>
               </div>
               <div className="space-y-4 overflow-y-auto h-56 pr-2">
                   {[
                       { name: "The Royal Gardens", sales: 28, leads: 450 },
                       { name: "Atlantic View Heights", sales: 0, leads: 120 },
                       { name: "Safari Valley Estates", sales: 12, leads: 310 },
                       { name: "Skyline Towers", sales: 8, leads: 365 },
                   ].map((p, i) => (
                       <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                           <div>
                               <p className="font-bold text-sm text-[#0A2B4C]">{p.name}</p>
                               <p className="text-xs text-gray-500">{p.leads} Leads Generated</p>
                           </div>
                           <div className="text-right">
                               <p className="font-bold text-sm text-green-600">{p.sales} Sales</p>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
       </div>

    </DeveloperLayout>
  );
};

export default DeveloperPerformance;
