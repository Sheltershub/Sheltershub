
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface SitemapPageProps {
  onNavigate: (page: string) => void;
}

const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pages = [
    { title: 'Main Public Pages', links: [
        { name: 'Home', page: 'home' },
        { name: 'About Us', page: 'about' },
        { name: 'Contact Us', page: 'contact' }, 
        { name: 'FAQ', page: 'faq' },
        { name: 'Blog & News', page: 'blog' },
        { name: 'Single Blog Article (Demo)', page: 'blog-detail' },
        { name: 'Terms & Conditions', page: 'terms' },
        { name: 'Report Fraud', page: 'report-fraud' },
        { name: 'Sitemap', page: 'sitemap' },
        { name: '404 Error Page', page: '404' },
        { name: 'Access Denied', page: 'access-denied' },
    ]},
    { title: 'Authentication', links: [
        { name: 'Login', page: 'login' },
        { name: 'Register Account', page: 'register' },
        { name: 'Forgot Password', page: 'forgot-password' },
        { name: 'Reset Password', page: 'reset-password' },
        { name: 'Email Verification', page: 'email-verification' },
        { name: 'Editor Registration', page: 'editor-register' },
    ]},
    { title: 'Public Registration Paths', links: [
        { name: 'Register as Independent Agent', page: 'add-agent' },
        { name: 'Register as Independent Agency', page: 'add-agency' },
        { name: 'Register as Developer', page: 'add-developer' },
        { name: 'Register as Invited Agent by Agency', page: 'register-invited-agent-agency' },
        { name: 'Register as Invited Agent by Developer', page: 'register-invited-agent-developer' },
        { name: 'Register as Invited Agency by Developer', page: 'register-invited-agency-developer' },
    ]},
    { title: 'Properties', links: [
        { name: 'All Properties', page: 'all-properties' },
        { name: 'For Rent', page: 'for-rent' },
        { name: 'For Sale', page: 'for-sale' },
        { name: 'Search Results', page: 'search-results' },
        { name: 'Property Details (Demo)', page: 'property-detail' },
        { name: 'Compare Properties', page: 'compare-properties' },
        { name: 'My Favorites', page: 'favorites' },
        { name: 'Post a Property', page: 'add-property' },
    ]},
    { title: 'Property Categories', links: [
        { name: 'Home for Rent', page: 'home-for-rent' },
        { name: 'Home for Sale', page: 'home-for-sale' },
        { name: 'Apartment for Rent', page: 'apartment-for-rent' },
        { name: 'Apartment for Sale', page: 'apartment-for-sale' },
        { name: 'Land for Sale', page: 'land-for-sale' },
        { name: 'Townhouse for Rent', page: 'townhouse-for-rent' },
        { name: 'Townhouse for Sale', page: 'townhouse-for-sale' },
        { name: 'Office for Rent', page: 'office-for-rent' },
        { name: 'Office for Sale', page: 'office-for-sale' },
    ]},
    { title: 'Professionals', links: [
        { name: 'Agencies List', page: 'agencies' },
        { name: 'Agency Details (Demo)', page: 'agency-detail' },
        { name: 'Agents List', page: 'agents' },
        { name: 'Agent Details (Demo)', page: 'agent-detail' },
        { name: 'Developers List', page: 'developers' },
        { name: 'Developer Details (Demo)', page: 'developer-detail' },
    ]},
    { title: 'Buyer / User Portal', links: [
        { name: 'Dashboard / Profile', page: 'buyer-profile' },
        { name: 'Edit Profile', page: 'buyer-profile-edit' },
        { name: 'Saved Properties', page: 'buyer-saved-properties' },
        { name: 'Messages & Enquiries', page: 'buyer-messages' },
        { name: 'Recent Activity', page: 'buyer-recent' },
        { name: 'Public Profile', page: 'user-profile' },
    ]},
    { title: 'Agent Dashboard', links: [
        { name: 'Dashboard (Properties)', page: 'agent-properties' },
        { name: 'Add New Property', page: 'agent-add-property' },
        { name: 'Performance Analytics', page: 'agent-performance' },
        { name: 'Messages', page: 'agent-messages' },
        { name: 'Identity Verification', page: 'agent-verification' },
        { name: 'Account Settings', page: 'agent-settings' },
    ]},
    { title: 'Developer Dashboard', links: [
        { name: 'Dashboard (Projects)', page: 'developer-dashboard' },
        { name: 'Add New Project', page: 'developer-add-project' },
        { name: 'Performance & Traffic', page: 'developer-performance' },
        { name: 'Messages', page: 'developer-messages' },
        { name: 'Account Settings', page: 'developer-settings' },
    ]},
    { title: 'Agency Dashboard', links: [
        { name: 'Dashboard Overview', page: 'agency-dashboard' },
        { name: 'My Team Members', page: 'agency-team' },
        { name: 'Add New Agent', page: 'agency-add-agent' },
        { name: 'Managed Properties', page: 'agency-properties' },
        { name: 'Agency Settings', page: 'agency-settings' },
    ]},
    { title: 'Admin Governance', links: [
        { name: 'Master Dashboard', page: 'admin-dashboard' },
        { name: 'Manage Properties', page: 'admin-properties' },
        { name: 'Manage Agents', page: 'admin-agents' },
        { name: 'Manage Agencies', page: 'admin-agencies' },
        { name: 'Manage Developers', page: 'admin-developers' },
        { name: 'Manage Web Users', page: 'admin-users' },
        { name: 'Create Admin User', page: 'admin-register' },
        { name: 'Manage Blog Posts', page: 'admin-blog' },
        { name: 'Write Blog Article', page: 'admin-add-blog' },
        { name: 'Premium Subscriptions', page: 'admin-subscriptions' },
        { name: 'Stats & Reports', page: 'admin-reports' },
        { name: 'Fraud & Security Logs', page: 'admin-fraud' },
        { name: 'System Settings', page: 'admin-settings' },
    ]},
    { title: 'Admin: Site Config', links: [
        { name: 'Currency Config', page: 'admin-site-options-currency' },
        { name: 'Property Types', page: 'admin-site-options-type' },
        { name: 'Listing Statuses', page: 'admin-site-options-status' },
        { name: 'Amenity Features', page: 'admin-site-options-features' },
        { name: 'Regional Settings', page: 'admin-site-options-region' },
        { name: 'City Management', page: 'admin-site-options-city' },
        { name: 'Neighborhood Areas', page: 'admin-site-options-area' },
        { name: 'Agency Options', page: 'admin-site-options-agencies' },
        { name: 'Agent Options', page: 'admin-site-options-agents' },
        { name: 'Prefix & Suffix', page: 'admin-site-options-prefix-suffix' },
    ]},
    { title: 'Admin: Page CMS', links: [
        { name: 'Home Layout', page: 'admin-edit-home' },
        { name: 'About Page', page: 'admin-edit-about' },
        { name: 'Login/Register UI', page: 'admin-edit-login' },
        { name: 'User Profile UI', page: 'admin-edit-user-profile' },
        { name: 'Favorites UI', page: 'admin-edit-favorites' },
        { name: 'Forgot Pass UI', page: 'admin-edit-forgot-password' },
        { name: 'Reset Pass UI', page: 'admin-edit-reset-password' },
        { name: 'Verification UI', page: 'admin-edit-email-verification' },
        { name: 'Search UI', page: 'admin-edit-search-results' },
        { name: 'Blog Index', page: 'admin-edit-blog' },
        { name: 'Blog Article UI', page: 'admin-edit-blog-detail' },
        { name: 'Contact Page', page: 'admin-edit-contact' },
        { name: 'FAQ Page', page: 'admin-edit-faq' },
        { name: 'Fraud Report UI', page: 'admin-edit-report-fraud' },
        { name: 'Terms & Privacy', page: 'admin-edit-terms' },
        { name: 'Editor Registration UI', page: 'admin-edit-editor-register' },
    ]},
  ];

  let linkCounter = 1;

  return (
    <div className="bg-gray-50 dark:bg-slate-dark-950 min-h-screen font-sans transition-colors duration-300">
      <Header onNavigate={onNavigate} activePage="sitemap" />

      <div className="bg-white dark:bg-slate-dark-900 border-b border-gray-200 dark:border-slate-dark-800 transition-colors duration-300">
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-black text-[#0A2B4C] dark:text-white mb-3">Sitemap</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">Complete overview of all pages and sections on Sheltershub.</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {pages.map((section, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-dark-900 rounded-2xl border border-gray-200 dark:border-slate-dark-800 shadow-sm p-7 h-full flex flex-col transition-all hover:shadow-md">
                    <h2 className="text-lg font-black text-[#0A2B4C] dark:text-white mb-6 border-b border-gray-100 dark:border-slate-dark-800 pb-3 uppercase tracking-wider">{section.title}</h2>
                    <ul className="space-y-3.5 flex-grow">
                        {section.links.map((link, linkIdx) => {
                            const currentCount = linkCounter++;
                            return (
                                <li key={linkIdx}>
                                    <button 
                                        onClick={() => onNavigate(link.page)}
                                        className="text-gray-600 dark:text-gray-300 hover:text-[#F9A826] dark:hover:text-[#F9A826] hover:underline flex items-start gap-3 transition-colors text-left text-[13px] w-full group"
                                    >
                                        <span className="text-[#F9A826] font-mono text-xs font-black mt-0.5 min-w-[24px] text-right opacity-60 group-hover:opacity-100">{currentCount}.</span>
                                        <span className="font-medium">{link.name}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default SitemapPage;
