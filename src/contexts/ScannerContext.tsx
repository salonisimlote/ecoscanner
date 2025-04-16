
import React, { createContext, useContext, useState } from "react";
import { Material } from "./ProductContext";

interface ScanResult {
  materials: Material[];
  ecoScore: number;
  image: string;
  scanDate: string;
  confidence: number;
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
      
      // Randomly select 1-3 materials from our database to simulate detection
      const detectedMaterialCount = Math.floor(Math.random() * 3) + 1;
      const shuffledMaterials = [...materials].sort(() => 0.5 - Math.random());
      const detectedMaterials = shuffledMaterials.slice(0, detectedMaterialCount);
      
      // Calculate overall eco score
      const totalScore = detectedMaterials.reduce((sum, mat) => sum + mat.ecoScore, 0);
      const averageScore = Math.round(totalScore / detectedMaterials.length);
      
      // Create scan result
      const result: ScanResult = {
        materials: detectedMaterials,
        ecoScore: averageScore,
        image: imageUrl,
        scanDate: new Date().toISOString(),
        confidence: Math.random() * 0.3 + 0.7, // Random confidence between 70-100%
      };
      
      setScanResult(result);
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
      .map(name => materials.find(m => m.name === name))
      .filter((m): m is Material => m !== undefined);
    
    if (foundMaterials.length === 0) {
      throw new Error("No valid materials found");
    }
    
    // Calculate overall eco score
    const totalScore = foundMaterials.reduce((sum, mat) => sum + mat.ecoScore, 0);
    const averageScore = Math.round(totalScore / foundMaterials.length);
    
    // Create scan result
    const result: ScanResult = {
      materials: foundMaterials,
      ecoScore: averageScore,
      image: "",
      scanDate: new Date().toISOString(),
      confidence: 1.0, // 100% confidence for manual entry
    };
    
    return result;
  };

  const resetScan = () => {
    setScanResult(null);
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
