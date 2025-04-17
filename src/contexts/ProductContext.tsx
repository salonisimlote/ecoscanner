import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

interface ProductContextType {
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

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Database of materials and their eco scores
const materialAnalysisData: Material[] = [
  {
    name: "Organic Cotton",
    ecoScore: 8,
    recyclability: 9,
    durability: 7,
    carbonImpact: 7,
    description: "Grown without harmful chemicals, organic cotton has a significantly lower environmental impact than conventional cotton."
  },
  {
    name: "Recycled Polyester",
    ecoScore: 7,
    recyclability: 8,
    durability: 9,
    carbonImpact: 6,
    description: "Made from post-consumer plastic bottles, reducing waste and energy consumption."
  },
  {
    name: "Bamboo",
    ecoScore: 9,
    recyclability: 8,
    durability: 8,
    carbonImpact: 9,
    description: "Fast-growing and requires minimal water and no pesticides."
  },
  {
    name: "Hemp",
    ecoScore: 9,
    recyclability: 8,
    durability: 9,
    carbonImpact: 9,
    description: "Requires little water and no pesticides, improves soil health."
  },
  {
    name: "Recycled Stainless Steel",
    ecoScore: 8,
    recyclability: 10,
    durability: 10,
    carbonImpact: 7,
    description: "Infinitely recyclable with minimal quality loss, very durable."
  },
  {
    name: "Conventional Cotton",
    ecoScore: 3,
    recyclability: 7,
    durability: 6,
    carbonImpact: 3,
    description: "Requires high water usage and often uses harmful pesticides."
  },
  {
    name: "Virgin Polyester",
    ecoScore: 2,
    recyclability: 5,
    durability: 8,
    carbonImpact: 2,
    description: "Petroleum-based plastic that requires significant energy to produce."
  },
  {
    name: "Bioplastic",
    ecoScore: 6,
    recyclability: 5,
    durability: 7,
    carbonImpact: 6,
    description: "Made from renewable resources, but may not be biodegradable."
  },
  {
    name: "Cork",
    ecoScore: 9,
    recyclability: 7,
    durability: 6,
    carbonImpact: 9,
    description: "Harvested from cork oak trees without harming them, naturally renewable."
  },
  {
    name: "Tencel/Lyocell",
    ecoScore: 8,
    recyclability: 7,
    durability: 7,
    carbonImpact: 8,
    description: "Made from wood pulp in a closed-loop process that reuses chemicals and water."
  },
  {
    name: "Jute",
    ecoScore: 8,
    recyclability: 8,
    durability: 7,
    carbonImpact: 8,
    description: "Requires minimal water and pesticides, biodegradable."
  },
  {
    name: "Recycled Glass",
    ecoScore: 7,
    recyclability: 10,
    durability: 8,
    carbonImpact: 6,
    description: "Reduces waste and requires less energy than virgin glass production."
  },
  {
    name: "Recycled Paper",
    ecoScore: 7,
    recyclability: 7,
    durability: 4,
    carbonImpact: 7,
    description: "Reduces deforestation and waste, requires less energy than virgin paper."
  },
  {
    name: "Plastic",
    ecoScore: 2,
    recyclability: 4,
    durability: 7,
    carbonImpact: 2,
    description: "Petroleum-based, non-biodegradable, and often ends up in landfills or oceans."
  },
  {
    name: "Aluminum",
    ecoScore: 5,
    recyclability: 10,
    durability: 9,
    carbonImpact: 4,
    description: "Energy-intensive to produce, but infinitely recyclable with minimal quality loss."
  }
];

// Sample product data
const generateSampleProducts = (): Product[] => {
  return [
    {
      id: "p1",
      name: "Reusable Water Bottle",
      description: "Made from recycled stainless steel, BPA-free",
      price: 2489.17,
      image: "/lovable-uploads/b90fe92b-3ab9-4598-b293-fb0ff04638fd.png",
      category: "Home & Living",
      materials: [materialAnalysisData.find(m => m.name === "Recycled Stainless Steel")!],
      ecoScore: 9,
      seller: {
        id: "s1",
        name: "EcoLife Solutions"
      },
      reviews: [
        {
          id: "r1",
          userId: "u1",
          userName: "Green Shopper",
          rating: 5,
          text: "Great quality and truly sustainable. Keeps my drinks cold for 24 hours!",
          date: "2025-03-10"
        }
      ]
    },
    {
      id: "p2",
      name: "Organic Cotton T-Shirt",
      description: "Made from 100% organic cotton, perfect for everyday wear.",
      price: 2489.17,
      image: "/lovable-uploads/48e78506-b064-4bf0-bbc4-4706ef97cab0.png",
      category: "Fashion",
      materials: [materialAnalysisData.find(m => m.name === "Organic Cotton")!],
      ecoScore: 8,
      seller: {
        id: "s2",
        name: "EcoWear"
      },
      reviews: [
        {
          id: "r2",
          userId: "u2",
          userName: "Eco Fashion",
          rating: 4,
          text: "Soft material and fits great. Love that it's organic!",
          date: "2025-03-15"
        }
      ]
    },
    {
      id: "p3",
      name: "Natural Face Cream",
      description: "Organic ingredients, cruelty-free and in recyclable packaging.",
      price: 1999.99,
      image: "/lovable-uploads/6c5e88ad-caba-4d39-8d51-68393ff28a39.png",
      category: "Beauty",
      materials: [
        materialAnalysisData.find(m => m.name === "Bioplastic")!,
        materialAnalysisData.find(m => m.name === "Recycled Glass")!
      ],
      ecoScore: 9,
      seller: {
        id: "s3",
        name: "Pure Beauty"
      },
      reviews: [
        {
          id: "r3",
          userId: "u3",
          userName: "Natural Beauty Lover",
          rating: 5,
          text: "My skin feels amazing and I love that the packaging is recyclable!",
          date: "2025-03-20"
        }
      ]
    },
    {
      id: "p4",
      name: "Reusable Coffee Cup",
      description: "Premium reusable coffee cup made from recycled materials.",
      price: 1659.17,
      image: "/lovable-uploads/ef8d3787-fac3-48f1-ab62-801ef67e6301.png",
      category: "Home & Living",
      materials: [
        materialAnalysisData.find(m => m.name === "Recycled Glass")!,
        materialAnalysisData.find(m => m.name === "Bamboo")!
      ],
      ecoScore: 8,
      seller: {
        id: "s1",
        name: "EcoLife Solutions"
      },
      reviews: [
        {
          id: "r4",
          userId: "u4",
          userName: "Coffee Enthusiast",
          rating: 4,
          text: "Great cup, keeps my coffee hot and looks stylish!",
          date: "2025-03-25"
        }
      ]
    },
    {
      id: "p5",
      name: "Bamboo Toothbrush",
      description: "Biodegradable bamboo handle with BPA-free bristles.",
      price: 499.99,
      image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04",
      category: "Home & Living",
      materials: [materialAnalysisData.find(m => m.name === "Bamboo")!],
      ecoScore: 9,
      seller: {
        id: "s4",
        name: "Zero Waste Home"
      },
      reviews: [
        {
          id: "r5",
          userId: "u5",
          userName: "Plastic Free Living",
          rating: 5,
          text: "Finally switched from plastic toothbrushes. These are great!",
          date: "2025-04-01"
        }
      ]
    },
    {
      id: "p6",
      name: "Hemp Backpack",
      description: "Durable backpack made from sustainable hemp material.",
      price: 3499.99,
      image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa",
      category: "Fashion",
      materials: [materialAnalysisData.find(m => m.name === "Hemp")!],
      ecoScore: 9,
      seller: {
        id: "s2",
        name: "EcoWear"
      },
      reviews: [
        {
          id: "r6",
          userId: "u6",
          userName: "Sustainable Traveler",
          rating: 5,
          text: "Perfect size and super durable. Love the hemp material!",
          date: "2025-04-05"
        }
      ]
    },
    {
      id: "p7",
      name: "Organic Snack Bars",
      description: "Plant-based energy bars with compostable packaging.",
      price: 799.99,
      image: "https://images.unsplash.com/photo-1631214214358-a09a6e5fa6e6",
      category: "Food & Beverages",
      materials: [
        materialAnalysisData.find(m => m.name === "Recycled Paper")!,
        materialAnalysisData.find(m => m.name === "Bioplastic")!
      ],
      ecoScore: 8,
      seller: {
        id: "s5",
        name: "Nature's Pantry"
      },
      reviews: [
        {
          id: "r7",
          userId: "u7",
          userName: "Health Conscious",
          rating: 4,
          text: "Delicious and healthy! Love that the packaging is compostable.",
          date: "2025-04-10"
        }
      ]
    },
    {
      id: "p8",
      name: "Solar Power Bank",
      description: "Charge your devices with the power of the sun. Recycled casing.",
      price: 3999.99,
      image: "https://images.unsplash.com/photo-1620827252031-257ce9471c03",
      category: "Electronics",
      materials: [
        materialAnalysisData.find(m => m.name === "Recycled Polyester")!,
        materialAnalysisData.find(m => m.name === "Aluminum")!
      ],
      ecoScore: 7,
      seller: {
        id: "s6",
        name: "Green Tech"
      },
      reviews: [
        {
          id: "r8",
          userId: "u8",
          userName: "Tech Enthusiast",
          rating: 4,
          text: "Works well when there's good sunlight. Great for camping!",
          date: "2025-04-15"
        }
      ]
    },
    {
      id: "p9",
      name: "Jute Shopping Bags",
      description: "Set of 3 durable jute bags for plastic-free shopping.",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1601379327928-bedfaf9da2d0",
      category: "Home & Living",
      materials: [materialAnalysisData.find(m => m.name === "Jute")!],
      ecoScore: 8,
      seller: {
        id: "s4",
        name: "Zero Waste Home"
      },
      reviews: [
        {
          id: "r9",
          userId: "u9",
          userName: "Plastic Free Shopper",
          rating: 5,
          text: "Strong bags that hold a lot of groceries. Great alternative to plastic!",
          date: "2025-04-20"
        }
      ]
    },
    {
      id: "p10",
      name: "Tencel Bedsheets",
      description: "Soft, breathable bedsheets made from sustainable Tencel fibers.",
      price: 5999.99,
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
      category: "Home & Living",
      materials: [materialAnalysisData.find(m => m.name === "Tencel/Lyocell")!],
      ecoScore: 8,
      seller: {
        id: "s1",
        name: "EcoLife Solutions"
      },
      reviews: [
        {
          id: "r10",
          userId: "u10",
          userName: "Comfort Seeker",
          rating: 5,
          text: "So soft and comfortable! Sleep better knowing they're sustainable.",
          date: "2025-04-25"
        }
      ]
    },
    {
      id: "p11",
      name: "Recycled Denim Jeans",
      description: "Stylish jeans made from recycled denim and organic cotton.",
      price: 3999.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
      category: "Fashion",
      materials: [
        materialAnalysisData.find(m => m.name === "Organic Cotton")!,
        materialAnalysisData.find(m => m.name === "Recycled Polyester")!
      ],
      ecoScore: 7,
      seller: {
        id: "s2",
        name: "EcoWear"
      },
      reviews: [
        {
          id: "r11",
          userId: "u11",
          userName: "Fashion Forward",
          rating: 4,
          text: "Great fit and love that they're made from recycled materials!",
          date: "2025-05-01"
        }
      ]
    },
    {
      id: "p12",
      name: "Plastic Phone Case",
      description: "Standard phone case made with conventional plastic.",
      price: 999.99,
      image: "https://images.unsplash.com/photo-1592812084147-8f32c0d7a20d",
      category: "Electronics",
      materials: [materialAnalysisData.find(m => m.name === "Plastic")!],
      ecoScore: 2,
      seller: {
        id: "s7",
        name: "Tech Accessories"
      },
      reviews: [
        {
          id: "r12",
          userId: "u12",
          userName: "Phone Protector",
          rating: 3,
          text: "Works fine but wish it was made from more sustainable materials.",
          date: "2025-05-05"
        }
      ]
    },
    {
      id: "p13",
      name: "Fast Fashion T-Shirt",
      description: "Trendy design made with conventional cotton.",
      price: 699.99,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
      category: "Fashion",
      materials: [materialAnalysisData.find(m => m.name === "Conventional Cotton")!],
      ecoScore: 3,
      seller: {
        id: "s8",
        name: "Trend Fashion"
      },
      reviews: [
        {
          id: "r13",
          userId: "u13",
          userName: "Fashion Follower",
          rating: 3,
          text: "Cute design but poor quality. Not very eco-friendly.",
          date: "2025-05-10"
        }
      ]
    },
    {
      id: "p14",
      name: "Polyester Sportswear",
      description: "Athletic wear made with virgin polyester.",
      price: 1499.99,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      category: "Fashion",
      materials: [materialAnalysisData.find(m => m.name === "Virgin Polyester")!],
      ecoScore: 2,
      seller: {
        id: "s9",
        name: "Sport Style"
      },
      reviews: [
        {
          id: "r14",
          userId: "u14",
          userName: "Fitness Enthusiast",
          rating: 3,
          text: "Functional but wish there were more eco-friendly options.",
          date: "2025-05-15"
        }
      ]
    },
    {
      id: "p15",
      name: "Natural Shampoo Bar",
      description: "Zero-waste solid shampoo with organic ingredients.",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc",
      category: "Beauty",
      materials: [
        materialAnalysisData.find(m => m.name === "Cork")!,
        materialAnalysisData.find(m => m.name === "Recycled Paper")!
      ],
      ecoScore: 9,
      seller: {
        id: "s3",
        name: "Pure Beauty"
      },
      reviews: [
        {
          id: "r15",
          userId: "u15",
          userName: "Zero Waste Beauty",
          rating: 5,
          text: "Works better than bottled shampoo and no plastic waste!",
          date: "2025-05-20"
        }
      ]
    },
    {
      id: "p16",
      name: "Compostable Phone Case",
      description: "Protective phone case made from plant-based materials.",
      price: 1999.99,
      image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07965",
      category: "Electronics",
      materials: [materialAnalysisData.find(m => m.name === "Bioplastic")!],
      ecoScore: 7,
      seller: {
        id: "s6",
        name: "Green Tech"
      },
      reviews: [
        {
          id: "r16",
          userId: "u16",
          userName: "Eco Tech User",
          rating: 4,
          text: "Good protection and love that it's compostable at end of life!",
          date: "2025-05-25"
        }
      ]
    },
    {
      id: "p17",
      name: "Organic Fair-Trade Coffee",
      description: "Shade-grown coffee beans in compostable packaging.",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1559589689-577aabd1db4f",
      category: "Food & Beverages",
      materials: [materialAnalysisData.find(m => m.name === "Recycled Paper")!],
      ecoScore: 9,
      seller: {
        id: "s5",
        name: "Nature's Pantry"
      },
      reviews: [
        {
          id: "r17",
          userId: "u17",
          userName: "Conscious Coffee Drinker",
          rating: 5,
          text: "Delicious flavor and appreciate the ethical sourcing!",
          date: "2025-06-01"
        }
      ]
    },
    {
      id: "p18",
      name: "Bamboo Utensil Set",
      description: "Portable cutlery set made from sustainable bamboo.",
      price: 699.99,
      image: "https://images.unsplash.com/photo-1589923188651-268a9765e432",
      category: "Home & Living",
      materials: [materialAnalysisData.find(m => m.name === "Bamboo")!],
      ecoScore: 9,
      seller: {
        id: "s4",
        name: "Zero Waste Home"
      },
      reviews: [
        {
          id: "r18",
          userId: "u18",
          userName: "On-the-go Eco Warrior",
          rating: 5,
          text: "Perfect for avoiding single-use plastic when eating out!",
          date: "2025-06-05"
        }
      ]
    },
    {
      id: "p19",
      name: "Energy-Efficient LED Bulbs",
      description: "Long-lasting, low-energy light bulbs in minimal packaging.",
      price: 1499.99,
      image: "https://images.unsplash.com/photo-1616628188859-7a11abb6fcc8",
      category: "Electronics",
      materials: [
        materialAnalysisData.find(m => m.name === "Recycled Glass")!,
        materialAnalysisData.find(m => m.name === "Aluminum")!
      ],
      ecoScore: 7,
      seller: {
        id: "s6",
        name: "Green Tech"
      },
      reviews: [
        {
          id: "r19",
          userId: "u19",
          userName: "Energy Saver",
          rating: 5,
          text: "Great light quality and significantly reduced my electricity bill!",
          date: "2025-06-10"
        }
      ]
    },
    {
      id: "p20",
      name: "Cork Yoga Mat",
      description: "Non-slip yoga mat made from natural cork and rubber.",
      price: 3499.99,
      image: "https://images.unsplash.com/photo-1592432678016-e8934011c70d",
      category: "Fashion",
      materials: [materialAnalysisData.find(m => m.name === "Cork")!],
      ecoScore: 9,
      seller: {
        id: "s2",
        name: "EcoWear"
      },
      reviews: [
        {
          id: "r20",
          userId: "u20",
          userName: "Yoga Enthusiast",
          rating: 5,
          text: "Great grip even with sweaty hands and love the natural materials!",
          date: "2025-06-15"
        }
      ]
    }
  ];
};

interface ProductProviderProps {
  children: ((materials: Material[]) => ReactNode) | ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const categories = ["All Products", "Home & Living", "Fashion", "Beauty", "Food & Beverages", "Electronics"];

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

  const calculateEcoScore = (materials: Material[]): number => {
    if (materials.length === 0) return 0;
    
    const totalScore = materials.reduce((sum, material) => sum + material.ecoScore, 0);
    return Math.round(totalScore / materials.length);
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
