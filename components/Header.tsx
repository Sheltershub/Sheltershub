
import React, { useState, useEffect, useRef } from 'react';
import { navLinks } from '../constants';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const Logo: React.FC = () => (
    <img src="https://i.ibb.co/4RJRrttb/Sheltershub-Logo-png.png" alt="Sheltershub Logo" className="h-[4.5rem] w-auto dark:brightness-110" />
);

interface HeaderProps {
    onNavigate?: (page: string) => void;
    activePage?: string;
    userRole?: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, activePage = 'home', userRole = 'guest' }) => {
    const { theme, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const accountRef = useRef<HTMLDivElement>(null);

    // Close account menu on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
                setAccountOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNavClick = (e: React.MouseEvent, linkName: string) => {
        e.preventDefault();
        if (onNavigate) {
            if (linkName === 'Home') onNavigate('home');
            else if (linkName === 'All Properties') onNavigate('all-properties');
            else if (linkName === 'For Rent') onNavigate('for-rent');
            else if (linkName === 'For Sale') onNavigate('for-sale');
            else if (linkName === 'Agencies') onNavigate('agencies');
            else if (linkName === 'Agents') onNavigate('agents');
            else if (linkName === 'Developers') onNavigate('developers');
            else if (linkName === 'Blog') onNavigate('blog');
            else if (linkName === 'Contact') onNavigate('contact');
        }
    };

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onNavigate) {
            onNavigate('home');
        }
    };

    // Account Menu Handlers
    const handleAccountAction = (action: string) => {
        setAccountOpen(false);
        if (!onNavigate) return;

        if (action === 'logout') {
            onNavigate('logout');
            return;
        }

        // Role-based routing helpers
        switch (action) {
            case 'dashboard':
                if (userRole === 'admin' || userRole === 'editor') onNavigate('admin-dashboard');
                else if (userRole === 'agent') onNavigate('agent-properties'); // Agent "dashboard"
                else if (userRole === 'agency') onNavigate('agency-dashboard');
                else if (userRole === 'developer') onNavigate('developer-dashboard');
                else if (userRole === 'user') onNavigate('user-profile');
                else onNavigate('login');
                break;
            case 'insight':
                if (userRole === 'admin' || userRole === 'editor') onNavigate('admin-reports');
                else if (userRole === 'agent') onNavigate('agent-performance');
                else if (userRole === 'developer') onNavigate('developer-performance');
                else if (userRole === 'agency') onNavigate('agency-dashboard');
                else if (userRole === 'user') onNavigate('user-profile');
                else onNavigate('login');
                break;
            case 'properties':
                if (userRole === 'admin' || userRole === 'editor') onNavigate('admin-properties');
                else if (userRole === 'agent') onNavigate('agent-properties');
                else if (userRole === 'agency') onNavigate('agency-properties');
                else if (userRole === 'developer') onNavigate('developer-dashboard');
                else if (userRole === 'user') onNavigate('favorites'); 
                else onNavigate('login');
                break;
            case 'post':
                if (userRole === 'agent') onNavigate('agent-add-property');
                else if (userRole === 'developer') onNavigate('developer-add-project');
                else if (userRole === 'agency') onNavigate('agency-properties'); 
                else onNavigate('add-property');
                break;
            case 'favorites':
                onNavigate('favorites');
                break;
            case 'profile':
                if (userRole === 'admin' || userRole === 'editor') onNavigate('admin-settings');
                else if (userRole === 'agent') onNavigate('agent-settings');
                else if (userRole === 'agency') onNavigate('agency-settings');
                else if (userRole === 'developer') onNavigate('developer-settings');
                else onNavigate('user-profile');
                break;
            case 'login':
                onNavigate('login');
                break;
            default:
                break;
        }
    };

    const isLoggedIn = userRole !== 'guest';

    const accountOptions = isLoggedIn ? [
        { label: 'Dashboard', action: 'dashboard' },
        { label: 'Insight & Analytics', action: 'insight' },
        { label: 'Properties', action: 'properties' },
        { label: 'Post a Listing', action: 'post' },
        { label: 'Favorites & Saved Searches', action: 'favorites' },
        { label: 'My Profile', action: 'profile' },
        { label: 'Logout', action: 'logout' },
    ] : [
        { label: 'Dashboard', action: 'dashboard' }, // Will redirect to login
        { label: 'Insight & Analytics', action: 'insight' }, // Will redirect to login
        { label: 'Properties', action: 'properties' }, // Will redirect to login
        { label: 'Post a Listing', action: 'post' },
        { label: 'Favorites & Saved Searches', action: 'favorites' },
        { label: 'Login', action: 'login' },
    ];

    const submenuItems: Record<string, { label: string; onClick: (e: React.MouseEvent) => void; activePage: string }> = {
        'Agencies': { label: 'Add New Agency', onClick: (e) => { e.preventDefault(); if(onNavigate) onNavigate('add-agency'); }, activePage: 'add-agency' },
        'Agents': { label: 'Add New Agent', onClick: (e) => { e.preventDefault(); if(onNavigate) onNavigate('add-agent'); }, activePage: 'add-agent' },
        'Developers': { label: 'Add New Developer', onClick: (e) => { e.preventDefault(); if(onNavigate) onNavigate('add-developer'); }, activePage: 'add-developer' },
    };

  return (
    <header className="bg-white dark:bg-[#0A2B4C] relative z-50 transition-colors duration-300">
      {/* Top Bar */}
      <div className="bg-[#082956] dark:bg-[#061d3d] text-white text-sm font-light">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <span>The Most Trusted Real Estate Marketplace</span>
          
          <div className="flex items-center space-x-6 relative">
             {/* Theme Toggle */}
             <button
                onClick={toggleTheme}
                className="flex items-center gap-2 hover:text-brand-orange transition-colors focus:outline-none p-1 rounded-full bg-white/10"
                aria-label="Toggle theme"
             >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
             </button>

             <div className="hidden md:flex items-center space-x-6 relative" ref={accountRef}>
             {/* Account Dropdown Trigger */}
             <button 
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex items-center gap-2 hover:text-brand-orange transition-colors focus:outline-none"
             >
                <span>Account</span>
                <svg className={`w-4 h-4 transition-transform ${accountOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
             </button>

             {/* Account Dropdown Menu */}
             {accountOpen && (
                 <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-[#082956] rounded-lg shadow-xl py-2 z-50 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 animate-fadeIn">
                     {accountOptions.map((option, idx) => (
                         <button
                            key={idx}
                            onClick={() => handleAccountAction(option.action)}
                            className={`block w-full text-left px-6 py-3 text-sm hover:bg-gray-50 dark:hover:bg-blue-900/30 transition-colors ${
                                option.label === 'Logout' ? 'text-red-500 hover:text-red-700 border-t border-gray-100 dark:border-gray-700 mt-1 pt-3' : 'text-gray-700 dark:text-gray-200 hover:text-[#0A2B4C] dark:hover:text-brand-orange'
                            }`}
                         >
                             {option.label}
                         </button>
                     ))}
                 </div>
             )}
            </div>
          </div>
        </div>
      </div>
      
    {/* Middle Bar: Logo and Advert */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center text-gray-800 dark:text-gray-200">
        <a href="#" onClick={handleLogoClick} className="focus:outline-none">
            <Logo />
        </a>
        <div className="hidden md:flex bg-gray-300 dark:bg-gray-800 items-center justify-center w-full max-w-md lg:max-w-2xl h-20 mx-4 rounded-lg">
            <span className="text-gray-600 dark:text-gray-400 font-semibold text-lg text-center">Advert Space by Google</span>
        </div>
        <div className="lg:hidden flex items-center space-x-4">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 dark:text-gray-300 focus:outline-none" aria-label="Open menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
        </div>
      </div>

      {/* Bottom Bar: Main Navigation */}
      <div className="border-t border-b border-gray-200 dark:border-gray-700 hidden lg:block">
        <div className="container mx-auto px-4 h-14 flex justify-center items-center">
             <nav className="hidden lg:flex items-center space-x-8 h-full">
                {navLinks.map((link) => {
                    const submenu = submenuItems[link.name];

                    if (submenu) {
                        return (
                            <div key={link.name} className="relative group h-full flex items-center">
                                <a 
                                    href={link.href} 
                                    onClick={(e) => handleNavClick(e, link.name)}
                                    className={`${(activePage === link.name.toLowerCase() || activePage === submenu.activePage) ? 'text-brand-orange' : 'text-gray-800 dark:text-gray-200'} hover:text-brand-orange font-semibold text-base transition-colors flex items-center gap-1 h-full`}
                                >
                                    {link.name}
                                    <svg className="w-4 h-4 mt-0.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </a>
                                {/* Submenu */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white dark:bg-[#0A2B4C] border border-gray-100 dark:border-gray-700 shadow-xl rounded-b-lg overflow-hidden hidden group-hover:block z-50">
                                    <a 
                                        href="#" 
                                        onClick={(e) => {
                                            submenu.onClick(e);
                                        }}
                                        className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-blue-900/30 hover:text-brand-orange transition-colors text-center"
                                    >
                                        {submenu.label}
                                    </a>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            onClick={(e) => handleNavClick(e, link.name)}
                            className={`${(link.name === 'Home' && activePage === 'home') || (link.name === 'All Properties' && activePage === 'all-properties') || (link.name === 'For Rent' && activePage === 'for-rent') || (link.name === 'For Sale' && activePage === 'for-sale') || (link.name === 'Blog' && activePage === 'blog') || (link.name === 'Contact' && activePage === 'contact') ? 'text-brand-orange' : 'text-gray-800 dark:text-gray-200'} hover:text-brand-orange font-semibold text-base transition-colors h-full flex items-center`}
                        >
                            {link.name}
                        </a>
                    );
                })}
            </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0A2B4C] border-t dark:border-gray-700">
            <nav className="flex flex-col items-center py-4 space-y-2">
                {navLinks.map((link) => {
                    const submenu = submenuItems[link.name];
                    return (
                        <React.Fragment key={link.name}>
                            <a 
                                href={link.href}
                                onClick={(e) => {
                                    handleNavClick(e, link.name);
                                    setMenuOpen(false);
                                }}
                                className="text-gray-700 dark:text-gray-200 hover:text-brand-orange font-medium px-4 py-2 w-full text-center"
                            >
                                {link.name}
                            </a>
                            {submenu && (
                                <a 
                                    href="#"
                                    onClick={(e) => {
                                        submenu.onClick(e);
                                        setMenuOpen(false);
                                    }}
                                    className="text-gray-500 dark:text-gray-400 hover:text-brand-orange font-medium px-4 py-1 w-full text-center text-sm bg-gray-50 dark:bg-blue-900/10"
                                >
                                    + {submenu.label}
                                </a>
                            )}
                        </React.Fragment>
                    );
                })}
            </nav>
            {/* Mobile Account Options */}
            <div className="flex flex-col items-center space-y-2 border-t dark:border-gray-700 pt-4 pb-4">
                <span className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider mb-1">Account</span>
                {accountOptions.map((option, idx) => (
                    <a 
                        key={idx}
                        href="#" 
                        onClick={(e) => { 
                            e.preventDefault(); 
                            handleAccountAction(option.action); 
                            setMenuOpen(false); 
                        }} 
                        className={`text-gray-700 dark:text-gray-200 hover:text-brand-orange ${option.label === 'Logout' ? 'text-red-500 hover:text-red-400' : ''}`}
                    >
                        {option.label}
                    </a>
                ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
