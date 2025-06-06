import { Routes, Route } from 'react-router-dom';

// Pages
import HomePage from '../pages/HomePage';
import UploadPage from '../pages/UploadPage';
import ResultsPage from '../pages/ResultsPage';
import HowItWorksPage from '../pages/HowItWorksPage';
import FeaturesPage from '../pages/FeaturesPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';
import ContactUsPage from '../pages/ContactUsPage';
import FAQPage from '../pages/FAQPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />
      <Route path="/contact" element={<ContactUsPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/results/:id" element={<ResultsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
