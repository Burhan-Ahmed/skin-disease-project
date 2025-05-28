import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQPage = () => {
  const faqs = [
    {
      question: "How does AI Derma Checker work?",
      answer: "Our AI analyzes skin images using advanced deep learning algorithms trained on millions of dermatologist-verified cases. Simply upload a clear photo of your skin concern, and our system will provide an analysis in seconds."
    },
    {
      question: "Is my data private and secure?",
      answer: "Absolutely. We use end-to-end encryption for all images and health data. Your information is never shared with third parties without your explicit consent. We comply with HIPAA regulations to ensure maximum privacy protection."
    },
    {
      question: "How accurate are the results?",
      answer: "Our AI achieves 95%+ accuracy for common skin conditions, validated against board-certified dermatologists. However, please note this is an informational tool and not a substitute for professional medical diagnosis."
    },
    {
      question: "What skin conditions can you detect?",
      answer: "Our system can identify over 200 skin conditions including acne, eczema, psoriasis, rosacea, melanoma, and many others. The accuracy varies by condition, and we continuously improve our detection capabilities."
    },
    {
      question: "Do I need to create an account to use the service?",
      answer: "You can try a basic analysis without an account, but creating a free account gives you access to full reports, history tracking, personalized recommendations, and comparison tools."
    },
    {
      question: "Can I use this for children?",
      answer: "Yes, our service is suitable for all ages. However, for children under 13, a parent or guardian must create and manage the account. Pediatric skin conditions are included in our detection capabilities."
    },
    {
      question: "How much does it cost?",
      answer: "We offer a free tier with limited analysis. Premium plans start at $9.99/month for unlimited analysis, detailed reports, and dermatologist-reviewed insights. We also offer family and annual plans."
    },
    {
      question: "What if I get a concerning result?",
      answer: "We recommend consulting a healthcare professional for any concerning results. Our reports include guidance on next steps and you can easily share results with your doctor through our secure sharing feature."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full p-3 mb-4">
          <HelpCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Find answers to common questions about our service
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 mb-8">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left py-4 focus:outline-none"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <span className="ml-4 text-blue-600 dark:text-blue-400">
                  {openIndex === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="mt-2 pb-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
          Still have questions?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Our support team is ready to help you
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/contact" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Contact Support
          </Link>
          <Link 
            to="/how-it-works" 
            className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium py-3 px-6 rounded-lg border border-blue-200 dark:border-blue-900/30 hover:shadow-md transition-all duration-300"
          >
            How It Works
          </Link>
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

export default FAQPage;