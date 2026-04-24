
import React from 'react';
import AgentLayout from './AgentLayout';

interface AgentPropertiesProps {
  onNavigate: (page: string) => void;
}

const AgentProperties: React.FC<AgentPropertiesProps> = ({ onNavigate }) => {
  const properties = [
    {
        id: 101,
        title: "Modern Family Home",
        city: "Accra",
        status: "For Sale",
        price: "$450,000",
        type: "House",
        views: 1240,
        image: "https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg",
        isFeatured: true
    },
    {
        id: 102,
        title: "Luxury Apartment",
        city: "Osu",
        status: "For Rent",
        price: "$2,500 / mo",
        type: "Apartment",
        views: 856,
        image: "https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg",
        isFeatured: false
    },
    {
        id: 103,
        title: "Commercial Space",
        city: "Airport City",
        status: "For Rent",
        price: "$5,000 / mo",
        type: "Commercial",
        views: 450,
        image: "https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg",
        isFeatured: false
    },
    {
        id: 104,
        title: "Seaside Land",
        city: "Kokrobite",
        status: "Sold",
        price: "$80,000",
        type: "Land",
        views: 2100,
        image: "https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg",
        isFeatured: true
    }
  ];

  const getStatusColor = (status: string) => {
      switch (status) {
          case 'For Sale': return 'text-[#0A2B4C]';
          case 'For Rent': return 'text-[#2563EB]';
          case 'Sold': return 'text-red-600';
          default: return 'text-gray-700';
      }
  };

  return (
    <AgentLayout onNavigate={onNavigate} activePage="agent-properties" title="My Properties">
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 font-medium">Total Listings</p>
              <h3 className="text-3xl font-bold text-[#0A2B4C]">12</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 font-medium">For Sale</p>
              <h3 className="text-3xl font-bold text-green-600">8</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 font-medium">For Rent</p>
              <h3 className="text-3xl font-bold text-blue-600">2</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 font-medium">Sold</p>
              <h3 className="text-3xl font-bold text-red-600">45</h3>
          </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-64">
                    <input type="text" placeholder="Search properties..." className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" />
                    <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <button 
                onClick={() => onNavigate('agent-add-property')}
                className="w-full sm:w-auto px-4 py-2 bg-[#F9A826] text-white rounded-lg hover:bg-[#d88d15] font-medium text-sm flex items-center justify-center gap-2"
              >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  Add New Property
              </button>
          </div>

          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
                      <tr>
                          <th className="px-6 py-3 w-1/4">Property</th>
                          <th className="px-6 py-3 w-1/4">Info</th>
                          <th className="px-6 py-3">Price</th>
                          <th className="px-6 py-3 text-center">Featured</th>
                          <th className="px-6 py-3">Stats</th>
                          <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                      {properties.map(p => (
                          <tr key={p.id} className="hover:bg-gray-50 transition-colors align-top">
                              <td className="px-6 py-4">
                                  <div className="font-medium text-gray-900 text-base">{p.title}</div>
                              </td>
                              <td className="px-6 py-4">
                                  <div className="flex flex-col gap-1.5 items-start">
                                      <img src={p.image} alt={p.title} className="w-24 h-16 object-cover rounded-md shadow-sm border border-gray-100 mb-1" />
                                      <span className="text-xs text-gray-500 font-medium">City: <span className="text-gray-800">{p.city}</span></span>
                                      <span className="text-xs text-gray-500 font-medium">Type: <span className="text-gray-800">{p.type}</span></span>
                                      <span className="text-xs text-gray-500 font-medium">Status: <span className={`font-bold ${getStatusColor(p.status)}`}>{p.status}</span></span>
                                      <span className="text-xs text-gray-400">Listing ID: <span className="font-mono text-gray-600">{p.id}</span></span>
                                  </div>
                              </td>
                              <td className="px-6 py-4 font-bold text-[#F9A826]">{p.price}</td>
                              <td className="px-6 py-4 text-center">
                                  {/* Read-only for agents */}
                                  <span className={`px-3 py-1 rounded text-xs font-semibold border bg-gray-50 border-gray-200 text-gray-500`}>
                                      {p.isFeatured ? 'Yes' : 'No'}
                                  </span>
                              </td>
                              <td className="px-6 py-4">
                                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                      {p.views} Views
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
                                      <button className="text-red-600 hover:text-red-800 text-xs font-medium transition-colors">Archive</button>
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    </AgentLayout>
  );
};

export default AgentProperties;
