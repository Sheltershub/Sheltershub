
import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import FilterSidebar from './FilterSidebar';
import { allPropertiesList } from '../constants';

const Pagination: React.FC = () => (
  <div className="flex justify-center mt-12 gap-2">
    <button className="w-10 h-10 flex items-center justify-center rounded bg-[#0A2B4C] text-white font-semibold shadow-sm">1</button>
    <button className="w-10 h-10 flex items-center justify-center rounded bg-white dark:bg-[#0A2B4C] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-blue-900/30 font-semibold transition-colors">2</button>
    <button className="w-10 h-10 flex items-center justify-center rounded bg-white dark:bg-[#0A2B4C] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-blue-900/30 font-semibold transition-colors">3</button>
    <button className="w-10 h-10 flex items-center justify-center rounded bg-white dark:bg-[#0A2B4C] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-blue-900/30 font-semibold transition-colors">...</button>
    <button className="w-10 h-10 flex items-center justify-center rounded bg-white dark:bg-[#0A2B4C] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-blue-900/30 font-semibold transition-colors">10</button>
  </div>
);

const ActiveFilterPill: React.FC<{ label: string; onRemove?: () => void }> = ({ label, onRemove }) => (
  <span className="inline-flex items-center bg-white dark:bg-[#0A2B4C] border border-gray-200 dark:border-gray-700 rounded px-3 py-1 text-sm text-gray-600 dark:text-gray-300 shadow-sm transition-shadow hover:shadow-md">
    {label}
    <button 
        onClick={onRemove}
        className="ml-2 text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
        aria-label={`Remove ${label} filter`}
    >
       <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
    </button>
  </span>
);

const SortButton: React.FC<{ label: string; active?: boolean; direction?: 'up' | 'down' }> = ({ label, active, direction }) => (
    <button className={`px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 -ml-px first:ml-0 first:rounded-l last:rounded-r transition-colors flex items-center gap-2 ${active ? 'bg-[#0A2B4C] text-white border-[#0A2B4C] dark:bg-brand-orange dark:text-brand-blue dark:border-brand-orange z-10' : 'bg-white dark:bg-brand-blue-dark text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-blue-900/30'}`}>
        {label}
        {direction && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                {direction === 'up' 
                    ? <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    : <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                }
            </svg>
        )}
    </button>
);

const AllProperties: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  // State for advanced feature filters
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
      'Swimming pool', 'Security alarm', 'Garage', 'Fireplace', 'Storage Unit', 'Fitness center', 'Fully furnished', 'Intercom', 'Balcony'
  ]);

  const toggleFeature = (feature: string) => {
      setSelectedFeatures(prev => 
          prev.includes(feature) 
              ? prev.filter(f => f !== feature) 
              : [...prev, feature]
      );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pb-12 transition-colors duration-300">
        {/* Breadcrumb Area */}
        <div className="bg-white dark:bg-brand-blue-dark border-b border-gray-200 dark:border-gray-700">
             <div className="container mx-auto px-4 py-4">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <button onClick={() => onNavigate('home')} className="hover:text-[#0A2B4C] dark:hover:text-brand-orange transition-colors">Home</button>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 dark:text-gray-200 font-medium">Properties</span>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 dark:text-gray-200">Properties List</span>
                </div>
             </div>
        </div>

        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                
                {/* Left Sidebar */}
                <aside className="w-full lg:w-[280px] flex-shrink-0">
                    <FilterSidebar selectedFeatures={selectedFeatures} onToggleFeature={toggleFeature} />
                </aside>

                {/* Main Content */}
                <main className="flex-1 w-full">
                    
                    {/* Active Filters Row */}
                    <div className="flex flex-wrap gap-2 mb-6 min-h-[32px]">
                        {/* Static pill for visual context as per original design */}
                        <ActiveFilterPill label="2 bedroom apartment" />
                        
                        {/* Dynamic Feature Pills */}
                        {selectedFeatures.map(feature => (
                            <ActiveFilterPill 
                                key={feature} 
                                label={feature} 
                                onRemove={() => toggleFeature(feature)} 
                            />
                        ))}
                    </div>

                    {/* Results & Sorting Toolbar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                        <div className="flex items-center gap-4">
                            <span className="text-gray-500 dark:text-gray-400 text-sm">Showing 24241 results</span>
                            <div className="flex items-center gap-2">
                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                                </button>
                                <button className="text-gray-800 dark:text-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM11 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" /></svg>
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">Sort by:</span>
                            <div className="flex">
                                <SortButton label="Best match" active />
                                <SortButton label="Top Selling" />
                                <SortButton label="Newest" />
                                <SortButton label="Price" direction="up" />
                                <SortButton label="Price" direction="down" />
                            </div>
                        </div>
                    </div>

                    {/* Listings Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allPropertiesList.map((property) => (
                        <PropertyCard 
                            key={property.id} 
                            property={property} 
                            onClick={() => onNavigate('property-detail')}
                        />
                        ))}
                    </div>
                    
                    <Pagination />
                </main>
            </div>
        </div>
    </div>
  );
};

export default AllProperties;
