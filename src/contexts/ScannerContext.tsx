import React, { createContext, useContext, useState, useEffect } from "react";
import { Material } from "../types/product";

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

  const generateRecommendations = (detectedMaterials: Material[]): string[] => {
    const recommendations: string[] = [];
    
    const avgScore = detectedMaterials.reduce((sum, mat) => sum + mat.ecoScore, 0) / detectedMaterials.length;
    
    if (avgScore < 5) {
      recommendations.push("Consider products made with more sustainable materials for your next purchase.");
    }
    
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
    
    if (recommendations.length < 2) {
      recommendations.push("Look for third-party certifications like Global Organic Textile Standard (GOTS) or Cradle to Cradle.");
      recommendations.push("Products with fewer materials are generally easier to recycle at end-of-life.");
    }
    
    return recommendations;
  };
  
  const findAlternativeMaterials = (detectedMaterials: Material[]): Material[] => {
    const alternatives: Material[] = [];
    
    detectedMaterials.forEach(material => {
      let betterAlternatives = materials.filter(m => 
        m.ecoScore > material.ecoScore && 
        m.ecoScore >= 7 && 
        m !== material
      );
      
      betterAlternatives.sort((a, b) => b.ecoScore - a.ecoScore);
      
      if (betterAlternatives.length > 0) {
        const bestAlternative = betterAlternatives[0];
        if (!alternatives.includes(bestAlternative)) {
          alternatives.push(bestAlternative);
        }
      }
    });
    
    return alternatives.slice(0, 3);
  };

  const scanMaterials = async (image: File) => {
    setIsScanning(true);
    
    try {
      const imageUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(image);
      });
      
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const materialCategories = ["Natural", "Synthetic", "Recycled", "Biodegradable"];
      const selectedCategory = materialCategories[Math.floor(Math.random() * materialCategories.length)];
      
      const categoryMaterials = materials.filter(material => 
        material.description.toLowerCase().includes(selectedCategory.toLowerCase())
      );
      
      const materialsPool = categoryMaterials.length > 0 ? categoryMaterials : materials;
      
      const detectedMaterialCount = Math.floor(Math.random() * 2) + 1;
      const shuffledMaterials = [...materialsPool].sort(() => 0.5 - Math.random());
      const detectedMaterials = shuffledMaterials.slice(0, detectedMaterialCount);
      
      const totalScore = detectedMaterials.reduce((sum, mat) => sum + mat.ecoScore, 0);
      const averageScore = Math.round(totalScore / detectedMaterials.length);
      
      const recommendations = generateRecommendations(detectedMaterials);
      const alternativeMaterials = findAlternativeMaterials(detectedMaterials);
      
      const result: ScanResult = {
        materials: detectedMaterials,
        ecoScore: averageScore,
        image: imageUrl,
        scanDate: new Date().toISOString(),
        confidence: Math.random() * 0.3 + 0.7,
        recommendations,
        alternativeMaterials
      };
      
      setScanResult(result);
      
      sessionStorage.setItem('scanResult', JSON.stringify(result));
    } catch (error) {
      console.error("Error scanning materials:", error);
    } finally {
      setIsScanning(false);
    }
  };

  const analyzeMaterials = async (materialNames: string[]): Promise<ScanResult> => {
    const foundMaterials = materialNames
      .map(name => materials.find(m => m.name.toLowerCase() === name.toLowerCase()))
      .filter((m): m is Material => m !== undefined);
    
    if (foundMaterials.length === 0) {
      throw new Error("No valid materials found");
    }
    
    const totalScore = foundMaterials.reduce((sum, mat) => sum + mat.ecoScore, 0);
    const averageScore = Math.round(totalScore / foundMaterials.length);
    
    const recommendations = generateRecommendations(foundMaterials);
    const alternativeMaterials = findAlternativeMaterials(foundMaterials);
    
    const result: ScanResult = {
      materials: foundMaterials,
      ecoScore: averageScore,
      image: "",
      scanDate: new Date().toISOString(),
      confidence: 1.0,
      recommendations,
      alternativeMaterials
    };
    
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
