
import { useState, useRef } from "react";
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
import { Camera, Upload, ImageIcon } from "lucide-react";
import { useScanner } from "@/contexts/ScannerContext";
import { toast } from "sonner";

const ScannerPage = () => {
  const navigate = useNavigate();
  const { scanMaterials, isScanning } = useScanner();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleScan = async () => {
    if (!file) {
      toast.error("Please upload an image to scan");
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

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Material Scanner</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Scan Product Materials</CardTitle>
          <CardDescription>
            Upload a photo of product label or tag to analyze its eco-friendliness
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
          
          <div className="flex gap-4">
            <Button
              className="flex-1 gap-2"
              variant="outline"
              onClick={handleUploadClick}
            >
              <Upload className="h-4 w-4" />
              Upload Image
            </Button>
            <Button 
              className="flex-1 gap-2"
              onClick={handleScan}
              disabled={!file || isScanning}
            >
              <Camera className="h-4 w-4" />
              {isScanning ? "Scanning..." : "Scan Materials"}
            </Button>
          </div>
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
