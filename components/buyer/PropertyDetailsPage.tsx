
import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import PropertyCard from '../PropertyCard';
import { featuredProperties } from '../../constants';
import { BedIcon, BathIcon, GarageIcon, AreaIcon, HeartIcon, LocationIcon, CheckIcon, ShareIcon, PrintIcon, DownloadIcon } from '../icons/PropertyIcons';
import { formatCurrency } from '../../utils/currency';

interface PropertyDetailsPageProps {
  onNavigate: (page: string) => void;
  propertyId?: number;
  userRole?: string;
}

const PropertyDetailsPage: React.FC<PropertyDetailsPageProps> = ({ onNavigate, propertyId, userRole = 'guest' }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate loading state
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [propertyId]);

  const formatPropertyId = (id: number) => `SH-${id.toString().padStart(3, '0')}`;

  const property = {
    id: propertyId || 10,
    title: "Luxury Villa with Panoramic Ocean Views",
    address: "123 Coastal Highway, Malibu, CA 90265",
    priceGHS: 18500000,
    priceUSD: 1250000,
    description: "Experience the pinnacle of luxury living in this stunning modern family home. Nestled in a quiet, tree-lined street, this property offers a perfect blend of contemporary design and comfort. The spacious open-plan living area is flooded with natural light, featuring high ceilings and premium finishes throughout.\n\nThe gourmet kitchen is equipped with state-of-the-art appliances, custom cabinetry, and a large island, making it a chef's dream. Step outside to your private oasis, complete with a landscaped garden and a sparkling swimming pool, perfect for entertaining guests or enjoying a quiet evening with family.",
    type: "House",
    propertyTypeDetail: "Detached Villa",
    usage: "Residential",
    region: "Greater Accra",
    city: "Accra",
    neighborhood: "Cantonments",
    status: "For Sale",
    isPremium: true,
    bedrooms: 5,
    bathrooms: 4,
    garage: 3,
    area: 4500,
    yearBuilt: 2022,
    images: [
      "https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg",
      "https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg",
      "https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg",
      "https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg",
    ],
    features: ["Air Conditioning", "Swimming Pool", "Central Heating", "Gym", "Security Alarm", "WiFi"],
    agent: {
        name: "Sarah Wilson",
        role: "Senior Real Estate Agent",
        image: "https://i.pravatar.cc/150?u=sarah",
        phone: "+233 50 000 0000"
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-slate-dark-950 min-h-screen transition-colors duration-300">
        <Header onNavigate={onNavigate} activePage="properties" userRole={userRole} />
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-bold animate-pulse">Loading property details...</p>
        </div>
        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <Header onNavigate={onNavigate} activePage="properties" userRole={userRole} />

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8 gap-6">
            <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-brand-blue text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{property.status}</span>
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">ID: {formatPropertyId(property.id)}</span>
                    {property.isPremium && (
                        <span className="bg-brand-orange text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Featured</span>
                    )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">{property.title}</h1>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <LocationIcon className="w-5 h-5 mr-1" />
                    {property.address}
                </div>
            </div>
            <div className="text-right bg-white dark:bg-slate-dark-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-dark-800 shadow-sm min-w-[240px]">
                 <p className="text-3xl font-black text-brand-orange mb-1">{formatCurrency(property.priceGHS)}</p>
                 <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">~ USD {property.priceUSD.toLocaleString()}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-10">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gray-200 dark:bg-gray-800 group">
                        <img 
                            src={property.images[activeImage]} 
                            alt="Main Property" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                             <div className="flex gap-2">
                                <button onClick={() => setIsFavorited(!isFavorited)} className="p-3 bg-white dark:bg-slate-dark-900 rounded-xl shadow-lg hover:scale-110 transition-transform">
                                    <HeartIcon className="w-6 h-6" isFilled={isFavorited} />
                                </button>
                                <button className="p-3 bg-white dark:bg-slate-dark-900 rounded-xl shadow-lg hover:scale-110 transition-transform">
                                    <ShareIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                                </button>
                             </div>
                             <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs font-bold">
                                {activeImage + 1} / {property.images.length}
                             </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {property.images.map((img, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => setActiveImage(idx)}
                                className={`aspect-video rounded-xl overflow-hidden border-4 transition-all ${activeImage === idx ? 'border-brand-orange' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            >
                                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Property Specs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: BedIcon, label: 'Bedrooms', value: property.bedrooms },
                        { icon: BathIcon, label: 'Bathrooms', value: property.bathrooms },
                        { icon: GarageIcon, label: 'Garage', value: property.garage },
                        { icon: AreaIcon, label: 'Area Size', value: `${property.area} sqft` }
                    ].map((spec, i) => (
                        <div key={i} className="bg-white dark:bg-slate-dark-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-dark-800 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-orange">
                                <spec.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{spec.label}</p>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{spec.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Description */}
                <div className="bg-white dark:bg-slate-dark-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-dark-800 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b dark:border-slate-dark-800 pb-4">Description</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line text-sm">
                        {property.description}
                    </p>

                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-10 mb-6">Key Features</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                        {property.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <CheckIcon className="w-4 h-4 text-brand-orange" />
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Location Map Placeholder */}
                <div className="bg-white dark:bg-slate-dark-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-dark-800 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Location</h3>
                    <div className="aspect-video w-full rounded-2xl bg-gray-100 dark:bg-slate-dark-950 relative flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                         <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-l+f9a826(-118.49,34.01)/-118.49,34.01,12/800x450?access_token=pk.mock')] bg-cover bg-center"></div>
                         <div className="relative z-10 bg-white/90 dark:bg-slate-dark-900/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-white dark:border-slate-dark-800 shadow-xl flex items-center gap-4">
                            <div className="w-10 h-10 bg-brand-orange text-white rounded-full flex items-center justify-center shadow-lg">
                                <LocationIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{property.neighborhood}, {property.city}</p>
                                <p className="text-xs text-gray-500">{property.address}</p>
                            </div>
                         </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
                {/* Agent Contact Card */}
                <div className="bg-white dark:bg-slate-dark-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-dark-800 shadow-lg sticky top-24">
                    <div className="text-center mb-8">
                        <div className="relative inline-block mb-4">
                            <img src={property.agent.image} alt="Agent" className="w-24 h-24 rounded-3xl object-cover shadow-xl border-4 border-white dark:border-slate-dark-800" />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white dark:border-slate-dark-800 rounded-full"></div>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">{property.agent.name}</h4>
                        <p className="text-xs text-brand-orange font-bold uppercase tracking-widest">{property.agent.role}</p>
                    </div>

                    <div className="space-y-4 mb-8">
                        <button 
                            onClick={() => onNavigate('buyer-messages')}
                            className="w-full bg-[#0A2B4C] text-white font-bold py-4 rounded-2xl hover:bg-[#08223c] transition-all shadow-lg flex items-center justify-center gap-3"
                        >
                            <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                            Contact Agent
                        </button>
                        <div className="flex gap-3">
                            <button className="flex-grow bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.41 0 .01 5.403.007 12.04c0 2.123.553 4.197 1.604 6.02L0 24l6.117-1.605A11.772 11.772 0 0012.046 24c6.638 0 12.038-5.403 12.041-12.04a11.82 11.82 0 00-3.526-8.51z"/></svg>
                            </button>
                            <button className="flex-grow bg-white dark:bg-slate-dark-900 border border-gray-200 dark:border-slate-dark-800 text-gray-700 dark:text-white font-bold py-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-dark-800 transition-all shadow-sm flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-dark-950/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-dark-800">
                        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Safety Tips</h5>
                        <ul className="text-[11px] text-gray-500 space-y-2 list-disc list-inside">
                            <li>View property before paying</li>
                            <li>Meet agent in public places</li>
                            <li>Do not share verification codes</li>
                        </ul>
                    </div>
                </div>
            </aside>
        </div>

        {/* Similar Properties */}
        <div className="mt-20 border-t dark:border-slate-dark-800 pt-16">
            <div className="flex justify-between items-end mb-10">
                <div>
                     <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Similar Properties</h3>
                     <p className="text-sm text-gray-500">Based on your current view and preferences.</p>
                </div>
                <button onClick={() => onNavigate('properties')} className="text-brand-orange font-bold text-sm hover:underline">View All Properties</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProperties.slice(0, 3).map((prop) => (
                    <PropertyCard key={prop.id} property={prop} onClick={() => onNavigate(`property-${prop.id}`)} />
                ))}
            </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default PropertyDetailsPage;
