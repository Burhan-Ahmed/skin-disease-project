'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Camera, FileText, CreditCard, LogOut } from 'lucide-react';
import { dashboardSteps } from '@/lib/data';
import ProgressStepper from '@/components/dashboard/progress-stepper';
import DashboardLayout from '@/components/layout/dashboard-layout';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const handleStart = () => {
    router.push('/upload');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {session.user?.name || 'User'}</h1>
          <p className="text-muted-foreground">
            Ready to start your personalized skincare journey? Follow the steps below.
          </p>
        </div>

        <div className="mb-10">
          <ProgressStepper currentStep={currentStep} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {dashboardSteps.map((step) => (
            <Card 
              key={step.id}
              className={`shadow-sm hover:shadow-md transition-shadow ${
                step.id === currentStep ? 'ring-2 ring-primary/50' : ''
              }`}
            >
              <CardHeader>
                <div className="mb-2 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  {step.icon}
                </div>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{step.content}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  disabled={step.id !== currentStep}
                  onClick={() => router.push(step.path)}
                >
                  {step.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Start Your Skin Analysis</h2>
            <p className="text-muted-foreground mb-6">
              Upload a photo of your face to receive personalized skincare recommendations 
              and a complete routine tailored to your unique needs.
            </p>
            <Button size="lg" onClick={handleStart}>
              Start Analysis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}