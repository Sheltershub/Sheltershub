
import React from 'react';
import { Property } from '../types';
import PropertyCard from './PropertyCard';

interface PropertyListProps {
  title: string;
  properties: Property[];
  onPropertyClick?: (id: number) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ title, properties, onPropertyClick }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard 
            key={property.id} 
            property={property} 
            onClick={() => onPropertyClick && onPropertyClick(property.id)}
          />
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="bg-white dark:bg-[#0A2B4C] border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 dark:hover:bg-blue-900/30 transition-colors shadow-sm">
          More Properties
        </button>
      </div>
    </section>
  );
};

export default PropertyList;
