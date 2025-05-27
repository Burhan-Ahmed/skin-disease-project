'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Shield, Clock, Leaf } from 'lucide-react';

export default function FeatureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features = [
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "Advanced AI Analysis",
      description: "Cutting-edge technology that analyzes over 20 skin attributes to deliver personalized recommendations."
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Privacy Protected",
      description: "Your images and data are securely processed and never shared with third parties."
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Quick Results",
      description: "Get your personalized skincare routine in minutes, not days."
    },
    {
      icon: <Leaf className="h-10 w-10 text-primary" />,
      title: "Clean Ingredients",
      description: "All recommended products feature clean, effective ingredients for healthy skin."
    }
  ];

  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose GlowAnalysis</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the future of skincare with our cutting-edge technology and personalized approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-card hover:bg-card/80 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}