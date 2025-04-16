
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/contexts/ProductContext";
import { toast } from "sonner";

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

  // Use a fallback image if the product image is missing or invalid
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder.svg";
  };

  // Check if the image URL is valid, use placeholder if it's not
  const imageSrc = product.image && product.image.trim() !== "" 
    ? product.image 
    : "/placeholder.svg";

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
        <div className="relative">
          <img
            src={imageSrc}
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
