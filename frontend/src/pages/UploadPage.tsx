import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { Camera, Upload, Info, AlertCircle } from 'lucide-react';

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
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG)');
      return;
    }
    
    // Validate file size (5MB max)
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
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleAnalyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsLoading(true);
    
    try {
      // In a real app, this would send the image to your backend API
      // Here we're just simulating an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Navigate to results page with a mock result ID
      navigate('/results/123');
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      setIsLoading(false);
    }
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
                  <img 
                    src={selectedImage} 
                    alt="Selected skin image" 
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="mt-4 flex space-x-3">
                  <Button 
                    variant="outline" 
                    fullWidth 
                    onClick={handleCancelUpload}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    fullWidth 
                    onClick={handleAnalyzeImage}
                    isLoading={isLoading}
                  >
                    Analyze Image
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
                  <Button 
                    variant="primary" 
                    fullWidth
                    onClick={handleUploadClick}
                    className="flex justify-center items-center"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Upload Image
                  </Button>
                  <Button 
                    variant="outline" 
                    fullWidth
                    onClick={handleCameraCapture}
                    className="flex justify-center items-center"
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Take Photo
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="md:w-1/2 bg-blue-50 dark:bg-blue-900/20 p-6 md:p-8 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700">
            <div className="h-full flex flex-col">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                How to take a good photo
              </h3>
              
              <div className="space-y-4 flex-grow">
                <div className="bg-white dark:bg-gray-700 rounded-md p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Use natural light</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Take your photo in a well-lit area with natural daylight if possible. Avoid harsh direct sunlight.</p>
                </div>
                
                <div className="bg-white dark:bg-gray-700 rounded-md p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Center the affected area</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Position the skin concern in the center of the frame and make sure it's clearly visible.</p>
                </div>
                
                <div className="bg-white dark:bg-gray-700 rounded-md p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Avoid blurry images</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Hold your camera steady and make sure the image is in focus. Tap on the affected area to focus if using a smartphone.</p>
                </div>
                
                <div className="bg-white dark:bg-gray-700 rounded-md p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Include size reference (optional)</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">If possible, include a common object like a coin near the skin concern to help show its size.</p>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-md p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Example image</h4>
                  <div className="rounded-md overflow-hidden">
                    <img 
                      src="https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Example of a good skin photo" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;