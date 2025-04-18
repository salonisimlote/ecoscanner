
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";
import { useProducts } from "@/contexts/ProductContext";
import { toast } from "sonner";

const productImages = [
  "/lovable-uploads/48e78506-b064-4bf0-bbc4-4706ef97cab0.png", // Bamboo products
  "/lovable-uploads/6c5e88ad-caba-4d39-8d51-68393ff28a39.png", // Cotton bag
  "/lovable-uploads/b90fe92b-3ab9-4598-b293-fb0ff04638fd.png", // Bamboo toothbrush
  "/lovable-uploads/ef8d3787-fac3-48f1-ab62-801ef67e6301.png", // Natural soap
];

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    });
    
    toast.success(`${product.name} added to cart`);
  };

  const getEcoScoreClass = (score: number) => {
    if (score >= 7) return "eco-score-high";
    if (score >= 5) return "eco-score-medium";
    return "eco-score-low";
  };

  const getProductImage = (id: string) => {
    const idSum = id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const imageIndex = idSum % productImages.length;
    return productImages[imageIndex];
  };

  const getImageSrc = () => {
    if (product.image && product.image.trim() !== "" && !product.image.includes("placeholder")) {
      return product.image;
    }
    return getProductImage(product.id);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = getProductImage(product.id);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
        <div className="relative">
          <img
            src={getImageSrc()}
            alt={product.name}
            className="w-full aspect-square object-cover"
            onError={handleImageError}
          />
          <div className="absolute top-2 right-2">
            <span className={`eco-score ${getEcoScoreClass(product.ecoScore)}`}>
              Score: {product.ecoScore}/10
            </span>
          </div>
        </div>
        <CardContent className="p-4 flex-1">
          <h3 className="font-semibold text-lg truncate">{product.name}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {product.description}
          </p>
          <p className="font-medium mt-2">₹{product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            variant="outline" 
            className="w-full gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
