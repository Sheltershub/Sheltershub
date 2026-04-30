import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, Upload, ArrowRight, ArrowLeft, Camera, ShieldCheck, Mail, Lock, User, MapPin, Building, FileText, Globe, Info } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface AgencyInviteRegistrationPageProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
  inviterName?: string;
}

const AgencyInviteRegistrationPage: React.FC<AgencyInviteRegistrationPageProps> = ({ 
  onNavigate, 
  onBack,
  inviterName = 'Goldkey Properties' 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1: Set Password
    email: 'admin@sub-agency.com', // Pre-filled
    password: '',
    confirmPassword: '',
    // Step 2: Agency Profile
    agencyName: '',
    adminFullName: '',
    businessRegNumber: '',
    physicalAddress: '',
    agencyDescription: '',
    agencyLogo: null as File | null,
    roleInDevOrg: '',
    websiteUrl: '',
    // Step 3: Identity Verification
    idType: '',
    idNumber: '',
    idFront: null as File | null,
    idBack: null as File | null,
    businessDoc: null as File | null,
  });

  const [previews, setPreviews] = useState({
    agencyLogo: null as string | null,
    idFront: null as string | null,
    idBack: null as string | null,
    businessDoc: null as string | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof previews) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const steps = [
    { number: 1, title: 'Set Password', icon: Lock },
    { number: 2, title: 'Agency Profile', icon: Building },
    { number: 3, title: 'Identity Verification', icon: ShieldCheck },
  ];

  return (
    <div className="bg-gray-50 dark:bg-slate-dark-950 min-h-screen font-sans transition-colors duration-300">
      <Header onNavigate={onNavigate} activePage="agencies" />

      <main className="container mx-auto px-4 py-12 max-w-4xl tracking-tight">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-[#0A2B4C] dark:hover:text-brand-orange transition-colors mb-6 group"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-bold">Back to Previous Page</span>
        </button>

        {submitted ? (
          <div className="bg-white dark:bg-slate-dark-900 rounded-[32px] border border-green-100 dark:border-green-900/30 shadow-2xl p-12 text-center animate-fadeIn">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-50 dark:bg-green-900/20 mb-8 border border-green-100 dark:border-green-900/30">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <h2 className="text-4xl font-black text-[#0A2B4C] dark:text-white mb-4">Registration Complete!</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-10 max-w-xl mx-auto font-medium leading-relaxed">
              Your agency registration is complete and pending admin approval. Upon approval, your agency will be linked to <span className="text-[#0A2B4C] dark:text-brand-blue font-bold">{inviterName}</span>.
            </p>
            <button 
              onClick={() => onNavigate('login')}
              className="py-4 px-10 bg-[#0A2B4C] text-white font-black rounded-2xl hover:bg-[#08223c] transition-all shadow-xl shadow-[#0A2B4C]/20 transform active:scale-95"
            >
              Sign In to Dashboard
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-black text-[#0A2B4C] dark:text-white mb-3">Agency Registration</h1>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium text-lg">
                Complete your agency registration to join your developer organisation on Sheltershub.
              </p>
            </div>

            {/* Progress Stepper */}
            <div className="flex justify-between items-center mb-16 relative px-12 max-w-3xl mx-auto">
              <div className="absolute left-16 right-16 top-1/2 h-px bg-gray-200 dark:bg-slate-dark-800 -translate-y-1/2 z-0"></div>
              {steps.map((step) => {
                const StepIcon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                
                return (
                  <div key={step.number} className="relative z-10 flex flex-col items-center">
                    <div className={`h-14 w-14 rounded-full flex items-center justify-center transition-all duration-500 border-4 ${
                      isActive 
                        ? 'bg-[#F9A826] border-white dark:border-slate-dark-900 text-white shadow-xl shadow-[#F9A826]/30' 
                        : isCompleted 
                          ? 'bg-green-500 border-white dark:border-slate-dark-900 text-white' 
                          : 'bg-white dark:bg-slate-dark-800 border-gray-100 dark:border-slate-dark-700 text-gray-300 dark:text-slate-dark-500'
                    }`}>
                      {isCompleted ? <CheckCircle2 size={24} /> : <StepIcon size={22} />}
                    </div>
                    <div className={`absolute top-16 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] ${
                      isActive ? 'text-[#F9A826]' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white dark:bg-slate-dark-900 rounded-[40px] border border-gray-100 dark:border-slate-dark-800 shadow-2xl overflow-hidden mt-16">
              {/* Invitation Notice */}
              <div className="bg-[#E3F2FD] dark:bg-slate-dark-800 border-l-4 border-[#0A2B4C] dark:border-brand-blue p-6 m-8 md:mx-14 rounded-lg">
                <p className="text-[#0A2B4C] dark:text-gray-200 font-bold text-sm">
                  You have been invited to register your agency under <span className="font-black underline dark:text-brand-blue">{inviterName}</span> on Sheltershub.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="px-8 pb-12 pt-4 md:px-14">
                
                {/* Step 1: Set Password */}
                {currentStep === 1 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div className="flex items-center gap-4 border-l-4 border-[#F9A826] pl-6 mb-10">
                      <h2 className="text-3xl font-black text-[#0A2B4C] dark:text-white">Set Password</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-7">
                      <div>
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Administrator Email</label>
                        <div className="relative">
                          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input 
                            value={formData.email}
                            readOnly 
                            className="w-full bg-[#F4F6F8] dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl pl-14 pr-6 py-4.5 text-base font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed outline-none font-sans" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                        <div>
                          <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Password</label>
                          <div className="relative group">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F9A826] transition-colors" size={20} />
                            <input 
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              type={showPassword ? 'text' : 'password'} 
                              required 
                              placeholder="••••••••" 
                              className="w-full bg-gray-50/50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl pl-14 pr-14 py-4.5 text-base focus:outline-none focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 font-medium transition-all text-gray-700 dark:text-gray-200" 
                            />
                            <button 
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#F9A826] transition-colors"
                            >
                              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Confirm Password</label>
                          <div className="relative group">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F9A826] transition-colors" size={20} />
                            <input 
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              type="password" 
                              required 
                              placeholder="••••••••" 
                              className="w-full bg-gray-50/50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl pl-14 pr-6 py-4.5 text-base focus:outline-none focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 font-medium transition-all text-gray-700 dark:text-gray-200" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Agency Profile */}
                {currentStep === 2 && (
                  <div className="space-y-10 animate-fadeIn">
                    <div className="flex items-center gap-4 border-l-4 border-[#F9A826] pl-6 mb-10">
                      <h2 className="text-3xl font-black text-[#0A2B4C] dark:text-white">Agency Profile</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-7">
                      <div>
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Agency Name</label>
                        <input 
                          name="agencyName"
                          value={formData.agencyName}
                          onChange={handleInputChange}
                          type="text" 
                          required 
                          placeholder="e.g. Skyline Real Estate" 
                          className="w-full bg-gray-50/50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl px-6 py-4.5 text-base focus:outline-none focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 font-medium transition-all text-gray-700 dark:text-gray-200" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Administrator Full Name</label>
                        <input 
                          name="adminFullName"
                          value={formData.adminFullName}
                          onChange={handleInputChange}
                          type="text" 
                          required 
                          placeholder="Samuel Amankwah" 
                          className="w-full bg-gray-50/50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl px-6 py-4.5 text-base focus:outline-none focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 font-medium transition-all text-gray-700 dark:text-gray-200" 
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                        <div>
                          <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Business Registration Number</label>
                          <input 
                            name="businessRegNumber"
                            value={formData.businessRegNumber}
                            onChange={handleInputChange}
                            type="text" 
                            required 
                            placeholder="e.g. BN12345678" 
                            className="w-full bg-gray-50/50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl px-6 py-4.5 text-base focus:outline-none focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 font-medium transition-all text-gray-700 dark:text-gray-200" 
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Physical Address</label>
                          <input 
                            name="physicalAddress"
                            value={formData.physicalAddress}
                            onChange={handleInputChange}
                            type="text" 
                            required 
                            placeholder="e.g. 15th Street, Airport Residential" 
                            className="w-full bg-gray-50/50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl px-6 py-4.5 text-base focus:outline-none focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 font-medium transition-all text-gray-700 dark:text-gray-200" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Agency Description</label>
                        <textarea 
                          name="agencyDescription"
                          value={formData.agencyDescription}
                          onChange={handleInputChange}
                          required
                          rows={4} 
                          placeholder="Describe your agency's operations and role under the developer." 
                          className="w-full bg-gray-50/50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl px-6 py-4.5 text-base focus:outline-none focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 font-medium transition-all text-gray-700 dark:text-gray-200" 
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Upload Agency Logo</label>
                        <div 
                          onClick={() => document.getElementById('agencyLogoInviteInput')?.click()}
                          className="relative border-2 border-dashed border-gray-100 dark:border-slate-dark-800 bg-gray-50/30 dark:bg-slate-dark-950 rounded-[32px] p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#F9A826] hover:bg-[#F9A826]/5 transition-all group overflow-hidden h-40"
                        >
                          {previews.agencyLogo ? (
                            <img src={previews.agencyLogo} alt="Logo Preview" className="h-full object-contain animate-fadeIn" />
                          ) : (
                            <>
                              <Camera size={38} className="text-gray-200 dark:text-slate-dark-700 mb-3 group-hover:text-[#F9A826] group-hover:scale-110 transition-all duration-500" />
                              <span className="text-[10px] font-black text-[#0A2B4C] dark:text-gray-400 uppercase tracking-[0.3em]">Drop Logo Here</span>
                              <span className="text-[9px] text-gray-400 dark:text-slate-dark-500 mt-2 font-bold italic">JPG/PNG • MAX 5MB</span>
                            </>
                          )}
                          <input 
                            id="agencyLogoInviteInput"
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'agencyLogo')}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                        <div>
                          <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Role / Title within Developer Organisation</label>
                          <input 
                            name="roleInDevOrg"
                            value={formData.roleInDevOrg}
                            onChange={handleInputChange}
                            type="text" 
                            placeholder="e.g. Affiliated Agency Admin" 
                            className="w-full bg-gray-50/50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl px-6 py-4.5 text-base focus:outline-none focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 font-medium transition-all text-gray-700 dark:text-gray-200" 
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Website URL</label>
                          <input 
                            name="websiteUrl"
                            value={formData.websiteUrl}
                            onChange={handleInputChange}
                            type="url" 
                            placeholder="https://" 
                            className="w-full bg-gray-50/50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl px-6 py-4.5 text-base focus:outline-none focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 font-medium transition-all text-gray-700 dark:text-gray-200" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Identity Verification */}
                {currentStep === 3 && (
                  <div className="space-y-12 animate-fadeIn">
                    <div className="flex items-center gap-4 border-l-4 border-[#F9A826] pl-6 mb-10">
                      <h2 className="text-3xl font-black text-[#0A2B4C] dark:text-white">Identity Verification</h2>
                    </div>

                    <div className="space-y-12">
                      <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-6 w-1.5 bg-[#0A2B4C] dark:bg-brand-blue rounded-full"></div>
                            <h3 className="text-sm font-black text-[#0A2B4C] dark:text-gray-300 uppercase tracking-[0.2em]">Administrator Identity</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                          <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">ID Type</label>
                            <select 
                              name="idType"
                              value={formData.idType}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-100 dark:border-slate-dark-800 rounded-2xl px-6 py-4.5 text-base font-medium focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 outline-none appearance-none transition-all text-gray-700 dark:text-gray-200"
                            >
                              <option value="">Select ID Type</option>
                              <option value="Ghana Card">Ghana Card</option>
                              <option value="Passport">Passport</option>
                              <option value="Voter ID">Voter ID</option>
                              <option value="Driver's Licence">Driver's Licence</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">ID Number</label>
                            <input 
                              name="idNumber"
                              value={formData.idNumber}
                              onChange={handleInputChange}
                              type="text" 
                              required 
                              placeholder="Enter ID number" 
                              className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-100 dark:border-slate-dark-800 rounded-2xl px-6 py-4.5 text-base font-medium focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 outline-none transition-all text-gray-700 dark:text-gray-200" 
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                          <div>
                             <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Upload ID (Front)</label>
                             <div 
                               onClick={() => document.getElementById('idFrontInputAgencyInvite')?.click()}
                               className="relative border-2 border-dashed border-gray-100 dark:border-slate-dark-800 bg-gray-50/20 dark:bg-slate-dark-950 rounded-[32px] p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#F9A826] hover:bg-[#F9A826]/5 transition-all group overflow-hidden h-44"
                             >
                               {previews.idFront ? (
                                 <img src={previews.idFront} alt="ID Front Preview" className="absolute inset-0 w-full h-full object-cover animate-fadeIn" />
                               ) : (
                                 <>
                                   <Camera size={34} className="text-gray-200 dark:text-slate-dark-700 mb-3 group-hover:text-[#F9A826] transition-all" />
                                   <span className="text-[10px] font-black text-[#0A2B4C] dark:text-gray-400 uppercase tracking-widest">Front Side</span>
                                   <span className="text-[8px] text-gray-400 dark:text-slate-dark-500 mt-2 font-bold uppercase tracking-widest shadow-sm px-2 py-1 bg-white dark:bg-slate-dark-900 rounded-full">5MB MAX</span>
                                 </>
                               )}
                               <input 
                                 id="idFrontInputAgencyInvite"
                                 type="file" 
                                 className="hidden" 
                                 accept="image/*"
                                 onChange={(e) => handleFileChange(e, 'idFront')}
                               />
                             </div>
                          </div>
                          <div>
                             <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Upload ID (Back)</label>
                             <div 
                               onClick={() => document.getElementById('idBackInputAgencyInvite')?.click()}
                               className="relative border-2 border-dashed border-gray-100 dark:border-slate-dark-800 bg-gray-50/20 dark:bg-slate-dark-950 rounded-[32px] p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#F9A826] hover:bg-[#F9A826]/5 transition-all group overflow-hidden h-44"
                             >
                               {previews.idBack ? (
                                 <img src={previews.idBack} alt="ID Back Preview" className="absolute inset-0 w-full h-full object-cover animate-fadeIn" />
                               ) : (
                                 <>
                                   <Camera size={34} className="text-gray-200 dark:text-slate-dark-700 mb-3 group-hover:text-[#F9A826] transition-all" />
                                   <span className="text-[10px] font-black text-[#0A2B4C] dark:text-gray-400 uppercase tracking-widest">Back Side</span>
                                   <span className="text-[8px] text-gray-400 dark:text-slate-dark-500 mt-2 font-bold uppercase tracking-widest shadow-sm px-2 py-1 bg-white dark:bg-slate-dark-900 rounded-full">5MB MAX</span>
                                 </>
                               )}
                               <input 
                                 id="idBackInputAgencyInvite"
                                 type="file" 
                                 className="hidden" 
                                 accept="image/*"
                                 onChange={(e) => handleFileChange(e, 'idBack')}
                               />
                             </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-6 w-1.5 bg-[#0A2B4C] dark:bg-brand-blue rounded-full"></div>
                            <h3 className="text-sm font-black text-[#0A2B4C] dark:text-gray-300 uppercase tracking-[0.2em]">Business Documents</h3>
                        </div>
                        <div>
                          <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Upload Business Registration Document</label>
                          <div 
                            onClick={() => document.getElementById('businessDocInviteInput')?.click()}
                            className="relative border-2 border-dashed border-gray-100 dark:border-slate-dark-800 bg-gray-50/20 dark:bg-slate-dark-950 rounded-[32px] p-14 flex flex-col items-center justify-center cursor-pointer hover:border-[#F9A826] hover:bg-[#F9A826]/5 transition-all group overflow-hidden shadow-sm"
                          >
                            {previews.businessDoc ? (
                              <div className="flex items-center gap-4 text-green-600 font-bold animate-fadeIn">
                                <CheckCircle2 size={38} />
                                <span className="text-sm truncate max-w-xs">{formData.businessDoc?.name}</span>
                              </div>
                            ) : (
                              <>
                                <Upload size={38} className="text-gray-200 dark:text-slate-dark-700 mb-3 group-hover:text-[#F9A826] transition-all" />
                                <span className="text-[10px] font-black text-[#0A2B4C] dark:text-gray-400 uppercase tracking-widest text-center leading-relaxed">Click to Upload<br/>Registration Certificate</span>
                                <span className="text-[8px] text-gray-400 dark:text-slate-dark-500 mt-3 font-bold uppercase tracking-widest">PDF/JPG/PNG • 10MB MAX</span>
                              </>
                            )}
                            <input 
                              id="businessDocInviteInput"
                              type="file" 
                              className="hidden" 
                              accept=".pdf,image/*"
                              onChange={(e) => handleFileChange(e, 'businessDoc')}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col-reverse sm:flex-row justify-between gap-5 mt-16 pt-10 border-t border-gray-100 dark:border-slate-dark-800">
                  {currentStep > 1 ? (
                    <button 
                      type="button" 
                      onClick={prevStep}
                      className="py-4.5 px-10 bg-white dark:bg-slate-dark-900 border border-gray-200 dark:border-slate-dark-700 text-[#0A2B4C] dark:text-gray-300 text-[15px] font-black rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-dark-800 hover:border-gray-300 dark:hover:border-slate-dark-600 transition-all flex items-center justify-center gap-3 transform active:scale-95 group"
                    >
                      <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                      Back
                    </button>
                  ) : (
                    <div className="hidden sm:block"></div>
                  )}

                  {currentStep < 3 ? (
                    <button 
                      type="button" 
                      onClick={nextStep}
                      className="py-4.5 px-12 bg-[#0A2B4C] text-white text-[15px] font-black rounded-2xl hover:bg-[#08223c] transition-all flex items-center justify-center gap-3 transform active:scale-95 shadow-2xl shadow-[#0A2B4C]/20 group"
                    >
                      Continue
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      className="py-4.5 px-14 bg-[#F9A826] text-white text-[15px] font-black rounded-2xl hover:bg-[#e09a25] transition-all transform active:scale-95 shadow-2xl shadow-[#F9A826]/30"
                    >
                      Complete Registration
                    </button>
                  )}
                </div>

              </form>
            </div>
            
            <p className="text-center text-gray-400 text-[10px] font-bold mt-10 uppercase tracking-[0.3em]">
              Sheltershub Verification System • Phase 2
            </p>
          </>
        )}
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default AgencyInviteRegistrationPage;
