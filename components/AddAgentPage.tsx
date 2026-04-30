import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, Upload, ArrowRight, ArrowLeft, Camera, ShieldCheck, Mail, Phone, Lock, User, MapPin, Globe, CreditCard, Briefcase, Building } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface AddAgentPageProps {
  onNavigate: (page: string) => void;
}

const AddAgentPage: React.FC<AddAgentPageProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Step 2
    dob: '',
    gender: '',
    residentialAddress: '',
    digitalAddress: '',
    socialMedia: '',
    // Step 3
    idType: '',
    idNumber: '',
    idFront: null as File | null,
    idBack: null as File | null,
    // Step 4
    association: '',
    licenseNumber: '',
    licenseDoc: null as File | null,
    agencyName: '',
    companyRegNumber: ''
  });

  const [previews, setPreviews] = useState({
    idFront: null as string | null,
    idBack: null as string | null,
    licenseDoc: null as string | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'idFront' | 'idBack' | 'licenseDoc') => {
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
    if (currentStep < 4) setCurrentStep(currentStep + 1);
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
    { number: 2, title: 'Personal info', icon: User },
    { number: 3, title: 'Identity Verification', icon: ShieldCheck },
    { number: 4, title: 'Professional Details', icon: Briefcase },
  ];

  return (
    <div className="bg-gray-50 dark:bg-slate-dark-950 min-h-screen font-sans transition-colors duration-300">
      <Header onNavigate={onNavigate} activePage="add-agent" />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {submitted ? (
          <div className="bg-white dark:bg-slate-dark-900 rounded-3xl border border-green-100 dark:border-green-900/30 shadow-2xl p-12 text-center animate-fadeIn">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/20 mb-8">
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-500" />
            </div>
            <h2 className="text-4xl font-black text-[#0A2B4C] dark:text-white mb-4">Verification Submitted!</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-lg mx-auto font-medium">
              Your verification has been submitted. We will review your documents and notify you by email.
            </p>
            <button 
              onClick={() => onNavigate('home')}
              className="py-4 px-10 bg-[#0A2B4C] text-white font-bold rounded-xl hover:bg-[#08223c] transition-all shadow-xl shadow-[#0A2B4C]/20 transform active:scale-95"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-black text-[#0A2B4C] dark:text-white mb-3">Agent Registration</h1>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">
                Create your Sheltershub agent account and complete verification to start listing properties.
              </p>
            </div>

            {/* Progress Stepper */}
            <div className="flex justify-between items-center mb-12 relative px-4">
              <div className="absolute left-8 right-8 top-1/2 h-0.5 bg-gray-200 dark:bg-slate-dark-800 -translate-y-1/2 z-0"></div>
              {steps.map((step) => {
                const StepIcon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                
                return (
                  <div key={step.number} className="relative z-10 flex flex-col items-center group">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300 border-4 ${
                      isActive 
                        ? 'bg-[#F9A826] border-white dark:border-slate-dark-900 text-white shadow-lg shadow-[#F9A826]/30' 
                        : isCompleted 
                          ? 'bg-green-500 border-white dark:border-slate-dark-900 text-white' 
                          : 'bg-white dark:bg-slate-dark-800 border-gray-100 dark:border-slate-dark-700 text-gray-300 dark:text-slate-dark-500'
                    }`}>
                      {isCompleted ? <CheckCircle2 size={24} /> : <StepIcon size={20} />}
                    </div>
                    <div className={`absolute top-14 whitespace-nowrap text-[11px] font-black uppercase tracking-widest ${
                      isActive ? 'text-[#F9A826]' : 'text-gray-400 dark:text-slate-dark-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white dark:bg-slate-dark-900 rounded-3xl border border-gray-100 dark:border-slate-dark-800 shadow-2xl overflow-hidden mt-16 transition-all duration-500">
              <form onSubmit={handleSubmit} className="p-8 md:p-12">
                
                {/* Step 1: Account Setup */}
                {currentStep === 1 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div className="border-l-4 border-[#F9A826] pl-6 mb-8">
                      <h2 className="text-2xl font-black text-[#0A2B4C] dark:text-white">Account Setup</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input 
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            type="text" 
                            required 
                            placeholder="e.g. John Doe" 
                            className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] font-medium text-gray-700 dark:text-gray-200" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              type="email" 
                              required 
                              placeholder="example@mail.com" 
                              className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] font-medium text-gray-700 dark:text-gray-200" 
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone / WhatsApp Number</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              type="text" 
                              required 
                              placeholder="+233" 
                              className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] font-medium text-gray-700 dark:text-gray-200" 
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              type={showPassword ? 'text' : 'password'} 
                              required 
                              placeholder="••••••••" 
                              className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl pl-12 pr-12 py-4 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] font-medium text-gray-700 dark:text-gray-200" 
                            />
                            <button 
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#F9A826]"
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Confirm Password</label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              type="password" 
                              required 
                              placeholder="••••••••" 
                              className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] font-medium text-gray-700 dark:text-gray-200" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Personal Information */}
                {currentStep === 2 && (
                  <div className="space-y-10 animate-fadeIn">
                    <div className="border-l-4 border-[#F9A826] pl-6 mb-8">
                      <h2 className="text-2xl font-black text-[#0A2B4C] dark:text-white">Personal Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                        <input 
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          type="text" 
                          placeholder="John Doe" 
                          className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl px-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none text-gray-700 dark:text-gray-200" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Date of Birth</label>
                        <input 
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          type="date" 
                          className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl px-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none text-gray-700 dark:text-gray-200" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Gender</label>
                        <select 
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl px-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none appearance-none text-gray-700 dark:text-gray-200"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-6 pt-4 border-t border-gray-50 dark:border-slate-dark-800">
                      <h3 className="text-xs font-black text-[#0A2B4C] dark:text-white uppercase tracking-[0.2em]">Location Information</h3>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Residential Address</label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                              name="residentialAddress"
                              value={formData.residentialAddress}
                              onChange={handleInputChange}
                              type="text" 
                              required 
                              placeholder="e.g. House No. 12, Main Street, Accra" 
                              className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl pl-12 pr-4 py-4 text-sm font-medium focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none text-gray-700 dark:text-gray-200" 
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Digital Address (GhanaPostGPS)</label>
                          <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                              name="digitalAddress"
                              value={formData.digitalAddress}
                              onChange={handleInputChange}
                              type="text" 
                              placeholder="e.g. GA-123-4567" 
                              className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl pl-12 pr-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none text-gray-700 dark:text-gray-200" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 pt-4 border-t border-gray-50 dark:border-slate-dark-800">
                      <h3 className="text-xs font-black text-[#0A2B4C] dark:text-white uppercase tracking-[0.2em]">Contact Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                          <input 
                            value={formData.email}
                            readOnly 
                            className="w-full bg-gray-100 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl px-4 py-4 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone / WhatsApp Number</label>
                          <input 
                            value={formData.phone}
                            readOnly 
                            className="w-full bg-gray-100 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl px-4 py-4 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed" 
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Social Media Profile</label>
                          <input 
                            name="socialMedia"
                            value={formData.socialMedia}
                            onChange={handleInputChange}
                            type="url" 
                            placeholder="https://" 
                            className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl px-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none text-gray-700 dark:text-gray-200" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Identity Verification */}
                {currentStep === 3 && (
                  <div className="space-y-10 animate-fadeIn">
                    <div className="border-l-4 border-[#F9A826] pl-6 mb-8">
                      <h2 className="text-2xl font-black text-[#0A2B4C] dark:text-white">Identity Verification</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">ID Type</label>
                        <select 
                          name="idType"
                          value={formData.idType}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl px-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none appearance-none text-gray-700 dark:text-gray-200"
                        >
                          <option value="">Select ID Type</option>
                          <option value="Ghana Card">Ghana Card</option>
                          <option value="Passport">Passport</option>
                          <option value="Voter ID">Voter ID</option>
                          <option value="Driver's Licence">Driver's Licence</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">ID Number</label>
                        <div className="relative">
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input 
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={handleInputChange}
                            type="text" 
                            required 
                            placeholder="Enter ID number" 
                            className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl pl-12 pr-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none text-gray-700 dark:text-gray-200" 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Upload ID (Front)</label>
                          <div 
                            onClick={() => document.getElementById('idFrontInput')?.click()}
                            className="relative border-2 border-dashed border-gray-200 dark:border-slate-dark-800 bg-gray-50/5 dark:bg-slate-dark-950 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#F9A826] hover:bg-[#F9A826]/5 transition-all group overflow-hidden h-48"
                          >
                            {previews.idFront ? (
                              <img src={previews.idFront} alt="ID Front Preview" className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                              <>
                                <Camera size={32} className="text-gray-300 dark:text-slate-dark-800 mb-3 group-hover:text-[#F9A826] transition-colors" />
                                <span className="text-xs font-black text-[#0A2B4C] dark:text-slate-dark-400 uppercase tracking-widest">Front Side</span>
                                <span className="text-[10px] text-gray-400 dark:text-slate-dark-600 mt-1">JPG/PNG, max 5MB</span>
                              </>
                            )}
                            <input 
                              id="idFrontInput"
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, 'idFront')}
                            />
                          </div>
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Upload ID (Back)</label>
                          <div 
                            onClick={() => document.getElementById('idBackInput')?.click()}
                            className="relative border-2 border-dashed border-gray-200 dark:border-slate-dark-800 bg-gray-50/5 dark:bg-slate-dark-950 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#F9A826] hover:bg-[#F9A826]/5 transition-all group overflow-hidden h-48"
                          >
                            {previews.idBack ? (
                              <img src={previews.idBack} alt="ID Back Preview" className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                              <>
                                <Camera size={32} className="text-gray-300 dark:text-slate-dark-800 mb-3 group-hover:text-[#F9A826] transition-colors" />
                                <span className="text-xs font-black text-[#0A2B4C] dark:text-slate-dark-400 uppercase tracking-widest">Back Side</span>
                                <span className="text-[10px] text-gray-400 dark:text-slate-dark-600 mt-1">JPG/PNG, max 5MB</span>
                              </>
                            )}
                            <input 
                              id="idBackInput"
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, 'idBack')}
                            />
                          </div>
                       </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Professional Details */}
                {currentStep === 4 && (
                  <div className="space-y-10 animate-fadeIn">
                    <div className="border-l-4 border-[#F9A826] pl-6 mb-8">
                      <h2 className="text-2xl font-black text-[#0A2B4C] dark:text-white">Professional Details</h2>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Real Estate Association</label>
                        <select 
                          name="association"
                          value={formData.association}
                          onChange={handleInputChange}
                          className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl px-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none appearance-none text-gray-700 dark:text-gray-200"
                        >
                          <option value="">Select Association</option>
                          <option value="GREPA">Ghana Real Estate Professionals Association (GREPA)</option>
                          <option value="GAREB">Ghana Association of Real Estate Brokers (GAREB)</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Agent Licence / Certification Number</label>
                        <input 
                          name="licenseNumber"
                          value={formData.licenseNumber}
                          onChange={handleInputChange}
                          type="text" 
                          placeholder="e.g. GRE-CERT-2023-001" 
                          className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl px-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none text-gray-700 dark:text-gray-200" 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Upload Licence or Certification</label>
                        <div 
                          onClick={() => document.getElementById('licenseDocInput')?.click()}
                          className="relative border-2 border-dashed border-gray-200 dark:border-slate-dark-800 bg-gray-50/5 dark:bg-slate-dark-950 rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-[#F9A826] hover:bg-[#F9A826]/5 transition-all group overflow-hidden"
                        >
                          {previews.licenseDoc ? (
                            <div className="flex items-center gap-4 text-green-600 font-bold">
                              <CheckCircle2 size={32} />
                              <span>{formData.licenseDoc?.name}</span>
                            </div>
                          ) : (
                            <>
                              <Upload size={32} className="text-gray-300 dark:text-slate-dark-800 mb-3 group-hover:text-[#F9A826] transition-colors" />
                              <span className="text-xs font-black text-[#0A2B4C] dark:text-slate-dark-400 uppercase tracking-widest">Click to upload doc</span>
                              <span className="text-[10px] text-gray-400 dark:text-slate-dark-600 mt-1">PDF/JPG/PNG, max 10MB</span>
                            </>
                          )}
                          <input 
                            id="licenseDocInput"
                            type="file" 
                            className="hidden" 
                            accept=".pdf,image/*"
                            onChange={(e) => handleFileChange(e, 'licenseDoc')}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 pt-4 border-t border-gray-50 dark:border-slate-dark-800">
                      <h3 className="text-xs font-black text-[#0A2B4C] dark:text-white uppercase tracking-[0.2em]">Agency / Company Details (Optional)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Agency Name</label>
                          <div className="relative">
                            <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                              name="agencyName"
                              value={formData.agencyName}
                              onChange={handleInputChange}
                              type="text" 
                              placeholder="If affiliated with any agency" 
                              className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl pl-12 pr-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none text-gray-700 dark:text-gray-200" 
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Company Registration Number</label>
                          <input 
                            name="companyRegNumber"
                            value={formData.companyRegNumber}
                            onChange={handleInputChange}
                            type="text" 
                            placeholder="e.g. CS12345678" 
                            className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl px-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none text-gray-700 dark:text-gray-200" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 mt-12 pt-8 border-t border-gray-100 dark:border-slate-dark-800">
                  {currentStep > 1 ? (
                    <button 
                      type="button" 
                      onClick={prevStep}
                      className="py-4 px-8 bg-white dark:bg-slate-dark-800 border border-gray-200 dark:border-slate-dark-700 text-[#0A2B4C] dark:text-white font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-dark-700 hover:border-gray-300 dark:hover:border-slate-dark-600 transition-all flex items-center justify-center gap-2 transform active:scale-95"
                    >
                      <ArrowLeft size={18} />
                      Back
                    </button>
                  ) : (
                    <div className="hidden sm:block"></div>
                  )}

                  {currentStep < 4 ? (
                    <button 
                      type="button" 
                      onClick={nextStep}
                      className="py-4 px-10 bg-[#0A2B4C] dark:bg-[#F9A826] text-white font-black rounded-xl hover:bg-[#08223c] dark:hover:bg-[#e09a25] transition-all flex items-center justify-center gap-2 transform active:scale-95 shadow-xl shadow-[#0A2B4C]/20 dark:shadow-[#F9A826]/10"
                    >
                      Continue
                      <ArrowRight size={18} />
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      className="py-4 px-12 bg-[#F9A826] text-white font-black rounded-xl hover:bg-[#e09a25] transition-all transform active:scale-95 shadow-xl shadow-[#F9A826]/30"
                    >
                      Send Verification
                    </button>
                  )}
                </div>

              </form>
            </div>
          </>
        )}
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default AddAgentPage;
