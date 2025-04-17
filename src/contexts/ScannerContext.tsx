
import React, { createContext, useContext, useState, useEffect } from "react";
import { Material } from "./ProductContext";

interface ScanResult {
  materials: Material[];
  ecoScore: number;
  image: string;
  scanDate: string;
  confidence: number;
  recommendations: string[];
  alternativeMaterials: Material[];
}

interface ScannerContextType {
  isScanning: boolean;
  scanResult: ScanResult | null;
  scanMaterials: (image: File) => Promise<void>;
  resetScan: () => void;
  analyzeMaterials: (materialNames: string[]) => Promise<ScanResult>;
}

const ScannerContext = createContext<ScannerContextType | undefined>(undefined);

export const ScannerProvider: React.FC<{ 
  children: React.ReactNode;
  materials: Material[];
}> = ({ children, materials }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  
  // Load scan result from session storage
  useEffect(() => {
    const savedResult = sessionStorage.getItem('scanResult');
    if (savedResult) {
      try {
        setScanResult(JSON.parse(savedResult));
      } catch (error) {
        console.error("Error parsing saved scan result:", error);
        sessionStorage.removeItem('scanResult');
      }
    }
  }, []);

  // Generate recommendations based on detected materials
  const generateRecommendations = (detectedMaterials: Material[]): string[] => {
    const recommendations: string[] = [];
    
    // Check average eco score
    const avgScore = detectedMaterials.reduce((sum, mat) => sum + mat.ecoScore, 0) / detectedMaterials.length;
    
    if (avgScore < 5) {
      recommendations.push("Consider products made with more sustainable materials for your next purchase.");
    }
    
    // Check for specific materials
    detectedMaterials.forEach(material => {
      if (material.name === "Conventional Cotton") {
        recommendations.push("Organic cotton uses 91% less water and no harmful pesticides compared to conventional cotton.");
      }
      
      if (material.name === "Virgin Polyester" || material.name === "Plastic") {
        recommendations.push("Recycled polyester has a 75% lower carbon footprint than virgin polyester.");
      }
      
      if (material.recyclability < 5) {
        recommendations.push(`${material.name} has low recyclability. Consider looking for alternatives that are easier to recycle.`);
      }
    });
    
    // Add generic recommendations if we don't have many specific ones
    if (recommendations.length < 2) {
      recommendations.push("Look for third-party certifications like Global Organic Textile Standard (GOTS) or Cradle to Cradle.");
      recommendations.push("Products with fewer materials are generally easier to recycle at end-of-life.");
    }
    
    return recommendations;
  };
  
  // Find alternative materials with better eco scores
  const findAlternativeMaterials = (detectedMaterials: Material[]): Material[] => {
    const alternatives: Material[] = [];
    
    detectedMaterials.forEach(material => {
      // Find potential alternatives for this material
      let betterAlternatives = materials.filter(m => 
        m.ecoScore > material.ecoScore && 
        m.ecoScore >= 7 && 
        m !== material
      );
      
      // Sort by eco score (highest first)
      betterAlternatives.sort((a, b) => b.ecoScore - a.ecoScore);
      
      // Take the top alternative if it exists
      if (betterAlternatives.length > 0) {
        const bestAlternative = betterAlternatives[0];
        if (!alternatives.includes(bestAlternative)) {
          alternatives.push(bestAlternative);
        }
      }
    });
    
    // Limit to 3 alternatives
    return alternatives.slice(0, 3);
  };

  // Simulate material scanning from image
  const scanMaterials = async (image: File) => {
    setIsScanning(true);
    
    try {
      // Convert image to base64 for display
      const imageUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(image);
      });
      
      // Simulate OCR and material detection (in a real app, this would use actual OCR)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Choose materials that are likely to be found in products
      const materialCategories = ["Natural", "Synthetic", "Recycled", "Biodegradable"];
      const selectedCategory = materialCategories[Math.floor(Math.random() * materialCategories.length)];
      
      // Filter materials by the selected category preference (simulate intelligent detection)
      const categoryMaterials = materials.filter(material => 
        material.description.toLowerCase().includes(selectedCategory.toLowerCase())
      );
      
      // If no materials found in the category, use a random selection
      const materialsPool = categoryMaterials.length > 0 ? categoryMaterials : materials;
      
      // Randomly select 1-3 materials from our filtered list to simulate detection
      const detectedMaterialCount = Math.floor(Math.random() * 2) + 1; // 1-2 materials
      const shuffledMaterials = [...materialsPool].sort(() => 0.5 - Math.random());
      const detectedMaterials = shuffledMaterials.slice(0, detectedMaterialCount);
      
      // Calculate overall eco score
      const totalScore = detectedMaterials.reduce((sum, mat) => sum + mat.ecoScore, 0);
      const averageScore = Math.round(totalScore / detectedMaterials.length);
      
      // Generate recommendations and alternatives
      const recommendations = generateRecommendations(detectedMaterials);
      const alternativeMaterials = findAlternativeMaterials(detectedMaterials);
      
      // Create scan result
      const result: ScanResult = {
        materials: detectedMaterials,
        ecoScore: averageScore,
        image: imageUrl,
        scanDate: new Date().toISOString(),
        confidence: Math.random() * 0.3 + 0.7, // Random confidence between 70-100%
        recommendations,
        alternativeMaterials
      };
      
      setScanResult(result);
      
      // Save to session storage for persistence
      sessionStorage.setItem('scanResult', JSON.stringify(result));
    } catch (error) {
      console.error("Error scanning materials:", error);
      // Handle error
    } finally {
      setIsScanning(false);
    }
  };

  // For manually analyzing specified materials (used in seller flow)
  const analyzeMaterials = async (materialNames: string[]): Promise<ScanResult> => {
    // Find materials from our database
    const foundMaterials = materialNames
      .map(name => materials.find(m => m.name.toLowerCase() === name.toLowerCase()))
      .filter((m): m is Material => m !== undefined);
    
    if (foundMaterials.length === 0) {
      throw new Error("No valid materials found");
    }
    
    // Calculate overall eco score
    const totalScore = foundMaterials.reduce((sum, mat) => sum + mat.ecoScore, 0);
    const averageScore = Math.round(totalScore / foundMaterials.length);
    
    // Generate recommendations and alternatives
    const recommendations = generateRecommendations(foundMaterials);
    const alternativeMaterials = findAlternativeMaterials(foundMaterials);
    
    // Create scan result
    const result: ScanResult = {
      materials: foundMaterials,
      ecoScore: averageScore,
      image: "",
      scanDate: new Date().toISOString(),
      confidence: 1.0, // 100% confidence for manual entry
      recommendations,
      alternativeMaterials
    };
    
    // Save to session storage
    sessionStorage.setItem('scanResult', JSON.stringify(result));
    
    return result;
  };

  const resetScan = () => {
    setScanResult(null);
    sessionStorage.removeItem('scanResult');
  };

  return (
    <ScannerContext.Provider
      value={{
        isScanning,
        scanResult,
        scanMaterials,
        resetScan,
        analyzeMaterials
      }}
    >
      {children}
    </ScannerContext.Provider>
  );
};

export const useScanner = () => {
  const context = useContext(ScannerContext);
  if (context === undefined) {
    throw new Error("useScanner must be used within a ScannerProvider");
  }
  return context;
};
