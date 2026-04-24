
import React, { useState } from 'react';
import { Property, PropertyStatus } from '../types';
import { BedIcon, BathIcon, GarageIcon, HeartIcon } from './icons/PropertyIcons';
import { formatCurrency } from '../utils/currency';

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger navigation if clicking navigation buttons or favorite
    if ((e.target as HTMLElement).closest('button')) return;
    if (onClick) onClick();
  };

  const getStatusColor = (status: string) => {
      switch (status) {
          case PropertyStatus.ForSale:
              return 'bg-[#0A2B4C] text-white'; // Brand Blue
          case PropertyStatus.ForRent:
              return 'bg-[#2563EB] text-white'; // Brighter Blue/Royal
          case PropertyStatus.Sold:
              return 'bg-red-600 text-white'; // Red
          default:
              return 'bg-gray-100 text-gray-800';
      }
  };

  return (
    <div className="bg-white dark:bg-[#082956] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden group transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col h-full">
      <div className="relative cursor-pointer" onClick={handleCardClick}>
        <img src={property.images[currentImageIndex]} alt={property.name} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" />

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className={`${getStatusColor(property.status)} text-xs font-bold px-3 py-1.5 rounded-md shadow uppercase tracking-wide`}>
            {property.status}
          </span>
          {/* Only show 'Days Ago' if not Sold */}
          {property.status !== PropertyStatus.Sold && (
             <span className="bg-white dark:bg-brand-blue-dark dark:text-gray-200 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-md shadow">{property.daysAgo} Days Ago</span>
          )}
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); setIsFavorited(!isFavorited); }}
          className="absolute top-4 right-4 p-2 rounded-full text-white bg-black/10 hover:text-red-500 hover:bg-white dark:hover:bg-brand-blue-dark transition-all backdrop-blur-sm" 
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
                    aria-label={`Go to image ${index + 1}`}
                />
            ))}
            </div>
        )}

        {property.isPremium && (
          <span className="absolute bottom-4 right-4 bg-[#F9A826] text-white text-xs font-bold px-3 py-1 rounded shadow uppercase">
            Featured
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow cursor-pointer" onClick={handleCardClick}>
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{property.propertyType}</p>
        </div>

        <h3 className="font-bold text-lg text-[#0A2B4C] dark:text-white truncate mb-4 group-hover:text-[#F9A826] transition-colors">{property.name}</h3>
        
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                    <BedIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className="font-bold text-sm">{property.beds}</span>
                </div>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">Beds</span>
            </div>

            <div className="w-px h-8 bg-gray-100 dark:bg-gray-700"></div>

            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                    <BathIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className="font-bold text-sm">{property.baths}</span>
                </div>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">Baths</span>
            </div>

            <div className="w-px h-8 bg-gray-100 dark:bg-gray-700"></div>

            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                    <GarageIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className="font-bold text-sm">{property.garage}</span>
                </div>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">Garage</span>
            </div>
        </div>

        <div className="mt-auto">
          <p className="text-xl font-bold text-[#0A2B4C] dark:text-brand-orange">
            {formatCurrency(property.priceGHS)}
          </p>
          <div className="flex justify-between items-center mt-1">
             <p className="text-xs text-gray-500 dark:text-gray-400">
                USD {property.priceUSD.toLocaleString('en-US')}
            </p>
            <span className="text-xs font-medium text-[#F9A826] hover:underline">View Details</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
