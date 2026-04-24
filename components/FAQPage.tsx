
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface FAQPageProps {
  onNavigate: (page: string) => void;
}

const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I register on Sheltershub?",
      answer: "Click on the 'Signup' button located in the top right corner of the homepage. You can choose to register as a Buyer, Agent, Agency, Developer, or Home Owner depending on your needs. Fill in the required details and follow the verification steps to activate your account."
    },
    {
      question: "How can I list my property?",
      answer: "To list a property, you must have an account as an Agent, Agency, or Developer. Once logged in, navigate to your dashboard and click on 'Add Property'. Fill in the property details, upload high-quality images, and submit it for review. Your listing will go live once approved."
    },
    {
      question: "What is the difference between Agents, Agencies, and Developers?",
      answer: "Agents are individual real estate professionals who facilitate buying and renting. Agencies are companies that manage a team of agents and a portfolio of properties. Developers are companies responsible for building new residential or commercial projects from the ground up."
    },
    {
      question: "How do I reset my password?",
      answer: "If you have forgotten your password, go to the Login page and click on the 'Forgot Password?' link. Enter your registered email address, and we will send you a link to reset your password securely."
    },
    {
      question: "Is Sheltershub free to use?",
      answer: "Browsing properties and contacting agents on Sheltershub is completely free for buyers and renters. Listing properties may require a subscription plan depending on your account type and the number of listings you wish to publish."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach our support team by visiting the 'Contact Us' page via the navigation menu. Alternatively, you can email us at support@sheltershub.com or use the live chat feature if available."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="faq" />

      {/* Page Title Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold text-[#0A2B4C] mb-2">Frequently Asked Questions</h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Find quick answers to common questions about using Sheltershub.</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        
        {/* FAQ Accordion Section */}
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div 
                    key={index} 
                    className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-200"
                >
                    <button 
                        onClick={() => toggleAccordion(index)}
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none bg-white hover:bg-gray-50 transition-colors"
                    >
                        <span className={`font-bold text-lg ${openIndex === index ? 'text-[#F9A826]' : 'text-[#0A2B4C]'}`}>
                            {faq.question}
                        </span>
                        <svg 
                            className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${openIndex === index ? 'rotate-180 text-[#F9A826]' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                            {faq.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Contact Support Section */}
        <div className="mt-16 text-center bg-[#0A2B4C] rounded-2xl p-10 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4">Didn’t find your answer here?</h2>
                <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                    Our dedicated support team is ready to help you with any questions or issues you might have.
                </p>
                <button 
                    onClick={() => onNavigate('contact')}
                    className="px-8 py-3 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15] transition-colors shadow-md"
                >
                    Contact Us
                </button>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 -ml-10 -mt-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 -mr-10 -mb-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
        </div>

      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default FAQPage;
