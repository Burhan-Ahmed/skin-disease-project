import { Camera, CreditCard, FileText } from 'lucide-react';

export const dashboardSteps = [
  {
    id: 1,
    title: 'Upload Your Photo',
    description: 'Take or upload a clear photo of your face',
    content: 'Our advanced AI needs a clear, well-lit photo of your face. Front-facing photos work best.',
    buttonText: 'Upload Photo',
    path: '/upload',
    icon: <Camera className="h-6 w-6 text-primary" />
  },
  {
    id: 2,
    title: 'Complete Payment',
    description: 'Pay for your personalized analysis',
    content: 'Secure payment for your personalized skincare analysis and recommendations.',
    buttonText: 'Continue to Payment',
    path: '/payment',
    icon: <CreditCard className="h-6 w-6 text-primary" />
  },
  {
    id: 3,
    title: 'Get Your Results',
    description: 'View and download your personalized plan',
    content: 'Receive your customized skincare routine and product recommendations based on your skin analysis.',
    buttonText: 'View Results',
    path: '/pdf',
    icon: <FileText className="h-6 w-6 text-primary" />
  }
];