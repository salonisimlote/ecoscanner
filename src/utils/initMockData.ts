
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
      name: "EcoLife Solutions",
      email: "ecolife@example.com",
      password: "password123",
      role: "seller"
    },
    {
      id: "user_3",
      name: "Zero Waste Home",
      email: "zerowaste@example.com",
      password: "password123",
      role: "seller"
    },
    {
      id: "user_4",
      name: "Pure Beauty",
      email: "purebeauty@example.com",
      password: "password123",
      role: "seller"
    },
    {
      id: "user_5",
      name: "EcoWear",
      email: "ecowear@example.com",
      password: "password123",
      role: "seller"
    },
    {
      id: "user_6",
      name: "Nature's Pantry",
      email: "naturespantry@example.com",
      password: "password123",
      role: "seller"
    },
    {
      id: "user_7",
      name: "Green Tech",
      email: "greentech@example.com",
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
