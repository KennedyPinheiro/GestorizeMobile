import React, { createContext, useContext, useState } from 'react';
import { SideMenu } from '@components/SideMenu';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@context/types';

type MenuContextType = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const MenuContext = createContext({} as MenuContextType);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { signOut } = useAuth();

  const mainMenu = [
    {
      icon: 'account-group' as const,
      label: 'Clientes',
      onPress: () => navigation.navigate('Clientes'),
    },
    {
      icon: 'cube-outline' as const,
      label: 'Produtos',
      onPress: () => navigation.navigate('Produtos'),
    },
    {
      icon: 'truck-fast-outline' as const,
      label: 'Fornecedores',
      onPress: () => navigation.navigate('Fornecedores'),
    },
    {
      icon: 'file-document-outline' as const,
      label: 'Orçamentos',
      onPress: () => {},
      disabled: true,
    },
    {
      icon: 'account-tie' as const,
      label: 'Funcionários',
      onPress: () => navigation.navigate('Funcionarios'),
    },
    {
      icon: 'chart-bar' as const,
      label: 'Relatórios',
      onPress: () => {},
      disabled: true,
    },
  ];

  const bottomMenu = [
    { icon: 'cog' as const, label: 'Configurações', onPress: () => {} },
    { icon: 'help-circle' as const, label: 'Ajuda', onPress: () => {} },
    {
      icon: 'logout' as const,
      label: 'Sair',
      onPress: async () => {
        await signOut();
      },
      danger: true,
    },
  ];

  return (
    <MenuContext.Provider
      value={{
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        isOpen,
      }}
    >
      {children}

      <SideMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        menuItems={mainMenu}
        bottomItems={bottomMenu}
      />
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
