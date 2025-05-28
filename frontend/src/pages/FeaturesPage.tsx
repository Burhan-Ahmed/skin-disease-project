import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle, HeartPulse, Globe, Moon, Sun, Zap, Award, Lock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';

const featureList = [
  {
    Icon: ShieldCheck,
    title: 'Privacy-First Design',
    description: 'All images and data are encrypted end-to-end and never shared without consent.',
    color: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    delay: 0.1
  },
  {
    Icon: CheckCircle,
    title: 'High-Accuracy AI',
    description: 'Detects over 200 skin conditions with 95%+ accuracy, validated by dermatologists.',
    color: 'from-green-500 to-emerald-500',
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
    delay: 0.2
  },
  {
    Icon: HeartPulse,
    title: 'Instant Results',
    description: 'Get comprehensive analysis in under 5 seconds directly in your browser.',
    color: 'from-red-500 to-rose-500',
    iconBg: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400',
    delay: 0.3
  },
  {
    Icon: Globe,
    title: 'Device Agnostic',
    description: 'Works on any device—mobile, tablet or desktop—no installation needed.',
    color: 'from-purple-500 to-violet-500',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    delay: 0.4
  },
  {
    Icon: Sun,
    title: 'Light & Dark Mode',
    description: 'Toggle between light and dark themes for comfortable viewing any time of day.',
    color: 'from-yellow-500 to-amber-500',
    iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    delay: 0.5
  },
  {
    Icon: Moon,
    title: 'Offline Ready',
    description: 'Cache model in browser and analyse images even without active internet.',
    color: 'from-gray-700 to-gray-600',
    iconBg: 'bg-gray-100 dark:bg-gray-700/30',
    iconColor: 'text-gray-600 dark:text-gray-400',
    delay: 0.6
  },
  {
    Icon: Zap,
    title: 'Real-time Analysis',
    description: 'Process images in real-time with our optimized AI algorithms.',
    color: 'from-cyan-500 to-blue-500',
    iconBg: 'bg-cyan-100 dark:bg-cyan-900/30',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    delay: 0.7
  },
  {
    Icon: Award,
    title: 'Medical Validation',
    description: 'All results are reviewed by certified dermatologists.',
    color: 'from-orange-500 to-amber-500',
    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
    delay: 0.8
  },
  {
    Icon: Lock,
    title: 'HIPAA Compliant',
    description: 'Meets healthcare privacy standards for data security.',
    color: 'from-indigo-500 to-blue-500',
    iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    delay: 0.9
  }
];

const FeaturesPage: React.FC = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeIn('up', 'tween', 0.1, 1)}>
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Cutting-Edge Technology
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">AI Derma</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore the advanced capabilities that make our platform the most reliable solution for skin health analysis.
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div
          variants={staggerContainer(0.05, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featureList.map((feature, idx) => {
            const Icon = feature.Icon;
            return (
              <motion.div
                key={idx}
                variants={fadeIn('up', 'tween', feature.delay, 1)}
                className="group"
              >
                <div className="h-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group-hover:border-transparent relative overflow-hidden">
                  {/* Gradient top border */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feature.color}`}></div>
                  
                  {/* Icon - Centered and Fixed */}
                  <div className={`${feature.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 mx-auto`}>
                    <Icon className={`h-10 w-10 ${feature.iconColor}`} strokeWidth={1.5} />
                  </div>
                  
                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <span className="mr-2">{feature.title}</span>
                    {idx === 1 && (
                      <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                        Most Accurate
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {feature.description}
                  </p>
                  
                  {/* Learn More */}
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    <span className="mr-2">Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 max-w-4xl mx-auto border border-blue-200 dark:border-blue-900/30">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to experience these features?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of users who have already discovered the power of AI Derma Checker.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/upload" 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Upload Your First Image
              </Link>
              <Link 
                to="/how-it-works" 
                className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium py-3 px-6 rounded-full border border-blue-200 dark:border-blue-900/30 shadow-sm hover:shadow-md transition-all duration-300"
              >
                See How It Works
              </Link>
            </div>
          </div>
          
          <div className="mt-12">
            <Link 
              to="/" 
              className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesPage;