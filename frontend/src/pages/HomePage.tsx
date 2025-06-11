import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import { Check, ShieldCheck, Award, Upload, HeartPulse, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from "../utils/motion"
import acneImg from '../assets/shutterstock_2426911973.jpg';
import eczemaImg from '../assets/eczema.png';
import psoriasisImg from '../assets/who-gets-psoriasis-large-plaque-on-elbow.jpg';


const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
      title: 'Privacy-First Approach',
      description:
        'Your data is encrypted and never shared with third parties. We prioritize your privacy and security.',
    },
    {
      icon: <Check className="h-8 w-8 text-blue-600" />,
      title: 'Advanced AI Technology',
      description:
        'Our cutting-edge AI can detect over 200 skin conditions with 95% accuracy compared to dermatologists.',
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: 'Medically Validated',
      description:
        'All results are validated against medical databases and reviewed by dermatologists.',
    },
  ];

  const steps = [
    {
      number: 1,
      icon: <Upload className="h-6 w-6" />,
      title: 'Upload a Photo',
      description: 'Take a clear photo of your skin concern using your smartphone or camera.',
    },
    {
      number: 2,
      icon: <Bot className="h-6 w-6" />,
      title: 'AI Analysis',
      description: 'Our AI analyzes your image using advanced algorithms trained on medical data.',
    },
    {
      number: 3,
      icon: <HeartPulse className="h-6 w-6" />,
      title: 'Get Results',
      description: 'Receive a detailed analysis with potential conditions and recommended next steps.',
    },
  ];

  // Add this at the top or fetch from an API in the future
  const diseases = [
    {
      name: "Acne",
      description: "A common skin condition causing pimples, blackheads, and whiteheads.",
      image: acneImg,
    },
    {
      name: "Eczema",
      description: "An inflammatory skin condition causing red, itchy, and dry skin.",
      image: eczemaImg,
    },
    {
      name: "Psoriasis",
      description: "A chronic autoimmune condition that causes the rapid build-up of skin cells.",
      image: psoriasisImg,
    },
  ];

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-cyan-500 dark:from-blue-900 dark:to-cyan-800 text-white py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920')] opacity-10 bg-cover bg-center" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:flex lg:items-center lg:justify-between"
          >
            <motion.div variants={fadeIn('right', 'tween', 0.2, 1)} className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                AI-Powered <span className="text-blue-100">Skin Health</span> Analysis
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90 max-w-lg">
                Get instant, confidential analysis of skin concerns with our medically-validated AI technology.
                Early detection made simple and accessible.
              </p>
              <div className="flex flex-wrap gap-4">
                {isAuthenticated ? (
                  <Link to="/upload">
                    <Button variant="primary" size="lg" className="shadow-lg">
                      <Upload className="mr-2 h-5 w-5" />
                      Upload Image
                    </Button>
                  </Link>
                ) : (
                  <Link to="/register">
                    <Button variant="primary" size="lg" className="shadow-lg">
                      Get Started
                    </Button>
                  </Link>
                )}
                <Link to="/how-it-works">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 shadow-lg"
                  >
                    How It Works
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              variants={fadeIn('left', 'tween', 0.2, 1)}
              className="mt-12 lg:mt-0 lg:w-1/2 flex justify-center"
            >
              <div className="relative w-full max-w-lg">
                <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D4D12AQGXtmcSl-7dSA/article-cover_image-shrink_720_1280/B4DZUbUIiLGcAQ-/0/1739920018596?e=2147483647&v=beta&t=N-IrQ_8JDJXXAItowJgAUZZnq890Q_v4cYdNyzlqcFA"
                    alt="AI Skin Analysis Demo"
                    className="object-cover w-full h-auto transition-all duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <div className="flex items-center">
                      <div className="bg-blue-500 rounded-full p-2 mr-3">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Analysis Complete</p>
                        <p className="text-blue-100 text-sm">92% confidence level</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Skin Health Insights
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform combines medical expertise with cutting-edge AI to provide you with reliable skin health analysis.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2"
              >
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {diseases.map((disease, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-xl p-6 shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1"
            >
              <img
                src={disease.image}
                alt={`${disease.name} image`}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {disease.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {disease.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>



      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 to-cyan-500 dark:from-blue-900 dark:to-cyan-800 text-white text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920')] bg-cover bg-center" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to take control of your skin health?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join thousands of users who have already benefited from our AI-powered skin analysis.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={isAuthenticated ? '/upload' : '/register'}>
                <Button variant="primary" size="lg" className="shadow-lg">
                  {isAuthenticated ? 'Upload Image Now' : 'Get Started'}
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
            <div className="mt-8 flex items-center justify-center space-x-2 text-sm opacity-80">
              <ShieldCheck className="h-4 w-4" />
              <span>HIPAA compliant • Encrypted data • No credit card required</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;