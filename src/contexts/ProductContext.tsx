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
  },
  {
    name: "Beeswax",
    ecoScore: 9,
    recyclability: 8,
    durability: 6,
    carbonImpact: 9,
    description: "Natural alternative to plastic wrap, biodegradable and reusable."
  },
  {
    name: "Silicone",
    ecoScore: 6,
    recyclability: 6,
    durability: 9,
    carbonImpact: 6,
    description: "Durable and reusable alternative to single-use plastics, though not biodegradable."
  },
  {
    name: "Wool",
    ecoScore: 7,
    recyclability: 7,
    durability: 8,
    carbonImpact: 7,
    description: "Natural, renewable material that's biodegradable and durable."
  },
  {
    name: "Plant-based Compostable Materials",
    ecoScore: 8,
    recyclability: 6,
    durability: 6,
    carbonImpact: 8,
    description: "Made from plant materials, biodegradable in commercial composting facilities."
  },
  {
    name: "Stainless Steel",
    ecoScore: 7,
    recyclability: 9,
    durability: 10,
    carbonImpact: 6,
    description: "Extremely durable and fully recyclable, reducing the need for replacement items."
  }
];

// Sample product data
const generateSampleProducts = (): Product[] => {
  return [
    {
      id: "p1",
      name: "Bamboo Toothbrushes",
      description: "Biodegradable handles, zero plastic, gentle on gums and effective for cleaning.",
      price: 299.00,
      image: "https://images.unsplash.com/photo-1593213871484-5be9c92c3f99",
      category: "Household Items",
      materials: [materialAnalysisData.find(m => m.name === "Bamboo")!],
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
          text: "These toothbrushes work just as well as plastic ones but are completely biodegradable!",
          date: "2025-03-10"
        }
      ]
    },
    {
      id: "p2",
      name: "Reusable Beeswax Food Wraps",
      description: "A natural alternative to plastic wrap. Washable, reusable, and biodegradable.",
      price: 549.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      category: "Household Items",
      materials: [materialAnalysisData.find(m => m.name === "Beeswax")!],
      ecoScore: 9,
      seller: {
        id: "s4",
        name: "Zero Waste Home"
      },
      reviews: [
        {
          id: "r2",
          userId: "u2",
          userName: "Kitchen Enthusiast",
          rating: 4,
          text: "These wraps are amazing for keeping food fresh without plastic. Love them!",
          date: "2025-03-15"
        }
      ]
    },
    {
      id: "p3",
      name: "Silicone Food Storage Bags",
      description: "Durable and reusable bags for food storage. Dishwasher-safe and leak-proof.",
      price: 649.99,
      image: "https://images.unsplash.com/photo-1622403406947-c55460196e9c",
      category: "Household Items",
      materials: [materialAnalysisData.find(m => m.name === "Silicone")!],
      ecoScore: 7,
      seller: {
        id: "s1",
        name: "EcoLife Solutions"
      },
      reviews: [
        {
          id: "r3",
          userId: "u3",
          userName: "Zero Waste Kitchen",
          rating: 5,
          text: "These bags are perfect for meal prep and storing leftovers. So much better than disposables!",
          date: "2025-03-20"
        }
      ]
    },
    {
      id: "p4",
      name: "Compostable Trash Bags",
      description: "Break down naturally in composting conditions. Made from plant-based materials.",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
      category: "Household Items",
      materials: [materialAnalysisData.find(m => m.name === "Plant-based Compostable Materials")!],
      ecoScore: 8,
      seller: {
        id: "s4",
        name: "Zero Waste Home"
      },
      reviews: [
        {
          id: "r4",
          userId: "u4",
          userName: "Sustainable Home",
          rating: 4,
          text: "These trash bags are strong and actually compost well. Great alternative to plastic!",
          date: "2025-03-25"
        }
      ]
    },
    {
      id: "p5",
      name: "Wool Dryer Balls",
      description: "Reduce drying time and eliminate the need for dryer sheets. Reusable for 1000+ loads.",
      price: 449.99,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b",
      category: "Household Items",
      materials: [materialAnalysisData.find(m => m.name === "Wool")!],
      ecoScore: 8,
      seller: {
        id: "s1",
        name: "EcoLife Solutions"
      },
      reviews: [
        {
          id: "r5",
          userId: "u5",
          userName: "Energy Saver",
          rating: 5,
          text: "These have cut my drying time and eliminated static. No more dryer sheets ever!",
          date: "2025-04-01"
        }
      ]
    },
    
    {
      id: "p6",
      name: "Solid Shampoo & Conditioner Bars",
      description: "Plastic-free, travel-friendly hair care. One bar equals 2-3 bottles of liquid product.",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7",
      category: "Personal Care",
      materials: [materialAnalysisData.find(m => m.name === "Plant-based Compostable Materials")!],
      ecoScore: 9,
      seller: {
        id: "s3",
        name: "Pure Beauty"
      },
      reviews: [
        {
          id: "r6",
          userId: "u6",
          userName: "Plastic Free Traveler",
          rating: 5,
          text: "These bars last forever and work better than bottled shampoo. Great for travel!",
          date: "2025-04-05"
        }
      ]
    },
    {
      id: "p7",
      name: "Natural Deodorant in Compostable Packaging",
      description: "Free from harmful chemicals, aluminum-free and in zero-waste packaging.",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc",
      category: "Personal Care",
      materials: [
        materialAnalysisData.find(m => m.name === "Plant-based Compostable Materials")!,
        materialAnalysisData.find(m => m.name === "Recycled Paper")!
      ],
      ecoScore: 8,
      seller: {
        id: "s3",
        name: "Pure Beauty"
      },
      reviews: [
        {
          id: "r7",
          userId: "u7",
          userName: "Clean Beauty Convert",
          rating: 4,
          text: "Works really well, no irritation, and I love that the packaging is compostable!",
          date: "2025-04-10"
        }
      ]
    },
    {
      id: "p8",
      name: "Refillable Bamboo Razor",
      description: "Replaceable blades, zero waste handle, and close shave with minimal environmental impact.",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1621844805057-4827dea9aa9a",
      category: "Personal Care",
      materials: [
        materialAnalysisData.find(m => m.name === "Bamboo")!,
        materialAnalysisData.find(m => m.name === "Stainless Steel")!
      ],
      ecoScore: 8,
      seller: {
        id: "s4",
        name: "Zero Waste Home"
      },
      reviews: [
        {
          id: "r8",
          userId: "u8",
          userName: "Sustainable Shaver",
          rating: 5,
          text: "This razor gives a better shave than plastic disposables and will last forever!",
          date: "2025-04-15"
        }
      ]
    },
    {
      id: "p9",
      name: "Organic Cotton Reusable Makeup Pads",
      description: "Washable and gentle on skin. Set of 10 pads with washing bag included.",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273",
      category: "Personal Care",
      materials: [materialAnalysisData.find(m => m.name === "Organic Cotton")!],
      ecoScore: 8,
      seller: {
        id: "s3",
        name: "Pure Beauty"
      },
      reviews: [
        {
          id: "r9",
          userId: "u9",
          userName: "Zero Waste Beauty",
          rating: 4,
          text: "These pads are soft and remove makeup even better than disposables. Easy to wash too!",
          date: "2025-04-20"
        }
      ]
    },
    {
      id: "p10",
      name: "Vegan Lip Balm in Cardboard Tubes",
      description: "Cruelty-free and compostable packaging. Natural ingredients that soothe and protect.",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1599305090598-fe179d501225",
      category: "Personal Care",
      materials: [
        materialAnalysisData.find(m => m.name === "Plant-based Compostable Materials")!,
        materialAnalysisData.find(m => m.name === "Recycled Paper")!
      ],
      ecoScore: 9,
      seller: {
        id: "s3",
        name: "Pure Beauty"
      },
      reviews: [
        {
          id: "r10",
          userId: "u10",
          userName: "Vegan Beauty",
          rating: 5,
          text: "These lip balms work amazing and I love that the tube can be composted when empty!",
          date: "2025-04-25"
        }
      ]
    },
    
    {
      id: "p11",
      name: "Stainless Steel Straws with Cleaning Brush",
      description: "Durable and travel-ready. Set of 4 straws with cleaning brush and carry pouch.",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1572540698551-3e43d0b03c0e",
      category: "Zero Waste Essentials",
      materials: [materialAnalysisData.find(m => m.name === "Stainless Steel")!],
      ecoScore: 8,
      seller: {
        id: "s1",
        name: "EcoLife Solutions"
      },
      reviews: [
        {
          id: "r11",
          userId: "u11",
          userName: "Plastic Free Drinks",
          rating: 5,
          text: "These straws are easy to clean and will last forever. The carrying case is perfect for on-the-go!",
          date: "2025-05-01"
        }
      ]
    },
    {
      id: "p12",
      name: "Eco-Friendly Tote Bags",
      description: "Made from organic cotton or recycled materials. Sturdy design for grocery shopping.",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b",
      category: "Zero Waste Essentials",
      materials: [materialAnalysisData.find(m => m.name === "Organic Cotton")!],
      ecoScore: 8,
      seller: {
        id: "s2",
        name: "EcoWear"
      },
      reviews: [
        {
          id: "r12",
          userId: "u12",
          userName: "Grocery Shopper",
          rating: 5,
          text: "These totes hold a ton and are super strong. I use them for everything!",
          date: "2025-05-05"
        }
      ]
    },
    {
      id: "p13",
      name: "Biodegradable Loofahs",
      description: "Great for kitchen or bathroom use. Naturally antibacterial and compostable.",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1616918496825-3d4927a50ca3",
      category: "Zero Waste Essentials",
      materials: [materialAnalysisData.find(m => m.name === "Plant-based Compostable Materials")!],
      ecoScore: 9,
      seller: {
        id: "s4",
        name: "Zero Waste Home"
      },
      reviews: [
        {
          id: "r13",
          userId: "u13",
          userName: "Plastic Free Bathroom",
          rating: 4,
          text: "These loofahs clean well and I love that they're compostable when worn out!",
          date: "2025-05-10"
        }
      ]
    },
    {
      id: "p14",
      name: "Reusable Produce Bags",
      description: "For fruits, veggies, and bulk shopping. Set of 5 bags in different sizes.",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1610541012017-417f08ff1234",
      category: "Zero Waste Essentials",
      materials: [materialAnalysisData.find(m => m.name === "Organic Cotton")!],
      ecoScore: 8,
      seller: {
        id: "s1",
        name: "EcoLife Solutions"
      },
      reviews: [
        {
          id: "r14",
          userId: "u14",
          userName: "Plastic Free Shopper",
          rating: 5,
          text: "These bags are awesome for grocery shopping. No more plastic produce bags!",
          date: "2025-05-15"
        }
      ]
    },
    {
      id: "p15",
      name: "Stainless Steel Water Bottle",
      description: "Long-lasting alternative to plastic. Double-wall insulation keeps drinks hot or cold.",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
      category: "Zero Waste Essentials",
      materials: [materialAnalysisData.find(m => m.name === "Stainless Steel")!],
      ecoScore: 8,
      seller: {
        id: "s1",
        name: "EcoLife Solutions"
      },
      reviews: [
        {
          id: "r15",
          userId: "u15",
          userName: "Hydration Hero",
          rating: 5,
          text: "This bottle keeps my water cold all day and is super durable. Worth every penny!",
          date: "2025-05-20"
        }
      ]
    },
    
    {
      id: "p16",
      name: "Plantable Seed Pencils",
      description: "Write, then grow into herbs or flowers. Pack of 5 pencils with different seed varieties.",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1585032916832-05ec5ab6f9ac",
      category: "Sustainable Living",
      materials: [
        materialAnalysisData.find(m => m.name === "Recycled Paper")!,
        materialAnalysisData.find(m => m.name === "Plant-based Compostable Materials")!
      ],
      ecoScore: 9,
      seller: {
        id: "s5",
        name: "Nature's Pantry"
      },
      reviews: [
        {
          id: "r16",
          userId: "u16",
          userName: "Creative Gardener",
          rating: 4,
          text: "These pencils write well and then grow into plants when too short to use. So creative!",
          date: "2025-05-25"
        }
      ]
    },
    {
      id: "p17",
      name: "Home Composting Bin",
      description: "Compact and odor-controlled for indoor use. Includes charcoal filter and instructions.",
      price: 1499.99,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
      category: "Sustainable Living",
      materials: [
        materialAnalysisData.find(m => m.name === "Stainless Steel")!,
        materialAnalysisData.find(m => m.name === "Bamboo")!
      ],
      ecoScore: 8,
      seller: {
        id: "s1",
        name: "EcoLife Solutions"
      },
      reviews: [
        {
          id: "r17",
          userId: "u17",
          userName: "Urban Composter",
          rating: 5,
          text: "This compost bin is perfect for my apartment. No smells and easy to use!",
          date: "2025-06-01"
        }
      ]
    },
    {
      id: "p18",
      name: "Recycled Plastic Planters",
      description: "Eco-friendly planters made from recycled plastic. Set of 3 in different sizes.",
      price: 649.99,
      image: "https://images.unsplash.com/photo-1459156212016-c812468e2115",
      category: "Sustainable Living",
      materials: [materialAnalysisData.find(m => m.name === "Recycled Polyester")!],
      ecoScore: 7,
      seller: {
        id: "s4",
        name: "Zero Waste Home"
      },
      reviews: [
        {
          id: "r18",
          userId: "u18",
          userName: "Indoor Gardener",
          rating: 4,
          text: "These planters look great and it's nice knowing they're made from recycled plastic!",
          date: "2025-06-05"
        }
      ]
    },
    {
      id: "p19",
      name: "Solar-Powered Garden Lights",
      description: "Energy-saving outdoor lighting. Set of 4 pathway lights with warm white LEDs.",
      price: 999.99,
      image: "https://images.unsplash.com/photo-1558882224-dda166733046",
      category: "Sustainable Living",
      materials: [
        materialAnalysisData.find(m => m.name === "Recycled Polyester")!,
        materialAnalysisData.find(m => m.name === "Stainless Steel")!
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
          userName: "Garden Enthusiast",
          rating: 5,
          text: "These lights charge well during the day and provide beautiful lighting all evening!",
          date: "2025-06-10"
        }
      ]
    },
    {
      id: "p20",
      name: "Organic Seed Kits",
      description: "For growing herbs, veggies, or pollinator plants. Includes seeds, soil, and biodegradable pots.",
      price: 499.99,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      category: "Sustainable Living",
      materials: [
        materialAnalysisData.find(m => m.name === "Plant-based Compostable Materials")!,
        materialAnalysisData.find(m => m.name === "Recycled Paper")!
      ],
      ecoScore: 9,
      seller: {
        id: "s5",
        name: "Nature's Pantry"
      },
      reviews: [
        {
          id: "r20",
          userId: "u20",
          userName: "Urban Gardener",
          rating: 5,
          text: "Perfect starter kit! Everything you need to grow your own herbs and veggies.",
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
  const categories = ["All Products", "Household Items", "Personal Care", "Zero Waste Essentials", "Sustainable Living"];

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
