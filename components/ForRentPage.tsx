
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Property, PropertyStatus } from '../types';
import { allPropertiesList } from '../constants';
import { BedIcon, BathIcon, GarageIcon, HeartIcon } from './icons/PropertyIcons';
import { formatCurrency } from '../utils/currency';

interface ForRentPageProps {
  onNavigate: (page: string) => void;
}

// Local Rental Card to support specific "per month" label requirement
const RentalPropertyCard: React.FC<{ property: Property; onClick: () => void }> = ({ property, onClick }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    onClick();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden group transition-shadow duration-300 shadow-sm hover:shadow-lg flex flex-col h-full">
      <div className="relative cursor-pointer" onClick={handleCardClick}>
        <img src={property.images[currentImageIndex]} alt={property.name} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" />

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="bg-[#2563EB] text-white text-xs font-bold px-3 py-1.5 rounded-md shadow uppercase tracking-wide">
            For Rent
          </span>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); setIsFavorited(!isFavorited); }}
          className="absolute top-4 right-4 p-2 rounded-full text-white bg-black/10 hover:text-red-500 hover:bg-white transition-all backdrop-blur-sm" 
          aria-label="Add to favorites"
        >
          <HeartIcon isFilled={isFavorited} />
        </button>

        {property.images.length > 1 && (
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 z-10">
            {property.images.map((_, index) => (
                <button 
                    key={index} 
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                    className={`block h-1.5 w-1.5 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-3' : 'bg-white/60 hover:bg-white/90'}`}
                />
            ))}
            </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow cursor-pointer" onClick={handleCardClick}>
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{property.propertyType}</p>
        </div>

        <h3 className="font-bold text-lg text-[#0A2B4C] truncate mb-4 group-hover:text-[#F9A826] transition-colors">{property.name}</h3>
        
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-gray-700">
                    <BedIcon className="w-4 h-4 text-gray-400" />
                    <span className="font-bold text-sm">{property.beds}</span>
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5">Beds</span>
            </div>
            <div className="w-px h-8 bg-gray-100"></div>
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-gray-700">
                    <BathIcon className="w-4 h-4 text-gray-400" />
                    <span className="font-bold text-sm">{property.baths}</span>
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5">Baths</span>
            </div>
            <div className="w-px h-8 bg-gray-100"></div>
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-gray-700">
                    <GarageIcon className="w-4 h-4 text-gray-400" />
                    <span className="font-bold text-sm">{property.garage}</span>
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5">Garage</span>
            </div>
        </div>

        <div className="mt-auto">
          <p className="text-xl font-bold text-[#0A2B4C]">
            {formatCurrency(property.priceGHS)} <span className="text-sm font-normal text-gray-500">/ month</span>
          </p>
          <div className="flex justify-between items-center mt-2">
             <span className="text-xs text-gray-400">USD {property.priceUSD.toLocaleString('en-US')} / mo</span>
             <button className="text-xs font-bold text-white bg-[#0A2B4C] px-3 py-1.5 rounded hover:bg-[#08223c] transition-colors">
                View Details
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ForRentPage: React.FC<ForRentPageProps> = ({ onNavigate }) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    keyword: '',
    type: 'All',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'Any'
  });

  // Since mock data is random, we filter for 'For Rent'. 
  // If random generation produces too few, we might fallback to showing some Sale items as Rent for demo purposes.
  // For strictness, we check status.
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Initial load: Get mostly For Rent items.
    // Since mock data is random, we filter what we have.
    const rentals = allPropertiesList.filter(p => p.status === PropertyStatus.ForRent || p.status === PropertyStatus.Sold);
    setFilteredProperties(rentals.length > 0 ? rentals : allPropertiesList.slice(0, 6)); // Fallback for demo if random gen fails to make rentals
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    let result = allPropertiesList.filter(p => p.status === PropertyStatus.ForRent || p.status === PropertyStatus.Sold);
    
    // Keyword Search
    if (filters.keyword) {
      const lower = filters.keyword.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lower) || 
        p.propertyType.toLowerCase().includes(lower)
      );
    }

    // Type
    if (filters.type !== 'All') {
      result = result.filter(p => p.propertyType === filters.type);
    }

    // Price
    if (filters.minPrice) {
      result = result.filter(p => p.priceGHS >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(p => p.priceGHS <= Number(filters.maxPrice));
    }

    // Bedrooms
    if (filters.bedrooms !== 'Any') {
      const beds = parseInt(filters.bedrooms);
      if (filters.bedrooms === '4+') {
         result = result.filter(p => p.beds >= 4);
      } else {
         result = result.filter(p => p.beds === beds);
      }
    }

    setFilteredProperties(result);
    // On mobile, close drawer after filtering
    setShowMobileFilters(false);
  };

  const handleReset = () => {
    setFilters({
        keyword: '',
        type: 'All',
        minPrice: '',
        maxPrice: '',
        bedrooms: 'Any'
    });
    setFilteredProperties(allPropertiesList.filter(p => p.status === PropertyStatus.ForRent));
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="for-rent" />

      {/* Page Title Section */}
      <div className="bg-[#0A2B4C] text-white py-16">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">For Rent Properties</h1>
            <p className="text-blue-100 text-lg font-light max-w-2xl mx-auto">Browse verified rental listings tailored to your lifestyle and budget.</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 -mt-8 relative z-10">
        
        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-10">
            
            {/* Mobile Filter Toggle */}
            <div className="md:hidden">
                <button 
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#0A2B4C] font-semibold"
                >
                    <span>{showMobileFilters ? 'Hide Filters' : 'Show Search Filters'}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                </button>
            </div>

            {/* Filter Form */}
            <form onSubmit={applyFilters} className={`${showMobileFilters ? 'block mt-4' : 'hidden'} md:grid md:grid-cols-12 gap-3`}>
                <div className="md:col-span-3">
                    <input 
                        type="text" 
                        name="keyword"
                        value={filters.keyword}
                        onChange={handleFilterChange}
                        placeholder="Search keyword..." 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#F9A826]" 
                    />
                </div>
                <div className="md:col-span-2">
                    <select 
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#F9A826] bg-white"
                    >
                        <option value="All">All Types</option>
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Land">Land</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <input 
                        type="number" 
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        placeholder="Min Price (GH₵)" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#F9A826]" 
                    />
                </div>
                <div className="md:col-span-2">
                    <input 
                        type="number" 
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        placeholder="Max Price (GH₵)" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#F9A826]" 
                    />
                </div>
                <div className="md:col-span-1">
                    <select 
                        name="bedrooms"
                        value={filters.bedrooms}
                        onChange={handleFilterChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#F9A826] bg-white"
                    >
                        <option value="Any">Beds</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4+">4+</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <button 
                        type="submit"
                        className="w-full h-full bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] transition-colors py-2.5 shadow-md"
                    >
                        Filter Results
                    </button>
                </div>
            </form>
        </div>

        {/* Listings Grid */}
        {filteredProperties.length > 0 ? (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {filteredProperties.map((property) => (
                        <RentalPropertyCard 
                            key={property.id} 
                            property={property} 
                            onClick={() => onNavigate('property-detail')}
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
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm mt-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6 text-gray-400">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-[#0A2B4C] mb-2">No rental properties found</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">We couldn't find any properties matching your current filters. Try adjusting your search criteria.</p>
                <button 
                    onClick={handleReset}
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

export default ForRentPage;
