import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { AlertTriangle, Check, Info, Download, Share2 } from 'lucide-react';

// Mock result data (in a real app, this would come from your API)
const mockResult = {
  image: 'https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  predictions: [
    {
      condition: 'Atopic Dermatitis',
      confidence: 0.87,
      severity: 'Moderate',
      description: 'Atopic dermatitis is a chronic, inflammatory skin condition characterized by dry, itchy skin and rash-like symptoms.',
      commonTreatments: [
        'Topical corticosteroids',
        'Moisturizers',
        'Antihistamines for itching',
        'Avoiding triggers'
      ]
    },
    {
      condition: 'Contact Dermatitis',
      confidence: 0.09,
      severity: 'Mild',
      description: 'Contact dermatitis is a red, itchy rash caused by direct contact with a substance or an allergic reaction to it.',
      commonTreatments: [
        'Identifying and avoiding the trigger',
        'Topical corticosteroids',
        'Cool compresses'
      ]
    },
    {
      condition: 'Psoriasis',
      confidence: 0.04,
      severity: 'Mild',
      description: 'Psoriasis is a skin disorder that causes skin cells to multiply up to 10 times faster than normal.',
      commonTreatments: [
        'Topical treatments',
        'Light therapy',
        'Oral or injected medications'
      ]
    }
  ],
  disclaimer: 'This AI analysis is for informational purposes only and does not constitute medical advice. Please consult with a healthcare professional for proper diagnosis and treatment.',
  analyzedAt: new Date().toISOString(),
};

const ResultsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<typeof mockResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // In a real app, fetch result from API using the ID
    const fetchResult = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setResult(mockResult);
      } catch {
  setError('Failed to load results. Please try again.');
}  finally {
        setIsLoading(false);
      }
    };
    
    fetchResult();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading analysis results...</p>
        </div>
      </div>
    );
  }
  
  if (error || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error Loading Results</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error || 'Could not find the requested analysis result.'}</p>
          <Link to="/upload">
            <Button variant="primary">Try Another Upload</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const primaryPrediction = result.predictions[0];
  const secondaryPredictions = result.predictions.slice(1);
  const confidence = Math.round(primaryPrediction.confidence * 100);
  
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild':
        return 'text-green-500 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'moderate':
        return 'text-yellow-500 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      case 'severe':
        return 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };
  
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Analysis Results</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Here's what our AI detected in your image
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-colors duration-300">
        <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-700">
          <div className="md:flex">
            <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
              <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img 
                  src={result.image} 
                  alt="Analyzed skin image" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="mt-4 flex space-x-3">
                <Button 
                  variant="outline" 
                  fullWidth
                  className="flex justify-center items-center"
                  onClick={() => {/* Download functionality would be implemented here */}}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button 
                  variant="outline" 
                  fullWidth
                  className="flex justify-center items-center"
                  onClick={() => {/* Share functionality would be implemented here */}}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{primaryPrediction.condition}</h2>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-blue-600 mr-2"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Primary match</span>
                      </div>
                      <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
                      <span className={`text-sm px-2 py-0.5 rounded-full ${getSeverityColor(primaryPrediction.severity)}`}>
                        {primaryPrediction.severity}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{confidence}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Confidence</div>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {primaryPrediction.description}
                </p>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Common Treatments:</h3>
                  <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                    {primaryPrediction.commonTreatments.map((treatment, index) => (
                      <li key={index}>{treatment}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Other Possible Conditions:</h3>
                {secondaryPredictions.map((prediction, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{prediction.condition}</h4>
                      <div className="flex items-center mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getSeverityColor(prediction.severity)}`}>
                          {prediction.severity}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-700 dark:text-gray-300">
                        {Math.round(prediction.confidence * 100)}%
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Confidence</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8 bg-gray-50 dark:bg-gray-700 flex flex-col md:flex-row items-start justify-between">
          <div className="flex items-start mb-4 md:mb-0 md:w-3/4 md:pr-6">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-600 dark:text-gray-300">{result.disclaimer}</p>
          </div>
          <div className="md:w-1/4 self-end">
            <Link to="/upload">
              <Button variant="primary" fullWidth>
                Analyze Another Image
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-12 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-colors duration-300">
        <div className="p-6 md:p-8">
          <div className="flex items-center mb-6">
            <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Next Steps</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Consult with a Dermatologist
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI provides an initial assessment, but a professional diagnosis by a certified dermatologist is recommended for proper treatment.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Save Your Results
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Download or save these results to share with your healthcare provider. This will help them understand your condition better.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Learn More About Your Condition
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We provide educational resources about various skin conditions. Understanding your condition can help you manage it better.
              </p>
              <div className="mt-4">
                <Button variant="outline">Read More About {primaryPrediction.condition}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;