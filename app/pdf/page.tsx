'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  FileText, 
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { useToast } from '@/hooks/use-toast';

export default function PDFPage() {
  const [sending, setSending] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleDownload = () => {
    // In a real app, this would generate and download the PDF
    toast({
      title: 'PDF Downloaded',
      description: 'Your skincare analysis has been downloaded.',
    });
  };

  const handleSendEmail = () => {
    setSending(true);
    
    // Simulate sending an email
    setTimeout(() => {
      toast({
        title: 'Email Sent',
        description: 'Your skincare analysis has been sent to your email.',
      });
      setSending(false);
    }, 1500);
  };

  const skinConcerns = [
    { name: 'Dryness', severity: 'Moderate', recommendations: 'Hydrating serums with hyaluronic acid, ceramide-based moisturizers' },
    { name: 'Uneven Tone', severity: 'Mild', recommendations: 'Vitamin C serum, gentle chemical exfoliants with AHAs' },
    { name: 'Fine Lines', severity: 'Minimal', recommendations: 'Retinol products, peptide-based moisturizers' },
  ];

  const recommendedProducts = [
    { 
      name: 'Hydro Boost Cleanser', 
      description: 'Gentle gel cleanser with hyaluronic acid',
      category: 'Cleanser',
      image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    { 
      name: 'Vitamin C Brightening Serum', 
      description: '15% stabilized vitamin C to brighten and even skin tone',
      category: 'Serum',
      image: 'https://images.pexels.com/photos/4465815/pexels-photo-4465815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    { 
      name: 'Ceramide Repair Cream', 
      description: 'Rich moisturizer with ceramides and peptides',
      category: 'Moisturizer',
      image: 'https://images.pexels.com/photos/5257519/pexels-photo-5257519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Personalized Skincare Analysis</h1>
          <p className="text-muted-foreground">
            Based on your uploaded photo, we've analyzed your skin and created personalized recommendations.
          </p>
        </div>

        <div className="bg-primary/10 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">Analysis Complete</h2>
              <p className="text-muted-foreground">
                Your skin analysis is ready. View your results below or download the complete PDF.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="concerns">Skin Concerns</TabsTrigger>
                <TabsTrigger value="routine">Recommended Routine</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Skin Analysis Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-2">Skin Type</h3>
                          <div className="bg-secondary p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <span className="font-medium">Combination</span>
                              <div className="ml-auto bg-primary/20 text-primary text-xs font-semibold px-2 py-1 rounded-full">
                                Detected
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Your skin shows characteristics of both dry and oily skin in different areas.
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold mb-2">Moisture Level</h3>
                          <div className="bg-secondary p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <span className="font-medium">Moderate</span>
                              <div className="ml-auto bg-yellow-500/20 text-yellow-600 dark:text-yellow-500 text-xs font-semibold px-2 py-1 rounded-full">
                                65%
                              </div>
                            </div>
                            <div className="w-full bg-background rounded-full h-2.5">
                              <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">Key Recommendations</h3>
                        <ul className="space-y-2">
                          <li className="bg-secondary p-3 rounded-lg text-sm flex items-start">
                            <Info className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span>Focus on hydrating dry areas while balancing oil production in the T-zone</span>
                          </li>
                          <li className="bg-secondary p-3 rounded-lg text-sm flex items-start">
                            <Info className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span>Incorporate gentle chemical exfoliation 2-3 times weekly</span>
                          </li>
                          <li className="bg-secondary p-3 rounded-lg text-sm flex items-start">
                            <Info className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span>Use a vitamin C serum in the morning for brightening and protection</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="concerns" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Detected Skin Concerns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {skinConcerns.map((concern, index) => (
                        <div key={index} className="border border-border rounded-lg overflow-hidden">
                          <div className="bg-muted px-4 py-3 border-b border-border">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{concern.name}</h3>
                              <div className={`
                                text-xs font-semibold px-2 py-1 rounded-full
                                ${concern.severity === 'Moderate' 
                                  ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-500' 
                                  : 'bg-green-500/20 text-green-600 dark:text-green-500'}
                              `}>
                                {concern.severity}
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="mb-2">
                              <span className="text-sm font-medium">Recommended Ingredients:</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {concern.recommendations}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="routine" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Personalized Skincare Routine</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3">Morning Routine</h3>
                        <ol className="space-y-3">
                          <li className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-primary text-xs font-medium">1</span>
                            </div>
                            <div>
                              <p className="font-medium">Gentle Cleanser</p>
                              <p className="text-sm text-muted-foreground">Clean with a gentle, hydrating cleanser</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-primary text-xs font-medium">2</span>
                            </div>
                            <div>
                              <p className="font-medium">Vitamin C Serum</p>
                              <p className="text-sm text-muted-foreground">Apply to entire face for brightening and antioxidant protection</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-primary text-xs font-medium">3</span>
                            </div>
                            <div>
                              <p className="font-medium">Lightweight Moisturizer</p>
                              <p className="text-sm text-muted-foreground">Hydrate with a non-comedogenic moisturizer</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-primary text-xs font-medium">4</span>
                            </div>
                            <div>
                              <p className="font-medium">Sunscreen (SPF 30+)</p>
                              <p className="text-sm text-muted-foreground">Finish with broad-spectrum protection</p>
                            </div>
                          </li>
                        </ol>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-3">Evening Routine</h3>
                        <ol className="space-y-3">
                          <li className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-primary text-xs font-medium">1</span>
                            </div>
                            <div>
                              <p className="font-medium">Double Cleanse</p>
                              <p className="text-sm text-muted-foreground">Oil-based cleanser followed by gentle water-based cleanser</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-primary text-xs font-medium">2</span>
                            </div>
                            <div>
                              <p className="font-medium">Chemical Exfoliant (2-3x weekly)</p>
                              <p className="text-sm text-muted-foreground">Gentle AHA/BHA treatment to remove dead skin cells</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-primary text-xs font-medium">3</span>
                            </div>
                            <div>
                              <p className="font-medium">Hydrating Serum</p>
                              <p className="text-sm text-muted-foreground">Apply hyaluronic acid or similar hydrating ingredients</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-primary text-xs font-medium">4</span>
                            </div>
                            <div>
                              <p className="font-medium">Rich Moisturizer</p>
                              <p className="text-sm text-muted-foreground">Lock in moisture with a ceramide-rich cream</p>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Your Analysis PDF</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-[3/4] relative bg-muted/50 rounded-md overflow-hidden border border-border">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="font-medium">Personalized Skincare Analysis</p>
                    <p className="text-xs text-muted-foreground mt-1">Complete report with detailed recommendations</p>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleDownload}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  disabled={sending}
                  onClick={handleSendEmail}
                >
                  {sending ? 'Sending...' : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Email to Me
                    </>
                  )}
                </Button>
                
                <div className="bg-secondary/50 rounded-lg p-3 mt-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    This analysis is for informational purposes only and is not a substitute for professional dermatological advice.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Recommended Products</h3>
              <div className="space-y-3">
                {recommendedProducts.map((product, index) => (
                  <div key={index} className="bg-card rounded-lg overflow-hidden shadow-sm flex">
                    <div className="w-24 h-24 relative flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs text-muted-foreground">{product.category}</span>
                          <h4 className="font-medium line-clamp-1">{product.name}</h4>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-secondary/30 rounded-lg p-6 text-center">
          <h3 className="font-semibold mb-2">Need More Help?</h3>
          <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
            If you'd like more personalized assistance or have questions about your skincare recommendations,
            our experts are ready to help you achieve your best skin.
          </p>
          <Button>
            Talk to a Skincare Expert <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}