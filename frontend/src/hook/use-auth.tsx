"use client";
import { getUser , getToken, setAuthData } from "@/api/utils";
import React, {
  useState,
  createContext,
  useContext,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isSignInDialogOpen: boolean;
  setIsSignInDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSignUpDialogOpen: boolean;
  setIsSignUpDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isChangePasswordDialogOpen: boolean;
  setIsChangePasswordDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null >>;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isSignInDialogOpen: false,
  setIsSignInDialogOpen: () => {},
  isSignUpDialogOpen: false,
  setIsSignUpDialogOpen: () => {},
  isChangePasswordDialogOpen: false,
  setIsChangePasswordDialogOpen: () => {},
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
});

export type User = {
  name: string;
  email: string;
  image?: string;
  id: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
};
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
 // Initialize state directly from localStorage
  const storedUser = getUser();
  const storedToken = getToken();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!storedUser && !!storedToken
  );
  const [user, setUser] = useState<User | null>(storedUser);
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false);
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);

   // helper to login user
  const login = (userData: User, token: string) => {
    setUser(userData);
    setIsAuthenticated(true);
    setAuthData(token, userData);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setAuthData(null, null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isSignInDialogOpen,
        setIsSignInDialogOpen,
        isSignUpDialogOpen,
        setIsSignUpDialogOpen,
        isChangePasswordDialogOpen,
        setIsChangePasswordDialogOpen,
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


