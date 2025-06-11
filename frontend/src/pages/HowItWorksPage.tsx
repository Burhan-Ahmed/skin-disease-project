import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import { Brain, Shield, Upload, Zap, Check, AlertTriangle, Camera, Lightbulb, Ruler, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';

const HowItWorksPage = () => {
  const { isAuthenticated } = useAuth();

  const steps = [
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Upload Your Photo",
      description: "Take a clear photo of your skin condition using your smartphone or upload an existing image to our secure platform."
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Analysis",
      description: "Our advanced machine learning algorithms analyze your image by comparing it to millions of medical images in our database."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Get Results",
      description: "Receive a detailed analysis with potential skin conditions, severity assessment, and recommended next steps."
    }
  ];

  const guidelines = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Good Lighting",
      description: "Take photos in well-lit conditions, preferably with natural daylight. Avoid harsh shadows or very bright direct light.",
      image: "https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Focus Clearly",
      description: "Ensure your camera is focused on the skin condition. Tap on the affected area when using a smartphone camera.",
      image: "https://images.pexels.com/photos/4226901/pexels-photo-4226901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Multiple Angles",
      description: "For complex conditions, consider taking photos from different angles to provide more comprehensive information.",
      image: "https://images.pexels.com/photos/5699514/pexels-photo-5699514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      icon: <Ruler className="h-6 w-6" />,
      title: "Size Reference",
      description: "Include a common object (like a coin) next to the condition to provide scale, which can be important for diagnosis.",
      image: "https://images.pexels.com/photos/5699458/pexels-photo-5699458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const securityFeatures = [
    {
      icon: <Lock className="h-5 w-5" />,
      title: "End-to-end encryption",
      description: "All uploaded images and personal data are securely encrypted"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "HIPAA-compliant",
      description: "Data handling and storage meet medical privacy standards"
    },
    {
      icon: <Check className="h-5 w-5" />,
      title: "No data sharing",
      description: "We never share your data with third parties without consent"
    },
    {
      icon: <Check className="h-5 w-5" />,
      title: "Data deletion",
      description: "Option to delete your data permanently at any time"
    }
  ];

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <motion.div variants={fadeIn('up', 'tween', 0.1, 1)}>
              <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                How It Works
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Understanding Our <span className="text-blue-600">AI-Powered</span> Process
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our advanced AI system analyzes your skin photos to identify potential skin conditions with dermatologist-level accuracy.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Simple 3-Step Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get accurate skin analysis in minutes, not days
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform -translate-y-1/2 z-0" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn('up', 'tween', index * 0.1, 1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 hover:shadow-md transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    {step.icon}
                  </div>
                  <div className="flex justify-center mb-4">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link to={isAuthenticated ? "/upload" : "/register"}>
              <Button variant="primary" size="lg" className="shadow-lg">
                {isAuthenticated ? "Upload Your Image" : "Get Started Now"}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* AI Technology Section */}
      <section className="mb-24 bg-white dark:bg-gray-800 py-16 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-12 md:mb-0 md:pr-12"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Advanced AI Technology</h2>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                AI Derma Checker uses state-of-the-art deep learning models trained on millions of dermatologist-labeled images to identify over 200 skin conditions with remarkable accuracy.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="bg-white dark:bg-gray-700 rounded-full p-2 mr-4">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Dermatologist-Level Accuracy</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Validated to perform at board-certified dermatologist accuracy for common skin conditions.
                    </p>
                  </div>
                </li>

                <li className="flex items-start bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="bg-white dark:bg-gray-700 rounded-full p-2 mr-4">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Continuous Learning</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      The system constantly improves through ongoing training with new dermatologist-validated cases.
                    </p>
                  </div>
                </li>

                <li className="flex items-start bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="bg-white dark:bg-gray-700 rounded-full p-2 mr-4">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Medical Expertise</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Developed in collaboration with board-certified dermatologists to ensure medical accuracy.
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Guidelines Section */}
      <section className="mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Best Practices
            </span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Taking Effective Skin Photos
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Follow these guidelines to ensure our AI can provide the most accurate analysis
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guidelines.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 'tween', index * 0.1, 1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                    {item.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Security Section */}
      <section className="mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-12 md:mb-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                <img
                  src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Data Security Visualization"
                  className="w-full h-auto object-cover"
                />
                <div className="bg-gradient-to-t from-black to-transparent p-6 text-white absolute bottom-0 left-0 right-0">
                  <div className="max-w-md">
                    <h3 className="font-bold text-xl mb-2">Military-Grade Encryption</h3>
                    <p className="opacity-90">Your data is protected with AES-256 encryption</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2 md:pl-12"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Privacy & Security</h2>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                We take your privacy seriously. All images and personal information are encrypted and handled according to the highest security standards.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="bg-white dark:bg-gray-700 rounded-full p-2 mr-3">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                View Privacy Policy
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="mb-16 bg-yellow-50 dark:bg-yellow-900/20 py-8 border-t border-b border-yellow-100 dark:border-yellow-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-start"
          >
            <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-3 mr-4 flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Important Disclaimer</h3>
              <p className="text-gray-700 dark:text-gray-300">
                AI Derma Checker is designed to provide preliminary information and should not replace professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for proper evaluation of any skin condition.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-900 dark:to-cyan-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to try AI Derma Checker?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join thousands of users who have already benefited from our AI-powered skin analysis.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={isAuthenticated ? "/upload" : "/register"}>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 border-0 shadow-lg"
                >
                  {isAuthenticated ? "Upload Image Now" : "Create Free Account"}
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 shadow-lg"
                >
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-sm opacity-80">
              <Shield className="h-4 w-4" />
              <span>HIPAA compliant • Encrypted data • Privacy first</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;