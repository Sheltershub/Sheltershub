
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface TermsPageProps {
  onNavigate: (page: string) => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="home" />

      {/* Page Title Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold text-[#0A2B4C] mb-2">Terms &amp; Conditions</h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Please read these terms carefully before using Sheltershub.</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 md:p-12 space-y-10 text-gray-700 leading-relaxed">
            
            <section>
                <h2 className="text-xl font-bold text-[#0A2B4C] mb-4 pb-2 border-b border-gray-100">1. Introduction</h2>
                <p>
                    Welcome to Sheltershub. By accessing or using our website, mobile application, and services, you agree to comply with and be bound by these Terms &amp; Conditions. If you do not agree with any part of these terms, you must not use our platform.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-[#0A2B4C] mb-4 pb-2 border-b border-gray-100">2. Eligibility</h2>
                <p>
                    To use Sheltershub, you must be at least 18 years old and capable of forming a binding contract under applicable law. By using the platform, you represent and warrant that you meet these eligibility requirements.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-[#0A2B4C] mb-4 pb-2 border-b border-gray-100">3. User Responsibilities</h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li>You agree to provide accurate, current, and complete information during registration and profile setup.</li>
                    <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                    <li>You must comply with all applicable local, state, and international laws while using our services.</li>
                    <li>You are prohibited from engaging in fraudulent activities, spamming, harassment, or distributing malicious software on the platform.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-[#0A2B4C] mb-4 pb-2 border-b border-gray-100">4. Property Listings</h2>
                <p className="mb-3">
                    Agents, Agencies, and Developers are responsible for the content of their listings. By posting a property, you warrant that:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>You have the legal authority to sell, rent, or lease the property.</li>
                    <li>The information provided (price, location, features) is accurate and not misleading.</li>
                    <li>The listing does not infringe on any third-party rights.</li>
                </ul>
                <p className="mt-3 text-sm text-gray-500">
                    Sheltershub reserves the right to remove any listing that violates these terms or appears to be fraudulent.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-[#0A2B4C] mb-4 pb-2 border-b border-gray-100">5. Payments &amp; Subscriptions</h2>
                <p>
                    Certain features, such as premium listings or verified agent status, may require payment. Fees are non-refundable unless otherwise stated. Billing cycles for subscriptions will be clearly communicated at the time of purchase. Sheltershub reserves the right to change pricing with reasonable notice.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-[#0A2B4C] mb-4 pb-2 border-b border-gray-100">6. Privacy Policy Reference</h2>
                <p>
                    Your privacy is important to us. Please review our <a href="#" className="text-[#F9A826] hover:underline">Privacy Policy</a> to understand how we collect, use, and protect your personal data. By using Sheltershub, you consent to our data practices.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-[#0A2B4C] mb-4 pb-2 border-b border-gray-100">7. Intellectual Property</h2>
                <p>
                    All content on Sheltershub, including text, graphics, logos, and software, is the property of Sheltershub or its content suppliers and is protected by intellectual property laws. You may not use, reproduce, or distribute any content without our prior written permission.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-[#0A2B4C] mb-4 pb-2 border-b border-gray-100">8. Limitation of Liability</h2>
                <p>
                    Sheltershub is a platform connecting users with real estate professionals. We do not own or manage the properties listed (unless explicitly stated). We are not liable for:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Any errors or omissions in property listings.</li>
                    <li>Any direct, indirect, or consequential damages arising from your use of the platform.</li>
                    <li>The conduct of any user, agent, or developer on the site.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-[#0A2B4C] mb-4 pb-2 border-b border-gray-100">9. Termination of Accounts</h2>
                <p>
                    We reserve the right to suspend or terminate your account at our sole discretion, without notice, if you violate these Terms &amp; Conditions or engage in conduct that harms Sheltershub or its users.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-[#0A2B4C] mb-4 pb-2 border-b border-gray-100">10. Governing Law</h2>
                <p>
                    These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of Ghana. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Ghana.
                </p>
            </section>

        </div>

        {/* Acceptance Section */}
        <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
                By using Sheltershub, you acknowledge and agree to these Terms &amp; Conditions.
            </p>
            <button 
                onClick={() => onNavigate('home')}
                className="px-8 py-3 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] shadow-md transition-all hover:shadow-lg"
            >
                Back to Home
            </button>
        </div>

      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default TermsPage;
