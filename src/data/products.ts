import { Product } from "../types/product";
import { materialAnalysisData } from "./materials";

export const generateSampleProducts = (): Product[] => {
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
