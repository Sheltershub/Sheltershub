
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

interface AddAgentPageProps {
  onNavigate: (page: string) => void;
}

const AddAgentPage: React.FC<AddAgentPageProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPhotoPreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
      window.scrollTo(0, 0);
    }, 800);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="add-agent" />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        
        {submitted ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center py-16">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#0A2B4C] mb-4">Registration Submitted!</h2>
            <p className="text-gray-600 text-lg mb-2">
                Your agent profile has been submitted for admin review.
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
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-[#0A2B4C] mb-3">Register as an Agent</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Create your professional agent profile, list properties, and connect with clients on Sheltershub.
                </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-[#0A2B4C] px-6 py-4 border-b border-[#08223c]">
                    <h2 className="text-white font-semibold text-lg">Agent Details</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
                    
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                                <input type="text" required placeholder="e.g. John" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                                <input type="text" required placeholder="e.g. Doe" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Photo</label>
                            <div className="flex items-center gap-6">
                                <div className="h-24 w-24 bg-gray-100 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden">
                                    {photoPreview ? (
                                        <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
                                    ) : (
                                        <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0A2B4C] hover:file:bg-blue-100 cursor-pointer" 
                                    />
                                    <p className="text-xs text-gray-500 mt-2">Recommended: Professional headshot. Max file size: 2MB.</p>
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

                    <div>
                        <h3 className="text-lg font-bold text-[#0A2B4C] mb-4">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                                <input type="email" required placeholder="john.doe@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                                <input type="tel" required placeholder="+233 00 000 0000" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                            </div>
                             <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">License Number (Optional)</label>
                                <input type="text" placeholder="e.g. RE-12345" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6"></div>

                    <div>
                         <h3 className="text-lg font-bold text-[#0A2B4C] mb-4">Professional Bio</h3>
                         <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">About You <span className="text-red-500">*</span></label>
                                <textarea required rows={5} placeholder="Tell us about your experience, areas of expertise, and what sets you apart..." className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience</label>
                                <input type="number" min="0" placeholder="e.g. 5" className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" />
                            </div>
                         </div>
                    </div>

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

export default AddAgentPage;
