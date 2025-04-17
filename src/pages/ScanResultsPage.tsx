
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
import { Camera, Check, AlertTriangle, ArrowLeft, Lightbulb, Leaf } from "lucide-react";
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
      // We don't reset scan here anymore so results persist
    };
  }, [scanResult, navigate]);

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
        <h1 className="text-2xl font-bold">Material Analysis</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Eco-Friendly Assessment</CardTitle>
          <CardDescription>
            Detailed analysis of your product's materials
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
                  {scanResult.ecoScore >= 7 ? "Excellent sustainability rating" : 
                   scanResult.ecoScore >= 5 ? "Good sustainability rating" : 
                   "Needs improvement"}
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
          
          {scanResult.recommendations && scanResult.recommendations.length > 0 && (
            <div className="border rounded-md p-4 bg-blue-50">
              <div className="flex items-center mb-3">
                <Lightbulb className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-semibold">Sustainability Recommendations</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                {scanResult.recommendations.map((rec, index) => (
                  <li key={index} className="flex">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {scanResult.alternativeMaterials && scanResult.alternativeMaterials.length > 0 && (
            <div className="border rounded-md p-4 bg-green-50">
              <div className="flex items-center mb-3">
                <Leaf className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-semibold">Eco-Friendly Alternatives</h3>
              </div>
              <div className="space-y-3">
                {scanResult.alternativeMaterials.map((material) => (
                  <div key={material.name} className="flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getEcoScoreBg(material.ecoScore)} mr-3 flex-shrink-0`}>
                      <span className={`text-xs font-bold ${getEcoScoreClass(material.ecoScore)}`}>
                        {material.ecoScore}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{material.name}</p>
                      <p className="text-xs text-gray-600">{material.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
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
            <Link to="/">Browse Eco Products</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ScanResultsPage;
