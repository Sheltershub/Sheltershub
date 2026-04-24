
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import PropertyCard from './PropertyCard';
import { featuredProperties } from '../constants';
import { BedIcon, BathIcon, GarageIcon, AreaIcon, CheckIcon, LocationIcon } from './icons/PropertyIcons';
import { formatCurrency } from '../utils/currency';

interface ComparePropertiesPageProps {
  onNavigate: (page: string) => void;
}

const ComparePropertiesPage: React.FC<ComparePropertiesPageProps> = ({ onNavigate }) => {
  // Initialize with 3 properties for demo
  const [comparing, setComparing] = useState(featuredProperties.slice(0, 3));
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const removeProperty = (id: number) => {
    setComparing(comparing.filter(p => p.id !== id));
  };

  const addRandomProperty = () => {
    // Find a property not currently being compared
    const available = featuredProperties.find(p => !comparing.some(c => c.id === p.id));
    if (available) {
      setComparing([...comparing, available]);
    } else {
      alert("No more properties to add from the demo list!");
    }
  };

  const amenities = [
    "Air Conditioning", "Swimming Pool", "Gym", "Internet", "Parking", "Security"
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="properties" />

      {/* Page Title Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold text-[#0A2B4C] mb-2">Compare Properties</h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Select properties to see how they stack up side by side.</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        
        {comparing.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-12">
                <div className="overflow-x-auto custom-scrollbar">
                    <div className="min-w-[800px] lg:min-w-full">
                        {/* Table Header / Property Info */}
                        <div className="grid" style={{ gridTemplateColumns: `200px repeat(${comparing.length}, minmax(280px, 1fr))` }}>
                            
                            {/* Labels Column */}
                            <div className="p-6 border-b border-r border-gray-100 bg-gray-50 flex flex-col justify-end">
                                <span className="font-bold text-gray-400 uppercase text-xs tracking-wider">Property Details</span>
                            </div>

                            {/* Property Columns */}
                            {comparing.map(property => (
                                <div key={property.id} className="p-6 border-b border-r border-gray-100 relative group min-w-[280px]">
                                    <button 
                                        onClick={() => removeProperty(property.id)}
                                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-white rounded-full p-1 shadow-sm border border-gray-200 transition-colors z-10"
                                        title="Remove"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                    
                                    <div className="h-48 rounded-lg overflow-hidden mb-4 relative cursor-pointer" onClick={() => onNavigate('property-detail')}>
                                        <img src={property.images[0]} alt={property.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                        <span className="absolute top-2 left-2 bg-[#F9A826] text-white text-[10px] font-bold px-2 py-1 rounded shadow uppercase">{property.status}</span>
                                    </div>
                                    
                                    <h3 className="font-bold text-[#0A2B4C] text-lg mb-1 truncate" title={property.name}>{property.name}</h3>
                                    <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
                                        <LocationIcon className="w-4 h-4" /> Cantonments, Accra {/* Mock Location */}
                                    </p>
                                    <p className="font-bold text-xl text-[#F9A826] mb-4">
                                        {formatCurrency(property.priceGHS)}
                                    </p>
                                    
                                    <button 
                                        onClick={() => onNavigate('property-detail')}
                                        className="w-full py-2 border border-[#0A2B4C] text-[#0A2B4C] font-semibold rounded hover:bg-[#0A2B4C] hover:text-white transition-colors text-sm"
                                    >
                                        View Details
                                    </button>
                                </div>
                            ))}
                            
                            {/* Add Property Button (if space allows, for simplicity limiting layout to grid above) */}
                        </div>

                        {/* Comparison Rows */}
                        <div className="grid bg-white" style={{ gridTemplateColumns: `200px repeat(${comparing.length}, minmax(280px, 1fr))` }}>
                            
                            {/* Type */}
                            <div className="p-4 border-b border-r border-gray-100 bg-gray-50 font-semibold text-gray-700 text-sm flex items-center">Property Type</div>
                            {comparing.map(p => (
                                <div key={p.id} className="p-4 border-b border-r border-gray-100 text-gray-600 text-sm text-center">{p.propertyType}</div>
                            ))}

                            {/* Beds */}
                            <div className="p-4 border-b border-r border-gray-100 bg-gray-50 font-semibold text-gray-700 text-sm flex items-center">Bedrooms</div>
                            {comparing.map(p => (
                                <div key={p.id} className="p-4 border-b border-r border-gray-100 text-gray-600 text-sm text-center flex items-center justify-center gap-2">
                                    <BedIcon className="w-5 h-5 text-gray-400" /> {p.beds}
                                </div>
                            ))}

                            {/* Baths */}
                            <div className="p-4 border-b border-r border-gray-100 bg-gray-50 font-semibold text-gray-700 text-sm flex items-center">Bathrooms</div>
                            {comparing.map(p => (
                                <div key={p.id} className="p-4 border-b border-r border-gray-100 text-gray-600 text-sm text-center flex items-center justify-center gap-2">
                                    <BathIcon className="w-5 h-5 text-gray-400" /> {p.baths}
                                </div>
                            ))}

                            {/* Garage */}
                            <div className="p-4 border-b border-r border-gray-100 bg-gray-50 font-semibold text-gray-700 text-sm flex items-center">Garage</div>
                            {comparing.map(p => (
                                <div key={p.id} className="p-4 border-b border-r border-gray-100 text-gray-600 text-sm text-center flex items-center justify-center gap-2">
                                    <GarageIcon className="w-5 h-5 text-gray-400" /> {p.garage}
                                </div>
                            ))}

                            {/* Area */}
                            <div className="p-4 border-b border-r border-gray-100 bg-gray-50 font-semibold text-gray-700 text-sm flex items-center">Area Size</div>
                            {comparing.map(p => (
                                <div key={p.id} className="p-4 border-b border-r border-gray-100 text-gray-600 text-sm text-center flex items-center justify-center gap-2">
                                    <AreaIcon className="w-5 h-5 text-gray-400" /> {p.areaSqm} sqm
                                </div>
                            ))}

                            {/* Amenities Loop */}
                            {amenities.map((amenity, idx) => (
                                <React.Fragment key={idx}>
                                    <div className="p-4 border-b border-r border-gray-100 bg-gray-50 font-semibold text-gray-700 text-sm flex items-center">{amenity}</div>
                                    {comparing.map(p => {
                                        // Randomize amenities availability for demo
                                        const hasAmenity = (p.id + idx) % 2 === 0; 
                                        return (
                                            <div key={p.id} className="p-4 border-b border-r border-gray-100 text-center flex items-center justify-center">
                                                {hasAmenity ? (
                                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                        <CheckIcon className="w-4 h-4" />
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-300">-</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </React.Fragment>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-[#0A2B4C] mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Properties Selected</h3>
                <p className="text-gray-500 mb-6">Add properties to start comparing features and prices.</p>
            </div>
        )}

        {/* Add / Suggested Section */}
        {comparing.length < 4 && (
            <div className="mb-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#0A2B4C]">Add Properties to Compare</h2>
                    {comparing.length > 0 && (
                        <button onClick={addRandomProperty} className="text-[#F9A826] font-semibold hover:underline">
                            + Auto Add Random Property (Demo)
                        </button>
                    )}
                </div>
                
                {/* Simplified Suggestion Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredProperties
                        .filter(p => !comparing.some(c => c.id === p.id))
                        .slice(0, 3)
                        .map(property => (
                            <div key={property.id} className="bg-white p-4 rounded-xl border border-gray-200 flex gap-4 items-center group">
                                <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                    <img src={property.images[0]} alt={property.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow min-w-0">
                                    <h4 className="font-bold text-[#0A2B4C] truncate">{property.name}</h4>
                                    <p className="text-sm text-gray-500 mb-2">{formatCurrency(property.priceGHS)}</p>
                                    <button 
                                        onClick={() => setComparing([...comparing, property])}
                                        className="text-xs bg-[#F9A826] text-white px-3 py-1.5 rounded font-bold hover:bg-[#d88d15] transition-colors"
                                    >
                                        Add to Compare
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )}

      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default ComparePropertiesPage;
