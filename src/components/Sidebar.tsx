
import { Link } from "react-router-dom";
import { User, Store, HeadphonesIcon, Phone, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const { isAuthenticated, user } = useAuth();

  return (
    <aside 
      className={`fixed top-0 left-0 z-30 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 md:relative md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="text-xl font-semibold">
            EcoScanner
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden" 
            onClick={toggleSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="flex-1">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">Profile</h3>
          <ul className="space-y-2">
            <li>
              <Link 
                to={isAuthenticated ? "/profile" : "/login"} 
                className="flex items-center gap-2 text-gray-700 hover:text-primary p-2 rounded-md hover:bg-accent"
                onClick={() => toggleSidebar()}
              >
                <User className="h-4 w-4" />
                <span>My Profile</span>
              </Link>
            </li>
            <li>
              <Link 
                to={isAuthenticated && user?.role === "seller" ? "/seller-dashboard" : "/seller-dashboard"} 
                className="flex items-center gap-2 text-gray-700 hover:text-primary p-2 rounded-md hover:bg-accent"
                onClick={() => toggleSidebar()}
              >
                <Store className="h-4 w-4" />
                <span>Become a Seller</span>
              </Link>
            </li>
          </ul>
          
          <Separator className="my-4" />
          
          <h3 className="text-sm font-semibold text-gray-500 mb-2">Help & Support</h3>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/customer-care" 
                className="flex items-center gap-2 text-gray-700 hover:text-primary p-2 rounded-md hover:bg-accent"
                onClick={() => toggleSidebar()}
              >
                <HeadphonesIcon className="h-4 w-4" />
                <span>Customer Care</span>
              </Link>
            </li>
          </ul>
          
          <div className="mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-2 mb-1">
              <Phone className="h-3 w-3" />
              <span>Call us: +91 902-147-8902</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3 w-3" />
              <span>Email: ecohelp.care@gmail.com</span>
            </div>
          </div>
        </nav>
        
        <Separator className="my-4" />
        
        <div className="mt-auto">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">Founders</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Asmita Bag</li>
            <li>Saloni Simlote</li>
            <li>Safal Goyal</li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
