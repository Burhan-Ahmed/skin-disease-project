import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import HeroSection from '@/components/landing/hero-section';
import FeatureSection from '@/components/landing/feature-section';
import TestimonialSection from '@/components/landing/testimonial-section';
import FooterSection from '@/components/landing/footer-section';
import Navbar from '@/components/layout/navbar';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <HeroSection />
      
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A simple, straightforward process to get your personalized skincare recommendations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="font-bold text-primary text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Your Photo</h3>
              <p className="text-muted-foreground mb-4">Upload a clear photo of your face for our advanced analysis.</p>
            </div>
            
            <div className="bg-background rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="font-bold text-primary text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-muted-foreground mb-4">Our advanced AI analyzes your skin type, concerns, and needs.</p>
            </div>
            
            <div className="bg-background rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="font-bold text-primary text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Plan</h3>
              <p className="text-muted-foreground mb-4">Receive your customized skincare routine and recommendations.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/login">
              <Button size="lg" className="rounded-full">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <FeatureSection />
      <TestimonialSection />
      <FooterSection />
    </main>
  );
}