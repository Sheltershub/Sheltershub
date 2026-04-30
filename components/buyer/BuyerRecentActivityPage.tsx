
import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import PropertyCard from '../PropertyCard';
import { latestProperties } from '../../constants';

interface BuyerRecentActivityPageProps {
  onNavigate: (page: string) => void;
  userRole?: string;
}

const BuyerRecentActivityPage: React.FC<BuyerRecentActivityPageProps> = ({ onNavigate, userRole = 'user' }) => {
  const [recentProperties] = useState(latestProperties.slice(0, 4));

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
                <span className="text-gray-900 dark:text-gray-100 font-medium">Recently Viewed</span>
            </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Recently Viewed</h1>
            <p className="text-gray-500 dark:text-gray-400">Properties you have recently looked at.</p>
        </div>

        {recentProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentProperties.map((property) => (
                    <PropertyCard 
                        key={property.id}
                        property={property} 
                        onClick={() => onNavigate('property-detail')} 
                    />
                ))}
            </div>
        ) : (
            <div className="bg-white dark:bg-brand-blue-dark rounded-2xl border border-gray-200 dark:border-gray-800 p-16 text-center shadow-sm">
                <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Notice anything?</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">Your recently viewed properties will appear here so you can easily find them again.</p>
                <button 
                    onClick={() => onNavigate('home')}
                    className="px-8 py-3 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] transition-all shadow-md"
                >
                    Start Browsing
                </button>
            </div>
        )}
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default BuyerRecentActivityPage;
