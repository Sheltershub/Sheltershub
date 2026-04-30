
import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import PropertyCard from '../PropertyCard';
import { featuredProperties } from '../../constants';

interface BuyerSavedPropertiesPageProps {
  onNavigate: (page: string) => void;
  userRole?: string;
}

const BuyerSavedPropertiesPage: React.FC<BuyerSavedPropertiesPageProps> = ({ onNavigate, userRole = 'user' }) => {
  const [savedProperties, setSavedProperties] = useState(featuredProperties.slice(0, 5));

  const handleRemove = (id: number) => {
    setSavedProperties(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <Header onNavigate={onNavigate} activePage="buyer-profile" userRole={userRole} />

      <div className="bg-white dark:bg-brand-blue-dark border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <button onClick={() => onNavigate('home')} className="hover:text-brand-orange transition-colors">Home</button>
                <span className="mx-2">/</span>
                <button onClick={() => onNavigate('buyer-profile')} className="hover:text-brand-orange transition-colors">Profile</button>
                <span className="mx-2">/</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">Saved Properties</span>
            </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Saved Properties</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage all your saved property listings in one place.</p>
        </div>

        {savedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {savedProperties.map((property) => (
                    <div key={property.id} className="flex flex-col">
                        <PropertyCard 
                            property={property} 
                            onClick={() => onNavigate('property-detail')} 
                        />
                        <button 
                            onClick={() => handleRemove(property.id)}
                            className="mt-3 flex items-center justify-center gap-2 py-2 text-sm font-bold text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900/50"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        ) : (
            <div className="bg-white dark:bg-brand-blue-dark rounded-2xl border border-gray-200 dark:border-gray-800 p-16 text-center shadow-sm">
                <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No saved properties yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">Click the heart icon on any property to save it here for later viewing or tracking.</p>
                <button 
                    onClick={() => onNavigate('home')}
                    className="px-8 py-3 bg-brand-orange text-white font-bold rounded-lg hover:bg-brand-orange/90 transition-all shadow-md"
                >
                    Start Exploring
                </button>
            </div>
        )}
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default BuyerSavedPropertiesPage;
