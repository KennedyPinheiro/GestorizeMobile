import React, { createContext, useContext, useEffect, useState } from "react";
import { postLogin, postLogout } from "../api/apiAuth";
import authConfig from "../configs/auth";
import { secureStore } from "../utils/secureStore";
import { setAuthToken } from "src/services/api";

type AuthContextType = {
  token: string | null;
  user: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  loading: true,
  signIn: async () => { },
  signOut: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredAuth = async () => {
      const storedToken = await secureStore.get(authConfig.storageTokenKeyName);
      const storedUser = await secureStore.get(authConfig.userDataKeyName);

      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser));

      setLoading(false);
    };

    loadStoredAuth();
  }, []);

  const signOut = async () => {
    try {
      await postLogout();
    } catch (e) {
      console.log("Backend não respondeu, mas o usuário já vazou 😎");
    } finally {
      setToken(null);
      setUser(null);
      setAuthToken(null);
      await secureStore.remove(authConfig.storageTokenKeyName);
      await secureStore.remove(authConfig.userDataKeyName);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    try {
      const response = await postLogin(email, password);
      const newToken = response?.token ?? null;
      const newUser = response?.user ?? null;
      console.log("TOKEN:", newToken);
      setToken(newToken);
      setUser(newUser);
      await secureStore.set(authConfig.storageTokenKeyName, newToken);
      if (newUser) {
        await secureStore.set(
          authConfig.userDataKeyName,
          JSON.stringify(newUser)
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);