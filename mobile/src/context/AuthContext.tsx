import React, { createContext, useContext, useEffect, useState } from 'react';
import { postLogin, postLogout } from '../api/apiAuth';
import Toast from 'react-native-toast-message';
import authConfig from '../configs/auth';
import { secureStore } from '../utils/secureStore';
import { setAuthToken } from 'src/services/api';
import { formatErrorMessage } from '@core/utils/format';

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
  signIn: async () => {},
  signOut: async () => {},
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

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    try {
      const { token, user } = await postLogin(email, password);

      setToken(token);
      setUser(user);

      await secureStore.set(authConfig.storageTokenKeyName, token);
      await secureStore.set(authConfig.userDataKeyName, JSON.stringify(user));
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro no login',
        text2: formatErrorMessage(error, 'Erro no login'),
        visibilityTime: 1000,
        topOffset: 50,
        props: { rightOffset: 40 },
      });

      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await postLogout();
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao sair',
        text2: formatErrorMessage(e, 'Erro ao sair:'),
      });
    } finally {
      setToken(null);
      setUser(null);
      setAuthToken(null);
      await secureStore.remove(authConfig.storageTokenKeyName);
      await secureStore.remove(authConfig.userDataKeyName);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
