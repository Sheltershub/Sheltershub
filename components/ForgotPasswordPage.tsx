
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

interface ForgotPasswordPageProps {
  onNavigate: (page: string) => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Header onNavigate={onNavigate} activePage="login" />

      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-md">
            
            {/* Header / Logo Area */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#0A2B4C]">Account Recovery</h1>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                
                {!submitted ? (
                    <div className="p-8">
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-[#0A2B4C] mb-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-18.915.057 2 2 0 0118.915-.057A6 6 0 0121 7z"></path></svg>
                            </div>
                            <h2 className="text-2xl font-bold text-[#0A2B4C] mb-2">Forgot Your Password?</h2>
                            <p className="text-gray-500 text-sm">
                                Enter your registered email address to receive a reset link.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                                <input 
                                    type="email" 
                                    id="email"
                                    required 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com" 
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" 
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full py-3 px-4 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] shadow-md transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : 'Send Reset Link'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <button 
                                onClick={() => onNavigate('login')}
                                className="text-sm font-semibold text-gray-500 hover:text-[#0A2B4C] transition-colors flex items-center justify-center gap-1 mx-auto"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                                Back to Login
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-[#0A2B4C] mb-2">Check your inbox</h2>
                        <p className="text-gray-600 mb-6">
                            A password reset link has been sent to <span className="font-semibold text-gray-800">{email}</span>.
                        </p>
                        <p className="text-sm text-gray-500 mb-8">
                            Please check your inbox and follow the instructions to reset your password.
                        </p>
                        
                        <button 
                            onClick={() => onNavigate('login')}
                            className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Return to Login
                        </button>
                        
                        <div className="mt-6">
                             <p className="text-xs text-gray-400">
                                Didn't receive the email? <button className="text-[#F9A826] hover:underline font-semibold">Resend Link</button>
                            </p>
                        </div>
                    </div>
                )}
                
                {/* Security Note Section */}
                <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#F9A826] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        <div className="text-xs text-gray-500">
                            <p className="font-semibold text-gray-700 mb-1">Security Note</p>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>For your security, reset links expire after 30 minutes.</li>
                                <li>If you didn’t request a reset, please ignore the email.</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default ForgotPasswordPage;
