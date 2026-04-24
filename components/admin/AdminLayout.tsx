
import React, { useState } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  activePage: string;
  title: string;
  userRole: string; // 'admin' or 'editor'
}

interface MenuItem {
  name: string;
  page: string;
  icon: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onNavigate, activePage, title, userRole }) => {
  const isAdmin = userRole === 'admin';
  const [isCMSOpen, setIsCMSOpen] = useState(activePage.startsWith('admin-edit-'));
  const [isSiteOptionsOpen, setIsSiteOptionsOpen] = useState(activePage.startsWith('admin-site-options-'));
  const [isReportsOpen, setIsReportsOpen] = useState(activePage === 'admin-reports' || activePage === 'admin-fraud');

  // Icons defined as fragments or paths to be wrapped by a parent SVG
  const dashboardIcon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />;
  const propertiesIcon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />;
  const blogIcon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />;
  const agentsIcon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />;
  const agenciesIcon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />;
  const developersIcon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />;
  const usersIcon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />;
  const subscriptionsIcon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />;
  const settingsIcon = <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>;
  const adminAddIcon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />;

  const menuItems: MenuItem[] = [
    { name: 'Dashboard', page: 'admin-dashboard', icon: dashboardIcon },
    { name: 'Properties', page: 'admin-properties', icon: propertiesIcon },
    { name: 'Blog Posts', page: 'admin-blog', icon: blogIcon },
  ];

  if (isAdmin) {
    menuItems.push(
      { name: 'Agents', page: 'admin-agents', icon: agentsIcon },
      { name: 'Agencies', page: 'admin-agencies', icon: agenciesIcon },
      { name: 'Developers', page: 'admin-developers', icon: developersIcon },
      { name: 'Users', page: 'admin-users', icon: usersIcon },
      { name: 'Subscriptions', page: 'admin-subscriptions', icon: subscriptionsIcon },
      { name: 'Settings', page: 'admin-settings', icon: settingsIcon },
      { name: 'Create Admin', page: 'admin-register', icon: adminAddIcon }
    );
  } else {
    // Editor Role
    menuItems.push(
      { name: 'Settings', page: 'admin-settings', icon: settingsIcon }
    );
  }

  const cmsPages = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Login / Register', id: 'login' },
    { name: 'User Profile', id: 'user-profile' },
    { name: 'My Favorites', id: 'favorites' },
    { name: 'Forgot Password', id: 'forgot-password' },
    { name: 'Reset Password', id: 'reset-password' },
    { name: 'Email Verification', id: 'email-verification' },
    { name: 'Search Results', id: 'search-results' },
    { name: 'Blog & News', id: 'blog' },
    { name: 'Single Blog Article (Demo)', id: 'blog-detail' },
    { name: 'Contact', id: 'contact' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Report Fraud', id: 'report-fraud' },
    { name: 'Terms & Conditions', id: 'terms' },
    { name: 'Editor Registration', id: 'editor-register' },
  ];

  const siteOptions = [
      { name: 'Currency Format', id: 'currency' },
      { name: 'Type', id: 'type' },
      { name: 'Status', id: 'status' },
      { name: 'Features', id: 'features' },
      { name: 'Labels', id: 'labels' },
      { name: 'Region', id: 'region' },
      { name: 'City', id: 'city' },
      { name: 'Area', id: 'area' },
      { name: 'Agencies', id: 'agencies' },
      { name: 'Agents', id: 'agents' },
      { name: 'Prefix & Suffix', id: 'prefix-suffix' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A2B4C] text-white flex-shrink-0 flex flex-col transition-all duration-300">
        <div className="p-6 border-b border-gray-700">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 focus:outline-none">
            <span className="text-xl font-bold tracking-tight">Sheltershub<span className="text-[#F9A826]">{isAdmin ? 'Admin' : 'Editor'}</span></span>
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.page}>
                <button
                  onClick={() => onNavigate(item.page)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activePage === item.page 
                      ? 'bg-[#F9A826] text-white' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    {item.icon}
                  </svg>
                  {item.name}
                </button>
              </li>
            ))}

            {/* Reports Section Dropdown */}
            <li>
                <button 
                    onClick={() => setIsReportsOpen(!isReportsOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors focus:outline-none"
                >
                    <div className="flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        Reports
                    </div>
                    <svg className={`w-4 h-4 transition-transform ${isReportsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                
                {isReportsOpen && (
                    <ul className="pl-11 pr-2 space-y-1 mt-1">
                        <li>
                            <button
                                onClick={() => onNavigate('admin-reports')}
                                className={`w-full text-left py-2 px-2 rounded-md text-xs font-medium transition-colors ${
                                    activePage === 'admin-reports'
                                        ? 'text-[#F9A826] bg-white/10'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                Analytics
                            </button>
                        </li>
                        {isAdmin && (
                            <li>
                                <button
                                    onClick={() => onNavigate('admin-fraud')}
                                    className={`w-full text-left py-2 px-2 rounded-md text-xs font-medium transition-colors ${
                                        activePage === 'admin-fraud'
                                            ? 'text-[#F9A826] bg-white/10'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    Fraud Management
                                </button>
                            </li>
                        )}
                    </ul>
                )}
            </li>

            {/* Site Options Section - Admin Only */}
            {isAdmin && (
                <li>
                    <button 
                        onClick={() => setIsSiteOptionsOpen(!isSiteOptionsOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors focus:outline-none"
                    >
                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            Site Options
                        </div>
                        <svg className={`w-4 h-4 transition-transform ${isSiteOptionsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    
                    {isSiteOptionsOpen && (
                        <ul className="pl-11 pr-2 space-y-1 mt-1">
                            {siteOptions.map(option => (
                                <li key={option.id}>
                                    <button
                                        onClick={() => onNavigate(`admin-site-options-${option.id}`)}
                                        className={`w-full text-left py-2 px-2 rounded-md text-xs font-medium transition-colors ${
                                            activePage === `admin-site-options-${option.id}`
                                                ? 'text-[#F9A826] bg-white/10'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        {option.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            )}

            {/* CMS Section - Unrestricted */}
            <li>
                <button 
                    onClick={() => setIsCMSOpen(!isCMSOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors focus:outline-none"
                >
                    <div className="flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        Main Pages (CMS)
                    </div>
                    <svg className={`w-4 h-4 transition-transform ${isCMSOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                
                {isCMSOpen && (
                    <ul className="pl-11 pr-2 space-y-1 mt-1">
                        {cmsPages.map(page => (
                            <li key={page.id}>
                                <button
                                    onClick={() => onNavigate(`admin-edit-${page.id}`)}
                                    className={`w-full text-left py-2 px-2 rounded-md text-xs font-medium transition-colors ${
                                        activePage === `admin-edit-${page.id}`
                                            ? 'text-[#F9A826] bg-white/10'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {page.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </li>

          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button 
             onClick={() => onNavigate('home')}
             className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors w-full px-4 py-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-8">
            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
            <div className="flex items-center gap-4">
                 <button className="text-gray-500 hover:text-gray-700 relative">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                 </button>
                 <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                        <img src={`https://ui-avatars.com/api/?name=${isAdmin ? 'Admin' : 'Editor'}+User&background=0A2B4C&color=fff`} alt="User" />
                     </div>
                     <span className="text-sm font-medium text-gray-700">{isAdmin ? 'Administrator' : 'Editor'}</span>
                 </div>
            </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 md:p-8">
            {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
