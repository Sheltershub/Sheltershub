
import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';

interface AgentVerificationPageProps {
  onNavigate: (page: string) => void;
}

const AgentVerificationPage: React.FC<AgentVerificationPageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Martin McDermott', // Simulated auto-fill from registration
    dob: '',
    gender: '',
    address: '',
    digitalAddress: '',
    email: 'agent@sheltershub.com', // Read-only
    phone: '',
    socials: '',
    idType: 'Ghana Card',
    idNumber: '',
    association: '',
    licenseNumber: ''
  });

  const [files, setFiles] = useState<{ [key: string]: string | null }>({
    idFront: null,
    idBack: null,
    licenseDoc: null
  });

  const associations = [
    "Ghana Real Estate Developers Association (GREDA)",
    "Ghana Real Estate Agency Council (GREAC)",
    "Ghana Real Estate Professional Association (GREPA)",
    "Ghana Association of Real Estate Brokers (GAREB)"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setFiles(prev => ({ ...prev, [fieldName]: url }));
    }
  };

  const handleFinalSubmit = () => {
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    }, 1000);
  };

  const nextStep = () => {
    window.scrollTo(0, 0);
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    window.scrollTo(0, 0);
    setStep(prev => prev - 1);
  };

  if (isSubmitted) {
    return (
      <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
        <Header onNavigate={onNavigate} activePage="home" />
        <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-10 max-w-2xl text-center">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-yellow-100 mb-6">
              <svg className="h-12 w-12 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#0A2B4C] mb-4">Verification Pending</h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Thank you for submitting your verification details. Your account is now under review by our administration team.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 text-left">
              <h4 className="font-bold text-[#0A2B4C] mb-2 text-sm uppercase tracking-wide">Account Status: Restricted</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>You cannot publish new property listings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>You can access your dashboard and prepare drafts.</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => onNavigate('agent-properties')}
              className="px-8 py-3 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] transition-colors"
            >
              Go to Agent Dashboard
            </button>
          </div>
        </main>
        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="home" />

      <div className="bg-[#0A2B4C] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">Agent Verification</h1>
          <p className="text-blue-200 max-w-2xl mx-auto">
            To ensure trust and safety on Sheltershub, all agents must complete this one-time verification process before publishing listings.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-10">
          <div className={`flex items-center ${step >= 1 ? 'text-[#0A2B4C]' : 'text-gray-400'}`}>
            <span className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${step >= 1 ? 'border-[#0A2B4C] bg-[#0A2B4C] text-white' : 'border-gray-300'} font-bold mr-2`}>1</span>
            <span className="font-semibold hidden sm:inline">Personal</span>
          </div>
          <div className={`flex-1 h-1 mx-4 max-w-[100px] ${step >= 2 ? 'bg-[#0A2B4C]' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center ${step >= 2 ? 'text-[#0A2B4C]' : 'text-gray-400'}`}>
            <span className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${step >= 2 ? 'border-[#0A2B4C] bg-[#0A2B4C] text-white' : 'border-gray-300'} font-bold mr-2`}>2</span>
            <span className="font-semibold hidden sm:inline">Identity</span>
          </div>
          <div className={`flex-1 h-1 mx-4 max-w-[100px] ${step >= 3 ? 'bg-[#0A2B4C]' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center ${step >= 3 ? 'text-[#0A2B4C]' : 'text-gray-400'}`}>
            <span className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${step >= 3 ? 'border-[#0A2B4C] bg-[#0A2B4C] text-white' : 'border-gray-300'} font-bold mr-2`}>3</span>
            <span className="font-semibold hidden sm:inline">Professional</span>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Step 1: Personal & Contact Information */}
          {step === 1 && (
            <div className="p-8 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-[#0A2B4C] mb-6 border-b pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                    <input 
                      type="date" 
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                    <select 
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none bg-white"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#0A2B4C] mb-6 border-b pb-2">Location Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Residential Address</label>
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. House No. 12, Main Street, Accra"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Digital Address (GhanaPostGPS) <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input 
                      type="text" 
                      name="digitalAddress"
                      value={formData.digitalAddress}
                      onChange={handleInputChange}
                      placeholder="e.g. GA-123-4567"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none" 
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#0A2B4C] mb-6 border-b pb-2">Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      readOnly
                      className="w-full border border-gray-200 bg-gray-100 text-gray-500 rounded-lg px-4 py-3 text-sm outline-none cursor-not-allowed" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone / WhatsApp Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+233"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Social Media Profile <span className="text-gray-400 font-normal">(LinkedIn/Facebook - Optional)</span></label>
                    <input 
                      type="url" 
                      name="socials"
                      value={formData.socials}
                      onChange={handleInputChange}
                      placeholder="https://"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none" 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Identity Verification */}
          {step === 2 && (
            <div className="p-8 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-[#0A2B4C] mb-6 border-b pb-2">Identity Verification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">ID Type</label>
                    <select 
                      name="idType"
                      value={formData.idType}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none bg-white"
                    >
                      <option value="Ghana Card">Ghana Card</option>
                      <option value="Passport">Passport</option>
                      <option value="Voters ID">Voter's ID</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">ID Number</label>
                    <input 
                      type="text" 
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. GHA-123456789-0"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Front ID Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Upload ID (Front)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'idFront')}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {files.idFront ? (
                        <div className="relative h-32 w-full rounded overflow-hidden">
                          <img src={files.idFront} alt="ID Front" className="h-full w-full object-cover" />
                        </div>
                      ) : (
                        <div className="text-gray-500">
                          <svg className="w-10 h-10 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <span className="text-sm font-medium text-[#F9A826]">Click to upload</span>
                          <span className="text-xs block mt-1">JPG, PNG (Max 5MB)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Back ID Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Upload ID (Back)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'idBack')}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {files.idBack ? (
                        <div className="relative h-32 w-full rounded overflow-hidden">
                          <img src={files.idBack} alt="ID Back" className="h-full w-full object-cover" />
                        </div>
                      ) : (
                        <div className="text-gray-500">
                          <svg className="w-10 h-10 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <span className="text-sm font-medium text-[#F9A826]">Click to upload</span>
                          <span className="text-xs block mt-1">JPG, PNG (Max 5MB)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Professional Verification */}
          {step === 3 && (
            <div className="p-8 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-[#0A2B4C] mb-6 border-b pb-2">Professional Details</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Real Estate Association</label>
                    <select 
                      name="association"
                      value={formData.association}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none bg-white"
                    >
                      <option value="">Select Association</option>
                      {associations.map((assoc, idx) => (
                        <option key={idx} value={assoc}>{assoc}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Agent License / Certification Number</label>
                    <input 
                      type="text" 
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. GRE-CERT-2023-001"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Upload License or Certification</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors relative">
                        <input 
                          type="file" 
                          accept=".pdf,image/*"
                          onChange={(e) => handleFileChange(e, 'licenseDoc')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {files.licenseDoc ? (
                          <div className="text-green-600 font-medium flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Document Uploaded Successfully
                          </div>
                        ) : (
                          <>
                            <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            <span className="text-sm font-medium text-[#F9A826]">Click to upload document</span>
                            <span className="text-xs text-gray-500 block mt-1">PDF, JPG, PNG (Max 10MB)</span>
                          </>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 flex justify-between">
            {step > 1 ? (
              <button 
                type="button" 
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Back
              </button>
            ) : (
              <div /> /* Spacer */
            )}

            {step < 3 ? (
              <button 
                type="button" 
                onClick={nextStep}
                className="px-8 py-3 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] transition-colors"
              >
                Next Step
              </button>
            ) : (
              <button 
                type="button"
                onClick={handleFinalSubmit}
                className="px-8 py-3 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15] shadow-md transition-colors"
              >
                Send Verification
              </button>
            )}
          </div>

        </form>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default AgentVerificationPage;
