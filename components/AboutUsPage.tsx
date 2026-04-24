
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface AboutUsPageProps {
  onNavigate: (page: string) => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="about" />

      <main>
        {/* 2. Hero / Intro Section */}
        <div className="relative bg-[#0A2B4C] text-white py-20 md:py-28 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
                <img 
                    src="https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg" 
                    alt="Background" 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="container mx-auto px-4 relative z-10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About Sheltershub</h1>
                <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light">
                    Connecting people with properties, agencies, and developers in one trusted platform.
                </p>
            </div>
        </div>

        {/* 3. Mission & Vision Section */}
        <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Mission Card */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-[#0A2B4C]">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#0A2B4C] mb-4">Our Mission</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        To simplify real estate discovery and empower users with transparent, accurate, and comprehensive property information.
                    </p>
                </div>

                {/* Vision Card */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-6 text-[#F9A826]">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#0A2B4C] mb-4">Our Vision</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        To be the leading digital hub for real estate connections worldwide, setting the standard for trust and innovation.
                    </p>
                </div>
            </div>
        </div>

        {/* 4. Values Section */}
        <div className="bg-white py-16 border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[#0A2B4C] mb-3">Our Core Values</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">The principles that guide every decision we make at Sheltershub.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Value 1 */}
                    <div className="p-6 rounded-lg border border-gray-100 hover:border-[#F9A826] transition-colors group">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-[#0A2B4C] group-hover:bg-[#0A2B4C] group-hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <h3 className="font-bold text-lg text-[#0A2B4C] mb-2">Trust &amp; Transparency</h3>
                        <p className="text-gray-600 text-sm">We believe in honest dealings and verified listings to build a safe marketplace.</p>
                    </div>

                    {/* Value 2 */}
                    <div className="p-6 rounded-lg border border-gray-100 hover:border-[#F9A826] transition-colors group">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-[#0A2B4C] group-hover:bg-[#0A2B4C] group-hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        </div>
                        <h3 className="font-bold text-lg text-[#0A2B4C] mb-2">Innovation</h3>
                        <p className="text-gray-600 text-sm">Leveraging technology to provide the best user experience and smart tools.</p>
                    </div>

                    {/* Value 3 */}
                    <div className="p-6 rounded-lg border border-gray-100 hover:border-[#F9A826] transition-colors group">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-[#0A2B4C] group-hover:bg-[#0A2B4C] group-hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="font-bold text-lg text-[#0A2B4C] mb-2">Customer-Centric</h3>
                        <p className="text-gray-600 text-sm">Your journey matters. We design every feature with your needs in mind.</p>
                    </div>

                    {/* Value 4 */}
                    <div className="p-6 rounded-lg border border-gray-100 hover:border-[#F9A826] transition-colors group">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-[#0A2B4C] group-hover:bg-[#0A2B4C] group-hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <h3 className="font-bold text-lg text-[#0A2B4C] mb-2">Community</h3>
                        <p className="text-gray-600 text-sm">Fostering a supportive ecosystem for buyers, sellers, agents, and developers.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* 5. Team / Company Story Section */}
        <div className="container mx-auto px-4 py-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/2 relative h-64 md:h-auto">
                    <img 
                        src="https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg" 
                        alt="Our Story" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0A2B4C] bg-opacity-40"></div>
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-[#0A2B4C] mb-6">Our Story</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Sheltershub began with a simple observation: finding a home was too complicated. Listings were scattered, information was unreliable, and connecting with trustworthy agents was a challenge.
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Founded in 2023, we set out to build a platform that brings transparency and efficiency to the real estate market in Ghana and beyond. Today, we are proud to host thousands of verified listings and facilitate countless successful connections every month.
                    </p>
                    <div>
                        <button onClick={() => onNavigate('blog')} className="text-[#F9A826] font-bold hover:underline flex items-center gap-1">
                            Read our latest news <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* 6. Call-to-Action Section */}
        <div className="bg-[#0A2B4C] py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Want to learn more or partner with us?</h2>
                <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
                    Whether you are an agency looking to list properties or a developer showcasing a new project, we are here to help you grow.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                        onClick={() => onNavigate('contact')}
                        className="px-8 py-3 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15] transition-colors shadow-lg"
                    >
                        Contact Us
                    </button>
                    <button 
                        onClick={() => onNavigate('all-properties')}
                        className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#0A2B4C] transition-colors"
                    >
                        Explore Properties
                    </button>
                </div>
            </div>
        </div>

      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default AboutUsPage;
