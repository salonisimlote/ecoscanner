
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Award, Box, LogOut, Package } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Order {
  id: string;
  userId: string;
  items: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: string;
  status: string;
  orderDate: string;
}

interface EcoData {
  name: string;
  score: number;
}

const getBadges = (orders: Order[]) => {
  const badges = [];
  
  if (orders.length >= 1) {
    badges.push({
      name: "First Order",
      description: "Completed your first eco-friendly purchase",
      icon: <Package className="h-8 w-8 text-primary" />
    });
  }
  
  if (orders.length >= 5) {
    badges.push({
      name: "Consistent Shopper",
      description: "Made 5 or more eco-friendly purchases",
      icon: <Award className="h-8 w-8 text-primary" />
    });
  }
  
  return badges;
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ecoData, setEcoData] = useState<EcoData[]>([]);
  
  useEffect(() => {
    if (user) {
      // Load orders from local storage
      const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      const userOrders = allOrders.filter((order: Order) => order.userId === user.id);
      setOrders(userOrders);
      
      // Generate eco impact data (in a real app, this would be calculated from actual purchase data)
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      const mockData = months.map((month) => ({
        name: month,
        score: Math.floor(Math.random() * 5) + 5 // Random score between 5-10
      }));
      
      setEcoData(mockData);
    }
  }, [user]);
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };
  
  const totalItems = orders.reduce((sum, order) => {
    return sum + order.items.reduce((itemsSum, item) => itemsSum + item.quantity, 0);
  }, 0);
  
  const sustainabilityScore = orders.length > 0 ? Math.min(Math.floor(orders.length * 0.8) + 6, 10) : 0;
  const badges = getBadges(orders);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Button variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{user?.name}</p>
            <p className="text-gray-500">{user?.email}</p>
            <p className="mt-2 capitalize text-primary font-medium">{user?.role}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Sustainability Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-2">
              <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-primary" 
                  style={{ width: `${sustainabilityScore * 10}%` }}
                ></div>
              </div>
              <span className="ml-2 text-lg font-bold">{sustainabilityScore}/10</span>
            </div>
            <p className="text-sm text-gray-500">
              Based on your eco-friendly purchases
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Purchase Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{orders.length}</p>
            <p className="text-gray-500">Total Orders</p>
            <Separator className="my-2" />
            <p className="text-2xl font-bold">{totalItems}</p>
            <p className="text-gray-500">Items Purchased</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="orders" className="mb-6">
        <TabsList>
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="eco-impact">Eco Impact</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View all your past orders</CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border p-4 rounded-md">
                      <div className="flex justify-between mb-2">
                        <p className="font-medium">Order #{order.id.slice(-6)}</p>
                        <p className="text-gray-500">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <p>{item.name} × {item.quantity}</p>
                            <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <p>Total</p>
                        <p>₹{order.totalAmount.toFixed(2)}</p>
                      </div>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">You haven't made any orders yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="eco-impact" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Eco Impact</CardTitle>
              <CardDescription>Track your sustainability journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ecoData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" name="Eco Score" fill="#84cc16" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Your eco-impact score is calculated based on the sustainability of your purchases. 
                Higher scores indicate more eco-friendly shopping habits.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="badges" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievement Badges</CardTitle>
              <CardDescription>Rewards for your eco-friendly shopping</CardDescription>
            </CardHeader>
            <CardContent>
              {badges.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {badges.map((badge) => (
                    <div key={badge.name} className="border p-4 rounded-md flex items-center space-x-4">
                      {badge.icon}
                      <div>
                        <p className="font-semibold">{badge.name}</p>
                        <p className="text-sm text-gray-500">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Box className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                  <p className="font-medium">No Badges Yet</p>
                  <p className="text-sm text-gray-500">Make eco-friendly purchases to earn badges</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
