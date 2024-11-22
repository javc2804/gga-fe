import React, { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  auth: null | string;
  setAuth: React.Dispatch<React.SetStateAction<null | string>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<null | string>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
