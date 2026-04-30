import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, Upload, ArrowRight, ArrowLeft, Camera, ShieldCheck, Mail, Phone, Lock, User, MapPin, Building, Globe, Info, Calendar, FileText } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface AddDeveloperPageProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
}

const AddDeveloperPage: React.FC<AddDeveloperPageProps> = ({ onNavigate, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1: Account Setup
    adminFullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Step 2: Company Profile
    companyName: '',
    companyRegNumber: '',
    physicalAddress: '',
    digitalAddress: '',
    companyDescription: '',
    companyLogo: null as File | null,
    contactEmail: '',
    websiteUrl: '',
    yearEstablished: '',
    activeProjects: '',
    // Step 3: Identity Verification
    idType: '',
    idNumber: '',
    idFront: null as File | null,
    idBack: null as File | null,
    incorporationCert: null as File | null,
    directorId: null as File | null,
  });

  const [previews, setPreviews] = useState({
    companyLogo: null as string | null,
    idFront: null as string | null,
    idBack: null as string | null,
    incorporationCert: null as string | null,
    directorId: null as string | null
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
    { number: 1, title: 'Account Setup', icon: Lock },
    { number: 2, title: 'Company Profile', icon: Building },
    { number: 3, title: 'Identity Verification', icon: ShieldCheck },
  ];

  return (
    <div className="bg-gray-50 dark:bg-slate-dark-950 min-h-screen font-sans transition-colors duration-300">
      <Header onNavigate={onNavigate} activePage="developers" />

      <main className="container mx-auto px-4 py-12 max-w-4xl tracking-tight">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-[#0A2B4C] dark:hover:text-brand-orange transition-colors mb-6 group"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-bold">Back to Previous Page</span>
        </button>

        {submitted ? (
          <div className="bg-white dark:bg-slate-dark-900 rounded-[32px] border border-orange-100 dark:border-orange-900/30 shadow-2xl p-12 text-center animate-fadeIn">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-orange-50 dark:bg-orange-900/20 mb-8 border border-orange-100 dark:border-orange-900/30">
              <CheckCircle2 className="h-12 w-12 text-[#F9A826]" />
            </div>
            <h2 className="text-4xl font-black text-[#0A2B4C] dark:text-white mb-4">Account Submitted!</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-10 max-w-xl mx-auto font-medium leading-relaxed">
              Your developer account has been submitted for verification. Admin will review your documents and notify you by email.
            </p>
            <button 
              onClick={() => onNavigate('home')}
              className="py-4 px-10 bg-[#0A2B4C] text-white font-black rounded-2xl hover:bg-[#08223c] transition-all shadow-xl shadow-[#0A2B4C]/20 transform active:scale-95"
            >
              Return Home
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-black text-[#0A2B4C] dark:text-white mb-3">Developer Registration</h1>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium text-lg">
                Register your property development company on Sheltershub to manage projects, agencies, and agents.
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
                      isActive ? 'text-[#F9A826]' : 'text-gray-400 dark:text-slate-dark-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white dark:bg-slate-dark-900 rounded-[40px] border border-gray-100 dark:border-slate-dark-800 shadow-3xl overflow-hidden mt-16 transition-all duration-700">
              <form onSubmit={handleSubmit} className="p-8 md:p-14">
                
                {/* Step 1: Account Setup */}
                {currentStep === 1 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div className="flex items-center gap-4 border-l-4 border-[#F9A826] pl-6 mb-10">
                      <h2 className="text-3xl font-black text-[#0A2B4C] dark:text-white">Account Setup</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-7">
                      <div>
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Administrator Full Name</label>
                        <div className="relative group">
                          <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F9A826] transition-colors" size={20} />
                          <input 
                            name="adminFullName"
                            value={formData.adminFullName}
                            onChange={handleInputChange}
                            type="text" 
                            required 
                            placeholder="e.g. Kwabena Mensah" 
                            className="w-full bg-gray-50/50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl pl-14 pr-6 py-4.5 text-base focus:outline-none focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 font-medium transition-all text-gray-700 dark:text-gray-200" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                        <div>
                          <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Email Address</label>
                          <div className="relative group">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F9A826] transition-colors" size={20} />
                            <input 
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              type="email" 
                              required 
                              placeholder="admin@developer.com" 
                              className="w-full bg-gray-50/50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl pl-14 pr-6 py-4.5 text-base focus:outline-none focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 font-medium transition-all text-gray-700 dark:text-gray-200" 
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Phone / WhatsApp Number</label>
                          <div className="relative group">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold group-focus-within:text-[#F9A826] transition-colors tracking-tight">+233</span>
                            <input 
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              type="text" 
                              required 
                              placeholder="24 123 4567" 
                              className="w-full bg-gray-50/50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl pl-20 pr-6 py-4.5 text-base focus:outline-none focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 font-medium transition-all text-gray-700 dark:text-gray-200" 
                            />
                          </div>
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

                {/* Step 2: Company Profile */}
                {currentStep === 2 && (
                  <div className="space-y-10 animate-fadeIn">
                    <div className="flex items-center gap-4 border-l-4 border-[#F9A826] pl-6 mb-10">
                      <h2 className="text-3xl font-black text-[#0A2B4C] dark:text-white">Company Profile</h2>
                    </div>

                    <div className="space-y-10">
                      <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-6 w-1.5 bg-[#0A2B4C] dark:bg-[#F9A826] rounded-full"></div>
                            <h3 className="text-sm font-black text-[#0A2B4C] dark:text-white uppercase tracking-[0.2em]">Company Details</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-7">
                          <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Developer / Company Name</label>
                            <input 
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleInputChange}
                              type="text" 
                              required 
                              placeholder="e.g. Goldkey Properties Ltd" 
                              className="w-full bg-gray-50/50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl px-6 py-4.5 text-base focus:outline-none focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 font-medium transition-all text-gray-700 dark:text-gray-200" 
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                            <div>
                              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Company Registration Number</label>
                              <input 
                                name="companyRegNumber"
                                value={formData.companyRegNumber}
                                onChange={handleInputChange}
                                type="text" 
                                required 
                                placeholder="e.g. CS12345678" 
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
                                    placeholder="e.g. Airport City, One Airport Square" 
                                    className="w-full bg-gray-50/50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl px-6 py-4.5 text-base focus:outline-none focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 font-medium transition-all text-gray-700 dark:text-gray-200" 
                                />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Digital Address (GhanaPostGPS)</label>
                            <input 
                              name="digitalAddress"
                              value={formData.digitalAddress}
                              onChange={handleInputChange}
                              type="text" 
                              placeholder="e.g. GA-001-2024" 
                              className="w-full bg-gray-50/50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl px-6 py-4.5 text-base focus:outline-none focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 font-medium transition-all text-gray-700 dark:text-gray-200" 
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Company Description</label>
                            <textarea 
                              name="companyDescription"
                              value={formData.companyDescription}
                              onChange={handleInputChange}
                              required
                              rows={4} 
                              placeholder="Describe your company, active developments, and areas of operation." 
                              className="w-full bg-gray-50/50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl px-6 py-4.5 text-base focus:outline-none focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 font-medium transition-all text-gray-700 dark:text-gray-200" 
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Upload Company Logo</label>
                            <div 
                              onClick={() => document.getElementById('companyLogoInput')?.click()}
                              className="relative border-2 border-dashed border-gray-100 dark:border-slate-dark-800 bg-gray-50/30 dark:bg-slate-dark-950 rounded-[32px] p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#F9A826] hover:bg-[#F9A826]/5 shadow-sm transition-all group overflow-hidden h-40"
                            >
                              {previews.companyLogo ? (
                                <img src={previews.companyLogo} alt="Logo Preview" className="h-full object-contain animate-fadeIn" />
                              ) : (
                                <>
                                  <Camera size={38} className="text-gray-200 dark:text-slate-dark-800 mb-3 group-hover:text-[#F9A826] group-hover:scale-110 transition-all duration-500" />
                                  <span className="text-[10px] font-black text-[#0A2B4C] dark:text-slate-dark-400 uppercase tracking-[0.3em]">Select Logo</span>
                                  <span className="text-[9px] text-gray-400 dark:text-slate-dark-600 mt-2 font-bold">JPG/PNG • MAX 5MB</span>
                                </>
                              )}
                              <input 
                                id="companyLogoInput"
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'companyLogo')}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-6 w-1.5 bg-[#0A2B4C] dark:bg-[#F9A826] rounded-full"></div>
                            <h3 className="text-sm font-black text-[#0A2B4C] dark:text-white uppercase tracking-[0.2em]">Contact & Additional Details</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                          <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Primary Contact Email</label>
                            <input 
                              name="contactEmail"
                              value={formData.contactEmail}
                              onChange={handleInputChange}
                              type="email" 
                              required 
                              placeholder="info@developer.com" 
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
                              placeholder="https://www.developer.com" 
                              className="w-full bg-gray-50/50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl px-6 py-4.5 text-base focus:outline-none focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 font-medium transition-all text-gray-700 dark:text-gray-200" 
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Year Established</label>
                            <div className="relative">
                                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 dark:text-slate-dark-600" size={18} />
                                <input 
                                    name="yearEstablished"
                                    value={formData.yearEstablished}
                                    onChange={handleInputChange}
                                    type="number" 
                                    required 
                                    placeholder="e.g. 2010" 
                                    className="w-full bg-gray-50/50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl pl-12 pr-6 py-4.5 text-base focus:outline-none focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 font-medium transition-all text-gray-700 dark:text-gray-200" 
                                />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Number of Active Projects</label>
                            <input 
                              name="activeProjects"
                              value={formData.activeProjects}
                              onChange={handleInputChange}
                              type="number" 
                              placeholder="e.g. 5" 
                              className="w-full bg-gray-50/50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-2xl px-6 py-4.5 text-base focus:outline-none focus:border-[#F9A826] focus:ring-4 focus:ring-[#F9A826]/5 font-medium transition-all text-gray-700 dark:text-gray-200" 
                            />
                          </div>
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
                            <div className="h-6 w-1.5 bg-[#0A2B4C] dark:bg-[#F9A826] rounded-full"></div>
                            <h3 className="text-sm font-black text-[#0A2B4C] dark:text-white uppercase tracking-[0.2em]">Administrator Identity</h3>
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
                               onClick={() => document.getElementById('idFrontInputDev')?.click()}
                               className="relative border-2 border-dashed border-gray-100 dark:border-slate-dark-800 bg-gray-50/20 dark:bg-slate-dark-950 rounded-[32px] p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#F9A826] hover:bg-[#F9A826]/5 transition-all group overflow-hidden h-44"
                             >
                               {previews.idFront ? (
                                 <img src={previews.idFront} alt="ID Front Preview" className="absolute inset-0 w-full h-full object-cover animate-fadeIn" />
                               ) : (
                                 <>
                                   <Camera size={34} className="text-gray-200 dark:text-slate-dark-800 mb-3 group-hover:text-[#F9A826] transition-all" />
                                   <span className="text-[10px] font-black text-[#0A2B4C] dark:text-slate-dark-400 uppercase tracking-widest">Front Side</span>
                                   <span className="text-[8px] text-gray-400 dark:text-slate-dark-600 mt-2 font-bold uppercase tracking-widest shadow-sm px-3 py-1 bg-white dark:bg-slate-dark-800 rounded-full">5MB MAX</span>
                                 </>
                               )}
                               <input 
                                 id="idFrontInputDev"
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
                               onClick={() => document.getElementById('idBackInputDev')?.click()}
                               className="relative border-2 border-dashed border-gray-100 dark:border-slate-dark-800 bg-gray-50/20 dark:bg-slate-dark-950 rounded-[32px] p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#F9A826] hover:bg-[#F9A826]/5 transition-all group overflow-hidden h-44"
                             >
                               {previews.idBack ? (
                                 <img src={previews.idBack} alt="ID Back Preview" className="absolute inset-0 w-full h-full object-cover animate-fadeIn" />
                               ) : (
                                 <>
                                   <Camera size={34} className="text-gray-200 dark:text-slate-dark-800 mb-3 group-hover:text-[#F9A826] transition-all" />
                                   <span className="text-[10px] font-black text-[#0A2B4C] dark:text-slate-dark-400 uppercase tracking-widest">Back Side</span>
                                   <span className="text-[8px] text-gray-400 dark:text-slate-dark-600 mt-2 font-bold uppercase tracking-widest shadow-sm px-3 py-1 bg-white dark:bg-slate-dark-800 rounded-full">5MB MAX</span>
                                 </>
                               )}
                               <input 
                                 id="idBackInputDev"
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
                            <div className="h-6 w-1.5 bg-[#0A2B4C] dark:bg-[#F9A826] rounded-full"></div>
                            <h3 className="text-sm font-black text-[#0A2B4C] dark:text-white uppercase tracking-[0.2em]">Company Documents</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-8">
                          <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Upload Certificate of Incorporation</label>
                            <div 
                              onClick={() => document.getElementById('incorporationInput')?.click()}
                              className="relative border-2 border-dashed border-gray-100 dark:border-slate-dark-800 bg-gray-50/20 dark:bg-slate-dark-950 rounded-[32px] p-14 flex flex-col items-center justify-center cursor-pointer hover:border-[#F9A826] hover:bg-[#F9A826]/5 transition-all group overflow-hidden shadow-sm h-48"
                            >
                              {previews.incorporationCert ? (
                                <div className="flex items-center gap-4 text-green-600 font-bold animate-fadeIn text-center flex-col">
                                  <CheckCircle2 size={38} />
                                  <span className="text-sm truncate max-w-xs">{formData.incorporationCert?.name}</span>
                                </div>
                              ) : (
                                <>
                                  <Upload size={38} className="text-gray-200 dark:text-slate-dark-800 mb-3 group-hover:text-[#F9A826] transition-all" />
                                  <span className="text-[10px] font-black text-[#0A2B4C] dark:text-slate-dark-400 uppercase tracking-[0.25em] text-center leading-relaxed">Certificate of Incorporation</span>
                                  <span className="text-[8px] text-gray-400 dark:text-slate-dark-600 mt-3 font-bold uppercase tracking-widest">PDF / IMAGE • 10MB MAX</span>
                                </>
                              )}
                              <input 
                                id="incorporationInput"
                                type="file" 
                                className="hidden" 
                                accept=".pdf,image/*"
                                onChange={(e) => handleFileChange(e, 'incorporationCert')}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Upload Director ID</label>
                            <div 
                              onClick={() => document.getElementById('directorIdInput')?.click()}
                              className="relative border-2 border-dashed border-gray-100 dark:border-slate-dark-800 bg-gray-50/20 dark:bg-slate-dark-950 rounded-[32px] p-14 flex flex-col items-center justify-center cursor-pointer hover:border-[#F9A826] hover:bg-[#F9A826]/5 transition-all group overflow-hidden shadow-sm h-48"
                            >
                              {previews.directorId ? (
                                <div className="flex items-center gap-4 text-green-600 font-bold animate-fadeIn text-center flex-col">
                                  <CheckCircle2 size={38} />
                                  <span className="text-sm truncate max-w-xs">{formData.directorId?.name}</span>
                                </div>
                              ) : (
                                <>
                                  <Upload size={38} className="text-gray-200 dark:text-slate-dark-800 mb-3 group-hover:text-[#F9A826] transition-all" />
                                  <span className="text-[10px] font-black text-[#0A2B4C] dark:text-slate-dark-400 uppercase tracking-[0.25em] text-center leading-relaxed">Director's ID Copy</span>
                                  <span className="text-[8px] text-gray-400 dark:text-slate-dark-600 mt-3 font-bold uppercase tracking-widest">PDF / IMAGE • 10MB MAX</span>
                                </>
                              )}
                              <input 
                                id="directorIdInput"
                                type="file" 
                                className="hidden" 
                                accept=".pdf,image/*"
                                onChange={(e) => handleFileChange(e, 'directorId')}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-[#0A2B4C]/5 dark:bg-slate-dark-800/50 border border-[#0A2B4C]/10 dark:border-slate-dark-700 rounded-[28px] p-7 flex gap-5">
                        <div className="h-12 w-12 bg-white dark:bg-slate-dark-950 rounded-2xl shadow-sm flex items-center justify-center text-[#0A2B4C] dark:text-[#F9A826] flex-shrink-0 animate-pulse">
                            <Info size={24} />
                        </div>
                        <div>
                            <p className="text-base font-black text-[#0A2B4C] dark:text-white mb-1">Verification Lead Time</p>
                            <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed tracking-normal">
                                Developer accounts are typically verified within 48 to 72 hours. Our team may reach out for physical project verification.
                            </p>
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
                      className="py-5 px-10 bg-white dark:bg-slate-dark-800 border border-gray-200 dark:border-slate-dark-700 text-[#0A2B4C] dark:text-white text-[15px] font-black rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-dark-700 hover:border-gray-300 dark:hover:border-slate-dark-600 transition-all flex items-center justify-center gap-3 transform active:scale-95 group"
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
                      className="py-5 px-12 bg-[#0A2B4C] dark:bg-[#F9A826] text-white text-[15px] font-black rounded-2xl hover:bg-[#08223c] dark:hover:bg-[#e09a25] transition-all flex items-center justify-center gap-3 transform active:scale-95 shadow-2xl shadow-[#0A2B4C]/20 dark:shadow-[#F9A826]/10 group"
                    >
                      Continue
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      className="py-5 px-14 bg-[#F9A826] text-white text-[15px] font-black rounded-2xl hover:bg-[#e09a25] transition-all transform active:scale-95 shadow-2xl shadow-[#F9A826]/30"
                    >
                      Submit for Verification
                    </button>
                  )}
                </div>

              </form>
            </div>
            
            <p className="text-center text-gray-400 text-[10px] font-black mt-10 uppercase tracking-[0.4em] opacity-60">
              Property Development Portal • Secure Verification
            </p>
          </>
        )}
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default AddDeveloperPage;
