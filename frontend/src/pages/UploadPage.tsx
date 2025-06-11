import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { Camera, Upload, Info, AlertCircle } from 'lucide-react';
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51RWjT3FQ0GKxgCgCAVX0CpigwF3F3UCgnGMRfJMJAUx6rzzQAFLoAcxNTsYxIcxP0rLyy0aQxGEHW5iAxVa5r6Kf00useNSM6h");

const UploadPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCameraCapture = () => {
    fileInputRef.current?.click();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handlePayment = async () => {
    try {
      const res = await fetch("http://localhost:4242/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      const stripe = await stripePromise;
      if (!stripe) {
        setError("Stripe failed to load. Please try again later.");
        setIsLoading(false);
        return;
      }
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      console.error("Stripe error:", err);
      setError("Failed to start payment. Please try again.");
      setIsLoading(false);
    }
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage) return;
    setIsLoading(true);

    // Trigger payment → user will be redirected to Stripe
    await handlePayment();
  };

  const handleCancelUpload = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Upload a Skin Image</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Take a clear photo of your skin concern or upload an existing image for AI analysis.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-colors duration-300">
        <div className="md:flex">
          <div className="md:w-1/2 p-6 md:p-8">
            {selectedImage ? (
              <div className="h-full flex flex-col">
                <div className="flex-grow relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img src={selectedImage} alt="Selected skin image" className="object-contain w-full h-full" />
                </div>
                <div className="mt-4 flex space-x-3">
                  <Button variant="outline" fullWidth onClick={handleCancelUpload}>
                    Cancel
                  </Button>
                  <Button variant="primary" fullWidth onClick={handleAnalyzeImage} isLoading={isLoading}>
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  capture="environment"
                />

                {error && (
                  <div className="mb-4 w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-md p-3 text-sm flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="text-gray-500 dark:text-gray-400 mb-6">
                  <Upload className="mx-auto h-12 w-12 mb-4" />
                  <p className="text-lg font-medium mb-1">Drop your image here, or select a file</p>
                  <p className="text-sm">JPG, PNG (max. 5MB)</p>
                </div>

                <div className="space-y-3 w-full">
                  <Button variant="primary" fullWidth onClick={handleUploadClick} className="flex justify-center items-center">
                    <Upload className="h-5 w-5 mr-2" />
                    Upload Image
                  </Button>
                  <Button variant="outline" fullWidth onClick={handleCameraCapture} className="flex justify-center items-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Take Photo
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="md:w-1/2 bg-blue-50 dark:bg-blue-900/20 p-6 md:p-8 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700">
            {/* Tips (unchanged) */}
            ...
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
