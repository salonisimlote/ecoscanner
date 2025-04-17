
// This file initializes mock data for the demo application
// In a real application, this would be handled by a backend API

export const initMockData = () => {
  // Check if mock data is already initialized
  if (localStorage.getItem("mockDataInitialized")) {
    return;
  }
  
  // Initialize mock users
  const mockUsers = [
    {
      id: "user_1",
      name: "Demo User",
      email: "demo@example.com",
      password: "password123",
      role: "buyer"
    },
    {
      id: "user_2",
      name: "Demo Seller",
      email: "seller@example.com",
      password: "password123",
      role: "seller"
    }
  ];
  
  localStorage.setItem("mockUsers", JSON.stringify(mockUsers));
  
  // Initialize mock orders (empty array)
  localStorage.setItem("orders", JSON.stringify([]));
  
  // Mark mock data as initialized
  localStorage.setItem("mockDataInitialized", "true");
};
