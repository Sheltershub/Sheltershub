
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Property, PropertyStatus } from '../types';
import { allPropertiesList } from '../constants';
import { AreaIcon, HeartIcon, LocationIcon } from './icons/PropertyIcons';
import { formatCurrency } from '../utils/currency';

interface LandForSalePageProps {
  onNavigate: (page: string) => void;
}

// Specialized Land Card (Emphasizes Area, hides Beds/Baths)
const LandPropertyCard: React.FC<{ property: Property; onClick: () => void }> = ({ property, onClick }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    onClick();
  };

  // Mock location based on ID
  const mockLocations = ["Aburi, Eastern Region", "Dodowa, Greater Accra", "Prampram, Greater Accra", "Oyarifa, Accra", "Tse Addo, Accra", "Shai Hills"];
  const location = mockLocations[property.id % mockLocations.length];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden group transition-shadow duration-300 shadow-sm hover:shadow-lg flex flex-col h-full">
      <div className="relative cursor-pointer" onClick={handleCardClick}>
        <img src={property.images[currentImageIndex]} alt={property.name} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" />

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="bg-[#0A2B4C] text-white text-xs font-bold px-3 py-1.5 rounded-md shadow uppercase tracking-wide">
            For Sale
          </span>
          <span className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow uppercase tracking-wide">
            Land
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
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Plot / Land</p>
        </div>

        <h3 className="font-bold text-lg text-[#0A2B4C] truncate mb-2 group-hover:text-[#F9A826] transition-colors">{property.name}</h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-6 gap-1">
            <LocationIcon className="w-4 h-4 text-gray-400" />
            {location}
        </div>
        
        {/* Land specific details - Emphasizing Size */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full border border-gray-100 text-[#F9A826]">
                    <AreaIcon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Total Area</span>
                    <span className="font-bold text-gray-800 text-sm">
                        {property.areaSqm} sqm <span className="text-gray-400 font-normal">/ {(property.areaSqm / 4046.86).toFixed(2)} acres</span>
                    </span>
                </div>
            </div>
        </div>

        <div className="mt-auto">
          <p className="text-xl font-bold text-[#0A2B4C]">
            {formatCurrency(property.priceGHS)}
          </p>
          <div className="flex justify-between items-center mt-2">
             <span className="text-xs text-gray-400">USD {property.priceUSD.toLocaleString('en-US')}</span>
             <button className="text-xs font-bold text-white bg-[#0A2B4C] px-3 py-1.5 rounded hover:bg-[#08223c] transition-colors">
                View Details
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandForSalePage: React.FC<LandForSalePageProps> = ({ onNavigate }) => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Filter specifically for Land
    const landList = allPropertiesList.filter(
        p => p.propertyType === 'Land' && (p.status === PropertyStatus.ForSale || p.status === PropertyStatus.Sold)
    );
    
    // Fallback if data generation doesn't produce enough Land items
    let displayList = landList;
    if (displayList.length === 0) {
        displayList = allPropertiesList.slice(0, 4).map(p => ({
            ...p, 
            propertyType: 'Land', 
            status: PropertyStatus.ForSale,
            beds: 0,
            baths: 0,
            garage: 0,
            name: p.name.replace('Home', 'Plot').replace('Apartment', 'Acreage').replace('Villa', 'Estate Land')
        }));
    }

    setFilteredProperties(displayList);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="land-for-sale" />

      {/* Page Title Section */}
      <div className="bg-[#0A2B4C] text-white py-16">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Land for Sale</h1>
            <p className="text-blue-100 text-lg font-light max-w-2xl mx-auto">Secure prime plots and acreage for your next residential or commercial project.</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 -mt-8 relative z-10">
        
        {/* Listings Grid */}
        {filteredProperties.length > 0 ? (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {filteredProperties.map((property) => (
                        <LandPropertyCard 
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
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-[#0A2B4C] mb-2">No land listings found</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">We couldn't find any land for sale at the moment.</p>
                <button 
                    onClick={() => onNavigate('for-sale')}
                    className="px-8 py-3 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15] shadow-md transition-colors"
                >
                    View All Sales
                </button>
            </div>
        )}

      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default LandForSalePage;
