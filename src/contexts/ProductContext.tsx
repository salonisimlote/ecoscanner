
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Material, Product, ProductContextType } from "../types/product";
import { materialAnalysisData } from "../data/materials";
import { generateSampleProducts } from "../data/products";
import { useProductCalculations } from "../hooks/useProductCalculations";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ((materials: Material[]) => ReactNode) | ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const categories = ["All Products", "Household Items", "Personal Care", "Zero Waste Essentials", "Sustainable Living"];
  const { calculateEcoScore } = useProductCalculations();

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProducts(parsedProducts);
      setFilteredProducts(parsedProducts);
    } else {
      const sampleProducts = generateSampleProducts();
      setProducts(sampleProducts);
      setFilteredProducts(sampleProducts);
      localStorage.setItem("products", JSON.stringify(sampleProducts));
    }
  }, []);

  const filterByCategory = (category: string) => {
    if (category === "All Products") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category === category));
    }
  };

  const filterByEcoScore = (minScore: number) => {
    setFilteredProducts(products.filter((product) => product.ecoScore >= minScore));
  };

  const filterByMaterial = (materialName: string) => {
    setFilteredProducts(
      products.filter((product) => 
        product.materials.some((material) => material.name === materialName)
      )
    );
  };

  const filterByPrice = (minPrice: number, maxPrice: number) => {
    setFilteredProducts(
      products.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      )
    );
  };

  const searchProducts = (query: string) => {
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }
    
    const searchTerm = query.toLowerCase();
    setFilteredProducts(
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.materials.some((material) => 
            material.name.toLowerCase().includes(searchTerm)
          )
      )
    );
  };

  const resetFilters = () => {
    setFilteredProducts(products);
  };

  const addProduct = (product: Omit<Product, "id" | "ecoScore">) => {
    const ecoScore = calculateEcoScore(product.materials);
    const newProduct: Product = {
      ...product,
      id: `p${Date.now()}`,
      ecoScore
    };
    
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        materials: materialAnalysisData,
        filteredProducts,
        filterByCategory,
        filterByEcoScore,
        filterByMaterial,
        filterByPrice,
        searchProducts,
        resetFilters,
        addProduct,
        getProductById
      }}
    >
      {typeof children === 'function' ? children(materialAnalysisData) : children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
