'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ArrowRight, Upload, Trash2, ZoomIn as Zoom, Move, RotateCw, X } from 'lucide-react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { useToast } from '@/hooks/use-toast';

export default function UploadPage() {
  const [image, setImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState([1]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload an image file.',
          variant: 'destructive',
        });
        return;
      }
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please upload an image smaller than 5MB.',
          variant: 'destructive',
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        // Reset adjustments when a new image is uploaded
        setZoom([1]);
        setPosition({ x: 0, y: 0 });
        setRotation(0);
      };
      reader.readAsDataURL(file);
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1 
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (image) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setZoom([1]);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleContinue = () => {
    // In a real app, you would save the image and adjustments to the server
    toast({
      title: 'Image uploaded',
      description: 'Your image has been successfully uploaded for analysis.',
    });
    
    router.push('/payment');
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Your Photo</h1>
          <p className="text-muted-foreground">
            Upload a clear, well-lit photo of your face for analysis. You can adjust the position and zoom below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-sm h-full">
              <div className="flex flex-col h-full">
                <h2 className="text-xl font-semibold mb-4">Face Photo</h2>
                
                {!image ? (
                  <div 
                    {...getRootProps()} 
                    className={`
                      border-2 border-dashed rounded-lg p-8 
                      flex flex-col items-center justify-center 
                      cursor-pointer transition-colors text-center
                      flex-1 min-h-[300px]
                      image-upload-container
                      ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
                    `}
                  >
                    <input {...getInputProps()} />
                    <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium mb-2">Drag & drop your photo here</p>
                    <p className="text-muted-foreground mb-4">or click to select a file</p>
                    <p className="text-sm text-muted-foreground">
                      Supported formats: JPG, PNG, GIF (Max 5MB)
                    </p>
                  </div>
                ) : (
                  <div 
                    className="relative flex-1 overflow-hidden bg-card/50 rounded-lg min-h-[300px]"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    <div
                      className="absolute"
                      style={{
                        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${zoom[0]})`,
                        transition: isDragging ? 'none' : 'transform 0.2s',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Image
                        src={image}
                        alt="Uploaded face"
                        className="max-w-full max-h-full object-contain"
                        width={500}
                        height={500}
                      />
                    </div>
                    
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <Button 
                        variant="destructive" 
                        size="icon"
                        onClick={handleRemoveImage}
                        className="rounded-full opacity-80 hover:opacity-100"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
                      <p className="text-xs text-muted-foreground">
                        <Move className="inline h-3 w-3 mr-1" />
                        Click and drag to position
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
          
          <div>
            <Card className="p-6 shadow-sm h-full">
              <h2 className="text-xl font-semibold mb-6">Adjustments</h2>
              
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium flex items-center">
                      <Zoom className="h-4 w-4 mr-2" />
                      Zoom
                    </label>
                    <span className="text-sm text-muted-foreground">{Math.round(zoom[0] * 100)}%</span>
                  </div>
                  <Slider
                    value={zoom}
                    onValueChange={setZoom}
                    min={0.5}
                    max={2}
                    step={0.01}
                    disabled={!image}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium flex items-center mb-2">
                    <RotateCw className="h-4 w-4 mr-2" />
                    Rotation
                  </label>
                  <Button 
                    variant="outline" 
                    onClick={handleRotate}
                    disabled={!image}
                    className="w-full"
                  >
                    Rotate 90°
                    <RotateCw className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="pt-4 mt-auto">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleContinue}
                    disabled={!image}
                  >
                    Continue to Payment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        <div className="mt-8 bg-secondary/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-2">Tips for the best analysis</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Use a well-lit environment, preferably natural daylight</li>
            <li>Ensure your face is clearly visible and centered</li>
            <li>Remove glasses, hats, or anything that covers your face</li>
            <li>Use a neutral expression (no smiling or frowning)</li>
            <li>Clean your face before taking the photo for best results</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}