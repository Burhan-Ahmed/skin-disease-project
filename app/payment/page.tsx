'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowRight, Check, CreditCard, Shield } from 'lucide-react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { useToast } from '@/hooks/use-toast';

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const router = useRouter();
  const { toast } = useToast();

  const plans = [
    {
      id: 'basic',
      name: 'Basic Analysis',
      price: '$9.99',
      features: [
        'Skin type analysis',
        'Basic product recommendations',
        'PDF report',
        'Email delivery',
      ],
    },
    {
      id: 'premium',
      name: 'Premium Analysis',
      price: '$19.99',
      features: [
        'Advanced skin analysis',
        'Personalized skincare routine',
        'Product recommendations with alternatives',
        'Follow-up consultation',
        'PDF report with detailed explanations',
        'Email delivery',
      ],
      popular: true,
    },
    {
      id: 'pro',
      name: 'Professional Analysis',
      price: '$39.99',
      features: [
        'Complete skin analysis with historical tracking',
        'Custom skincare routine with seasonal adjustments',
        'Premium product recommendations',
        'Two follow-up consultations',
        'Interactive PDF report',
        'Priority email support',
      ],
    },
  ];

  const handleContinue = async () => {
    setLoading(true);
    
    // Simulate processing payment
    // In a real app, this would integrate with Stripe
    setTimeout(() => {
      toast({
        title: 'Payment successful',
        description: 'Your payment has been processed successfully.',
      });
      setLoading(false);
      router.push('/pdf');
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Payment</h1>
          <p className="text-muted-foreground">
            Choose a plan and complete payment to receive your personalized skincare analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Select a Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={selectedPlan}
                  onValueChange={setSelectedPlan}
                  className="space-y-4"
                >
                  {plans.map((plan) => (
                    <div 
                      key={plan.id}
                      className={`
                        relative flex items-start p-4 rounded-lg border-2 transition-all
                        ${selectedPlan === plan.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
                        ${plan.popular ? 'ring-1 ring-accent' : ''}
                      `}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 right-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                          Popular
                        </div>
                      )}
                      
                      <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                      
                      <Label htmlFor={plan.id} className="flex flex-col ml-4 cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold">{plan.name}</span>
                          <span className="font-bold text-xl ml-2">{plan.price}</span>
                        </div>
                        <ul className="space-y-1">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center">
                              <Check className="h-4 w-4 text-primary mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="shadow-sm sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-medium">
                    {plans.find(plan => plan.id === selectedPlan)?.name}
                  </span>
                </div>
                
                <div className="flex justify-between border-b border-border pb-4">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium">
                    {plans.find(plan => plan.id === selectedPlan)?.price}
                  </span>
                </div>
                
                <div className="flex justify-between pt-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">
                    {plans.find(plan => plan.id === selectedPlan)?.price}
                  </span>
                </div>
                
                <div className="bg-secondary/50 rounded-lg p-3 mt-4 flex items-start">
                  <Shield className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Your payment is secure and encrypted. We never store your complete credit card details.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleContinue}
                  disabled={loading}
                >
                  {loading ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CreditCard className="h-6 w-6 text-primary mr-3" />
            <h3 className="text-lg font-semibold">Payment Information</h3>
          </div>
          
          <div className="space-y-2 text-muted-foreground text-sm">
            <p>• For demonstration purposes, no actual payment will be processed.</p>
            <p>• In a production environment, this would integrate with Stripe for secure payments.</p>
            <p>• All plans include a personalized analysis of your uploaded photo.</p>
            <p>• Results are typically delivered within minutes of payment completion.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}