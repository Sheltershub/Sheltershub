
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface EmailVerificationPageProps {
  onNavigate: (page: string) => void;
}

const EmailVerificationPage: React.FC<EmailVerificationPageProps> = ({ onNavigate }) => {
  // State to manage the view: 'pending' (check email), 'success' (verified), 'error' (invalid link)
  // In a real app, this would be determined by a URL token validation
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleResend = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Verification email has been resent!");
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Header onNavigate={onNavigate} activePage="login" />

      <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="w-full max-w-lg">
            
            {/* Header Area */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#0A2B4C]">Email Verification</h1>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-8 md:p-10 text-center">
                
                {status === 'pending' && (
                    <>
                        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-blue-50 mb-6">
                            <svg className="h-10 w-10 text-[#0A2B4C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-[#0A2B4C] mb-3">Verify Your Email Address</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            We’ve sent a verification link to your email. Please check your inbox and click the link to activate your account.
                        </p>

                        <div className="border-t border-gray-100 pt-6 mb-6">
                            <p className="text-sm font-semibold text-gray-700 mb-4">Didn’t receive the email?</p>
                            <button 
                                onClick={handleResend}
                                disabled={loading}
                                className="w-full py-3 px-6 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] shadow-md transition-colors disabled:opacity-70 flex justify-center items-center"
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : 'Resend Verification Email'}
                            </button>
                            <p className="text-xs text-gray-400 mt-4">
                                Note: Check your spam or junk folder if you don’t see the email.
                            </p>
                        </div>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                            <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-[#0A2B4C] mb-3">Email Verified Successfully!</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Thank you for verifying your email. Your account is now active. Welcome to Sheltershub!
                        </p>

                        <button 
                            onClick={() => onNavigate('home')}
                            className="w-full py-3 px-6 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15] shadow-md transition-colors"
                        >
                            Go to Dashboard
                        </button>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
                            <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-[#0A2B4C] mb-3">Link Expired or Invalid</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            This verification link is invalid or has expired. Please request a new verification email.
                        </p>

                        <button 
                            onClick={handleResend}
                            disabled={loading}
                            className="w-full py-3 px-6 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] shadow-md transition-colors disabled:opacity-70"
                        >
                             {loading ? 'Sending...' : 'Resend Verification Email'}
                        </button>
                    </>
                )}

                {/* Demo Controls - For Development Visualization */}
                <div className="mt-10 pt-6 border-t border-gray-100">
                    <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Demo Controls (Dev Only)</p>
                    <div className="flex justify-center gap-2">
                        <button onClick={() => setStatus('pending')} className={`text-xs px-3 py-1 rounded border ${status === 'pending' ? 'bg-gray-200 border-gray-300' : 'bg-white border-gray-200 text-gray-500'}`}>Pending</button>
                        <button onClick={() => setStatus('success')} className={`text-xs px-3 py-1 rounded border ${status === 'success' ? 'bg-green-100 border-green-200 text-green-700' : 'bg-white border-gray-200 text-gray-500'}`}>Success</button>
                        <button onClick={() => setStatus('error')} className={`text-xs px-3 py-1 rounded border ${status === 'error' ? 'bg-red-100 border-red-200 text-red-700' : 'bg-white border-gray-200 text-gray-500'}`}>Error</button>
                    </div>
                </div>

            </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default EmailVerificationPage;
