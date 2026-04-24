
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchForm from './components/SearchForm';
import PropertyList from './components/PropertyList';
import AdvertSpace from './components/AdvertSpace';
import ImageSlider from './components/ImageSlider';
import Footer from './components/Footer';
import AllProperties from './components/AllProperties';
import ForRentPage from './components/ForRentPage';
import ForSalePage from './components/ForSalePage';
import AgentsPage from './components/AgentsPage';
import SingleAgentPage from './components/SingleAgentPage';
import LoginPage from './components/LoginPage';
import SingleProperty from './components/SingleProperty';
import AddPropertyPage from './components/AddPropertyPage';
import AgenciesPage from './components/AgenciesPage';
import SingleAgencyPage from './components/SingleAgencyPage';
import AddAgencyPage from './components/AddAgencyPage';
import AddAgentPage from './components/AddAgentPage';
import AddDeveloperPage from './components/AddDeveloperPage';
import DevelopersPage from './components/DevelopersPage';
import SingleDeveloperPage from './components/SingleDeveloperPage';
import SearchResultsPage from './components/SearchResultsPage';
import SitemapPage from './components/SitemapPage';
import NotFoundPage from './components/NotFoundPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import EmailVerificationPage from './components/EmailVerificationPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import BlogPage from './components/BlogPage';
import SingleBlogPage from './components/SingleBlogPage';
import AboutUsPage from './components/AboutUsPage';
import ContactPage from './components/ContactPage';
import FAQPage from './components/FAQPage';
import TermsPage from './components/TermsPage';
import UserProfilePage from './components/UserProfilePage';
import ComparePropertiesPage from './components/ComparePropertiesPage';
import FavoritesPage from './components/FavoritesPage';
import ReportFraudPage from './components/ReportFraudPage';
import AccessDeniedPage from './components/AccessDeniedPage';
import HomeForRentPage from './components/HomeForRentPage';
import HomeForSalePage from './components/HomeForSalePage';
import ApartmentForRentPage from './components/ApartmentForRentPage';
import ApartmentForSalePage from './components/ApartmentForSalePage';
import LandForSalePage from './components/LandForSalePage';
import TownhouseForRentPage from './components/TownhouseForRentPage';
import TownhouseForSalePage from './components/TownhouseForSalePage';
import OfficeForRentPage from './components/OfficeForRentPage';
import OfficeForSalePage from './components/OfficeForSalePage';

// Admin Pages
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProperties from './components/admin/AdminProperties';
import AdminAgents from './components/admin/AdminAgents';
import AdminAgencies from './components/admin/AdminAgencies';
import AdminDevelopers from './components/admin/AdminDevelopers';
import AdminUsers from './components/admin/AdminUsers';
import AdminBlog from './components/admin/AdminBlog';
import AdminAddBlog from './components/admin/AdminAddBlog';
import AdminSubscriptions from './components/admin/AdminSubscriptions';
import AdminSettings from './components/admin/AdminSettings';
import AdminReports from './components/admin/AdminReports';
import AdminRegister from './components/admin/AdminRegister';
import EditorRegister from './components/admin/EditorRegister';
import AdminPageEditor from './components/admin/AdminPageEditor';
import AdminSiteOptions from './components/admin/AdminSiteOptions';
import AdminFraudManagement from './components/admin/AdminFraudManagement';

// Developer Pages
import DeveloperDashboard from './components/developer/DeveloperDashboard';
import DeveloperAddProject from './components/developer/DeveloperAddProject';
import DeveloperPerformance from './components/developer/DeveloperPerformance';
import DeveloperMessages from './components/developer/DeveloperMessages';
import DeveloperSettings from './components/developer/DeveloperSettings';

// Agent Pages
import AgentProperties from './components/agent/AgentProperties';
import AgentAddProperty from './components/agent/AgentAddProperty';
import AgentPerformance from './components/agent/AgentPerformance';
import AgentMessages from './components/agent/AgentMessages';
import AgentSettings from './components/agent/AgentSettings';
import AgentVerificationPage from './components/agent/AgentVerificationPage';

// Agency Pages
import AgencyDashboard from './components/agency/AgencyDashboard';
import AgencyTeam from './components/agency/AgencyTeam';
import AgencyAddAgent from './components/agency/AgencyAddAgent';
import AgencyProperties from './components/agency/AgencyProperties';
import AgencySettings from './components/agency/AgencySettings';

import { featuredProperties, latestProperties, adSliderImages, wideAdSliderImages } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [userRole, setUserRole] = useState<string>('guest'); // 'admin', 'editor', 'agent', 'agency', 'developer', 'user', 'guest'

  const handleNavigate = (page: string) => {
    if (page === 'logout') {
        setUserRole('guest');
        setCurrentPage('home');
        window.scrollTo(0, 0);
        return;
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (role: string) => {
    setUserRole(role);
  };

  // Helper to check permission and render
  const renderRestricted = (Component: React.ReactNode, allowedRoles: string[]) => {
    if (allowedRoles.includes(userRole)) {
      return Component;
    }
    return <AccessDeniedPage onNavigate={handleNavigate} />;
  };

  const renderContent = () => {
    if (currentPage === 'login') return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
    if (currentPage === 'forgot-password') return <ForgotPasswordPage onNavigate={handleNavigate} />;
    if (currentPage === 'reset-password') return <ResetPasswordPage onNavigate={handleNavigate} />;
    if (currentPage === 'email-verification') return <EmailVerificationPage onNavigate={handleNavigate} />;
    if (currentPage === 'access-denied') return <AccessDeniedPage onNavigate={handleNavigate} />;
    if (currentPage === 'editor-register') return <EditorRegister onNavigate={handleNavigate} />;
    
    // Admin Routes
    if (currentPage === 'admin-dashboard') return renderRestricted(<AdminDashboard onNavigate={handleNavigate} userRole={userRole} />, ['admin', 'editor']);
    if (currentPage === 'admin-properties') return renderRestricted(<AdminProperties onNavigate={handleNavigate} userRole={userRole} />, ['admin', 'editor']);
    if (currentPage === 'admin-blog') return renderRestricted(<AdminBlog onNavigate={handleNavigate} userRole={userRole} />, ['admin', 'editor']);
    if (currentPage === 'admin-add-blog') return renderRestricted(<AdminAddBlog onNavigate={handleNavigate} userRole={userRole} />, ['admin', 'editor']);
    if (currentPage === 'admin-reports') return renderRestricted(<AdminReports onNavigate={handleNavigate} userRole={userRole} />, ['admin', 'editor']); // Editor can view basic reports (handled in component)
    if (currentPage === 'admin-fraud') return renderRestricted(<AdminFraudManagement onNavigate={handleNavigate} userRole={userRole} />, ['admin']);
    
    // Admin CMS Edit Routes
    if (currentPage.startsWith('admin-edit-')) {
        const pageName = currentPage.replace('admin-edit-', '');
        return renderRestricted(<AdminPageEditor pageName={pageName} onNavigate={handleNavigate} userRole={userRole} />, ['admin', 'editor']);
    }

    // Admin Site Options Routes
    if (currentPage.startsWith('admin-site-options-')) {
        const category = currentPage.replace('admin-site-options-', '');
        return renderRestricted(<AdminSiteOptions category={category} onNavigate={handleNavigate} userRole={userRole} />, ['admin']);
    }

    // Admin Only Routes
    if (currentPage === 'admin-agents') return renderRestricted(<AdminAgents onNavigate={handleNavigate} userRole={userRole} />, ['admin']);
    if (currentPage === 'admin-agencies') return renderRestricted(<AdminAgencies onNavigate={handleNavigate} userRole={userRole} />, ['admin']);
    if (currentPage === 'admin-developers') return renderRestricted(<AdminDevelopers onNavigate={handleNavigate} userRole={userRole} />, ['admin']);
    if (currentPage === 'admin-users') return renderRestricted(<AdminUsers onNavigate={handleNavigate} userRole={userRole} />, ['admin']);
    if (currentPage === 'admin-subscriptions') return renderRestricted(<AdminSubscriptions onNavigate={handleNavigate} userRole={userRole} />, ['admin']);
    if (currentPage === 'admin-settings') return renderRestricted(<AdminSettings onNavigate={handleNavigate} userRole={userRole} />, ['admin']);
    if (currentPage === 'admin-register') return renderRestricted(<AdminRegister onNavigate={handleNavigate} userRole={userRole} />, ['admin']);

    // Developer Dashboard Routes
    if (currentPage === 'developer-dashboard') return <DeveloperDashboard onNavigate={handleNavigate} />;
    if (currentPage === 'developer-add-project') return <DeveloperAddProject onNavigate={handleNavigate} />;
    if (currentPage === 'developer-performance') return <DeveloperPerformance onNavigate={handleNavigate} />;
    if (currentPage === 'developer-messages') return <DeveloperMessages onNavigate={handleNavigate} />;
    if (currentPage === 'developer-settings') return <DeveloperSettings onNavigate={handleNavigate} />;

    // Agent Dashboard Routes
    if (currentPage === 'agent-properties') return <AgentProperties onNavigate={handleNavigate} />;
    if (currentPage === 'agent-add-property') return <AgentAddProperty onNavigate={handleNavigate} />;
    if (currentPage === 'agent-performance') return <AgentPerformance onNavigate={handleNavigate} />;
    if (currentPage === 'agent-messages') return <AgentMessages onNavigate={handleNavigate} />;
    if (currentPage === 'agent-settings') return <AgentSettings onNavigate={handleNavigate} />;
    if (currentPage === 'agent-verification') return <AgentVerificationPage onNavigate={handleNavigate} />;

    // Agency Dashboard Routes
    if (currentPage === 'agency-dashboard') return <AgencyDashboard onNavigate={handleNavigate} />;
    if (currentPage === 'agency-team') return <AgencyTeam onNavigate={handleNavigate} />;
    if (currentPage === 'agency-add-agent') return <AgencyAddAgent onNavigate={handleNavigate} />;
    if (currentPage === 'agency-properties') return <AgencyProperties onNavigate={handleNavigate} />;
    if (currentPage === 'agency-settings') return <AgencySettings onNavigate={handleNavigate} />;


    if (currentPage === 'all-properties') {
      return (
        <>
          <Header onNavigate={handleNavigate} activePage={currentPage} userRole={userRole} />
          <AllProperties onNavigate={handleNavigate} />
          <Footer onNavigate={handleNavigate} />
        </>
      );
    }

    if (currentPage === 'for-rent') {
      return <ForRentPage onNavigate={handleNavigate} />;
    }

    if (currentPage === 'for-sale') {
      return <ForSalePage onNavigate={handleNavigate} />;
    }

    if (currentPage === 'home-for-rent') {
      return <HomeForRentPage onNavigate={handleNavigate} />;
    }

    if (currentPage === 'home-for-sale') {
      return <HomeForSalePage onNavigate={handleNavigate} />;
    }

    if (currentPage === 'apartment-for-rent') {
      return <ApartmentForRentPage onNavigate={handleNavigate} />;
    }

    if (currentPage === 'apartment-for-sale') {
      return <ApartmentForSalePage onNavigate={handleNavigate} />;
    }

    if (currentPage === 'land-for-sale') {
      return <LandForSalePage onNavigate={handleNavigate} />;
    }

    if (currentPage === 'townhouse-for-rent') {
      return <TownhouseForRentPage onNavigate={handleNavigate} />;
    }

    if (currentPage === 'townhouse-for-sale') {
      return <TownhouseForSalePage onNavigate={handleNavigate} />;
    }

    if (currentPage === 'office-for-rent') {
      return <OfficeForRentPage onNavigate={handleNavigate} />;
    }

    if (currentPage === 'office-for-sale') {
      return <OfficeForSalePage onNavigate={handleNavigate} />;
    }

    if (currentPage === 'agents') {
      return <AgentsPage onNavigate={handleNavigate} />;
    }

    if (currentPage === 'agent-detail') return <SingleAgentPage onNavigate={handleNavigate} userRole={userRole} />;
    if (currentPage === 'property-detail') return <SingleProperty onNavigate={handleNavigate} />;
    if (currentPage === 'add-property') return <AddPropertyPage onNavigate={handleNavigate} />;
    if (currentPage === 'favorites') return <FavoritesPage onNavigate={handleNavigate} />;
    if (currentPage === 'compare-properties') return <ComparePropertiesPage onNavigate={handleNavigate} />;
    if (currentPage === 'agencies') return <AgenciesPage onNavigate={handleNavigate} />;
    if (currentPage === 'agency-detail') return <SingleAgencyPage onNavigate={handleNavigate} userRole={userRole} />;
    if (currentPage === 'add-agency') return <AddAgencyPage onNavigate={handleNavigate} />;
    if (currentPage === 'add-agent') return <AddAgentPage onNavigate={handleNavigate} />;
    if (currentPage === 'add-developer') return <AddDeveloperPage onNavigate={handleNavigate} />;
    if (currentPage === 'developers') return <DevelopersPage onNavigate={handleNavigate} />;
    if (currentPage === 'developer-detail') return <SingleDeveloperPage onNavigate={handleNavigate} userRole={userRole} />;
    if (currentPage === 'search-results') return <SearchResultsPage onNavigate={handleNavigate} />;
    if (currentPage === 'sitemap') return <SitemapPage onNavigate={handleNavigate} />;
    if (currentPage === 'blog') return <BlogPage onNavigate={handleNavigate} />;
    if (currentPage === 'blog-detail') return <SingleBlogPage onNavigate={handleNavigate} />;
    if (currentPage === 'about') return <AboutUsPage onNavigate={handleNavigate} />;
    if (currentPage === 'contact') return <ContactPage onNavigate={handleNavigate} />;
    if (currentPage === 'faq') return <FAQPage onNavigate={handleNavigate} />;
    if (currentPage === 'terms') return <TermsPage onNavigate={handleNavigate} />;
    if (currentPage === 'report-fraud') return <ReportFraudPage onNavigate={handleNavigate} userRole={userRole} />;
    if (currentPage === 'user-profile') return <UserProfilePage onNavigate={handleNavigate} />;
    if (currentPage === '404') return <NotFoundPage onNavigate={handleNavigate} />;

    // Home Page
    return (
      <>
        <Header onNavigate={handleNavigate} activePage={currentPage} userRole={userRole} />
        <Hero />
        <div className="container mx-auto px-4 relative z-10 -mt-11">
          <div className="w-full lg:w-3/4 mx-auto">
            <SearchForm onSearch={() => handleNavigate('search-results')} />
          </div>
        </div>
        <main className="container mx-auto px-4 py-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-9">
              <AdvertSpace className="mt-8 mb-8 lg:mt-0 h-24" />
              <div className="my-8 aspect-video">
                <ImageSlider images={wideAdSliderImages} />
              </div>
              <AdvertSpace className="my-8 h-24" />
              <PropertyList 
                title="Featured Properties" 
                properties={featuredProperties} 
                onPropertyClick={() => handleNavigate('property-detail')}
              />
              <AdvertSpace className="my-8 h-24" />
              <PropertyList 
                title="Latest Properties" 
                properties={latestProperties} 
                onPropertyClick={() => handleNavigate('property-detail')}
              />
              <div className="my-8">
                <ImageSlider images={adSliderImages} height="h-64" />
              </div>
              <AdvertSpace className="my-8 h-24" />
            </div>
            <aside className="lg:col-span-3 space-y-8 mt-8 lg:mt-0">
              <AdvertSpace className="h-60" text="Advert Space by Real Estate Company 1 by 1 ratio size" />
              <AdvertSpace className="h-96" text="Advert Space by Real Estate Company 9 by 16 ratio size" />
              <AdvertSpace className="h-60" text="Advert Space by Real Estate Company 1 by 1 ratio size" />
              <div className="bg-red-600 aspect-video flex items-center justify-center p-4 rounded-lg">
                  <span className="text-white font-bold text-center text-xl">YouTube Embed<br/>16 by 9 ratio</span>
              </div>
              <AdvertSpace className="h-60" text="Advert Space by Real Estate Company 1 by 1 ratio size" />
              <AdvertSpace className="h-96" text="Advert Space by Real Estate Company 9 by 16 ratio size" />
              <AdvertSpace className="h-60" text="Advert Space by Real Estate Company 1 by 1 ratio size" />
              <div className="bg-red-600 aspect-video flex items-center justify-center p-4 rounded-lg">
                  <span className="text-white font-bold text-center text-xl">YouTube Embed<br/>16 by 9 ratio</span>
              </div>
            </aside>
          </div>
        </main>
        <Footer onNavigate={handleNavigate} />
      </>
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-[#001021] min-h-screen font-sans transition-colors duration-300">
      {renderContent()}
    </div>
  );
};

export default App;
