
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import PropertyCard from './PropertyCard';
import { featuredProperties } from '../constants';
import { BedIcon, BathIcon, GarageIcon, AreaIcon, HeartIcon, LocationIcon, CheckIcon, ShareIcon, PrintIcon, DownloadIcon } from './icons/PropertyIcons';
import { formatCurrency } from '../utils/currency';

interface SinglePropertyProps {
  onNavigate: (page: string) => void;
  propertyId?: number;
}

const SingleProperty: React.FC<SinglePropertyProps> = ({ onNavigate, propertyId }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  
  // Watermark State
  const [watermarkedImage, setWatermarkedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Helper to format property ID (e.g. SH-010)
  const formatPropertyId = (id: number) => {
    return `SH-${id.toString().padStart(3, '0')}`;
  };

  const getStatusColor = (status: string) => {
      switch (status) {
          case 'For Sale': return 'bg-[#0A2B4C] text-white';
          case 'For Rent': return 'bg-[#2563EB] text-white';
          case 'Sold': return 'bg-red-600 text-white';
          default: return 'bg-gray-100 text-gray-800';
      }
  };

  // Mock Data for the selected property with Master Feature Ownership Structure
  // ID 11 is forced to be SOLD in constants.ts
  const isSoldDemo = propertyId === 11;

  // Define Listing Owner Types and Structure
  type OwnerType = 'HomeOwner' | 'Agent' | 'Agency' | 'Developer';
  type ParentOrgType = 'Agency' | 'Developer';

  interface ListingOwner {
      type: OwnerType;
      name: string;
      image: string;
      phone: string;
      officePhone?: string;
      whatsapp?: string;
      website?: string;
      email: string;
      title?: string; // e.g. "Senior Agent", "Owner"
      parentOrg?: {
          type: ParentOrgType;
          name: string;
      };
  }

  // Example Configuration: Agent working under an Agency
  const listingOwner: ListingOwner = {
      type: 'Agent',
      name: 'Martin McDermott',
      title: 'Senior Property Agent',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      phone: '+1 (555) 123-4567',
      officePhone: '+1 (555) 987-6543',
      whatsapp: '+1 (555) 123-4567',
      website: 'www.primerealestate.com',
      email: 'martin@sheltershub.com',
      parentOrg: {
          type: 'Agency',
          name: 'Prime Real Estate'
      }
  };

  const property = {
    id: propertyId || 10,
    title: isSoldDemo ? "Modern Family Home (SOLD)" : "Luxury Villa with Panoramic Ocean Views",
    address: isSoldDemo ? "45 Airport Residential Area, Accra" : "123 Coastal Highway, Malibu, CA 90265",
    priceGHS: isSoldDemo ? 2500000 : 18500000,
    priceUSD: isSoldDemo ? 210000 : 1250000,
    description: "Experience the pinnacle of luxury living in this stunning modern family home. Nestled in a quiet, tree-lined street, this property offers a perfect blend of contemporary design and comfort. The spacious open-plan living area is flooded with natural light, featuring high ceilings and premium finishes throughout.\n\nThe gourmet kitchen is equipped with state-of-the-art appliances, custom cabinetry, and a large island, making it a chef's dream. Step outside to your private oasis, complete with a landscaped garden and a sparkling swimming pool, perfect for entertaining guests or enjoying a quiet evening with family.",
    type: "House",
    propertyTypeDetail: "Detached Villa",
    usage: "Residential",
    region: "Greater Accra",
    city: "Accra",
    neighborhood: isSoldDemo ? "Airport Residential" : "Cantonments",
    status: isSoldDemo ? "Sold" : "For Sale",
    isPremium: true,
    bedrooms: 5,
    bathrooms: 4,
    garage: 3,
    area: 4500, // sqft
    yearBuilt: 2022,
    availability: isSoldDemo ? "Sold" : "Immediately",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4", // Added video URL
    images: [
      "https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg",
      "https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg",
      "https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg",
      "https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg",
      "https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg"
    ],
    features: [
      "Air Conditioning", "Swimming Pool", "Central Heating", "Laundry Room", "Gym", "Alarm", 
      "Window Covering", "WiFi", "TV Cable", "Dryer", "Microwave", "Washer", "Refrigerator", "Outdoor Shower"
    ],
    owner: listingOwner // Attached the dynamic owner object
  };

  // Attribution Logic Function
  const getAttributionString = (owner: ListingOwner) => {
      if (owner.type === 'HomeOwner') {
          return 'Listed by Home Owner';
      }
      
      if (owner.type === 'Agent') {
          if (owner.parentOrg) {
              return `Listed by ${owner.name} for ${owner.parentOrg.name}`;
          }
          return `Listed by ${owner.name}`; // Independent Agent
      }

      if (owner.type === 'Agency') {
          if (owner.parentOrg && owner.parentOrg.type === 'Developer') {
              return `Listed by ${owner.name} for ${owner.parentOrg.name}`;
          }
          return `Listed by ${owner.name}`; // Independent Agency
      }

      if (owner.type === 'Developer') {
          return `Listed by ${owner.name}`;
      }

      return `Listed by ${owner.name}`;
  };

  const attributionText = getAttributionString(property.owner);

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowPhone(false);
  }, [propertyId]);

  // Watermark Generation Logic
  useEffect(() => {
    let isMounted = true;
    setIsGenerating(true);
    setWatermarkedImage(null); // Clear previous to show loading state

    const generateWatermark = async () => {
      try {
        const imageUrl = property.images[activeImage];
        const logoUrl = "https://i.ibb.co/4RJRrttb/Sheltershub-Logo-png.png";

        // Helper to load image
        const loadImage = (src: string): Promise<HTMLImageElement> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "anonymous"; // Important to prevent canvas tainting
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });
        };

        // Load both images
        const [mainImg, logoImg] = await Promise.all([
            loadImage(imageUrl),
            loadImage(logoUrl)
        ]);

        if (!isMounted) return;

        const canvas = document.createElement('canvas');
        canvas.width = mainImg.width;
        canvas.height = mainImg.height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            // 1. Draw Main Image
            ctx.drawImage(mainImg, 0, 0);

            // 2. Configure Watermark
            // Scale to 30% of the image's width
            const watermarkScale = 0.30; 
            const logoWidth = mainImg.width * watermarkScale;
            // Maintain aspect ratio
            const logoAspectRatio = logoImg.width / logoImg.height;
            const logoHeight = logoWidth / logoAspectRatio;

            // Center the watermark
            const x = (mainImg.width - logoWidth) / 2;
            const y = (mainImg.height - logoHeight) / 2;

            // 3. Draw Logo with Opacity (50%)
            ctx.globalAlpha = 0.50; // 50% Opacity
            ctx.drawImage(logoImg, x, y, logoWidth, logoHeight);
            ctx.globalAlpha = 1.0; // Reset opacity

            // 4. Set Result
            setWatermarkedImage(canvas.toDataURL('image/jpeg', 0.95));
        }
      } catch (error) {
        console.error("Watermark generation failed:", error);
        // Fallback to original image if something fails (e.g. CORS error)
        if (isMounted) setWatermarkedImage(property.images[activeImage]);
      } finally {
        if (isMounted) setIsGenerating(false);
      }
    };

    generateWatermark();

    return () => {
        isMounted = false;
    };
  }, [activeImage, property.images]);

  const handleDownload = () => {
    if (watermarkedImage) {
        const link = document.createElement('a');
        link.download = `Sheltershub_Property_${formatPropertyId(property.id)}_${activeImage + 1}.jpg`;
        link.href = watermarkedImage;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImage((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImage((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  const handleReportClick = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.setItem('reportTarget', `Property ID: ${formatPropertyId(property.id)} - ${property.title}`);
    onNavigate('report-fraud');
  };

  const handleCallClick = (e: React.MouseEvent) => {
    if (!showPhone) {
        e.preventDefault();
        setShowPhone(true);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="properties" />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center text-sm text-gray-500">
                <button onClick={() => onNavigate('home')} className="hover:text-[#F9A826] transition-colors">Home</button>
                <span className="mx-2">/</span>
                <button onClick={() => onNavigate('all-properties')} className="hover:text-[#F9A826] transition-colors">Properties</button>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-md">{property.title}</span>
            </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        
        {/* Title & Price Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <span className={`${getStatusColor(property.status)} text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wide`}>{property.status}</span>
                    <span className="text-gray-500 text-sm">ID: {formatPropertyId(property.id)}</span>
                    {property.isPremium && (
                        <span className="bg-[#F9A826] text-white text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wide">Featured</span>
                    )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#0A2B4C] leading-tight">{property.title}</h1>
                <div className="flex items-center text-gray-600 text-sm md:text-base">
                    <LocationIcon className="w-5 h-5 mr-1 text-gray-400" />
                    {property.address}
                </div>
            </div>
            <div className="text-left md:text-right">
                 <p className="text-3xl font-bold text-[#0A2B4C]">{formatCurrency(property.priceGHS)}</p>
                 <p className="text-gray-500 font-medium">USD {property.priceUSD.toLocaleString()}</p>
            </div>
        </div>

        {/* Tools Bar */}
        <div className="flex justify-end gap-3 mb-6">
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#0A2B4C] text-sm font-medium transition-colors">
                <ShareIcon className="w-4 h-4" /> Share
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#0A2B4C] text-sm font-medium transition-colors">
                <HeartIcon className="w-4 h-4" /> Save
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#0A2B4C] text-sm font-medium transition-colors">
                <PrintIcon className="w-4 h-4" /> Print
            </button>
            <button 
                onClick={handleDownload}
                disabled={isGenerating || !watermarkedImage}
                className="flex items-center gap-2 text-gray-600 hover:text-[#0A2B4C] text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-wait"
            >
                {isGenerating ? 'Preparing...' : <><DownloadIcon className="w-4 h-4" /> Download</>}
            </button>
        </div>

        {/* Gallery Section */}
        <div className="mb-10">
            <div className="rounded-xl overflow-hidden shadow-sm h-[300px] md:h-[500px] w-full bg-gray-200 mb-4 relative group flex items-center justify-center">
                {watermarkedImage ? (
                    <img 
                        src={watermarkedImage} 
                        alt={property.title} 
                        className="w-full h-full object-cover transition-transform duration-500" 
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        <svg className="animate-spin h-10 w-10 mb-2 text-[#F9A826]" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-xs font-semibold">Applying Watermark...</span>
                    </div>
                )}
                
                {/* Navigation Arrows */}
                <button 
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                    aria-label="Previous image"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button 
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                    aria-label="Next image"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>

                <button className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full text-gray-700 shadow transition-all z-10">
                    <HeartIcon className="w-6 h-6" isFilled={isFavorited} />
                </button>
            </div>
            
            {/* Thumbnails (Without Watermark) */}
            <div className="grid grid-cols-5 gap-2 md:gap-4">
                {property.images.map((img, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => setActiveImage(idx)}
                        className={`rounded-lg overflow-hidden h-20 md:h-28 border-2 transition-all ${activeImage === idx ? 'border-[#F9A826] opacity-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    >
                        <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* Core Property Details */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">Region</span>
                            <span className="text-gray-800 font-bold text-sm md:text-base">{property.region}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">City</span>
                            <span className="text-gray-800 font-bold text-sm md:text-base">{property.city}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">Area</span>
                            <span className="text-gray-800 font-bold text-sm md:text-base">{property.neighborhood}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">Type of Property</span>
                            <span className="text-gray-800 font-bold text-sm md:text-base">{property.propertyTypeDetail}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">Property Usage</span>
                            <span className="text-gray-800 font-bold text-sm md:text-base">{property.usage}</span>
                        </div>
                    </div>
                </div>

                {/* Key Info Strip */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
                        <div className="flex flex-col items-center justify-center text-center p-2">
                            <span className="text-gray-400 text-sm mb-1">Bedrooms</span>
                            <div className="flex items-center gap-2 text-[#0A2B4C] font-bold text-xl">
                                <BedIcon className="w-6 h-6 text-[#F9A826]" /> {property.bedrooms}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center p-2 md:border-l border-gray-100">
                            <span className="text-gray-400 text-sm mb-1">Bathrooms</span>
                            <div className="flex items-center gap-2 text-[#0A2B4C] font-bold text-xl">
                                <BathIcon className="w-6 h-6 text-[#F9A826]" /> {property.bathrooms}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center p-2 md:border-l border-gray-100">
                            <span className="text-gray-400 text-sm mb-1">Garage</span>
                            <div className="flex items-center gap-2 text-[#0A2B4C] font-bold text-xl">
                                <GarageIcon className="w-6 h-6 text-[#F9A826]" /> {property.garage}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center p-2 md:border-l border-gray-100">
                            <span className="text-gray-400 text-sm mb-1">Area Size</span>
                            <div className="flex items-center gap-2 text-[#0A2B4C] font-bold text-xl">
                                <AreaIcon className="w-6 h-6 text-[#F9A826]" /> {property.area} <span className="text-sm font-normal text-gray-500">sqft</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center p-2 md:border-l border-gray-100">
                            <span className="text-gray-400 text-sm mb-1">Type</span>
                            <div className="flex items-center gap-2 text-[#0A2B4C] font-bold text-xl">
                                {property.type}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-[#0A2B4C] mb-4 border-b pb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {property.description}
                    </p>

                    <h4 className="text-lg font-bold text-[#0A2B4C] mt-8 mb-4">Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
                        {property.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-gray-600 text-sm">
                                <div className="min-w-[20px] mr-2 text-[#F9A826]">
                                    <CheckIcon />
                                </div>
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Property Details Table */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-[#0A2B4C] mb-6 border-b pb-2">Property Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500 font-medium">Property ID:</span>
                            <span className="text-gray-800 font-semibold">{formatPropertyId(property.id)}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500 font-medium">Property Type:</span>
                            <span className="text-gray-800 font-semibold">{property.type}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500 font-medium">Property Status:</span>
                            <span className="text-gray-800 font-semibold">{property.status}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500 font-medium">Year Built:</span>
                            <span className="text-gray-800 font-semibold">{property.yearBuilt}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500 font-medium">Garages:</span>
                            <span className="text-gray-800 font-semibold">{property.garage}</span>
                        </div>
                         <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500 font-medium">Bedrooms:</span>
                            <span className="text-gray-800 font-semibold">{property.bedrooms}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500 font-medium">Bathrooms:</span>
                            <span className="text-gray-800 font-semibold">{property.bathrooms}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500 font-medium">Listed By:</span>
                            <span className="text-[#F9A826] font-bold">{attributionText}</span>
                        </div>
                    </div>
                </div>

                {/* Video Tour Section */}
                {property.videoUrl && (
                    <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-xl font-bold text-[#0A2B4C] mb-4 border-b pb-2">Video Tour</h3>
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                            <iframe 
                                src={property.videoUrl} 
                                title={property.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                )}

                {/* Location Map Placeholder */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-[#0A2B4C] mb-4 border-b pb-2">Location</h3>
                    <div className="bg-gray-200 rounded-lg h-80 w-full flex items-center justify-center relative overflow-hidden group cursor-pointer">
                        {/* Simulated Map */}
                        <div className="absolute inset-0 opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center"></div>
                        <div className="z-10 bg-white p-3 rounded-lg shadow-lg flex items-center gap-2">
                             <LocationIcon className="text-red-500" />
                             <span className="font-semibold text-gray-800">{property.address}</span>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
                
                {/* Contact Card (Dynamic based on Owner) */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Listing Contact</h3>
                    <div className="flex items-center gap-4 mb-6">
                        <img src={property.owner.image} alt={property.owner.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" />
                        <div>
                            <h4 className="text-lg font-bold text-[#0A2B4C]">{property.owner.name}</h4>
                            <p className="text-sm text-gray-500">{property.owner.title}</p>
                            {property.owner.type !== 'HomeOwner' && (
                                <a href="#" className="text-xs text-[#F9A826] hover:underline mt-1 block">View Profile</a>
                            )}
                        </div>
                    </div>
                    
                    {/* Relationship Badge */}
                    {property.owner.parentOrg && (
                        <div className="mb-4 bg-gray-50 p-2 rounded text-xs text-gray-600 flex items-center gap-2">
                            <span className="font-semibold">Listing for:</span>
                            <span className="font-bold text-[#0A2B4C]">{property.owner.parentOrg.name}</span>
                        </div>
                    )}
                    
                    {/* Contact Details List */}
                    <div className="space-y-4 mb-6 text-sm">
                        {property.owner.phone && (
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 p-2 rounded-full text-[#0A2B4C]">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase">Personal</p>
                                    <p className="text-gray-800 font-medium">{property.owner.phone}</p>
                                </div>
                            </div>
                        )}
                        {property.owner.officePhone && (
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 p-2 rounded-full text-[#0A2B4C]">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase">Office</p>
                                    <p className="text-gray-800 font-medium">{property.owner.officePhone}</p>
                                </div>
                            </div>
                        )}
                        {property.owner.whatsapp && (
                            <div className="flex items-center gap-3">
                                <div className="bg-green-50 p-2 rounded-full text-green-600">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase">WhatsApp</p>
                                    <p className="text-gray-800 font-medium">{property.owner.whatsapp}</p>
                                </div>
                            </div>
                        )}
                        {property.owner.website && (
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 p-2 rounded-full text-[#0A2B4C]">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase">Website</p>
                                    <a href={`https://${property.owner.website}`} target="_blank" rel="noreferrer" className="text-[#F9A826] hover:underline font-medium break-all">
                                        {property.owner.website}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    <hr className="border-gray-100 mb-6" />

                    {/* Email Form */}
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Your Email</label>
                            <input type="email" placeholder="email@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                            <input type="text" placeholder="I am interested in..." className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                            <textarea rows={4} placeholder="Type your message..." className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-[#0A2B4C] text-white font-bold py-3 rounded-lg hover:bg-[#08223c] shadow-md transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Safety Tips (Optional but standard) */}
                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-[#0A2B4C] mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#F9A826]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        Safety Tips
                    </h4>
                    <ul className="text-xs text-gray-500 space-y-2 list-disc list-inside mb-4">
                        <li>Avoid sending money before viewing.</li>
                        <li>Check all documentation carefully.</li>
                        <li>Meet in a safe, public place.</li>
                    </ul>
                    <div className="border-t border-gray-100 pt-3">
                        <a 
                            href="#" 
                            onClick={handleReportClick}
                            className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 transition-colors"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            Report This Listing
                        </a>
                    </div>
                 </div>

            </aside>
        </div>

        {/* Similar Properties Section */}
        <div className="mt-16 border-t border-gray-200 pt-12">
            <h3 className="text-2xl font-bold text-[#0A2B4C] mb-8">Similar Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProperties.slice(0, 3).map((prop) => (
                    <PropertyCard key={prop.id} property={prop} onClick={() => onNavigate('property-detail')} />
                ))}
            </div>
        </div>

      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default SingleProperty;
