
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

interface Agency {
  id: number;
  name: string;
  logo: string;
  location: string;
  agentsCount: number;
  listingsCount: number;
}

const mockAgencies: Agency[] = [
  {
    id: 1,
    name: "Prime Real Estate",
    logo: "https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg",
    location: "Greater Accra, Ghana",
    agentsCount: 12,
    listingsCount: 36
  },
  {
    id: 2,
    name: "Luxury Living Properties",
    logo: "https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg",
    location: "Kumasi, Ashanti",
    agentsCount: 8,
    listingsCount: 24
  },
  {
    id: 3,
    name: "Urban Spaces Realty",
    logo: "https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg",
    location: "East Legon, Accra",
    agentsCount: 15,
    listingsCount: 52
  },
  {
    id: 4,
    name: "Global Homes Ltd",
    logo: "https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg",
    location: "Tema, Ghana",
    agentsCount: 5,
    listingsCount: 18
  },
  {
    id: 5,
    name: "Prestige Developers",
    logo: "https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg",
    location: "Cantonments, Accra",
    agentsCount: 20,
    listingsCount: 85
  },
  {
    id: 6,
    name: "City Point Agency",
    logo: "https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg",
    location: "Osu, Accra",
    agentsCount: 6,
    listingsCount: 12
  }
];

interface AgenciesPageProps {
  onNavigate: (page: string) => void;
}

const AgenciesPage: React.FC<AgenciesPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter logic (mock implementation for UI)
  const filteredAgencies = mockAgencies.filter(agency => 
    agency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="agencies" />

      {/* Page Title Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-[#0A2B4C] mb-2">Real Estate Agencies</h1>
            <p className="text-gray-500">Browse verified agencies and their properties</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        
        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                    <input 
                        type="text" 
                        placeholder="Search agency name" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]"
                    />
                    <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                
                <div className="w-full md:w-48 relative">
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] appearance-none bg-white text-gray-700">
                        <option>All locations</option>
                        <option>Accra</option>
                        <option>Kumasi</option>
                        <option>Tema</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>

                <div className="w-full md:w-48 relative">
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] appearance-none bg-white text-gray-700">
                        <option>Most Active</option>
                        <option>Most Properties</option>
                        <option>A - Z</option>
                    </select>
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>
        </div>

        {/* Agencies Grid */}
        {filteredAgencies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredAgencies.map((agency) => (
                    <div key={agency.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
                        <div className="h-32 bg-gray-100 relative">
                             {/* Background pattern or cover could go here */}
                             <div className="absolute -bottom-10 left-6">
                                <div className="h-20 w-20 rounded-lg border-4 border-white overflow-hidden bg-white shadow-sm">
                                    <img src={agency.logo} alt={agency.name} className="h-full w-full object-cover" />
                                </div>
                             </div>
                        </div>
                        <div className="pt-12 px-6 pb-6 flex-grow flex flex-col">
                            <h3 className="text-lg font-bold text-[#0A2B4C] mb-1">{agency.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 mb-4">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                {agency.location}
                            </div>
                            
                            <div className="flex justify-between items-center border-t border-b border-gray-100 py-3 mb-6">
                                <div className="text-center">
                                    <span className="block font-bold text-[#0A2B4C] text-lg">{agency.agentsCount}</span>
                                    <span className="text-xs text-gray-500 uppercase tracking-wide">Agents</span>
                                </div>
                                <div className="h-8 w-px bg-gray-100"></div>
                                <div className="text-center">
                                    <span className="block font-bold text-[#0A2B4C] text-lg">{agency.listingsCount}</span>
                                    <span className="text-xs text-gray-500 uppercase tracking-wide">Listings</span>
                                </div>
                            </div>

                            <button 
                                onClick={() => onNavigate('agency-detail')}
                                className="w-full mt-auto bg-white border border-[#F9A826] text-[#F9A826] hover:bg-[#F9A826] hover:text-white font-semibold py-2.5 rounded-lg transition-colors duration-300"
                            >
                                View Agency
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                     <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No agencies found</h3>
                <p className="text-gray-500 mb-6">We couldn't find any agencies matching your search.</p>
                <button 
                    onClick={() => setSearchTerm('')}
                    className="text-[#F9A826] font-semibold hover:underline"
                >
                    Reset filters
                </button>
            </div>
        )}

        {/* Pagination */}
        {filteredAgencies.length > 0 && (
            <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded bg-[#F9A826] text-white font-semibold shadow-sm hover:bg-[#d88d15] transition-colors">1</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold transition-colors">2</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold transition-colors">3</button>
                    <button className="px-4 h-10 flex items-center justify-center rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold transition-colors">Next</button>
                </div>
            </div>
        )}

      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default AgenciesPage;
