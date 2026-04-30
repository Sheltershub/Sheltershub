
import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import PropertyCard from '../PropertyCard';
import { featuredProperties } from '../../constants';

interface BuyerProfilePageProps {
  onNavigate: (page: string) => void;
  userRole?: string;
}

const BuyerProfilePage: React.FC<BuyerProfilePageProps> = ({ onNavigate, userRole = 'user' }) => {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: null as string | null
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load persisted profile
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfile({
          fullName: parsed.fullName || 'John Doe',
          email: parsed.email || 'john.doe@example.com',
          profileImage: parsed.profileImage || null
        });
      } catch (e) {
        // Failed to parse saved profile, ignore and use default
      }
    }
  }, []);

  const [savedProperties] = useState(featuredProperties.slice(0, 3));
  
  const recentActivities = [
    { id: 1, action: "Viewed Property", detail: "Luxury Villa in East Legon", time: "2 hours ago" },
    { id: 2, action: "Sent Inquiry", detail: "To Agent Sarah regarding Downtown Apt", time: "Yesterday" },
    { id: 3, action: "Saved Property", detail: "Seaside Condo in Labadi", time: "2 days ago" },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen font-sans transition-colors duration-300">
      <Header onNavigate={onNavigate} activePage="buyer-profile" userRole={userRole} />

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-brand-blue-dark border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <button onClick={() => onNavigate('home')} className="hover:text-brand-orange transition-colors">Home</button>
                <span className="mx-2">/</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">Buyer Profile</span>
            </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Profile Card */}
            <aside className="lg:col-span-4 self-start">
                <div className="bg-white dark:bg-brand-blue-dark rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden mb-6">
                    <div className="h-24 bg-brand-blue dark:bg-brand-blue-dark/50"></div>
                    <div className="px-6 pb-8 text-center -mt-12">
                        <div className="relative inline-block mb-4">
                            <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden border-4 border-white dark:border-brand-blue-dark shadow-md mx-auto">
                                <img 
                                    src={profile.profileImage || `https://ui-avatars.com/api/?name=${profile.fullName.split(' ').join('+')}&background=0A2B4C&color=fff&size=128`} 
                                    alt="User Profile" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{profile.fullName}</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{profile.email}</p>
                        
                        <button 
                            onClick={() => onNavigate('buyer-profile-edit')}
                            className="w-full py-2.5 bg-brand-orange text-white font-bold rounded-lg hover:bg-brand-orange/90 transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Account Navigation */}
                <nav className="bg-white dark:bg-brand-blue-dark rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <button 
                        onClick={() => onNavigate('buyer-saved-properties')}
                        className="w-full flex items-center justify-between px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-brand-blue transition-colors border-b dark:border-gray-800"
                    >
                        <span className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            Saved Properties
                        </span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <button 
                        onClick={() => onNavigate('buyer-messages')}
                        className="w-full flex items-center justify-between px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-brand-blue transition-colors border-b dark:border-gray-800"
                    >
                        <span className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                            Inbox
                        </span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <button 
                        onClick={() => onNavigate('buyer-recent')}
                        className="w-full flex items-center justify-between px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-brand-blue transition-colors"
                    >
                        <span className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Recently Viewed
                        </span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </nav>
            </aside>

            {/* Right Column: Content */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* Saved Properties Preview */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Properties</h2>
                        <button 
                            onClick={() => onNavigate('buyer-saved-properties')}
                            className="text-sm font-bold text-brand-orange hover:underline flex items-center gap-1"
                        >
                            View All <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {savedProperties.map((property) => (
                            <PropertyCard 
                                key={property.id}
                                property={property} 
                                onClick={() => onNavigate('property-detail')} 
                            />
                        ))}
                    </div>
                </section>

                {/* Recent Activity */}
                <section className="bg-white dark:bg-brand-blue-dark rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 lg:p-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
                    <div className="space-y-6">
                        {recentActivities.map((activity, idx) => (
                            <div key={activity.id} className="flex gap-4 relative">
                                {idx !== recentActivities.length - 1 && (
                                    <div className="absolute top-8 left-4 w-px h-full bg-gray-100 dark:bg-gray-800"></div>
                                )}
                                <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0 relative z-10">
                                    <div className="w-2.5 h-2.5 rounded-full bg-brand-orange"></div>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="font-bold text-gray-900 dark:text-white">{activity.action}</p>
                                        <span className="text-xs text-gray-400">{activity.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default BuyerProfilePage;
