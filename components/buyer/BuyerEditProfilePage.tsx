
import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import Footer from '../Footer';

interface BuyerEditProfilePageProps {
  onNavigate: (page: string) => void;
  userRole?: string;
}

const BuyerEditProfilePage: React.FC<BuyerEditProfilePageProps> = ({ onNavigate, userRole = 'user' }) => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+233 50 000 0000',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setFormData(prev => ({
          ...prev,
          fullName: parsed.fullName || prev.fullName,
          email: parsed.email || prev.email,
          phone: parsed.phone || prev.phone
        }));
        if (parsed.profileImage) {
          setProfileImage(parsed.profileImage);
        }
      } catch (e) {
        console.error("Failed to parse saved profile", e);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      setMessage({ text: 'All personal info fields are required.', type: 'error' });
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage({ text: 'Please enter a valid email address.', type: 'error' });
      setLoading(false);
      return;
    }

    // Simulate API call and persist
    setTimeout(() => {
      const profileToSave = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        profileImage: profileImage
      };
      localStorage.setItem('user_profile', JSON.stringify(profileToSave));
      
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
      setLoading(false);
      
      // Optional: scroll to top for visibility of message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setMessage({ text: 'All password fields are required.', type: 'error' });
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage({ text: 'New password must be at least 6 characters long.', type: 'error' });
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ text: 'New passwords do not match.', type: 'error' });
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setMessage({ text: 'Password changed successfully!', type: 'success' });
      setLoading(false);
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
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
                <span className="text-gray-900 dark:text-gray-100 font-medium">Edit Profile</span>
            </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>
            <button onClick={() => onNavigate('buyer-profile')} className="text-sm font-bold text-[#0A2B4C] dark:text-brand-orange hover:underline">Back to Profile</button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 animate-fadeIn ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
            {message.type === 'success' ? (
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            )}
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}

        <div className="space-y-8">
            {/* Personal Information */}
            <section className="bg-white dark:bg-brand-blue-dark rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Personal Information</h2>
                </div>
                <form onSubmit={handleSaveProfile} className="p-6 md:p-8 space-y-6">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden border-4 border-white dark:border-brand-blue-dark shadow-md">
                                <img 
                                    src={profileImage || `https://ui-avatars.com/api/?name=${formData.fullName.split(' ').join('+')}&background=0A2B4C&color=fff&size=128`} 
                                    alt="User Profile" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <button 
                                type="button" 
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-1 right-1 bg-brand-orange text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </button>
                        </div>
                        
                        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                <input 
                                    type="text" 
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-brand-blue-dark dark:text-white rounded-lg px-4 py-3 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all placeholder:text-gray-400" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="example@mail.com"
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-brand-blue-dark dark:text-white rounded-lg px-4 py-3 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all placeholder:text-gray-400" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                                <input 
                                    type="text" 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+233..."
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-brand-blue-dark dark:text-white rounded-lg px-4 py-3 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all placeholder:text-gray-400" 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="px-8 py-3 bg-brand-orange text-white font-bold rounded-lg hover:bg-brand-orange/90 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading && !formData.currentPassword ? (
                                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Saving...</>
                            ) : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </section>

            {/* Security Section */}
            <section className="bg-white dark:bg-brand-blue-dark rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Security</h2>
                </div>
                <form onSubmit={handleChangePassword} className="p-6 md:p-8 space-y-6">
                    <div className="max-w-2xl space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                            <input 
                                type="password" 
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-brand-blue-dark dark:text-white rounded-lg px-4 py-3 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all" 
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                                <input 
                                    type="password" 
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    placeholder="Min 6 characters"
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-brand-blue-dark dark:text-white rounded-lg px-4 py-3 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all placeholder:text-gray-400" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                                <input 
                                    type="password" 
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Match new password"
                                    className="w-full border border-gray-300 dark:border-gray-700 dark:bg-brand-blue-dark dark:text-white rounded-lg px-4 py-3 text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all placeholder:text-gray-400" 
                                />
                            </div>
                        </div>
                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="px-8 py-3 bg-[#0A2B4C] dark:bg-white dark:text-brand-blue text-white font-bold rounded-lg hover:bg-[#08223c] dark:hover:bg-gray-100 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {loading && formData.currentPassword ? (
                                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Updating...</>
                                ) : 'Update Password'}
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default BuyerEditProfilePage;

