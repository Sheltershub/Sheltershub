
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import PropertyCard from './PropertyCard';
import { featuredProperties, latestProperties } from '../constants';

interface FavoritesPageProps {
  onNavigate: (page: string) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simulate saved properties state with dummy data
  const [favorites, setFavorites] = useState([...featuredProperties.slice(0, 3), ...latestProperties.slice(0, 2)]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const handleRemove = (id: number) => {
    setFavorites(prev => prev.filter(p => p.id !== id));
  };

  const shareUrl = "https://sheltershub.com/favorites/shared/user-12345";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
        setCopySuccess('Link copied!');
        setTimeout(() => setCopySuccess(''), 2000);
    }, () => {
        setCopySuccess('Failed to copy');
    });
  };

  const handleShare = (platform: string) => {
      const text = "Check out my favorite properties on Sheltershub!";
      let url = "";

      switch(platform) {
          case 'email':
              url = `mailto:?subject=${encodeURIComponent("My Favorite Properties - Sheltershub")}&body=${encodeURIComponent(text + "\n\n" + shareUrl)}`;
              break;
          case 'whatsapp':
              url = `https://wa.me/?text=${encodeURIComponent(text + " " + shareUrl)}`;
              break;
          case 'facebook':
              url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
              break;
          case 'twitter':
              url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
              break;
      }
      if (url) window.open(url, '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans relative">
      <Header onNavigate={onNavigate} activePage="favorites" />

      {/* Page Title Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-[#0A2B4C] mb-2">My Favorites</h1>
            <p className="text-gray-500 text-lg">Review and manage the properties you’ve saved.</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 min-h-[60vh]">
        
        {favorites.length > 0 ? (
            <>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <span className="text-gray-600 font-medium">{favorites.length} Properties Saved</span>
                    
                    <button 
                        onClick={() => setIsShareModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#0A2B4C] text-white rounded-lg hover:bg-[#08223c] transition-colors shadow-sm font-semibold text-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                        Share Favorites
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {favorites.map((property) => (
                        <div key={property.id} className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <PropertyCard 
                                property={property} 
                                onClick={() => onNavigate('property-detail')} 
                            />
                            <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50 mt-auto">
                                <button 
                                    onClick={() => handleRemove(property.id)}
                                    className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-700 bg-white border border-red-100 hover:border-red-200 px-3 py-2 rounded-md transition-colors shadow-sm"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Suggested Properties (Optional) */}
                <div className="border-t border-gray-200 pt-12">
                    <h3 className="text-2xl font-bold text-[#0A2B4C] mb-6">You Might Also Like</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestProperties.slice(2, 5).map((prop) => (
                            <PropertyCard key={prop.id} property={prop} onClick={() => onNavigate('property-detail')} />
                        ))}
                    </div>
                </div>
            </>
        ) : (
            /* Empty State */
            <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6 text-gray-400">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div>
                <h2 className="text-2xl font-bold text-[#0A2B4C] mb-2">Your Favorites List is Empty</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    You haven’t added any properties to your favorites yet. Start browsing to find your dream home.
                </p>
                <button 
                    onClick={() => onNavigate('all-properties')}
                    className="px-8 py-3 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] shadow-md transition-all hover:shadow-lg"
                >
                    Browse Properties
                </button>
            </div>
        )}

      </main>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
                <div className="bg-[#0A2B4C] px-6 py-4 flex justify-between items-center">
                    <h3 className="text-white font-bold text-lg">Share Your Favorites</h3>
                    <button onClick={() => setIsShareModalOpen(false)} className="text-white/80 hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                <div className="p-6">
                    <p className="text-gray-600 mb-4 text-sm">
                        Share your saved properties list with friends, family, or your agent. Anyone with the link can view this list.
                    </p>

                    <div className="mb-6">
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Share Link</label>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                readOnly 
                                value={shareUrl} 
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:outline-none"
                            />
                            <button 
                                onClick={handleCopyLink}
                                className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors min-w-[80px]"
                            >
                                {copySuccess ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        <button onClick={() => handleShare('email')} className="flex flex-col items-center gap-2 group">
                            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <span className="text-xs text-gray-500 font-medium">Email</span>
                        </button>
                        <button onClick={() => handleShare('whatsapp')} className="flex flex-col items-center gap-2 group">
                            <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                            </div>
                            <span className="text-xs text-gray-500 font-medium">WhatsApp</span>
                        </button>
                        <button onClick={() => handleShare('facebook')} className="flex flex-col items-center gap-2 group">
                            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-800 flex items-center justify-center group-hover:bg-blue-800 group-hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </div>
                            <span className="text-xs text-gray-500 font-medium">Facebook</span>
                        </button>
                        <button onClick={() => handleShare('twitter')} className="flex flex-col items-center gap-2 group">
                            <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                            </div>
                            <span className="text-xs text-gray-500 font-medium">Twitter</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default FavoritesPage;
