
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

interface AddAgencyPageProps {
  onNavigate: (page: string) => void;
}

const AddAgencyPage: React.FC<AddAgencyPageProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Create a fake local URL for preview
      const url = URL.createObjectURL(e.target.files[0]);
      setLogoPreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API submission
    setTimeout(() => {
      setSubmitted(true);
      window.scrollTo(0, 0);
    }, 800);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="agencies" />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        
        {submitted ? (
          /* Confirmation / Status Section */
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center py-16">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#0A2B4C] mb-4">Registration Submitted!</h2>
            <p className="text-gray-600 text-lg mb-2">
                Your agency profile has been submitted for admin review.
            </p>
            <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
                Our team will verify your details within 24-48 hours. You will receive an email notification once your profile is live.
            </p>
            <div className="flex justify-center gap-4">
                 <button 
                    onClick={() => onNavigate('home')}
                    className="py-3 px-8 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                 >
                    Back to Home
                 </button>
                 <button 
                    onClick={() => onNavigate('agencies')}
                    className="py-3 px-8 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] shadow-md transition-colors"
                 >
                    Browse Agencies
                 </button>
            </div>
          </div>
        ) : (
          /* Registration Form Section */
          <>
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-[#0A2B4C] mb-3">Register Your Agency</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Join Sheltershub to showcase your properties, manage your agents, and reach millions of potential buyers and renters.
                </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-[#0A2B4C] px-6 py-4 border-b border-[#08223c]">
                    <h2 className="text-white font-semibold text-lg">Agency Details</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
                    
                    {/* Basic Info */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Agency Name <span className="text-red-500">*</span></label>
                            <input type="text" required placeholder="e.g. Prime Real Estate" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Agency Logo</label>
                            <div className="flex items-center gap-6">
                                <div className="h-24 w-24 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center overflow-hidden">
                                    {logoPreview ? (
                                        <img src={logoPreview} alt="Preview" className="h-full w-full object-cover" />
                                    ) : (
                                        <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={handleLogoChange}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0A2B4C] hover:file:bg-blue-100 cursor-pointer" 
                                    />
                                    <p className="text-xs text-gray-500 mt-2">Recommended size: 500x500px. Max file size: 2MB.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Location <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] appearance-none bg-white">
                                    <option>Select City / Region</option>
                                    <option>Greater Accra</option>
                                    <option>Kumasi</option>
                                    <option>Takoradi</option>
                                    <option>Tamale</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6"></div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold text-[#0A2B4C] mb-4">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                                <input type="email" required placeholder="agency@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                                <input type="tel" required placeholder="+233 00 000 0000" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Website (Optional)</label>
                                <input type="url" placeholder="https://www.youragency.com" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6"></div>

                    {/* Profile Details */}
                    <div>
                         <h3 className="text-lg font-bold text-[#0A2B4C] mb-4">Profile Details</h3>
                         <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">About Agency <span className="text-red-500">*</span></label>
                                <textarea required rows={5} placeholder="Tell us about your agency, your mission, and the services you provide..." className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]"></textarea>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience</label>
                                    <input type="number" min="0" placeholder="e.g. 10" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Team Size</label>
                                    <input type="number" min="1" placeholder="e.g. 5" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                                </div>
                            </div>
                         </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-4">
                        <button 
                            type="button" 
                            onClick={() => onNavigate('home')}
                            className="py-3 px-8 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="py-3 px-8 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15] shadow-md transition-all hover:shadow-lg"
                        >
                            Submit for Review
                        </button>
                    </div>

                </form>
            </div>
          </>
        )}

      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default AddAgencyPage;
