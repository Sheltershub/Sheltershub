
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface Developer {
  id: number;
  name: string;
  logo: string;
  location: string;
  description: string;
  projectsCount: number;
}

// Mock Data
const developers: Developer[] = [
  {
    id: 1,
    name: "Empire Builders",
    logo: "https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg",
    location: "Accra, Ghana",
    description: "Leading luxury residential developer known for modern designs and sustainable building practices.",
    projectsCount: 12
  },
  {
    id: 2,
    name: "Prestige Homes",
    logo: "https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg",
    location: "Kumasi, Ashanti",
    description: "Creating affordable yet premium housing communities across the Ashanti region.",
    projectsCount: 8
  },
  {
    id: 3,
    name: "Urban City Projects",
    logo: "https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg",
    location: "East Legon, Accra",
    description: "Specializing in high-rise apartments and commercial complexes in prime urban locations.",
    projectsCount: 5
  },
  {
    id: 4,
    name: "Golden Coast Devs",
    logo: "https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg",
    location: "Takoradi, Western",
    description: "Developing beachfront properties and resorts with exceptional architectural standards.",
    projectsCount: 3
  },
  {
    id: 5,
    name: "Legacy Estates",
    logo: "https://i.ibb.co/dwXy9qMp/Carousel-Image-1.jpg",
    location: "Tema, Greater Accra",
    description: "Building legacy homes for families with a focus on community living and security.",
    projectsCount: 15
  },
  {
    id: 6,
    name: "Skyline Innovations",
    logo: "https://i.ibb.co/jvXSSRTm/Carousel-Image-2.jpg",
    location: "Airport Residential, Accra",
    description: "Innovative mixed-use developments defining the skyline of Accra.",
    projectsCount: 7
  },
  {
    id: 7,
    name: "Green Field Constructions",
    logo: "https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg",
    location: "Aburi, Eastern",
    description: "Eco-friendly vacation homes and mountain retreats.",
    projectsCount: 4
  },
  {
    id: 8,
    name: "Modern Living",
    logo: "https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg",
    location: "Cantonments, Accra",
    description: "Boutique apartments for the modern urban professional.",
    projectsCount: 6
  }
];

interface DevelopersPageProps {
  onNavigate: (page: string) => void;
}

const DevelopersPage: React.FC<DevelopersPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="developers" />

      {/* Page Title Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-[#0A2B4C] mb-2">Developers</h1>
            <p className="text-gray-500 text-lg">Browse trusted real estate developers and their projects.</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        
        {/* Developers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {developers.map((dev) => (
                <div key={dev.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
                    <div className="h-48 overflow-hidden relative">
                         <img src={dev.logo} alt={dev.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>
                         <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                            <h3 className="font-bold text-xl mb-1">{dev.name}</h3>
                            <p className="text-sm opacity-90 flex items-center gap-1">
                                <svg className="w-4 h-4 text-[#F9A826]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                {dev.location}
                            </p>
                         </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                        <p className="text-sm text-gray-600 mb-6 leading-relaxed line-clamp-3">{dev.description}</p>
                        
                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-[#0A2B4C]">
                                {dev.projectsCount} Projects
                            </span>
                            <button 
                                onClick={() => onNavigate('developer-detail')}
                                className="text-sm font-bold text-[#F9A826] hover:text-[#d88d15] flex items-center gap-1 transition-colors"
                            >
                                View Profile
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Call to Action */}
        <div className="bg-[#0A2B4C] rounded-2xl p-8 md:p-16 text-center relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Are you a developer?</h2>
                <p className="text-blue-100 text-lg mb-8">
                    Showcase your projects on Sheltershub and connect with thousands of potential investors and homebuyers looking for their next property.
                </p>
                <button 
                    onClick={() => onNavigate('add-developer')}
                    className="bg-[#F9A826] hover:bg-[#d88d15] text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    Add New Developer
                </button>
            </div>
            
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 -ml-20 -mt-20 w-80 h-80 rounded-full bg-white opacity-5 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 rounded-full bg-white opacity-5 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-[#F9A826] rounded-full opacity-40"></div>
            <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-[#F9A826] rounded-full opacity-30"></div>
        </div>

      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default DevelopersPage;
