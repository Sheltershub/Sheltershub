import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, Camera, ShieldCheck, Mail, Lock, User, MapPin, Globe, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface AgentInviteRegistrationPageProps {
  onNavigate: (page: string) => void;
}

const AgentInviteRegistrationPage: React.FC<AgentInviteRegistrationPageProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1
    email: 'agent@example.com', // Pre-filled
    password: '',
    confirmPassword: '',
    // Step 2
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    residentialAddress: '',
    digitalAddress: '',
    roleTitle: '',
    socialMedia: '',
    // Step 3
    idType: '',
    idNumber: '',
    idFront: null as File | null,
    idBack: null as File | null,
  });

  const [previews, setPreviews] = useState({
    idFront: null as string | null,
    idBack: null as string | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'idFront' | 'idBack') => {
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
    { number: 2, title: 'Complete Profile', icon: User },
    { number: 3, title: 'Identity Verification', icon: ShieldCheck },
  ];

  return (
    <div className="bg-gray-50 dark:bg-slate-dark-950 min-h-screen font-sans transition-colors duration-300">
      <Header onNavigate={onNavigate} activePage="register" />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {submitted ? (
          <div className="bg-white dark:bg-slate-dark-900 rounded-3xl border border-green-100 dark:border-green-900/30 shadow-2xl p-12 text-center animate-fadeIn">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/20 mb-8">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-black text-[#0A2B4C] dark:text-white mb-4">Account Created!</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-lg mx-auto font-medium leading-relaxed">
              Account created. Your identity verification is pending admin approval. You are now linked to <span className="text-[#0A2B4C] dark:text-brand-blue font-bold">Lakeside Estates</span>.
            </p>
            <button 
              onClick={() => onNavigate('login')}
              className="py-4 px-10 bg-[#F9A826] text-white font-bold rounded-xl hover:bg-[#e09a25] transition-all shadow-xl shadow-[#F9A826]/20 transform active:scale-95"
            >
              Sign In to Your Account
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-black text-[#0A2B4C] dark:text-white mb-3">Agent Registration</h1>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">
                Complete your registration to join your organisation on Sheltershub.
              </p>
            </div>

            {/* Progress Stepper */}
            <div className="flex justify-between items-center mb-12 relative px-12 max-w-3xl mx-auto">
              <div className="absolute left-16 right-16 top-1/2 h-0.5 bg-gray-200 dark:bg-slate-dark-800 -translate-y-1/2 z-0"></div>
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
                    <div className={`absolute top-14 whitespace-nowrap text-[10px] font-black uppercase tracking-widest ${
                      isActive ? 'text-[#F9A826]' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white dark:bg-slate-dark-900 rounded-3xl border border-gray-100 dark:border-slate-dark-800 shadow-2xl overflow-hidden mt-16 transition-all duration-500">
              {/* Invitation Notice */}
              <div className="bg-[#E3F2FD] dark:bg-slate-dark-800 border-l-4 border-[#0A2B4C] dark:border-brand-blue p-6 m-8 rounded-lg">
                <p className="text-[#0A2B4C] dark:text-gray-200 font-semibold text-sm">
                  You have been invited to join <span className="font-black dark:text-brand-blue">Lakeside Estates</span> as an agent on Sheltershub.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="px-8 pb-12 pt-4 md:px-12">
                
                {/* Step 1: Set Password */}
                {currentStep === 1 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div className="border-l-4 border-[#F9A826] pl-6 mb-8">
                      <h2 className="text-2xl font-black text-[#0A2B4C] dark:text-white">Set Password</h2>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input 
                            value={formData.email}
                            readOnly 
                            className="w-full bg-[#F4F6F8] dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl pl-12 pr-4 py-4 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed outline-none" 
                          />
                        </div>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 ml-1">This email was provided by your organisation and cannot be changed.</p>
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
                              className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl pl-12 pr-12 py-4 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] font-medium transition-all text-gray-700 dark:text-gray-200" 
                            />
                            <button 
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
                              className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] font-medium transition-all text-gray-700 dark:text-gray-200" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Complete Profile */}
                {currentStep === 2 && (
                  <div className="space-y-10 animate-fadeIn">
                    <div className="border-l-4 border-[#F9A826] pl-6 mb-8">
                      <h2 className="text-2xl font-black text-[#0A2B4C] dark:text-white">Complete Profile</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                        <input 
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          type="text" 
                          required 
                          placeholder="e.g. John Doe" 
                          className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl px-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none transition-all text-gray-700 dark:text-gray-200" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Date of Birth</label>
                        <input 
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          type="date" 
                          required 
                          className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl px-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none transition-all text-gray-700 dark:text-gray-200" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Gender</label>
                        <select 
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl px-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none appearance-none transition-all text-gray-700 dark:text-gray-200"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone / WhatsApp Number</label>
                        <input 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          type="text" 
                          required 
                          placeholder="+233..." 
                          className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl px-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none transition-all text-gray-700 dark:text-gray-200" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50 dark:border-slate-dark-800">
                      <div className="md:col-span-2">
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
                            className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl pl-12 pr-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none transition-all text-gray-700 dark:text-gray-200" 
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
                            className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl pl-12 pr-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none transition-all text-gray-700 dark:text-gray-200" 
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Role / Title within Organisation</label>
                        <input 
                          name="roleTitle"
                          value={formData.roleTitle}
                          onChange={handleInputChange}
                          type="text" 
                          placeholder="e.g. Senior Agent" 
                          className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl px-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none transition-all text-gray-700 dark:text-gray-200" 
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
                          className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl px-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none transition-all text-gray-700 dark:text-gray-200" 
                        />
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
                          className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl px-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none appearance-none transition-all text-gray-700 dark:text-gray-200"
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
                            className="w-full bg-gray-50 dark:bg-slate-dark-950 border border-gray-200 dark:border-slate-dark-800 rounded-xl pl-12 pr-4 py-4 text-sm font-medium focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none transition-all text-gray-700 dark:text-gray-200" 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Upload ID (Front)</label>
                          <div 
                            onClick={() => document.getElementById('idFrontInputInvite')?.click()}
                            className="relative border-2 border-dashed border-gray-200 dark:border-slate-dark-800 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#F9A826] hover:bg-[#F9A826]/5 transition-all group overflow-hidden h-48 bg-gray-50/20 dark:bg-slate-dark-950"
                          >
                            {previews.idFront ? (
                              <img src={previews.idFront} alt="ID Front Preview" className="absolute inset-0 w-full h-full object-cover animate-fadeIn" />
                            ) : (
                              <>
                                <Camera size={32} className="text-gray-300 dark:text-slate-dark-700 mb-3 group-hover:text-[#F9A826] transition-colors" />
                                <span className="text-xs font-black text-[#0A2B4C] dark:text-gray-400 uppercase tracking-widest">Front Side</span>
                                <span className="text-[10px] text-gray-400 dark:text-slate-dark-500 mt-1">JPG/PNG, max 5MB</span>
                              </>
                            )}
                            <input 
                              id="idFrontInputInvite"
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
                            onClick={() => document.getElementById('idBackInputInvite')?.click()}
                            className="relative border-2 border-dashed border-gray-200 dark:border-slate-dark-800 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#F9A826] hover:bg-[#F9A826]/5 transition-all group overflow-hidden h-48 bg-gray-50/20 dark:bg-slate-dark-950"
                          >
                            {previews.idBack ? (
                              <img src={previews.idBack} alt="ID Back Preview" className="absolute inset-0 w-full h-full object-cover animate-fadeIn" />
                            ) : (
                              <>
                                <Camera size={32} className="text-gray-300 dark:text-slate-dark-700 mb-3 group-hover:text-[#F9A826] transition-colors" />
                                <span className="text-xs font-black text-[#0A2B4C] dark:text-gray-400 uppercase tracking-widest">Back Side</span>
                                <span className="text-[10px] text-gray-400 dark:text-slate-dark-500 mt-1">JPG/PNG, max 5MB</span>
                              </>
                            )}
                            <input 
                              id="idBackInputInvite"
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

                {/* Navigation Buttons */}
                <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 mt-12 pt-8 border-t border-gray-100 dark:border-slate-dark-800">
                  {currentStep > 1 ? (
                    <button 
                      type="button" 
                      onClick={prevStep}
                      className="py-4 px-8 bg-white dark:bg-slate-dark-900 border border-gray-200 dark:border-slate-dark-700 text-[#0A2B4C] dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-dark-800 transition-all flex items-center justify-center gap-2 transform active:scale-95"
                    >
                      <ArrowLeft size={18} />
                      Back
                    </button>
                  ) : (
                    <div className="hidden sm:block"></div>
                  )}

                  {currentStep < 3 ? (
                    <button 
                      type="button" 
                      onClick={nextStep}
                      className="py-4 px-10 bg-[#0A2B4C] text-white font-black rounded-xl hover:bg-[#08223c] transition-all flex items-center justify-center gap-2 transform active:scale-95 shadow-xl shadow-[#0A2B4C]/20"
                    >
                      Continue
                      <ArrowRight size={18} />
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      className="py-4 px-12 bg-[#F9A826] text-white font-black rounded-xl hover:bg-[#e09a25] transition-all transform active:scale-95 shadow-xl shadow-[#F9A826]/30"
                    >
                      Complete Registration
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

export default AgentInviteRegistrationPage;
