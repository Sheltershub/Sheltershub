
import React, { useState } from 'react';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (role: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLogin }) => {
  const [view, setView] = useState<'login' | 'register' | 'forgot' | 'verify'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  
  // User Type State
  const [userType, setUserType] = useState('Buyer');
  const userTypes = ['Buyer', 'Agent', 'Agency', 'Developer', 'Administrator', 'Editor'];

  // Handle User Type Selection
  const handleUserTypeChange = (type: string) => {
    setUserType(type);
    if (type === 'Agent') {
      setEmail('agent@sheltershub.com');
      setPassword('demo123');
    } else if (type === 'Administrator') {
      setEmail('admin@sheltershub.com');
      setPassword('admin123');
    } else if (type === 'Editor') {
      setEmail('editor@sheltershub.com');
      setPassword('editor123');
    } else {
      setEmail('');
      setPassword('');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Role-based routing
      if (userType === 'Administrator') {
         onLogin('admin');
         onNavigate('admin-dashboard');
      } else if (userType === 'Editor') {
         onLogin('editor');
         onNavigate('admin-dashboard'); // Editor shares the same layout but with restricted access
      } else if (userType === 'Agent') {
         onLogin('agent');
         onNavigate('agent-verification');
      } else if (userType === 'Developer') {
         onLogin('developer');
         onNavigate('developer-dashboard');
      } else if (userType === 'Agency') {
         onLogin('agency');
         onNavigate('agency-dashboard'); 
      } else {
         onLogin('user');
         setView('verify');
      }
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType === 'Editor') {
        onNavigate('editor-register');
        return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setView('verify');
    }, 1500);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Password reset link sent to ${email}`);
      setView('login');
    }, 1000);
  };

  const handleVerificationConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Route based on user type
      if (userType === 'Agent') onNavigate('agent-verification');
      else if (userType === 'Developer') onNavigate('developer-dashboard');
      else if (userType === 'Agency') onNavigate('agency-dashboard'); 
      else onNavigate('home');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
             <img src="https://i.ibb.co/4RJRrttb/Sheltershub-Logo-png.png" alt="Sheltershub Logo" className="h-20 w-auto" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#0A2B4C]">
          {view === 'login' && 'Sign in to your account'}
          {view === 'register' && 'Create a new account'}
          {view === 'forgot' && 'Reset your password'}
          {view === 'verify' && 'Verify your identity'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {view === 'login' && (
            <>
              Or{' '}
              <button onClick={() => setView('register')} className="font-medium text-[#F9A826] hover:text-[#d88d15]">
                register for free
              </button>
            </>
          )}
          {view === 'register' && (
            <>
              Already have an account?{' '}
              <button onClick={() => setView('login')} className="font-medium text-[#F9A826] hover:text-[#d88d15]">
                Sign in
              </button>
            </>
          )}
          {view === 'forgot' && (
            <button onClick={() => setView('login')} className="font-medium text-[#F9A826] hover:text-[#d88d15]">
              Back to sign in
            </button>
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          
          {view === 'verify' ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Check your email</h3>
              <p className="text-sm text-gray-500 mb-6">
                We have sent a verification link to <span className="font-bold text-gray-800">{email}</span>. 
                Please click the link in the email to confirm your identity and access your account.
              </p>
              
              <div className="space-y-4">
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0A2B4C] hover:bg-[#08223c] focus:outline-none"
                  onClick={() => window.open('https://gmail.com', '_blank')}
                >
                  Open Email App
                </button>
                
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">For Demo Purpose</span>
                    </div>
                </div>

                <button
                    onClick={handleVerificationConfirm}
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                    {loading ? 'Verifying...' : 'Simulate Clicking Link'}
                </button>
              </div>
              
              <p className="mt-6 text-xs text-gray-400">
                  Didn't receive the email? <button className="text-[#F9A826] hover:underline">Resend</button>
              </p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={view === 'login' ? handleLogin : view === 'register' ? handleRegister : handleForgot}>
              
              {/* User Type Selection */}
              {(view === 'login' || view === 'register') && (
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3 text-center">
                    I am a...
                  </label>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {userTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleUserTypeChange(type)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all border ${
                          userType === type
                            ? 'bg-[#0A2B4C] text-white border-[#0A2B4C] shadow-md transform scale-105'
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {['Agent', 'Administrator', 'Editor'].includes(userType) && view === 'login' && (
                      <p className="text-center text-xs text-green-600 mt-2 font-medium">
                          ✓ Demo credentials auto-filled
                      </p>
                  )}
                </div>
              )}

              {view === 'register' && (
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#F9A826] focus:border-[#F9A826] sm:text-sm"
                    />
                  </div>
                </div>
              )}

              {view !== 'login' && view !== 'register' && view !== 'forgot' ? null : (
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#F9A826] focus:border-[#F9A826] sm:text-sm"
                      />
                    </div>
                  </div>
              )}

              {view !== 'forgot' && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete={view === 'login' ? "current-password" : "new-password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#F9A826] focus:border-[#F9A826] sm:text-sm"
                    />
                  </div>
                </div>
              )}

              {view === 'login' && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#F9A826] focus:ring-[#F9A826] border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <button type="button" onClick={() => setView('forgot')} className="font-medium text-[#F9A826] hover:text-[#d88d15]">
                      Forgot your password?
                    </button>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0A2B4C] hover:bg-[#08223c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A2B4C] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  {view === 'login' && (loading ? 'Signing in...' : 'Sign in')}
                  {view === 'register' && (loading ? 'Creating account...' : 'Register')}
                  {view === 'forgot' && (loading ? 'Sending link...' : 'Send Reset Link')}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
      
      <div className="mt-8 text-center">
         <button onClick={() => onNavigate('home')} className="text-sm text-gray-500 hover:text-[#0A2B4C] flex items-center justify-center mx-auto gap-1">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
         </button>
      </div>

    </div>
  );
};

export default LoginPage;
