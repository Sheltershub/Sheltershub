
import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import PropertyCard from '../PropertyCard';
import FilterSidebar from '../FilterSidebar';
import { allPropertiesList } from '../../constants';

interface PropertiesPageProps {
  onNavigate: (page: string) => void;
  userRole?: string;
}

const PropertiesPage: React.FC<PropertiesPageProps> = ({ onNavigate, userRole = 'guest' }) => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature) 
        : [...prev, feature]
    );
  };

  const handleFilterChange = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
    }, 800);
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-dark-950 min-h-screen transition-colors duration-300">
      <Header onNavigate={onNavigate} activePage="all-properties" userRole={userRole} />

      <div className="bg-white dark:bg-slate-dark-900 border-b border-gray-200 dark:border-slate-dark-800">
        <div className="container mx-auto px-4 py-4 uppercase text-xs font-bold tracking-widest text-gray-400">
            <div className="flex items-center gap-2">
                <button onClick={() => onNavigate('home')} className="hover:text-brand-orange transition-colors">Home</button>
                <span>/</span>
                <span className="text-gray-900 dark:text-gray-100">Browse Properties</span>
            </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-72 flex-shrink-0">
                <div className="sticky top-24">
                    <FilterSidebar 
                        selectedFeatures={selectedFeatures} 
                        onToggleFeature={(f) => { toggleFeature(f); handleFilterChange(); }} 
                    />
                    
                    {/* Extra Search Tip */}
                    <div className="mt-6 p-6 bg-brand-blue text-white rounded-xl shadow-lg overflow-hidden relative">
                        <div className="relative z-10">
                            <h4 className="font-bold mb-2">Need Help?</h4>
                            <p className="text-xs text-blue-100 mb-4 leading-relaxed">Our agents can help you find exactly what you are looking for.</p>
                            <button className="text-xs font-bold bg-brand-orange px-4 py-2 rounded-lg hover:bg-brand-orange/90 transition-all">Contact Us</button>
                        </div>
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                    </div>
                </div>
            </aside>

            {/* Content Area */}
            <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Properties for Sale & Rent</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Showing <span className="font-bold text-gray-800 dark:text-gray-200">{allPropertiesList.length}</span> properties matching your search</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sort By:</label>
                        <select className="bg-white dark:bg-slate-dark-900 border border-gray-200 dark:border-slate-dark-800 rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 focus:ring-1 focus:ring-brand-orange outline-none">
                            <option>Newest First</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Most Popular</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-dark-900 rounded-xl border border-gray-200 dark:border-slate-dark-800 overflow-hidden animate-pulse">
                                <div className="h-56 bg-gray-200 dark:bg-slate-dark-800"></div>
                                <div className="p-5 space-y-4">
                                    <div className="h-4 bg-gray-200 dark:bg-slate-dark-800 rounded w-1/2"></div>
                                    <div className="h-6 bg-gray-200 dark:bg-slate-dark-800 rounded"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-slate-dark-800 rounded w-3/4"></div>
                                    <div className="flex gap-4">
                                        <div className="h-10 bg-gray-200 dark:bg-slate-dark-800 rounded flex-grow"></div>
                                        <div className="h-10 bg-gray-200 dark:bg-slate-dark-800 rounded flex-grow"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {allPropertiesList.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {allPropertiesList.map((property) => (
                                    <PropertyCard 
                                        key={property.id} 
                                        property={property} 
                                        onClick={() => onNavigate(`property-${property.id}`)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-slate-dark-900 rounded-2xl border border-gray-200 dark:border-slate-dark-800 p-20 text-center shadow-sm">
                                <div className="w-24 h-24 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No properties found</h2>
                                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">We couldn't find any properties matching your current filters. Try adjusting your search criteria.</p>
                                <button 
                                    onClick={() => setSelectedFeatures([])}
                                    className="px-8 py-3 bg-brand-orange text-white font-bold rounded-lg hover:bg-brand-orange/90 transition-all shadow-md"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        )}

                        <div className="mt-12 flex justify-center gap-2">
                             <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#0A2B4C] text-white font-bold shadow-lg">1</button>
                              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-dark-900 border border-gray-200 dark:border-slate-dark-800 text-gray-600 dark:text-gray-400 font-bold hover:bg-gray-50 dark:hover:bg-slate-dark-800 transition-colors">2</button>
                             <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-dark-900 border border-gray-200 dark:border-slate-dark-800 text-gray-600 dark:text-gray-400 font-bold hover:bg-gray-50 dark:hover:bg-slate-dark-800 transition-colors">3</button>
                             <span className="w-10 h-10 flex items-center justify-center text-gray-400 font-bold">...</span>
                             <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-dark-900 border border-gray-200 dark:border-slate-dark-800 text-gray-600 dark:text-gray-400 font-bold hover:bg-gray-50 dark:hover:bg-slate-dark-800 transition-colors">12</button>
                        </div>
                    </>
                )}
            </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default PropertiesPage;
