
import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';

interface EditorRegisterProps {
  onNavigate: (page: string) => void;
}

const EditorRegister: React.FC<EditorRegisterProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="home" />

      <main className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-full max-w-2xl">
            
            {submitted ? (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center py-16">
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-blue-50 mb-6">
                        <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-[#0A2B4C] mb-4">Registration Pending Approval</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Thank you for registering as an Editor. Your account has been created and is currently pending approval by an Administrator. You will receive an email notification once your account is active.
                    </p>
                    <button 
                        onClick={() => onNavigate('home')}
                        className="py-3 px-8 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] shadow-md transition-colors"
                    >
                        Return Home
                    </button>
                </div>
            ) : (
                <>
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-[#0A2B4C] mb-3">Editor Registration</h1>
                        <p className="text-gray-500">Apply for an Editor account to manage content on Sheltershub.</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-[#F9A826] px-6 py-4 border-b border-orange-400">
                            <h2 className="text-white font-bold text-lg">Account Details</h2>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                    <input type="text" required placeholder="e.g. John Editor" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                    <input type="tel" required placeholder="+233" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                    <input type="email" required placeholder="name@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                    <input type="password" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                                    <input type="password" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                                    <input type="text" value="Editor" disabled className="w-full border border-gray-300 bg-gray-100 text-gray-500 rounded-lg px-4 py-3 text-sm" />
                                    <p className="text-xs text-gray-400 mt-1">This role provides restricted access to content management features.</p>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="w-full py-3 px-8 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] shadow-md transition-colors">
                                    Submit Registration
                                </button>
                            </div>
                            
                            <p className="text-center text-sm text-gray-500">
                                Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('login'); }} className="text-[#F9A826] font-semibold hover:underline">Login here</a>
                            </p>
                        </form>
                    </div>
                </>
            )}
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default EditorRegister;
