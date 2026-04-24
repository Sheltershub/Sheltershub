
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';

interface AdminRegisterProps {
  onNavigate: (page: string) => void;
  userRole: string;
}

const AdminRegister: React.FC<AdminRegisterProps> = ({ onNavigate, userRole }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  return (
    <AdminLayout onNavigate={onNavigate} activePage="admin-register" title="Create Administrator" userRole={userRole}>
        <div className="max-w-3xl mx-auto">
            {submitted ? (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center py-16">
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                        <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-[#0A2B4C] mb-4">Administrator Created</h2>
                    <p className="text-gray-600 mb-8">
                        The new administrator account has been successfully created. An email verification link has been sent to the user.
                    </p>
                    <button 
                        onClick={() => { setSubmitted(false); }}
                        className="py-3 px-8 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] shadow-md transition-colors"
                    >
                        Create Another
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-[#0A2B4C] px-6 py-4 border-b border-[#08223c]">
                        <h2 className="text-white font-semibold text-lg">New Administrator Details</h2>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                        <div className="bg-yellow-50 border-l-4 border-[#F9A826] p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-yellow-700">
                                        You are creating a user with <strong>Full Administrative Privileges</strong>. This user will have complete control over the system.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                <input type="text" required placeholder="e.g. Alice Administrator" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                <input type="tel" required placeholder="+233" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                <input type="email" required placeholder="admin@sheltershub.com" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                <input type="password" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                                <input type="password" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                                <input type="text" value="Administrator" disabled className="w-full border border-gray-300 bg-gray-100 text-gray-500 rounded-lg px-4 py-3 text-sm" />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-4">
                            <button type="button" onClick={() => onNavigate('admin-users')} className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold">Cancel</button>
                            <button type="submit" className="px-8 py-2.5 bg-[#0A2B4C] text-white font-bold rounded-lg hover:bg-[#08223c] shadow-md transition-colors">Create Account</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    </AdminLayout>
  );
};

export default AdminRegister;
