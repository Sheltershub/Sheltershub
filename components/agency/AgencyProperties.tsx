
import React, { useState } from 'react';
import AgencyLayout from './AgencyLayout';

interface AgencyPropertiesProps {
  onNavigate: (page: string) => void;
}

const AgencyProperties: React.FC<AgencyPropertiesProps> = ({ onNavigate }) => {
  // Converted to state to allow toggling 'Featured' status
  const [properties, setProperties] = useState([
    { id: 101, title: 'Luxury Villa', city: 'East Legon', price: '$1.2M', agent: 'Sarah Jenkins', status: 'Active', type: 'House', image: 'https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg', isFeatured: true },
    { id: 102, title: 'Downtown Apt', city: 'Osu', price: '$850k', agent: 'Michael Ofori', status: 'Pending', type: 'Apartment', image: 'https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg', isFeatured: false },
    { id: 103, title: 'Seaside Condo', city: 'Labadi', price: '$450k', agent: 'Sarah Jenkins', status: 'Active', type: 'Condo', image: 'https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg', isFeatured: true },
    { id: 104, title: 'Warehouse', city: 'Tema', price: '$2.1M', agent: 'Unassigned', status: 'Active', type: 'Commercial', image: 'https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg', isFeatured: false },
  ]);

  const toggleFeatured = (id: number) => {
    setProperties(properties.map(p => 
      p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
    ));
  };

  const getStatusColor = (status: string) => {
      switch (status) {
          case 'Active': return 'text-green-600';
          case 'Pending': return 'text-yellow-600';
          case 'Sold': return 'text-red-600';
          default: return 'text-gray-700';
      }
  };

  return (
    <AgencyLayout onNavigate={onNavigate} activePage="agency-properties" title="Managed Properties">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 font-medium text-sm">All</button>
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-medium text-sm">Active</button>
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-medium text-sm">Pending</button>
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-medium text-sm">Sold</button>
                </div>
                <div className="flex gap-3">
                     <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center gap-2">
                        Export List
                     </button>
                     <button className="px-4 py-2 bg-[#0A2B4C] text-white rounded-lg hover:bg-[#08223c] font-medium text-sm">
                        Add Property
                     </button>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 w-1/4">Property</th>
                            <th className="px-6 py-3 w-1/4">Info</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3 text-center">Featured</th>
                            <th className="px-6 py-3">Assigned Agent</th>
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
                                    <button 
                                        onClick={() => toggleFeatured(p.id)}
                                        className={`px-3 py-1 rounded text-xs font-semibold border transition-all ${
                                            p.isFeatured 
                                            ? 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100' 
                                            : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                                        }`}
                                    >
                                        {p.isFeatured ? 'Yes' : 'No'}
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    {p.agent === 'Unassigned' ? (
                                        <span className="text-red-500 italic text-xs">Unassigned</span>
                                    ) : (
                                        <span className="text-gray-700">{p.agent}</span>
                                    )}
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
                                        <button className="text-gray-500 hover:text-gray-700 text-xs font-medium transition-colors">Reassign</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </AgencyLayout>
  );
};

export default AgencyProperties;
