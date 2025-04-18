
export interface Material {
  name: string;
  ecoScore: number;
  recyclability: number;
  durability: number;
  carbonImpact: number;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  materials: Material[];
  ecoScore: number;
  seller: {
    id: string;
    name: string;
  };
  reviews: {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    text: string;
    date: string;
  }[];
}

export interface ProductContextType {
  products: Product[];
  categories: string[];
  materials: Material[];
  filteredProducts: Product[];
  filterByCategory: (category: string) => void;
  filterByEcoScore: (minScore: number) => void;
  filterByMaterial: (materialName: string) => void;
  filterByPrice: (minPrice: number, maxPrice: number) => void;
  searchProducts: (query: string) => void;
  resetFilters: () => void;
  addProduct: (product: Omit<Product, "id" | "ecoScore">) => void;
  getProductById: (id: string) => Product | undefined;
}
