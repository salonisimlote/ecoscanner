
import React, { createContext, useContext, useState, useEffect } from "react";

type UserRole = "buyer" | "seller" | null;

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call to authenticate the user
    // For demo purposes, we're simulating a successful login
    
    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Check if email exists in our mock database
    const mockUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");
    const foundUser = mockUsers.find((u: any) => u.email === email);
    
    if (!foundUser || foundUser.password !== password) {
      throw new Error("Invalid email or password");
    }
    
    const userData: User = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
      role: foundUser.role,
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    // In a real app, this would be an API call to register the user
    // For demo purposes, we're simulating a successful registration
    
    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Create a new mock user
    const mockUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");
    
    // Check if user already exists
    if (mockUsers.some((u: any) => u.email === email)) {
      throw new Error("User with this email already exists");
    }
    
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password, // In a real app, this would be hashed
      role,
    };
    
    // Add to mock database
    mockUsers.push(newUser);
    localStorage.setItem("mockUsers", JSON.stringify(mockUsers));
    
    // Log the user in
    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
