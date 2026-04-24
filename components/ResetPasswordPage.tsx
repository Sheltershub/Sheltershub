
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface ResetPasswordPageProps {
  onNavigate: (page: string) => void;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onNavigate }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'form' | 'success' | 'error'>('form');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Randomly simulate success or error for demo purposes, mainly success
      setStatus('success'); 
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Header onNavigate={onNavigate} activePage="login" />

      <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="w-full max-w-md">
            
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#0A2B4C]">Reset Password</h1>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                
                {status === 'form' && (
                    <div className="p-8">
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-[#0A2B4C] mb-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            </div>
                            <h2 className="text-2xl font-bold text-[#0A2B4C] mb-2">Create New Password</h2>
                            <p className="text-gray-500 text-sm">
                                Enter a new password to regain access to your account.
                            </p>
                        </div>

                        {errorMessage && (
                            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg flex items-start gap-2">
                                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="new-pass" className="block text-sm font-semibold text-gray-700 mb-2">New Password <span className="text-red-500">*</span></label>
                                <input 
                                    type="password" 
                                    id="new-pass"
                                    required 
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="••••••••" 
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" 
                                />
                            </div>

                            <div>
                                <label htmlFor="confirm-pass" className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password <span className="text-red-500">*</span></label>
                                <input 
                                    type="password" 
                                    id="confirm-pass"
                                    required 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••" 
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" 
                                />
                            </div>

                            <div className="flex flex-col gap-3 pt-2">
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
                                    ) : 'Update Password'}
                                </button>
                                
                                <button 
                                    type="button"
                                    onClick={() => onNavigate('login')}
                                    className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {status === 'success' && (
                    <div className="p-8 text-center py-12">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-[#0A2B4C] mb-2">Password Reset Successful</h2>
                        <p className="text-gray-600 mb-8">
                            Your password has been successfully updated. You can now access your account with your new credentials.
                        </p>
                        
                        <button 
                            onClick={() => onNavigate('login')}
                            className="w-full py-3 px-4 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15] shadow-md transition-colors"
                        >
                            Go to Login
                        </button>
                    </div>
                )}

                {status === 'error' && (
                    <div className="p-8 text-center py-12">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-[#0A2B4C] mb-2">Reset Failed</h2>
                        <p className="text-gray-600 mb-8">
                            The password reset link is invalid or has expired. Please try requesting a new one.
                        </p>
                        
                        <div className="flex flex-col gap-3">
                            <button 
                                onClick={() => onNavigate('forgot-password')}
                                className="w-full py-3 px-4 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] shadow-md transition-colors"
                            >
                                Request New Reset Link
                            </button>
                             <button 
                                onClick={() => setStatus('form')}
                                className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Try Again (Demo)
                            </button>
                        </div>
                    </div>
                )}
                
                {/* Security Note Section */}
                {status === 'form' && (
                    <div className="bg-gray-50 px-8 py-5 border-t border-gray-100">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-[#F9A826] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            <div className="text-xs text-gray-500">
                                <p className="font-semibold text-gray-700 mb-1">Security Tips</p>
                                <ul className="space-y-1 list-disc list-inside">
                                    <li>Choose a strong password with at least 8 characters.</li>
                                    <li>Include a mix of letters, numbers, and symbols.</li>
                                    <li>Never share your password with anyone.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default ResetPasswordPage;
