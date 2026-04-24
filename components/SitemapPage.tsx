
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
    { title: 'Authentication & User', links: [
        { name: 'Login / Register', page: 'login' },
        { name: 'Forgot Password', page: 'forgot-password' },
        { name: 'Reset Password', page: 'reset-password' },
        { name: 'Email Verification', page: 'email-verification' },
        { name: 'User Profile', page: 'user-profile' },
        { name: 'My Favorites', page: 'favorites' },
        { name: 'Editor Registration', page: 'editor-register' },
    ]},
    { title: 'Properties', links: [
        { name: 'All Properties', page: 'all-properties' },
        { name: 'For Rent', page: 'for-rent' },
        { name: 'For Sale', page: 'for-sale' },
        { name: 'Search Results', page: 'search-results' },
        { name: 'Single Property Detail (Demo)', page: 'property-detail' },
        { name: 'Compare Properties', page: 'compare-properties' },
        { name: 'Post a Property', page: 'add-property' },
    ]},
    { title: 'Professionals', links: [
        { name: 'Agencies List', page: 'agencies' },
        { name: 'Single Agency Detail (Demo)', page: 'agency-detail' },
        { name: 'Register Agency', page: 'add-agency' },
        { name: 'Agents List', page: 'agents' },
        { name: 'Single Agent Detail (Demo)', page: 'agent-detail' },
        { name: 'Register Agent', page: 'add-agent' },
        { name: 'Developers List', page: 'developers' },
        { name: 'Single Developer Detail (Demo)', page: 'developer-detail' },
        { name: 'Register Developer', page: 'add-developer' },
    ]},
    { title: 'Agent Dashboard', links: [
        { name: 'My Properties', page: 'agent-properties' },
        { name: 'Add Property', page: 'agent-add-property' },
        { name: 'Performance Analytics', page: 'agent-performance' },
        { name: 'Messages', page: 'agent-messages' },
        { name: 'Identity Verification', page: 'agent-verification' },
        { name: 'Profile Settings', page: 'agent-settings' },
    ]},
    { title: 'Developer Dashboard', links: [
        { name: 'My Projects', page: 'developer-dashboard' },
        { name: 'Add Project', page: 'developer-add-project' },
        { name: 'Performance', page: 'developer-performance' },
        { name: 'Messages', page: 'developer-messages' },
        { name: 'Profile Settings', page: 'developer-settings' },
    ]},
    { title: 'Agency Dashboard', links: [
        { name: 'Dashboard Overview', page: 'agency-dashboard' },
        { name: 'Team Members', page: 'agency-team' },
        { name: 'Add Agent', page: 'agency-add-agent' },
        { name: 'Managed Properties', page: 'agency-properties' },
        { name: 'Agency Settings', page: 'agency-settings' },
    ]},
    { title: 'Admin Dashboard', links: [
        { name: 'Dashboard Overview', page: 'admin-dashboard' },
        { name: 'Manage Properties', page: 'admin-properties' },
        { name: 'Manage Agents', page: 'admin-agents' },
        { name: 'Manage Agencies', page: 'admin-agencies' },
        { name: 'Manage Developers', page: 'admin-developers' },
        { name: 'Manage Users', page: 'admin-users' },
        { name: 'Create Administrator', page: 'admin-register' },
        { name: 'Manage Blog', page: 'admin-blog' },
        { name: 'Add Blog Post', page: 'admin-add-blog' },
        { name: 'Subscriptions', page: 'admin-subscriptions' },
        { name: 'Reports & Analytics', page: 'admin-reports' },
        { name: 'Fraud Management & Logs', page: 'admin-fraud' },
        { name: 'General Settings', page: 'admin-settings' },
    ]},
    { title: 'Admin: Site Options', links: [
        { name: 'Currency Format', page: 'admin-site-options-currency' },
        { name: 'Property Types', page: 'admin-site-options-type' },
        { name: 'Listing Statuses', page: 'admin-site-options-status' },
        { name: 'Features', page: 'admin-site-options-features' },
        { name: 'Regions', page: 'admin-site-options-region' },
        { name: 'Cities', page: 'admin-site-options-city' },
        { name: 'Area', page: 'admin-site-options-area' },
        { name: 'Agencies', page: 'admin-site-options-agencies' },
        { name: 'Agents', page: 'admin-site-options-agents' },
        { name: 'Prefix & Suffix', page: 'admin-site-options-prefix-suffix' },
    ]},
    { title: 'Admin: CMS Pages', links: [
        { name: 'Edit Home', page: 'admin-edit-home' },
        { name: 'Edit About Us', page: 'admin-edit-about' },
        { name: 'Edit Login/Register', page: 'admin-edit-login' },
        { name: 'Edit User Profile', page: 'admin-edit-user-profile' },
        { name: 'Edit My Favorites', page: 'admin-edit-favorites' },
        { name: 'Edit Forgot Password', page: 'admin-edit-forgot-password' },
        { name: 'Edit Reset Password', page: 'admin-edit-reset-password' },
        { name: 'Edit Email Verification', page: 'admin-edit-email-verification' },
        { name: 'Edit Search Results', page: 'admin-edit-search-results' },
        { name: 'Edit Blog Page', page: 'admin-edit-blog' },
        { name: 'Edit Blog Detail', page: 'admin-edit-blog-detail' },
        { name: 'Edit Contact', page: 'admin-edit-contact' },
        { name: 'Edit FAQ', page: 'admin-edit-faq' },
        { name: 'Edit Report Fraud', page: 'admin-edit-report-fraud' },
        { name: 'Edit Terms', page: 'admin-edit-terms' },
        { name: 'Edit Editor Reg', page: 'admin-edit-editor-register' },
    ]},
  ];

  let linkCounter = 1;

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} activePage="home" />

      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-[#0A2B4C] mb-2">Sitemap</h1>
            <p className="text-gray-500">Complete overview of all pages and sections on Sheltershub.</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {pages.map((section, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-full">
                    <h2 className="text-lg font-bold text-[#0A2B4C] mb-4 border-b pb-2">{section.title}</h2>
                    <ul className="space-y-2.5">
                        {section.links.map((link, linkIdx) => {
                            const currentCount = linkCounter++;
                            return (
                                <li key={linkIdx}>
                                    <button 
                                        onClick={() => onNavigate(link.page)}
                                        className="text-gray-600 hover:text-[#F9A826] hover:underline flex items-start gap-2 transition-colors text-left text-sm w-full"
                                    >
                                        <span className="text-[#F9A826] font-mono text-xs font-bold mt-0.5 min-w-[20px] text-right">{currentCount}.</span>
                                        <span>{link.name}</span>
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
