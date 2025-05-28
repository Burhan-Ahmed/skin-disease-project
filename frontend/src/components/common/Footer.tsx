import { Link } from 'react-router-dom';
import { Heart, Shield, Lock, MessageSquare, ArrowUp, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';

// Define type for social media keys
type SocialPlatform = 'facebook' | 'twitter' | 'instagram' | 'linkedin';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Social media icons mapping with type safety
  const socialIcons: Record<SocialPlatform, JSX.Element> = {
    facebook: <Facebook className="h-5 w-5 text-current" />,
    twitter: <Twitter className="h-5 w-5 text-current" />,
    instagram: <Instagram className="h-5 w-5 text-current" />,
    linkedin: <Linkedin className="h-5 w-5 text-current" />
  };

  const socialPlatforms: SocialPlatform[] = ['facebook', 'twitter', 'instagram', 'linkedin'];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* Back to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-105"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-10 h-10 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                AI Derma<span className="text-blue-600">Checker</span>
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-xs">
              Advanced AI technology for skin health analysis. Get instant, confidential insights about your skin concerns.
            </p>
            <div className="flex space-x-4">
              {socialPlatforms.map((platform) => (
                <a 
                  key={platform}
                  href="#" 
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
                  aria-label={`Follow us on ${platform}`}
                >
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    {socialIcons[platform]}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Navigation</h3>
            <ul className="space-y-3">
              {[
                { path: '/', label: 'Home' },
                { path: '/how-it-works', label: 'How It Works' },
                { path: '/features', label: 'Features' },
                { path: '/upload', label: 'Upload Image' }
              ].map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 flex items-start"
                  >
                    <span className="mr-2">→</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Support & Legal</h3>
            <ul className="space-y-3">
              {[
                { path: '/privacy', label: 'Privacy Policy', icon: <Lock className="h-4 w-4 mr-2" /> },
                { path: '/terms', label: 'Terms of Service', icon: <Shield className="h-4 w-4 mr-2" /> },
                { path: '/contact', label: 'Contact Us', icon: <MessageSquare className="h-4 w-4 mr-2" /> },
                { path: '/faq', label: 'FAQs', icon: <span className="mr-2">❓</span> }
              ].map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 flex items-center"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Stay Updated</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates and health tips.
            </p>
            <form className="space-y-3">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:order-2 space-x-6">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Heart className="h-4 w-4 mr-1 text-red-500 fill-current" />
                <span>Made with care</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Shield className="h-4 w-4 mr-1 text-blue-500" />
                <span>HIPAA Compliant</span>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0 md:order-1">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                &copy; {currentYear} AI Derma Checker. All rights reserved.
              </p>
              <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                AI Derma Checker provides informational analysis only and is not a substitute for professional medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;