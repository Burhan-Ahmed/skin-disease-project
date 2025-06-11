import { XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Cancel() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 dark:bg-red-900/20 text-center px-4">
      <XCircle className="text-red-600 dark:text-red-400 w-16 h-16 mb-4" />
      <h2 className="text-2xl font-semibold text-red-800 dark:text-red-200 mb-2">
        Payment Cancelled
      </h2>
      <p className="text-gray-700 dark:text-gray-300 text-lg">
        The payment was not completed. You can try again anytime.
      </p>
      <button
        onClick={() => navigate('/upload')}
        className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
      >
        Go Back to Upload
      </button>
    </div>
  );
}
