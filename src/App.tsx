
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ProductProvider } from "./contexts/ProductContext";
import { ScannerProvider } from "./contexts/ScannerContext";
import { useEffect } from "react";
import { initMockData } from "./utils/initMockData";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import SellerDashboard from "./pages/SellerDashboard";
import ScannerPage from "./pages/ScannerPage";
import ScanResultsPage from "./pages/ScanResultsPage";
import CustomerCarePage from "./pages/CustomerCarePage";
import ProtectedRoute from "./components/ProtectedRoute";

const AppWithProviders = () => {
  const queryClient = new QueryClient();
  
  useEffect(() => {
    // Initialize mock data
    initMockData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <ProductProvider>
            {/* Fixed TypeScript error by explicitly typing materials */}
            {(materials: any) => (
              <ScannerProvider materials={materials}>
                <CartProvider>
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="product/:id" element={<ProductPage />} />
                        <Route path="cart" element={<CartPage />} />
                        <Route path="customer-care" element={<CustomerCarePage />} />
                        <Route 
                          path="checkout" 
                          element={
                            <ProtectedRoute>
                              <CheckoutPage />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="profile" 
                          element={
                            <ProtectedRoute>
                              <ProfilePage />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="seller-dashboard" 
                          element={
                            <ProtectedRoute requireRole="seller">
                              <SellerDashboard />
                            </ProtectedRoute>
                          } 
                        />
                        <Route path="scanner" element={<ScannerPage />} />
                        <Route path="scan-results" element={<ScanResultsPage />} />
                        <Route path="*" element={<NotFound />} />
                      </Route>
                    </Routes>
                  </BrowserRouter>
                </CartProvider>
              </ScannerProvider>
            )}
          </ProductProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default AppWithProviders;
