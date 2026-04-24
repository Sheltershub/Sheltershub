
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import PropertyCard from './PropertyCard';
import { featuredProperties } from '../constants';

interface UserProfilePageProps {
  onNavigate: (page: string) => void;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [savedProperties, setSavedProperties] = useState(featuredProperties.slice(0, 3));
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    promotions: true,
    newListings: true,
  });

  const handleRemoveProperty = (id: number) => {
    setSavedProperties(savedProperties.filter(p => p.id !== id));
  };

  const handleToggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const activityLog = [
    { id: 1, action: "Viewed Property", detail: "Luxury Villa in East Legon", time: "2 hours ago" },
    { id: 2, action: "Sent Inquiry", detail: "To Agent Sarah regarding Downtown Apt", time: "Yesterday" },
    { id: 3, action: "Saved Property", detail: "Seaside Condo in Labadi", time: "2 days ago" },
    { id: 4, action: "Updated Profile", detail: "Changed phone number", time: "1 week ago" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="home" />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center text-sm text-gray-500">
                <button onClick={() => onNavigate('home')} className="hover:text-[#F9A826] transition-colors">Home</button>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">My Profile</span>
            </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10 max-w-6xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Profile & Settings Navigation */}
            <aside className="lg:col-span-4 space-y-6">
                
                {/* 2. Profile Overview Section */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
                    <div className="relative inline-block mb-4">
                        <div className="w-28 h-28 rounded-full bg-gray-100 overflow-hidden border-4 border-white shadow-md mx-auto">
                            <img 
                                src="https://ui-avatars.com/api/?name=John+Doe&background=0A2B4C&color=fff&size=128" 
                                alt="User Profile" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button className="absolute bottom-0 right-0 bg-[#F9A826] text-white p-2 rounded-full shadow hover:bg-[#d88d15] transition-colors" title="Change Photo">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </button>
                    </div>
                    
                    <h2 className="text-xl font-bold text-[#0A2B4C] mb-1">John Doe</h2>
                    <p className="text-gray-500 text-sm mb-3">john.doe@example.com</p>
                    
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-[#0A2B4C] mb-6">
                        Free Member
                    </span>

                    <button className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm">
                        Edit Profile
                    </button>
                </div>

                {/* 5. Activity Section */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-[#0A2B4C] mb-4 border-b border-gray-100 pb-2">Recent Activity</h3>
                    <div className="space-y-4">
                        {activityLog.map((activity) => (
                            <div key={activity.id} className="flex gap-3 items-start">
                                <div className="w-2 h-2 rounded-full bg-[#F9A826] mt-2 flex-shrink-0"></div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">{activity.action}</p>
                                    <p className="text-xs text-gray-500 mb-1">{activity.detail}</p>
                                    <p className="text-[10px] text-gray-400">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => onNavigate('all-properties')} className="w-full mt-6 text-sm text-[#F9A826] font-semibold hover:underline">
                        Continue Browsing &rarr;
                    </button>
                </div>

            </aside>

            {/* Right Column: Main Content */}
            <div className="lg:col-span-8 space-y-10">
                
                {/* 3. Saved Properties Section */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-[#0A2B4C]">My Saved Properties</h2>
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">{savedProperties.length} Saved</span>
                    </div>

                    {savedProperties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {savedProperties.map((property) => (
                                <div key={property.id} className="relative group">
                                    <PropertyCard 
                                        property={property} 
                                        onClick={() => onNavigate('property-detail')} 
                                    />
                                    <div className="mt-3 flex justify-end">
                                        <button 
                                            onClick={() => handleRemoveProperty(property.id)}
                                            className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            Remove from Saved
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 text-gray-400">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">No Saved Properties</h3>
                            <p className="text-gray-500 mb-6">You haven't saved any properties yet. Start exploring to find your dream home.</p>
                            <button 
                                onClick={() => onNavigate('all-properties')}
                                className="px-6 py-2 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] transition-colors"
                            >
                                Browse Properties
                            </button>
                        </div>
                    )}
                </section>

                <hr className="border-gray-200" />

                {/* 4. Account Settings Section */}
                <section>
                    <h2 className="text-2xl font-bold text-[#0A2B4C] mb-6">Account Settings</h2>
                    
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        
                        {/* Change Password */}
                        <div className="p-6 md:p-8 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Change Password</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Current Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" />
                                </div>
                                <div></div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Confirm New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" />
                                </div>
                                <div className="md:col-span-2">
                                    <button className="px-6 py-2 bg-[#0A2B4C] text-white font-medium rounded-lg hover:bg-[#08223c] transition-colors text-sm">
                                        Update Password
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="p-6 md:p-8 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Notification Preferences</h3>
                            <div className="space-y-4 max-w-2xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-gray-700 text-sm">Email Notifications</p>
                                        <p className="text-xs text-gray-500">Receive updates via email</p>
                                    </div>
                                    <button 
                                        onClick={() => handleToggleNotification('email')}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationSettings.email ? 'bg-[#F9A826]' : 'bg-gray-200'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationSettings.email ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-gray-700 text-sm">SMS Notifications</p>
                                        <p className="text-xs text-gray-500">Receive updates via SMS</p>
                                    </div>
                                    <button 
                                        onClick={() => handleToggleNotification('sms')}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationSettings.sms ? 'bg-[#F9A826]' : 'bg-gray-200'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationSettings.sms ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-gray-700 text-sm">New Listings Alert</p>
                                        <p className="text-xs text-gray-500">Get notified when new properties match your saved searches</p>
                                    </div>
                                    <button 
                                        onClick={() => handleToggleNotification('newListings')}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationSettings.newListings ? 'bg-[#F9A826]' : 'bg-gray-200'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationSettings.newListings ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Subscription */}
                        <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">Membership Plan</h3>
                                    <p className="text-sm text-gray-600">Current Plan: <span className="font-bold text-[#0A2B4C]">Free</span></p>
                                </div>
                                <button className="px-6 py-2 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15] transition-colors shadow-sm text-sm">
                                    Upgrade to Premium
                                </button>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="p-6 md:p-8">
                            <h3 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h3>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-gray-700 text-sm">Delete Account</p>
                                    <p className="text-xs text-gray-500">Permanently delete your account and all data</p>
                                </div>
                                <button className="px-4 py-2 border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors text-sm">
                                    Delete Account
                                </button>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </div>

      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default UserProfilePage;
