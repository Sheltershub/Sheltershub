
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface Agent {
  id: number;
  name: string;
  agency: string;
  location: string;
  listingsCount: number;
  phone: string;
  image: string;
  verified: boolean;
}

const mockAgents: Agent[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    agency: "Prime Real Estate",
    location: "Accra, Greater Accra",
    listingsCount: 12,
    phone: "+233 24 000 0001",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    verified: true
  },
  {
    id: 2,
    name: "Michael Ofori",
    agency: "Empire Builders",
    location: "Kumasi, Ashanti",
    listingsCount: 8,
    phone: "+233 24 000 0002",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    verified: true
  },
  {
    id: 3,
    name: "Jessica Boateng",
    agency: "Urban Spaces Realty",
    location: "East Legon, Accra",
    listingsCount: 15,
    phone: "+233 24 000 0003",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    verified: true
  },
  {
    id: 4,
    name: "David Mensah",
    agency: "Independent",
    location: "Tema, Greater Accra",
    listingsCount: 4,
    phone: "+233 24 000 0004",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    verified: false
  },
  {
    id: 5,
    name: "Amanda Darko",
    agency: "Luxury Living",
    location: "Cantonments, Accra",
    listingsCount: 22,
    phone: "+233 24 000 0005",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    verified: true
  },
  {
    id: 6,
    name: "Kwame Asare",
    agency: "Global Homes",
    location: "Takoradi, Western",
    listingsCount: 6,
    phone: "+233 24 000 0006",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    verified: false
  },
  {
    id: 7,
    name: "Elizabeth Yeboah",
    agency: "Prime Real Estate",
    location: "Spintex, Accra",
    listingsCount: 9,
    phone: "+233 24 000 0007",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
    verified: true
  },
  {
    id: 8,
    name: "Robert Appiah",
    agency: "Independent",
    location: "Kasoa, Central",
    listingsCount: 2,
    phone: "+233 24 000 0008",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    verified: false
  }
];

interface AgentsPageProps {
  onNavigate: (page: string) => void;
}

const AgentCard: React.FC<{ agent: Agent; onNavigate: (page: string) => void }> = ({ agent, onNavigate }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
            <div className="relative h-48 overflow-hidden bg-gray-100">
                <img src={agent.image} alt={agent.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                
                {agent.verified && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        <span className="text-[10px] font-bold text-[#0A2B4C] uppercase tracking-wider">Verified</span>
                    </div>
                )}

                <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-xs font-medium bg-[#F9A826] text-white px-2 py-0.5 rounded mb-1 w-fit">{agent.listingsCount} Listings</p>
                </div>
            </div>

            <div className="p-5 flex-grow flex flex-col">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#0A2B4C] mb-1 group-hover:text-[#F9A826] transition-colors">{agent.name}</h3>
                    <p className="text-sm text-gray-500 font-medium">{agent.agency}</p>
                </div>

                <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {agent.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        {agent.phone}
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex gap-3">
                    <button className="flex-1 py-2.5 rounded-lg border border-[#0A2B4C] text-[#0A2B4C] hover:bg-[#0A2B4C] hover:text-white font-semibold text-sm transition-colors duration-200">
                        Contact
                    </button>
                    <button 
                        onClick={() => onNavigate('agent-detail')} // Mock navigation to single agent view if it existed, reusing existing pattern
                        className="flex-1 py-2.5 rounded-lg bg-[#0A2B4C] text-white hover:bg-[#08223c] font-semibold text-sm transition-colors duration-200 shadow-md"
                    >
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

const AgentsPage: React.FC<AgentsPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Most Listings');
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>(mockAgents);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let result = mockAgents.filter(agent => 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      agent.agency.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (locationFilter !== 'All') {
      result = result.filter(agent => agent.location.includes(locationFilter));
    }

    if (sortOrder === 'Most Listings') {
      result.sort((a, b) => b.listingsCount - a.listingsCount);
    } else if (sortOrder === 'A-Z') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredAgents(result);
  }, [searchTerm, locationFilter, sortOrder]);

  const uniqueLocations = Array.from(new Set(mockAgents.map(a => a.location.split(', ')[1] || a.location))).sort();

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="agents" />

      {/* Page Title Section */}
      <div className="bg-[#0A2B4C] text-white py-16">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Real Estate Agents</h1>
            <p className="text-blue-100 text-lg font-light max-w-2xl mx-auto">Connect with verified property agents to find your dream home.</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 -mt-8 relative z-10">
        
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-10">
            
            {/* Mobile Toggle */}
            <div className="md:hidden mb-4">
                <button 
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#0A2B4C] font-semibold"
                >
                    <span>{showMobileFilters ? 'Hide Filters' : 'Show Search Filters'}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                </button>
            </div>

            <div className={`${showMobileFilters ? 'block' : 'hidden'} md:flex flex-col md:flex-row gap-4 items-center`}>
                {/* Search */}
                <div className="relative w-full md:flex-grow">
                    <input 
                        type="text" 
                        placeholder="Search agent name or agency..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" 
                    />
                    <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>

                {/* Location Filter */}
                <div className="w-full md:w-64 relative">
                    <select 
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] bg-white appearance-none"
                    >
                        <option value="All">All Locations</option>
                        {uniqueLocations.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>

                {/* Sort Order */}
                <div className="w-full md:w-56 relative">
                    <select 
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] bg-white appearance-none"
                    >
                        <option value="Most Listings">Most Listings</option>
                        <option value="A-Z">Name (A-Z)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>

                {/* Reset Button */}
                <button 
                    onClick={() => { setSearchTerm(''); setLocationFilter('All'); setSortOrder('Most Listings'); }}
                    className="w-full md:w-auto px-6 py-3 border border-gray-300 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                    Reset
                </button>
            </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#0A2B4C]">
                {filteredAgents.length} {filteredAgents.length === 1 ? 'Agent' : 'Agents'} Found
            </h2>
        </div>

        {/* Agents Grid */}
        {filteredAgents.length > 0 ? (
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {filteredAgents.map((agent) => (
                        <AgentCard 
                            key={agent.id} 
                            agent={agent} 
                            onNavigate={onNavigate}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12 mb-8">
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>Prev</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#0A2B4C] text-white font-bold">1</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold transition-colors">2</button>
                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">Next</button>
                    </div>
                </div>
            </>
        ) : (
            /* No Results State */
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6 text-gray-400">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-[#0A2B4C] mb-2">No agents found</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">We couldn't find any agents matching your current filters. Try adjusting your search criteria.</p>
                <button 
                    onClick={() => { setSearchTerm(''); setLocationFilter('All'); }}
                    className="px-8 py-3 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15] shadow-md transition-colors"
                >
                    Reset Filters
                </button>
            </div>
        )}

      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default AgentsPage;
