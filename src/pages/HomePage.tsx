
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/contexts/ProductContext";

const HomePage = () => {
  const { 
    filteredProducts, 
    categories, 
    filterByCategory, 
    searchProducts 
  } = useProducts();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Products");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchProducts(searchQuery);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    filterByCategory(category);
  };

  useEffect(() => {
    // Initialize with all products
    filterByCategory("All Products");
  }, []);

  return (
    <div>
      <div className="text-center mb-10">
        <p className="text-sm text-primary mb-2">Sustainable Shopping Made Simple</p>
        <h1 className="text-3xl font-bold mb-4">Discover Eco-Friendly Products</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Find and compare sustainable products that match your values. Every purchase makes a 
          difference for our planet.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className="rounded-full"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <form 
        className="relative max-w-xl mx-auto mb-10"
        onSubmit={handleSearch}
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Search products..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
