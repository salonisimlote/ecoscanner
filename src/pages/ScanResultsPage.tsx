
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Camera, Check, AlertTriangle, ArrowLeft } from "lucide-react";
import { useScanner } from "@/contexts/ScannerContext";

const ScanResultsPage = () => {
  const navigate = useNavigate();
  const { scanResult, resetScan } = useScanner();

  useEffect(() => {
    // If no scan result, redirect to scanner page
    if (!scanResult) {
      navigate("/scanner");
    }
    
    // Cleanup on unmount
    return () => {
      resetScan();
    };
  }, [scanResult, navigate, resetScan]);

  if (!scanResult) {
    return null;
  }

  const getEcoScoreClass = (score: number) => {
    if (score >= 7) return "text-green-600";
    if (score >= 5) return "text-yellow-600";
    return "text-red-600";
  };

  const getEcoScoreBg = (score: number) => {
    if (score >= 7) return "bg-green-100";
    if (score >= 5) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link to="/scanner">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Scanner
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Scan Results</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Material Analysis</CardTitle>
          <CardDescription>
            Results from scanning your product materials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getEcoScoreBg(scanResult.ecoScore)}`}>
                <span className={`text-2xl font-bold ${getEcoScoreClass(scanResult.ecoScore)}`}>
                  {scanResult.ecoScore}
                </span>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-lg">Eco-Score</h3>
                <p className="text-sm text-gray-500">
                  Based on detected materials
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <p>Scan Date:</p>
              <p className="font-medium">
                {new Date(scanResult.scanDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          {scanResult.image && (
            <div className="p-4 bg-gray-50 rounded-md">
              <div className="aspect-square max-h-60 mx-auto overflow-hidden rounded-md">
                <img
                  src={scanResult.image}
                  alt="Scanned product"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
          
          <div>
            <h3 className="font-semibold mb-2">Detected Materials:</h3>
            {scanResult.materials.length > 0 ? (
              <div className="space-y-4">
                {scanResult.materials.map((material) => (
                  <div key={material.name} className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{material.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEcoScoreBg(material.ecoScore)}`}>
                        Score: {material.ecoScore}/10
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{material.description}</p>
                    <Separator className="my-3" />
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Durability</p>
                        <p className="font-medium">{material.durability}/10</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Recyclability</p>
                        <p className="font-medium">{material.recyclability}/10</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Carbon Impact</p>
                        <p className="font-medium">{material.carbonImpact}/10</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center p-4 bg-red-50 text-red-700 rounded-md">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <p>Unable to detect any materials. Please try again with a clearer image.</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center p-4 bg-gray-50 rounded-md">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <Check className="h-4 w-4 text-gray-700" />
            </div>
            <div>
              <p className="font-medium">Analysis Confidence</p>
              <p className="text-sm text-gray-500">
                {Math.round(scanResult.confidence * 100)}% confidence in material detection
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="/scanner">
              <Camera className="mr-2 h-4 w-4" />
              Scan Another
            </Link>
          </Button>
          <Button asChild>
            <Link to="/">View Eco Products</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ScanResultsPage;
