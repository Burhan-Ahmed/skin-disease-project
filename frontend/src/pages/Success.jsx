import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/results/123'); // Replace with real result ID logic
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 dark:bg-green-900/20 text-center px-4">
      <CheckCircle className="text-green-600 dark:text-green-400 w-16 h-16 mb-4" />
      <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-2">
        Payment Successful!
      </h2>
      <p className="text-gray-700 dark:text-gray-300 text-lg">
        Your payment has been processed. We’re now analyzing your image.
      </p>
      <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
        Redirecting to results...
      </p>
    </div>
  );
}
