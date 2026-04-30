
import React, { useState } from 'react';
import { User, Briefcase, Building2, HardHat, CheckCircle2, ArrowLeft } from 'lucide-react';

interface RegisterPageProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
}

type AccountType = 'buyer' | 'agent' | 'agency' | 'developer';

const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate, onBack }) => {
  const [selectedType, setSelectedType] = useState<AccountType | null>(null);

  const accountTypes = [
    {
      id: 'buyer' as AccountType,
      label: 'Buyer / Renter',
      description: 'Browse and enquire about properties across Ghana.',
      icon: User,
    },
    {
      id: 'agent' as AccountType,
      label: 'Agent',
      description: 'List properties and manage leads as a verified real estate agent.',
      icon: Briefcase,
    },
    {
      id: 'agency' as AccountType,
      label: 'Agency',
      description: 'Manage a team of agents, listings, and client leads.',
      icon: Building2,
    },
    {
      id: 'developer' as AccountType,
      label: 'Developer',
      description: 'Manage projects, affiliated agencies, and agents.',
      icon: HardHat,
    },
  ];

  const handleContinue = () => {
    if (!selectedType) return;

    if (selectedType === 'buyer') {
      alert('Buyer registration coming soon — browse the platform as a guest.');
    } else if (selectedType === 'agent') {
      onNavigate('/register/agent');
    } else if (selectedType === 'agency') {
      onNavigate('/register/agency');
    } else if (selectedType === 'developer') {
      onNavigate('/register/developer');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-dark-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-[#0A2B4C] dark:hover:text-brand-orange transition-colors mb-6 group"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-bold">Back to Previous Page</span>
        </button>
        
        <div className="text-center mb-10">
          <div className="mb-8 cursor-pointer inline-block" onClick={() => onNavigate('home')}>
          <img 
            src="https://i.ibb.co/4RJRrttb/Sheltershub-Logo-png.png" 
            alt="Sheltershub Logo" 
            className="h-16 w-auto mx-auto" 
          />
        </div>
        <h2 className="text-3xl font-black text-[#0A2B4C] dark:text-white mb-2">Create Your Account</h2>
        <p className="text-gray-500 dark:text-gray-400 font-medium tracking-tight">Choose the account type that best describes you.</p>
      </div>
    </div>

    <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {accountTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;
            
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`relative bg-white dark:bg-slate-dark-900 border-2 rounded-xl p-8 text-center transition-all duration-300 group ${
                  isSelected 
                    ? 'border-[#F9A826] shadow-lg scale-[1.02]' 
                    : 'border-gray-200 dark:border-slate-dark-800 hover:border-[#F9A826]'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 text-[#F9A826]">
                    <CheckCircle2 size={24} fill="currentColor" className="text-white dark:text-slate-dark-900" />
                  </div>
                )}
                
                <div className={`mx-auto mb-4 p-4 rounded-full inline-block transition-colors ${
                  isSelected ? 'text-[#F9A826]' : 'text-gray-400 group-hover:text-[#F9A826]'
                }`}>
                  <Icon size={48} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-lg font-bold text-[#0A2B4C] dark:text-white mb-2">{type.label}</h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  {type.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="space-y-6">
          <button
            onClick={handleContinue}
            disabled={!selectedType}
            className={`w-full font-black py-4 rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
              selectedType 
                ? 'bg-[#F9A826] text-white shadow-[#F9A826]/20' 
                : 'bg-gray-200 dark:bg-slate-dark-800 text-gray-400 dark:text-gray-600 cursor-not-allowed shadow-none'
            }`}
          >
            Continue
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={() => onNavigate('login')}
                className="text-[#0A2B4C] dark:text-brand-orange font-bold hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
