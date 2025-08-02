import { createContext, useState, type ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = (email: string, password: string) => {
    // Simple mock authentication
    if (email && password) {
      setUser({
        name: email.split("@")[0],
        email: email,
      });
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError("Please enter email and password");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
