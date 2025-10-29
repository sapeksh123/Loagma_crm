import { createContext, useContext, useState, useEffect } from "react";
import type { User, UserRole } from "@shared/schema";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("crm_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const mockUsers: User[] = [
      { id: "1", username: "admin", password: "admin123", email: "admin@company.com", fullName: "John Admin", role: "admin", phone: "+1-555-0001", createdAt: new Date() },
      { id: "2", username: "manager", password: "manager123", email: "manager@company.com", fullName: "Sarah Manager", role: "sales_manager", phone: "+1-555-0002", createdAt: new Date() },
      { id: "3", username: "sales", password: "sales123", email: "sales@company.com", fullName: "Mike Executive", role: "sales_executive", phone: "+1-555-0003", createdAt: new Date() },
      { id: "4", username: "accountant", password: "account123", email: "accountant@company.com", fullName: "Lisa Accountant", role: "accountant", phone: "+1-555-0004", createdAt: new Date() },
      { id: "5", username: "engineer", password: "eng123", email: "engineer@company.com", fullName: "Tom Engineer", role: "engineer", phone: "+1-555-0005", createdAt: new Date() },
      { id: "6", username: "client", password: "client123", email: "client@example.com", fullName: "Jane Client", role: "client", phone: "+1-555-0006", createdAt: new Date() },
    ];

    const foundUser = mockUsers.find(u => u.username === username && u.password === password);
    if (foundUser) {
      const userWithoutPassword = { ...foundUser, password: "" };
      setUser(userWithoutPassword);
      localStorage.setItem("crm_user", JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("crm_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
