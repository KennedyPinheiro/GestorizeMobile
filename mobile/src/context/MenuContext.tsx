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

  const handleMenuAction = (action: () => void | Promise<void>) => {
    setIsOpen(false);
    action();
  };
  const mainMenu = [
    {
      icon: 'account-group' as const,
      label: 'Clientes',
      onPress: () => handleMenuAction(() => navigation.navigate('Clientes')),
    },
    {
      icon: 'cube-outline' as const,
      label: 'Produtos',
      onPress: () => handleMenuAction(() => navigation.navigate('Produtos')),
    },
    {
      icon: 'truck-fast-outline' as const,
      label: 'Fornecedores',
      onPress: () =>
        handleMenuAction(() => navigation.navigate('Fornecedores')),
    },
    {
      icon: 'file-document-outline' as const,
      label: 'Orçamentos',
      onPress: () => handleMenuAction(() => navigation.navigate('Orcamentos')),
    },
    {
      icon: 'account-tie' as const,
      label: 'Funcionários',
      onPress: () =>
        handleMenuAction(() => navigation.navigate('Funcionarios')),
    },
  ];

  const bottomMenu = [
    {
      icon: 'cog' as const,
      label: 'Configurações',
      onPress: () => handleMenuAction(() => {}),
    },
    {
      icon: 'help-circle' as const,
      label: 'Ajuda',
      onPress: () => handleMenuAction(() => {}),
    },
    {
      icon: 'logout' as const,
      label: 'Sair',
      onPress: () =>
        handleMenuAction(async () => {
          await signOut();
        }),
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
