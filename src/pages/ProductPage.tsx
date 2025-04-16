
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Star } from "lucide-react";
import { useProducts } from "@/contexts/ProductContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { Product } from "@/contexts/ProductContext";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  
  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        navigate("/");
        toast.error("Product not found");
      }
    }
  }, [id, getProductById, navigate]);
  
  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p>Loading product...</p>
      </div>
    );
  }
  
  const handleAddToCart = () => {
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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg aspect-square object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-lg font-medium mt-2">₹{product.price.toFixed(2)}</p>
          
          <div className="mt-4">
            <span className={`eco-score ${getEcoScoreClass(product.ecoScore)}`}>
              Eco-Score: {product.ecoScore}/10
            </span>
          </div>
          
          <p className="mt-4 text-gray-700">{product.description}</p>
          
          <div className="mt-6">
            <h3 className="font-semibold">Materials:</h3>
            <ul className="mt-2 space-y-2">
              {product.materials.map((material) => (
                <li key={material.name} className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <div>
                    <span className="font-medium">{material.name}</span>
                    <p className="text-sm text-gray-600">{material.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            className="mt-6 w-full"
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
          
          <p className="mt-4 text-sm text-gray-500">
            Sold by: {product.seller.name}
          </p>
        </div>
      </div>
      
      <Separator className="my-10" />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        
        {product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div key={review.id} className="border p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium">{review.userName}</span>
                  <span className="ml-auto text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
