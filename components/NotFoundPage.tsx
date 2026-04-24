
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
        // In a real app, you would pass the query params here
        onNavigate('search-results');
    }
  };

  const suggestions = [
    { 
        name: 'Featured Properties', 
        page: 'all-properties', 
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> 
    },
    { 
        name: 'Agencies', 
        page: 'agencies', 
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> 
    },
    { 
        name: 'Developers', 
        page: 'developers', 
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /> 
    },
    { 
        name: 'Contact Support', 
        page: 'contact', 
        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /> 
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Header onNavigate={onNavigate} activePage="404" />
      
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        
        <div className="w-full max-w-2xl text-center">
            
            {/* Error Message Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 md:p-12 mb-10">
                <h1 className="text-8xl md:text-9xl font-extrabold text-[#0A2B4C] tracking-tight mb-2">404</h1>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A2B4C] mb-3">Oops! Page not found.</h2>
                <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                    We can't seem to find the page you are looking for. It might have been removed, renamed, or is temporarily unavailable.
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8 relative">
                    <input 
                        type="text" 
                        placeholder="Search for properties, agents..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-3 pl-4 pr-12 text-gray-700 focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] transition-all"
                    />
                    <button 
                        type="submit"
                        className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#F9A826] text-white p-2 rounded-md hover:bg-[#d88d15] transition-colors"
                        aria-label="Search"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </form>

                {/* Call-to-Action Section */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                        onClick={() => onNavigate('home')}
                        className="w-full sm:w-auto py-3 px-8 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        Go Back Home
                    </button>
                    <button 
                        onClick={() => onNavigate('all-properties')}
                        className="w-full sm:w-auto py-3 px-8 bg-white border border-[#0A2B4C] text-[#0A2B4C] font-bold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Browse Properties
                    </button>
                </div>
                
                {/* Secondary Links */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center gap-6 text-sm">
                     <button onClick={() => onNavigate('contact')} className="text-[#0A2B4C] font-medium hover:text-[#F9A826] hover:underline flex items-center gap-1 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        Contact Support
                     </button>
                     <span className="text-gray-300">|</span>
                     <button onClick={() => onNavigate('sitemap')} className="text-[#0A2B4C] font-medium hover:text-[#F9A826] hover:underline flex items-center gap-1 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                        View Sitemap
                     </button>
                </div>
            </div>

            {/* Suggested Links Section */}
            <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Popular Destinations</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {suggestions.map((item, idx) => (
                        <button 
                            key={idx} 
                            onClick={() => onNavigate(item.page)}
                            className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#F9A826] transition-all group flex flex-col items-center gap-3"
                        >
                            <div className="p-3 bg-gray-50 rounded-full text-[#0A2B4C] group-hover:bg-orange-50 group-hover:text-[#F9A826] transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {item.icon}
                                </svg>
                            </div>
                            <span className="font-semibold text-gray-700 group-hover:text-[#0A2B4C] text-sm text-center">{item.name}</span>
                        </button>
                    ))}
                </div>
            </div>

        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default NotFoundPage;
