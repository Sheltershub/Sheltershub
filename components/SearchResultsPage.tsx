
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import PropertyCard from './PropertyCard';
import FilterSidebar from './FilterSidebar';
import SearchForm from './SearchForm';
import { allPropertiesList } from '../constants';

interface SearchResultsPageProps {
  onNavigate: (page: string) => void;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ onNavigate }) => {
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use a subset of properties to simulate search results
  const searchResults = allPropertiesList.slice(0, 8); 

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="properties" />

      {/* 2. Search Bar Section */}
      <div className="bg-[#0A2B4C] py-8">
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-white mb-6">Find Your Perfect Home</h1>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden p-1">
                 {/* Reuse SearchForm but we might want to style it slightly differently if needed, 
                     or just use it as is. Since SearchForm has its own container styling, 
                     we wrap it to look integrated. */}
                 <div className="[&>div>div:nth-child(2)]:!shadow-none [&>div>div:nth-child(2)]:!rounded-none [&>div>div:nth-child(2)]:!bg-white [&>div>div:nth-child(2)]:!p-4">
                     {/* 
                        HACK: Overriding SearchForm internal styles via arbitrary Tailwind classes 
                        to make it fit the "Search Bar Section" look on this page 
                        without rewriting the component.
                     */}
                    <SearchForm onSearch={() => {}} /> 
                 </div>
            </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* 3. Filters & Sorting Section (Sidebar) */}
            <aside className="w-full lg:w-[280px] flex-shrink-0">
                 <FilterSidebar />
            </aside>

            {/* 4. Search Results Grid Section */}
            <div className="flex-1 w-full">
                
                {/* Header for Results */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-[#0A2B4C]">Search Results</h2>
                        <p className="text-sm text-gray-500">{searchResults.length} properties found</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 whitespace-nowrap">Sort by:</label>
                        <select className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-[#F9A826]">
                            <option>Newest</option>
                            <option>Price (Low to High)</option>
                            <option>Price (High to Low)</option>
                            <option>Most Popular</option>
                        </select>
                    </div>
                </div>

                {/* Grid */}
                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchResults.map((property) => (
                            <PropertyCard 
                                key={property.id} 
                                property={property} 
                                onClick={() => onNavigate('property-detail')}
                            />
                        ))}
                    </div>
                ) : (
                    /* 6. No Results State */
                    <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                             <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-[#0A2B4C] mb-2">No properties found</h3>
                        <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria.</p>
                        <button className="text-[#F9A826] font-semibold hover:underline">Clear all filters</button>
                    </div>
                )}

                {/* 5. Pagination / Load More Section */}
                {searchResults.length > 0 && (
                    <div className="mt-12 text-center">
                        <button 
                            onClick={handleLoadMore}
                            disabled={loading}
                            className="bg-white border border-gray-300 text-[#0A2B4C] font-semibold py-3 px-8 rounded-full hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-2 mx-auto"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-[#0A2B4C]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading...
                                </>
                            ) : 'Load More Properties'}
                        </button>
                        
                        <div className="flex justify-center mt-6 gap-2">
                             <button className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-gray-400 hover:text-gray-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                             </button>
                             <button className="w-8 h-8 flex items-center justify-center rounded bg-[#F9A826] text-white font-bold text-sm">1</button>
                             <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 font-medium text-sm transition-colors">2</button>
                             <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 font-medium text-sm transition-colors">3</button>
                             <span className="w-8 h-8 flex items-center justify-center text-gray-400">...</span>
                             <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 font-medium text-sm transition-colors">8</button>
                             <button className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-gray-600 hover:text-[#0A2B4C]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                             </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default SearchResultsPage;
