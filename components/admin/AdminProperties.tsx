
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';

interface AdminPropertiesProps {
  onNavigate: (page: string) => void;
  userRole?: string;
}

const AdminProperties: React.FC<AdminPropertiesProps> = ({ onNavigate, userRole }) => {
  const [filter, setFilter] = useState('All');

  // Converted to state to allow toggling 'Featured' status
  const [properties, setProperties] = useState([
    { id: 101, title: 'Luxury Villa', city: 'Malibu', type: 'House', price: '$1.2M', status: 'Active', agent: 'Sarah Jenkins', image: 'https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg', isFeatured: true },
    { id: 102, title: 'Downtown Apt', city: 'New York', type: 'Apartment', price: '$850k', status: 'Pending', agent: 'Mike Ross', image: 'https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg', isFeatured: false },
    { id: 103, title: 'Seaside Condo', city: 'Miami', type: 'Condo', price: '$450k', status: 'Active', agent: 'Rachel Zane', image: 'https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg', isFeatured: true },
    { id: 104, title: 'Mountain Cabin', city: 'Aspen', type: 'House', price: '$2.1M', status: 'Archived', agent: 'Harvey Specter', image: 'https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg', isFeatured: false },
    { id: 105, title: 'Modern Loft', city: 'Chicago', type: 'Apartment', price: '$600k', status: 'Active', agent: 'Donna Paulsen', image: 'https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg', isFeatured: false },
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
          case 'Archived': return 'text-gray-500';
          default: return 'text-gray-700';
      }
  };

  return (
    <AdminLayout onNavigate={onNavigate} activePage="admin-properties" title="Manage Properties" userRole={userRole || 'admin'}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 font-medium text-sm">Filter: All</button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 font-medium text-sm">Sort: Newest</button>
            </div>
            <div className="flex gap-3">
                 <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    Import/Export
                 </button>
                 <button className="px-4 py-2 bg-[#0A2B4C] text-white rounded-lg hover:bg-[#08223c] font-medium text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
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
                        <th className="px-6 py-3">Agent</th>
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
                            <td className="px-6 py-4 font-medium">{p.price}</td>
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
                            <td className="px-6 py-4">{p.agent}</td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-3 h-full pt-4">
                                    <button 
                                        onClick={() => onNavigate('property-detail')}
                                        className="text-gray-600 hover:text-[#0A2B4C] text-xs font-medium transition-colors"
                                    >
                                        View
                                    </button>
                                    <button className="text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors">Edit</button>
                                    {userRole === 'admin' && (
                                        <button className="text-red-600 hover:text-red-800 text-xs font-medium transition-colors">Delete</button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
            <span>Showing 1-5 of 124 properties</span>
            <div className="flex gap-1">
                <button className="px-3 py-1 border rounded hover:bg-gray-50">Prev</button>
                <button className="px-3 py-1 border rounded bg-[#0A2B4C] text-white">1</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProperties;
