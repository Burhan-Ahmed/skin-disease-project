import { Link } from 'react-router-dom';
import { FileText, Shield } from 'lucide-react';

const TermsOfServicePage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full p-3 mb-4">
          <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Terms of Service
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Effective date: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 mb-8">
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Welcome to AI Derma Checker. By accessing or using our service, you agree to be bound by these Terms of Service.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              By using AI Derma Checker, you agree to these Terms of Service and our Privacy Policy. 
              If you do not agree to these terms, you may not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              Service Description
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              AI Derma Checker provides an AI-powered skin analysis service that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Analyzes skin images for potential conditions</li>
              <li>Provides informational analysis only</li>
              <li>Does not provide medical diagnosis</li>
              <li>Is not a substitute for professional medical advice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              User Responsibilities
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              When using our service, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Provide accurate and complete information</li>
              <li>Only upload images you have the right to share</li>
              <li>Not use the service for illegal purposes</li>
              <li>Not attempt to reverse-engineer our technology</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Medical Disclaimer
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 p-4 mb-4">
              <p className="text-yellow-700 dark:text-yellow-300">
                AI Derma Checker provides informational analysis only and is not a substitute for professional medical advice, 
                diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions you may 
                have regarding a medical condition.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Intellectual Property
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              All content and technology on our platform is owned by AI Derma Checker or its licensors. 
              You are granted a limited, non-exclusive license to access and use the service for personal, 
              non-commercial purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              To the maximum extent permitted by law, AI Derma Checker shall not be liable for any indirect, 
              incidental, special, consequential or punitive damages, or any loss of profits or revenues, 
              whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We reserve the right to modify these terms at any time. We will notify you of significant changes through our 
              service or by email. Your continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>
        </div>
      </div>

      <div className="text-center">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default TermsOfServicePage;