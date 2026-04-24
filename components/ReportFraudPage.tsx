
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface ReportFraudPageProps {
  onNavigate: (page: string) => void;
  userRole?: string;
}

const ReportFraudPage: React.FC<ReportFraudPageProps> = ({ onNavigate, userRole = 'guest' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    target: '',
    reason: 'Fake Listing / Property Does Not Exist',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // 1. Automatically prefill Name and Email based on logged-in user role
    if (userRole !== 'guest') {
        const mockUserData: Record<string, { name: string; email: string }> = {
            'user': { name: 'John Doe', email: 'john.doe@example.com' },
            'agent': { name: 'Martin McDermott', email: 'agent@sheltershub.com' },
            'agency': { name: 'Prime Real Estate Admin', email: 'info@primerealestate.com' },
            'developer': { name: 'Empire Builders Admin', email: 'contact@empirebuilders.com' },
            'admin': { name: 'System Administrator', email: 'admin@sheltershub.com' },
            'editor': { name: 'John Editor', email: 'editor@sheltershub.com' },
        };

        const currentUser = mockUserData[userRole] || mockUserData['user']; // Default to user if specific role missing

        setFormData(prev => ({
            ...prev,
            name: currentUser.name,
            email: currentUser.email
        }));
    }

    // Check for pre-filled target from other pages (e.g. clicking 'Report' on a property)
    const prefillTarget = sessionStorage.getItem('reportTarget');
    if (prefillTarget) {
      setFormData(prev => ({ ...prev, target: prefillTarget }));
      sessionStorage.removeItem('reportTarget'); // Clear after use
    }
  }, [userRole]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call, Email Notification, and Audit Logging
    setTimeout(() => {
      // 1. Simulate Email Notification to Admins
      console.log(`[System Notification] Email sent to admin@sheltershub.com: New Fraud Report from ${formData.email} regarding ${formData.target}.`);
      
      // 2. Simulate Audit Logging
      console.log(`[Audit Log] User: ${formData.email}, Action: Submitted Fraud Report, Target: ${formData.target}, Timestamp: ${new Date().toISOString()}`);

      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="report-fraud" />

      {/* Hero Section */}
      <div className="bg-[#0A2B4C] text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Report Fraud</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
                Help us keep Sheltershub safe. If you suspect a listing, agent, or activity is fraudulent, please let us know immediately.
            </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex justify-center">
        <div className="w-full max-w-2xl">
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                
                {submitted ? (
                    <div className="text-center py-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-[#0A2B4C] mb-4">Report Submitted</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Thank you for bringing this to our attention. Our Trust & Safety team has been notified via email and will investigate your report within 24 hours.
                        </p>
                        <button 
                            onClick={() => onNavigate('home')}
                            className="px-8 py-3 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] transition-colors"
                        >
                            Return to Home
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name" 
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email" 
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Suspected Entity / Listing</label>
                            <input 
                                type="text" 
                                name="target"
                                required
                                value={formData.target}
                                onChange={handleChange}
                                placeholder="Paste Listing URL, ID, or Agent Name" 
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] bg-gray-50" 
                            />
                            <p className="text-xs text-gray-500 mt-1">If you clicked "Report" from a listing page, this is auto-filled.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Reporting</label>
                            <select 
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826] bg-white"
                            >
                                <option>Fake Listing / Property Does Not Exist</option>
                                <option>Scammer / Asking for Upfront Payment</option>
                                <option>Impersonation of Home Owner, Agent, Agency, or Developer</option>
                                <option>Incorrect Price / Misleading Information</option>
                                <option>Duplicate Listing</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <textarea 
                                name="description"
                                required
                                value={formData.description}
                                onChange={handleChange}
                                rows={5} 
                                placeholder="Please provide more details about the issue..." 
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]"
                            ></textarea>
                        </div>

                        <div className="pt-2">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 shadow-md transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
                            >
                                {loading ? 'Submitting...' : 'Report Fraud'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default ReportFraudPage;
