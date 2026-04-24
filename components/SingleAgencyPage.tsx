
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import PropertyCard from './PropertyCard';
import ReviewsSection from './ReviewsSection';
import { featuredProperties } from '../constants';

interface SingleAgencyPageProps {
  onNavigate: (page: string) => void;
  userRole?: string;
}

// Mock Agent Data
const agents = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Senior Sales Associate",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    phone: "+233 24 000 0001",
    email: "sarah@prime-realestate.com"
  },
  {
    id: 2,
    name: "Michael Ofori",
    role: "Property Consultant",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    phone: "+233 24 000 0002",
    email: "michael@prime-realestate.com"
  },
  {
    id: 3,
    name: "Jessica Boateng",
    role: "Rental Specialist",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    phone: "+233 24 000 0003",
    email: "jessica@prime-realestate.com"
  },
  {
    id: 4,
    name: "David Mensah",
    role: "Commercial Real Estate",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    phone: "+233 24 000 0004",
    email: "david@prime-realestate.com"
  }
];

const SingleAgencyPage: React.FC<SingleAgencyPageProps> = ({ onNavigate, userRole = 'guest' }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const agency = {
      name: "Prime Real Estate",
      parentDeveloper: null, // Example: "Empire Builders" if they worked under a developer
      location: "Greater Accra, Ghana",
      logo: "https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg",
      phone: "+233 55 123 4567",
      officePhone: "+233 30 200 0000",
      whatsapp: "+233 55 123 4567",
      email: "info@prime-realestate.com",
      website: "www.prime-realestate.com",
      stats: {
          agents: 12,
          properties: 36,
          experience: "10+"
      },
      about: "Prime Real Estate is a leading real estate agency based in Accra, dedicated to providing exceptional service in buying, selling, and renting properties. With over a decade of experience in the Ghanaian real estate market, we have established ourselves as a trusted partner for individuals and businesses alike.\n\nOur mission is to make the process of finding your dream home or investment property as seamless and stress-free as possible. We pride ourselves on our integrity, professionalism, and deep market knowledge. Whether you are looking for a luxury apartment in the city center or a family home in the suburbs, our team of dedicated agents is here to guide you every step of the way."
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="agencies" />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center text-sm text-gray-500">
                <button onClick={() => onNavigate('home')} className="hover:text-[#F9A826] transition-colors">Home</button>
                <span className="mx-2">/</span>
                <button onClick={() => onNavigate('agencies')} className="hover:text-[#F9A826] transition-colors">Agencies</button>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">{agency.name}</span>
            </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Main Content */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* 1. Agency Profile Header */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                             <img src={agency.logo} alt={`${agency.name} Logo`} className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="flex-grow text-center md:text-left space-y-3">
                            <div>
                                <h1 className="text-3xl font-bold text-[#0A2B4C]">{agency.name}</h1>
                                {agency.parentDeveloper && (
                                    <p className="text-sm font-semibold text-[#F9A826] mt-1">
                                        An Exclusive Agency for {agency.parentDeveloper}
                                    </p>
                                )}
                                <p className="text-gray-500 flex items-center justify-center md:justify-start gap-1 mt-1">
                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                     {agency.location}
                                </p>
                            </div>

                            <div className="flex justify-center md:justify-start items-center gap-8 border-t border-gray-100 pt-4 mt-2">
                                 <div className="text-center md:text-left">
                                    <span className="block font-bold text-xl text-[#0A2B4C]">{agency.stats.agents}</span>
                                    <span className="text-xs text-gray-500 uppercase">Agents</span>
                                 </div>
                                 <div className="text-center md:text-left">
                                    <span className="block font-bold text-xl text-[#0A2B4C]">{agency.stats.properties}</span>
                                    <span className="text-xs text-gray-500 uppercase">Properties</span>
                                 </div>
                                 <div className="text-center md:text-left">
                                    <span className="block font-bold text-xl text-[#0A2B4C]">{agency.stats.experience}</span>
                                    <span className="text-xs text-gray-500 uppercase">Years Exp.</span>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Agency Description */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
                    <h3 className="text-xl font-bold text-[#0A2B4C] mb-4 border-b border-gray-100 pb-2">About {agency.name}</h3>
                    <div className="text-gray-600 leading-relaxed space-y-4 whitespace-pre-wrap">
                        {agency.about}
                    </div>
                </div>

                {/* 3. Agents Section */}
                <div>
                     <h3 className="text-2xl font-bold text-[#0A2B4C] mb-6">Agents in this Agency</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {agents.map((agent) => (
                            <div key={agent.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                                <div className="relative h-64 overflow-hidden">
                                    <img src={agent.image} alt={agent.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <div className="p-5 text-center">
                                    <h4 className="font-bold text-lg text-[#0A2B4C]">{agent.name}</h4>
                                    <p className="text-sm text-gray-500 mb-4">{agent.role}</p>
                                    
                                    <div className="space-y-2">
                                        <a href={`tel:${agent.phone}`} className="block w-full py-2 px-4 rounded border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 hover:text-[#0A2B4C] transition-colors">
                                            {agent.phone}
                                        </a>
                                        <button className="block w-full py-2 px-4 rounded bg-[#0A2B4C] text-white text-sm font-medium hover:bg-[#08223c] transition-colors">
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>

                {/* 4. Properties Section */}
                <div>
                    <div className="flex justify-between items-end mb-6">
                        <h3 className="text-2xl font-bold text-[#0A2B4C]">Properties Listed by {agency.name}</h3>
                        <button className="hidden sm:block text-[#F9A826] font-semibold hover:underline">View All Listing</button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {featuredProperties.slice(0, 6).map((property) => (
                            <PropertyCard 
                                key={property.id} 
                                property={property} 
                                onClick={() => onNavigate('property-detail')}
                            />
                         ))}
                    </div>
                    <div className="mt-8 text-center sm:hidden">
                         <button className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors">
                            View All Listings
                        </button>
                    </div>
                </div>

                {/* 5. Reviews Section */}
                <ReviewsSection targetName={agency.name} userRole={userRole} />

            </div>

            {/* Right Sidebar: Contact Info */}
            <aside className="lg:col-span-4 space-y-6">
                
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 sticky top-24">
                    <h3 className="text-xl font-bold text-[#0A2B4C] mb-4 border-b border-gray-100 pb-2">Contact Agency</h3>
                    
                    <div className="space-y-4 mb-6 text-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-full text-[#0A2B4C]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase">Phone</p>
                                <p className="text-gray-800 font-medium">{agency.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-full text-[#0A2B4C]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase">Office</p>
                                <p className="text-gray-800 font-medium">{agency.officePhone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-green-50 p-2 rounded-full text-green-600">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase">WhatsApp</p>
                                <p className="text-gray-800 font-medium">{agency.whatsapp}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-full text-[#0A2B4C]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase">Website</p>
                                <a href={`https://${agency.website}`} target="_blank" rel="noreferrer" className="text-[#F9A826] hover:underline font-medium break-all">{agency.website}</a>
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
                            <input type="text" placeholder="Inquiry about property..." className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                            <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" placeholder="Write your message here..."></textarea>
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

export default SingleAgencyPage;
