
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface AccessDeniedPageProps {
  onNavigate: (page: string) => void;
}

const AccessDeniedPage: React.FC<AccessDeniedPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Header onNavigate={onNavigate} activePage="home" />
      
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        
        <div className="w-full max-w-2xl text-center">
            
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 md:p-14 mb-10">
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-6">
                    <svg className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h1 className="text-4xl font-extrabold text-[#0A2B4C] mb-4">Access Denied</h1>
                <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                    You do not have permission to view this page. This area is restricted to authorized personnel only.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                        onClick={() => onNavigate('home')}
                        className="w-full sm:w-auto py-3 px-8 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] shadow-md transition-colors"
                    >
                        Return Home
                    </button>
                    <button 
                        onClick={() => onNavigate('login')}
                        className="w-full sm:w-auto py-3 px-8 bg-white border border-[#0A2B4C] text-[#0A2B4C] font-bold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Switch Account
                    </button>
                </div>
            </div>

        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default AccessDeniedPage;
