'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: "Sophia Chen",
    role: "Skincare Enthusiast",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "GlowAnalysis completely transformed my skincare routine. The personalized recommendations addressed issues I didn't even know I had!",
    rating: 5
  },
  {
    name: "Michael Torres",
    role: "Fitness Trainer",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "As someone who never had a skincare routine, this made it incredibly easy to start. The recommendations were perfect for my active lifestyle.",
    rating: 5
  },
  {
    name: "Emma Johnson",
    role: "Marketing Director",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "I've tried dozens of skincare products before finding GlowAnalysis. Now I have a routine that actually works for my combination skin.",
    rating: 4
  }
];

export default function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-20 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thousands of users have already transformed their skin with our personalized recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex space-x-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mb-6 text-card-foreground">{testimonial.content}</p>
                  <div className="flex items-center">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}