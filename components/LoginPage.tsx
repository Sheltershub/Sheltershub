
import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (role: string) => void;
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate login logic
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Determine role based on email for testing (mock logic)
      let role = 'user';
      if (email.includes('agent')) role = 'agent';
      else if (email.includes('agency')) role = 'agency';
      else if (email.includes('developer')) role = 'developer';
      else if (email.includes('admin')) role = 'admin';

      setTimeout(() => {
        onLogin(role);
        // Redirect based on role
        if (role === 'admin') onNavigate('admin-dashboard');
        else if (role === 'agent') onNavigate('agent-properties');
        else if (role === 'agency') onNavigate('agency-dashboard');
        else if (role === 'developer') onNavigate('developer-dashboard');
        else onNavigate('buyer-profile');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-dark-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-[#0A2B4C] dark:hover:text-brand-orange transition-colors mb-6 group"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-bold">Back to Previous Page</span>
        </button>
        
        <div className="text-center">
          <div className="mb-8 cursor-pointer inline-block" onClick={() => onNavigate('home')}>
            <img 
              src="https://i.ibb.co/4RJRrttb/Sheltershub-Logo-png.png" 
              alt="Sheltershub Logo" 
              className="h-16 w-auto mx-auto" 
            />
          </div>
          <h2 className="text-3xl font-black text-[#0A2B4C] dark:text-white mb-2">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Log in to your Sheltershub account.</p>
        </div>

        <div className="mt-8">
          <div className="bg-white dark:bg-slate-dark-900 py-10 px-8 shadow-2xl rounded-2xl border border-gray-100 dark:border-slate-dark-800 mb-8 relative overflow-hidden">
          {success && (
            <div className="absolute inset-x-0 top-0 bg-green-500 text-white py-3 px-4 text-center font-bold text-sm animate-slideDown z-20">
              Login successful. Redirecting to your dashboard...
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-slate-dark-800'} focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none transition-all text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-slate-dark-950`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="mt-1 text-red-500 text-xs font-medium">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200 dark:border-slate-dark-800'} focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826] outline-none transition-all text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-slate-dark-950 pr-12`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-red-500 text-xs font-medium">{errors.password}</p>}
            </div>

            {/* Remember & Forgot Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#F9A826] border-gray-300 dark:border-slate-dark-800 rounded focus:ring-[#F9A826] cursor-pointer bg-white dark:bg-slate-dark-950"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-gray-400 font-medium cursor-pointer">
                  Remember me
                </label>
              </div>
              <button 
                type="button" 
                onClick={() => onNavigate('forgot-password')}
                className="text-sm font-bold text-[#F9A826] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-[#F9A826] hover:bg-[#e09a25] text-white font-black py-4 rounded-xl shadow-lg shadow-[#F9A826]/20 transition-all flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : null}
              {loading ? 'Logging in...' : 'Sign In'}
            </button>

            {/* Signup Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Don't have an account?{' '}
                <button 
                  type="button" 
                  onClick={() => onNavigate('register')}
                  className="text-[#0A2B4C] dark:text-brand-orange font-bold hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

        {/* Quick Access Row */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 w-full max-w-lg mx-auto px-4">
          {[
            { label: 'Agent', route: 'agent-properties', role: 'agent' },
            { label: 'Agency', route: 'agency-dashboard', role: 'agency' },
            { label: 'Developer', route: 'developer-dashboard', role: 'developer' },
            { label: 'Administrator', route: 'admin-dashboard', role: 'admin' },
            { label: 'Editor', route: 'admin-dashboard', role: 'editor' }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                onLogin(item.role);
                onNavigate(item.route);
              }}
              className="flex-1 min-w-[100px] bg-white dark:bg-slate-dark-900 border border-[#0A2B4C] dark:border-slate-dark-800 text-[#0A2B4C] dark:text-gray-200 text-[10px] sm:text-[11px] font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-slate-dark-800 transition-all text-center h-14 flex flex-col items-center justify-center shadow-sm"
            >
              <span className="opacity-60 text-[8px] uppercase tracking-tighter">Login as</span>
              <span className="truncate w-full px-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
