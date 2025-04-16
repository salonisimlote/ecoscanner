
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart`);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-500 mb-6">Your cart is empty.</p>
        <Button asChild>
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center border rounded-lg p-4 bg-white">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            
            <div className="ml-4 flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="w-8 text-center">{item.quantity}</span>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="ml-6 text-right">
              <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 p-0 h-auto mt-1"
                onClick={() => handleRemoveItem(item.id, item.name)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <Separator className="my-6" />
      
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl">Total</span>
        <span className="font-bold text-xl">₹{totalPrice.toFixed(2)}</span>
      </div>
      
      <div className="mt-6 text-right">
        <Button asChild>
          <Link to="/checkout">Proceed to Checkout</Link>
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
