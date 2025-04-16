
import { Link } from "react-router-dom";
import { Camera, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={isHomePage ? "mr-2" : "mr-2 md:hidden"}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="text-xl font-semibold">
            EcoScanner
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link to="/scanner">
              <Camera className="h-5 w-5" />
            </Link>
          </Button>
          
          <Button variant="outline" size="icon" asChild className="relative">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>
          
          <Button variant="outline" size="icon" asChild>
            <Link to={isAuthenticated ? "/profile" : "/login"}>
              <User className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
