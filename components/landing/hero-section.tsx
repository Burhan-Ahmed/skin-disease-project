'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/30 pt-20 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <motion.div 
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Your Skin,</span> Analyzed & Transformed
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto md:mx-0">
              Experience AI-powered skin analysis that provides personalized skincare recommendations tailored to your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/login">
                <Button size="lg" className="rounded-full px-8">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="rounded-full px-8">
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 relative mt-8 md:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={loaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative h-[400px] md:h-[500px] w-full max-w-[500px] mx-auto">
              <Image
                src="https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Woman with healthy glowing skin"
                fill
                className="object-cover rounded-2xl shadow-xl"
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />
              
              <div className="absolute -bottom-5 -right-5 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">AI Analysis Complete</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}