
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import PropertyCard from './PropertyCard';
import ReviewsSection from './ReviewsSection';
import { featuredProperties } from '../constants';

interface SingleAgentPageProps {
  onNavigate: (page: string) => void;
  userRole?: string;
}

const SingleAgentPage: React.FC<SingleAgentPageProps> = ({ onNavigate, userRole = 'guest' }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock Agent Data with explicit relationship structure
  const agent = {
    name: "Sarah Jenkins",
    title: "Senior Sales Associate",
    affiliation: {
        type: 'Agency', // 'Agency' | 'Developer' | 'Independent'
        name: 'Prime Real Estate', // Name of Agency or Developer
        link: 'agency-detail' // Navigation target
    },
    location: "Accra, Greater Accra",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    phone: "+233 24 000 0001",
    officePhone: "+233 30 200 0000",
    whatsapp: "+233 24 000 0001",
    website: "www.sarahjenkins.com",
    email: "sarah.jenkins@prime-realestate.com",
    experience: "8 Years",
    areas: "East Legon, Cantonments, Osu",
    specialties: "Luxury Residential, Commercial Sales",
    bio: "Sarah is a dedicated real estate professional with over 8 years of experience in the Greater Accra market. She specializes in luxury residential properties and high-end commercial spaces. Known for her integrity and exceptional negotiation skills, Sarah has built a reputation for delivering results and exceeding client expectations. She believes in building long-term relationships based on trust and transparency.",
    stats: {
        listings: 12,
        sold: 45
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="agents" />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center text-sm text-gray-500">
                <button onClick={() => onNavigate('home')} className="hover:text-[#F9A826] transition-colors">Home</button>
                <span className="mx-2">/</span>
                <button onClick={() => onNavigate('agents')} className="hover:text-[#F9A826] transition-colors">Agents</button>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">{agent.name}</span>
            </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Profile & Main Info */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* 2. Agent Profile Header Section */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 bg-gray-100 rounded-full overflow-hidden border-4 border-white shadow-md">
                             <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="flex-grow text-center md:text-left space-y-2">
                            <div>
                                <h1 className="text-3xl font-bold text-[#0A2B4C]">{agent.name}</h1>
                                <p className="text-gray-600 font-medium">{agent.title}</p>
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-4 mt-1 text-sm text-gray-500">
                                    
                                    {/* Dynamic Affiliation Display */}
                                    {agent.affiliation.type !== 'Independent' ? (
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                            <span>Agent at </span>
                                            <button onClick={() => onNavigate(agent.affiliation.link)} className="hover:text-[#F9A826] font-semibold transition-colors">
                                                {agent.affiliation.name}
                                            </button>
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                            <span>Independent Agent</span>
                                        </span>
                                    )}

                                    <span className="hidden md:inline">•</span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        {agent.location}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
                                <a href={`tel:${agent.phone}`} className="flex items-center gap-2 bg-[#0A2B4C] text-white px-4 py-2 rounded-lg hover:bg-[#08223c] transition-colors text-sm font-bold">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    Call
                                </a>
                                <a href={`https://wa.me/${agent.whatsapp.replace(/\D/g,'')}`} className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-[#20bd5a] transition-colors text-sm font-bold">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Agent Bio / About Section */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
                    <h3 className="text-lg font-bold text-[#0A2B4C] mb-4 border-b border-gray-100 pb-2">About Sarah Jenkins</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        {agent.bio}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                            <span className="block text-xs text-gray-400 uppercase tracking-wide font-semibold">Experience</span>
                            <span className="text-[#0A2B4C] font-medium">{agent.experience}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-400 uppercase tracking-wide font-semibold">Specialties</span>
                            <span className="text-[#0A2B4C] font-medium">{agent.specialties}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-400 uppercase tracking-wide font-semibold">Areas Served</span>
                            <span className="text-[#0A2B4C] font-medium">{agent.areas}</span>
                        </div>
                    </div>
                </div>

                {/* 4. Agent Statistics Section */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-[#0A2B4C] mb-4">Performance Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <span className="block text-2xl font-bold text-[#0A2B4C]">{agent.stats.listings}</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Active Listings</span>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <span className="block text-2xl font-bold text-green-600">{agent.stats.sold}</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Properties Sold</span>
                        </div>
                    </div>
                </div>

                {/* 5. Agent Properties Section */}
                <div>
                    <h3 className="text-2xl font-bold text-[#0A2B4C] mb-6">Properties by {agent.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {featuredProperties.slice(0, 4).map((property) => (
                            <PropertyCard 
                                key={property.id} 
                                property={property} 
                                onClick={() => onNavigate('property-detail')}
                            />
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <button className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors">
                            Load More Properties
                        </button>
                    </div>
                </div>

                {/* 6. Reviews Section */}
                <ReviewsSection targetName={agent.name} userRole={userRole} />

            </div>

            {/* Right Column: Contact Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
                
                {/* 7. Contact Agent Section */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 sticky top-24">
                    <h3 className="text-xl font-bold text-[#0A2B4C] mb-4 border-b border-gray-100 pb-2">Contact {agent.name.split(' ')[0]}</h3>
                    
                    <div className="space-y-4 mb-6 text-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-full text-[#0A2B4C]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase">Personal</p>
                                <p className="text-gray-800 font-medium">{agent.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-full text-[#0A2B4C]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase">Office</p>
                                <p className="text-gray-800 font-medium">{agent.officePhone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-green-50 p-2 rounded-full text-green-600">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase">WhatsApp</p>
                                <p className="text-gray-800 font-medium">{agent.whatsapp}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-full text-[#0A2B4C]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase">Website</p>
                                <a href={`https://${agent.website}`} target="_blank" rel="noreferrer" className="text-[#F9A826] hover:underline font-medium break-all">{agent.website}</a>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100 mb-6" />
                    
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
                        <button type="submit" className="w-full bg-[#F9A826] text-white font-bold py-3 rounded-lg hover:bg-[#d88d15] shadow-md transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>

            </aside>

        </div>

      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default SingleAgentPage;
