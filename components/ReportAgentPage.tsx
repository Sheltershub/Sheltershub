
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface ReportAgentPageProps {
  onNavigate: (page: string) => void;
}

const ReportAgentPage: React.FC<ReportAgentPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    agentName: '',
    agentId: 'AGT-12345', // Mock ID
    reporterName: '',
    reporterEmail: '',
    reason: 'Fraud or scam',
    description: '',
    confirmTruth: false
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Retrieve pre-filled agent name if available
    const agentName = sessionStorage.getItem('reportAgentName');
    if (agentName) {
      setFormData(prev => ({ ...prev, agentName }));
      sessionStorage.removeItem('reportAgentName'); // Clean up
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Handle checkbox separately
    if (e.target.type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.confirmTruth) {
        alert("Please confirm that the report is truthful.");
        return;
    }
    setLoading(true);
    // Simulate API submission delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="report-agent" />

      {/* Page Title Section */}
      <div className="bg-[#0A2B4C] text-white py-12">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-2">Report Agent</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
                Help us keep Sheltershub safe and trustworthy by reporting misconduct.
            </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex justify-center">
        <div className="w-full max-w-2xl">
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                
                {submitted ? (
                    <div className="p-10 text-center py-16">
                        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                            <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-[#0A2B4C] mb-4">Report Submitted</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Thank you. Your report has been submitted for review. Our Trust & Safety team will investigate the matter.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button 
                                onClick={() => onNavigate('home')}
                                className="px-6 py-3 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] transition-colors"
                            >
                                Return Home
                            </button>
                            <button 
                                onClick={() => onNavigate('agents')}
                                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                View Agents
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="space-y-6">
                            
                            {/* Agent Details (Read Only) */}
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Reporting Agent</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Agent Name</label>
                                        <input 
                                            type="text" 
                                            name="agentName"
                                            value={formData.agentName}
                                            readOnly
                                            placeholder="Agent Name"
                                            className="w-full border border-gray-300 bg-gray-100 text-gray-600 rounded px-3 py-2 text-sm focus:outline-none" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Agent ID</label>
                                        <input 
                                            type="text" 
                                            name="agentId"
                                            value={formData.agentId}
                                            readOnly
                                            className="w-full border border-gray-300 bg-gray-100 text-gray-600 rounded px-3 py-2 text-sm focus:outline-none" 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Reporter Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        name="reporterName"
                                        required
                                        value={formData.reporterName}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F9A826]" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Email <span className="text-red-500">*</span></label>
                                    <input 
                                        type="email" 
                                        name="reporterEmail"
                                        required
                                        value={formData.reporterEmail}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F9A826]" 
                                    />
                                </div>
                            </div>

                            {/* Report Details */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Report <span className="text-red-500">*</span></label>
                                <select 
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F9A826] bg-white"
                                >
                                    <option value="Fraud or scam">Fraud or scam</option>
                                    <option value="Fake listings">Fake listings</option>
                                    <option value="Unprofessional behavior">Unprofessional behavior</option>
                                    <option value="Harassment">Harassment</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Description <span className="text-red-500">*</span></label>
                                <textarea 
                                    name="description"
                                    required
                                    rows={5}
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Please describe the incident or issue in detail..." 
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F9A826]"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Evidence <span className="text-gray-400 font-normal">(Optional)</span></label>
                                <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors relative cursor-pointer">
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                                    <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <span className="text-xs">Click to upload screenshots or documents</span>
                                </div>
                            </div>

                            {/* Confirmation */}
                            <div className="flex items-start gap-3 pt-2">
                                <div className="flex items-center h-5">
                                    <input 
                                        id="confirm" 
                                        name="confirmTruth" 
                                        type="checkbox" 
                                        checked={formData.confirmTruth}
                                        onChange={handleChange}
                                        className="focus:ring-[#F9A826] h-4 w-4 text-[#F9A826] border-gray-300 rounded" 
                                    />
                                </div>
                                <label htmlFor="confirm" className="text-sm text-gray-600">
                                    I confirm this report is truthful and accurate to the best of my knowledge. I understand that false reporting may lead to account suspension.
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 shadow-md transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </>
                                ) : 'Submit Report'}
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

export default ReportAgentPage;
