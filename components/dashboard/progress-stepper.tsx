'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface ProgressStepperProps {
  currentStep: number;
}

export default function ProgressStepper({ currentStep }: ProgressStepperProps) {
  const pathname = usePathname();
  const [animatedStep, setAnimatedStep] = useState(0);

  const steps = [
    { title: 'Start', path: '/dashboard' },
    { title: 'Upload Photo', path: '/upload' },
    { title: 'Payment', path: '/payment' },
    { title: 'Results', path: '/pdf' },
  ];

  // Determine current step based on pathname
  useEffect(() => {
    const stepIndex = steps.findIndex(step => step.path === pathname);
    const newStep = stepIndex !== -1 ? stepIndex + 1 : currentStep;
    
    // Animate the progress
    setAnimatedStep(0);
    const timer = setTimeout(() => {
      setAnimatedStep(newStep);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [pathname, currentStep, steps]);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;
          
          return (
            <div 
              key={index} 
              className={cn(
                "text-sm font-medium text-center transition-colors progress-step",
                isActive && "active",
                isCompleted && "completed"
              )}
            >
              <div className="mb-2">{step.title}</div>
            </div>
          );
        })}
      </div>
      
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-in-out"
          style={{ width: `${(animatedStep - 1) / (steps.length - 1) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}