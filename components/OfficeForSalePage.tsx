
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Property, PropertyStatus } from '../types';
import { allPropertiesList } from '../constants';
import { AreaIcon, HeartIcon, LocationIcon, GarageIcon } from './icons/PropertyIcons';
import { formatCurrency } from '../utils/currency';

interface OfficeForSalePageProps {
  onNavigate: (page: string) => void;
}

// Sale Card for Office
const SalePropertyCard: React.FC<{ property: Property; onClick: () => void }> = ({ property, onClick }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    onClick();
  };

  // Mock location based on ID
  const mockLocations = ["Airport City, Accra", "Ridge, Accra", "North Kaneshie", "Spintex Road", "Tema Community 1", "Osu, Accra"];
  const location = mockLocations[property.id % mockLocations.length];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden group transition-shadow duration-300 shadow-sm hover:shadow-lg flex flex-col h-full">
      <div className="relative cursor-pointer" onClick={handleCardClick}>
        <img src={property.images[currentImageIndex]} alt={property.name} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" />

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="bg-[#0A2B4C] text-white text-xs font-bold px-3 py-1.5 rounded-md shadow uppercase tracking-wide">
            For Sale
          </span>
          <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow uppercase tracking-wide">
            Office
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
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Commercial Property</p>
        </div>

        <h3 className="font-bold text-lg text-[#0A2B4C] truncate mb-2 group-hover:text-[#F9A826] transition-colors">{property.name}</h3>

        <div className="flex items-center text-sm text-gray-500 mb-4 gap-1">
            <LocationIcon className="w-4 h-4 text-gray-400" />
            {location}
        </div>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-gray-700">
                    <AreaIcon className="w-4 h-4 text-gray-400" />
                    <span className="font-bold text-sm">{property.areaSqm}</span>
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5">sqm</span>
            </div>
            <div className="w-px h-8 bg-gray-100"></div>
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-gray-700">
                    <GarageIcon className="w-4 h-4 text-gray-400" />
                    <span className="font-bold text-sm">{property.garage}</span>
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5">Parking</span>
            </div>
            <div className="w-px h-8 bg-gray-100"></div>
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-gray-700">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    <span className="font-bold text-sm">{property.baths + 2}</span>
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5">Rooms</span>
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

const OfficeForSalePage: React.FC<OfficeForSalePageProps> = ({ onNavigate }) => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Filter specifically for Commercial properties marked For Sale
    const officesForSale = allPropertiesList.filter(
        p => (p.status === PropertyStatus.ForSale || p.status === PropertyStatus.Sold) && p.propertyType === 'Commercial'
    );

    // Fallback if data generation doesn't produce enough
    let displayList = officesForSale;
    if (displayList.length === 0) {
        displayList = allPropertiesList.slice(0, 4).map(p => ({
            ...p,
            propertyType: 'Commercial',
            status: PropertyStatus.ForSale,
            name: p.name.replace('Home', 'Office Complex').replace('Villa', 'Business Center')
        }));
    }

    setFilteredProperties(displayList);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="office-for-sale" />

      {/* Page Title Section */}
      <div className="bg-[#0A2B4C] text-white py-16">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Offices for Sale</h1>
            <p className="text-blue-100 text-lg font-light max-w-2xl mx-auto">Invest in prime office space and commercial real estate.</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 -mt-8 relative z-10">

        {/* Listings Grid */}
        {filteredProperties.length > 0 ? (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {filteredProperties.map((property) => (
                        <SalePropertyCard
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
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-[#0A2B4C] mb-2">No offices found</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">We couldn't find any office spaces for sale at the moment.</p>
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

export default OfficeForSalePage;
