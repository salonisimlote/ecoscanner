
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Upload, ImageIcon, ScanText } from "lucide-react";
import { useScanner } from "@/contexts/ScannerContext";
import { toast } from "sonner";

const ScannerPage = () => {
  const navigate = useNavigate();
  const { scanMaterials, isScanning } = useScanner();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          mediaStreamRef.current = stream;
          setCameraActive(true);
        }
      } else {
        toast.error("Camera access is not supported in your browser");
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Failed to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
      setCameraActive(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to file
        canvas.toBlob(async (blob) => {
          if (blob) {
            const capturedFile = new File([blob], "captured-image.jpg", { type: "image/jpeg" });
            setFile(capturedFile);
            
            // Create preview URL
            const imageUrl = URL.createObjectURL(blob);
            setPreviewUrl(imageUrl);
            
            // Stop camera
            stopCamera();
            setActiveTab("upload");

            toast.success("Image captured successfully");
          }
        }, 'image/jpeg', 0.95);
      }
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (value === "camera") {
      startCamera();
    } else if (cameraActive) {
      stopCamera();
    }
  };

  const handleScan = async () => {
    if (!file) {
      toast.error("Please upload or capture an image to scan");
      return;
    }
    
    try {
      await scanMaterials(file);
      navigate("/scan-results");
    } catch (error) {
      console.error("Error scanning materials:", error);
      toast.error("Failed to scan materials. Please try again.");
    }
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Material Scanner</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Scan Product Materials</CardTitle>
          <CardDescription>
            Upload a photo or use your camera to analyze product's eco-friendliness
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
              <TabsTrigger value="camera">Use Camera</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="mt-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Uploaded preview"
                      className="max-h-60 mx-auto rounded-md"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={handleUploadClick}
                    >
                      Change Image
                    </Button>
                  </div>
                ) : (
                  <div
                    className="flex flex-col items-center justify-center py-10 cursor-pointer"
                    onClick={handleUploadClick}
                  >
                    <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm font-medium">Click to upload an image</p>
                    <p className="text-xs text-gray-500 mt-1">
                      or drag and drop
                    </p>
                  </div>
                )}
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="camera" className="mt-4">
              <div className="relative rounded-lg overflow-hidden border border-gray-300">
                <video 
                  ref={videoRef}
                  autoPlay 
                  playsInline
                  className="w-full aspect-video object-cover"
                />
                
                {cameraActive && (
                  <Button 
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-8"
                    onClick={captureImage}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Capture
                  </Button>
                )}
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </TabsContent>
          </Tabs>
          
          <Button 
            className="w-full gap-2"
            onClick={handleScan}
            disabled={!file || isScanning}
          >
            <ScanText className="h-4 w-4" />
            {isScanning ? "Analyzing Materials..." : "Analyze Materials"}
          </Button>
        </CardContent>
        <CardFooter className="bg-accent/40 text-sm text-gray-600 rounded-b-lg flex flex-col items-start">
          <p className="mb-2">
            <strong>Tip:</strong> For best results, upload a clear image of the 
            product's material label or tag.
          </p>
          <p>
            Our analyzer will identify materials and assess their environmental impact.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ScannerPage;
