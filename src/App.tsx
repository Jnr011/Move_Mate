// src/App.tsx
import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import HowItWorksSection from './components/HowItWorksSection';
import FeaturesSection from './components/FeaturesSection';
import DownloadSection from './components/DownloadSection';
import Footer from './components/Footer';
import AppShowcaseSection from './components/AppShowcaseSection';
import AdminApp from './admin/AdminApp';
import { AuthProvider } from './admin/context/AuthContext';
import AdminLoginPage from './admin/components/AdminLoginPage';
import ForgotPasswordPage from './admin/components/ForgotPasswordPage';
import SecurityQuestionPage from './admin/components/SecurityQuestionPage';
import ResetPasswordPage from './admin/components/ResetPasswordPage';

// Landing Page Component
const LandingPage = () => {
  useEffect(() => {
    // Set up smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="font-sans text-gray-800">
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <HowItWorksSection />
        <FeaturesSection />
        <AppShowcaseSection />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
};

// Main App Component with Routes
const App = () => {
  const location = useLocation();
  
  // Remove smooth scrolling event listeners when navigating to admin routes
  useEffect(() => {
    if (location.pathname.startsWith('/admin')) {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      {/* Authentication Routes */}
      <Route path="/admin-login" element={
        <AuthProvider>
          <AdminLoginPage />
        </AuthProvider>
      } />
      <Route path="/admin-forgot-password" element={
        <AuthProvider>
          <ForgotPasswordPage />
        </AuthProvider>
      } />
      <Route path="/admin-reset-security" element={
        <AuthProvider>
          <SecurityQuestionPage />
        </AuthProvider>
      } />
      <Route path="/admin-reset-password" element={
        <AuthProvider>
          <ResetPasswordPage />
        </AuthProvider>
      } />
      
      {/* Admin Dashboard Routes */}
      <Route path="/admin/*" element={<AdminApp />} />
      
      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;