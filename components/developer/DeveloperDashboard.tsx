
import React, { useState } from 'react';
import DeveloperLayout from './DeveloperLayout';

interface DeveloperDashboardProps {
  onNavigate: (page: string) => void;
}

const DeveloperDashboard: React.FC<DeveloperDashboardProps> = ({ onNavigate }) => {
  // Converted to state to allow toggling 'Featured' status
  const [projects, setProjects] = useState([
    {
        id: 1,
        name: "The Royal Gardens",
        city: "East Legon",
        type: "Mixed Use",
        status: "Active",
        units: 45,
        sold: 28,
        image: "https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg",
        lastUpdated: "2 days ago",
        isFeatured: true
    },
    {
        id: 2,
        name: "Atlantic View Heights",
        city: "Takoradi",
        type: "Residential",
        status: "Pending",
        units: 30,
        sold: 0,
        image: "https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg",
        lastUpdated: "1 week ago",
        isFeatured: false
    },
    {
        id: 3,
        name: "Safari Valley Estates",
        city: "Aburi",
        type: "Gated Community",
        status: "Completed",
        units: 12,
        sold: 12,
        image: "https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg",
        lastUpdated: "1 month ago",
        isFeatured: false
    }
  ]);

  const toggleFeatured = (id: number) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
    ));
  };

  const getStatusColor = (status: string) => {
      switch (status) {
          case 'Active': return 'text-green-600';
          case 'Pending': return 'text-yellow-600';
          case 'Completed': return 'text-[#0A2B4C]';
          default: return 'text-gray-700';
      }
  };

  return (
    <DeveloperLayout onNavigate={onNavigate} activePage="developer-dashboard" title="My Projects">
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 font-medium">Total Projects</p>
              <h3 className="text-3xl font-bold text-[#0A2B4C]">12</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 font-medium">Active Units</p>
              <h3 className="text-3xl font-bold text-[#0A2B4C]">145</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 font-medium">Revenue (YTD)</p>
              <h3 className="text-3xl font-bold text-[#0A2B4C]">$2.4M</h3>
          </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">Project List</h2>
              <button 
                onClick={() => onNavigate('developer-add-project')}
                className="px-4 py-2 bg-[#F9A826] text-white rounded-lg hover:bg-[#d88d15] font-medium text-sm flex items-center gap-2"
              >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  Add New Project
              </button>
          </div>

          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
                      <tr>
                          <th className="px-6 py-3 w-1/4">Property / Project</th>
                          <th className="px-6 py-3 w-1/4">Info</th>
                          {/* Placed Featured after Info since Price is absent in this view */}
                          <th className="px-6 py-3 text-center">Featured</th>
                          <th className="px-6 py-3">Sales Progress</th>
                          <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                      {projects.map(project => (
                          <tr key={project.id} className="hover:bg-gray-50 transition-colors align-top">
                              <td className="px-6 py-4">
                                  <div className="font-medium text-gray-900 text-base">{project.name}</div>
                              </td>
                              <td className="px-6 py-4">
                                  <div className="flex flex-col gap-1.5 items-start">
                                      <img src={project.image} alt={project.name} className="w-24 h-16 object-cover rounded-md shadow-sm border border-gray-100 mb-1" />
                                      <span className="text-xs text-gray-500 font-medium">City: <span className="text-gray-800">{project.city}</span></span>
                                      <span className="text-xs text-gray-500 font-medium">Type: <span className="text-gray-800">{project.type}</span></span>
                                      <span className="text-xs text-gray-500 font-medium">Status: <span className={`font-bold ${getStatusColor(project.status)}`}>{project.status}</span></span>
                                      <span className="text-xs text-gray-400">Listing ID: <span className="font-mono text-gray-600">DEV-{project.id}</span></span>
                                  </div>
                              </td>
                              <td className="px-6 py-4 text-center">
                                  <button 
                                      onClick={() => toggleFeatured(project.id)}
                                      className={`px-3 py-1 rounded text-xs font-semibold border transition-all ${
                                          project.isFeatured 
                                          ? 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100' 
                                          : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                                      }`}
                                  >
                                      {project.isFeatured ? 'Yes' : 'No'}
                                  </button>
                              </td>
                              <td className="px-6 py-4">
                                  <div className="max-w-xs">
                                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                                          <span>{Math.round((project.sold / project.units) * 100)}% Sold</span>
                                      </div>
                                      <div className="w-full bg-gray-100 rounded-full h-2">
                                          <div className="bg-[#0A2B4C] h-2 rounded-full" style={{ width: `${(project.sold / project.units) * 100}%` }}></div>
                                      </div>
                                      <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                                          <span>{project.sold} / {project.units} Units</span>
                                      </div>
                                  </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                  <div className="flex items-center justify-end gap-3 h-full pt-4">
                                      <button 
                                          onClick={() => onNavigate('property-detail')}
                                          className="text-gray-600 hover:text-[#0A2B4C] text-xs font-medium transition-colors"
                                      >
                                          View
                                      </button>
                                      <button className="text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors">Edit</button>
                                      <button className="text-gray-500 hover:text-gray-700 text-xs font-medium transition-colors">Agents</button>
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    </DeveloperLayout>
  );
};

export default DeveloperDashboard;
