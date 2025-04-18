
import { Material, Product } from "../types/product";

export const useProductCalculations = () => {
  const calculateEcoScore = (materials: Material[]): number => {
    if (materials.length === 0) return 0;
    const totalScore = materials.reduce((sum, material) => sum + material.ecoScore, 0);
    return Math.round(totalScore / materials.length);
  };

  return {
    calculateEcoScore
  };
};
