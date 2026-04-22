import {
  createContext,
  useState,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../hooks/useLoading";
import { refreshToken } from "../services/auth.service";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User, accessToken: string) => void;
  logout: () => Promise<void>;
  clearAuth: () => void;
  isChecking: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export { AuthContext };

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  const hasCheckedRef = useRef(false);

  const clearAuth = useCallback(() => {
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
  }, []);

  const checkUser = useCallback(async () => {
    showLoading("Checking session...");

    try {
      const response = await refreshToken();

      if (response?.accessToken) {
        api.defaults.headers.common["Authorization"] =
          `Bearer ${response.accessToken}`;
        setUser(response.user);
      } else {
        clearAuth();
      }
    } catch (error) {
      clearAuth();
      console.error(error);
    } finally {
      setIsChecking(false);
      hideLoading();
    }
  }, [showLoading, hideLoading, clearAuth]);

  useEffect(() => {
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    checkUser();
  }, [checkUser]);

  const login = (userData: User, accessToken: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      clearAuth();
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, clearAuth, isChecking }}
    >
      {!isChecking && children}
    </AuthContext.Provider>
  );
};
