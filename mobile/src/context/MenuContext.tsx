import React, { createContext, useContext, useState } from 'react';
import { SideMenu } from '@components/SideMenu';
import { NavigationContainerRef } from '@react-navigation/native';
import { useAuth } from '@context/AuthContext';
import { RootStackParamList } from '@context/types';
import { isFuncionarioUser } from '@utils/permissions';

type MenuContextType = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const MenuContext = createContext({} as MenuContextType);

type MenuProviderProps = {
  children: React.ReactNode;
  navigationRef: React.RefObject<NavigationContainerRef<RootStackParamList> | null>;
};

export const MenuProvider = ({ children, navigationRef }: MenuProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { signOut, user } = useAuth();
  const isFuncionario = isFuncionarioUser(user);

  const handleMenuAction = (action: () => void | Promise<void>) => {
    setIsOpen(false);
    action();
  };

  const navigate = <T extends keyof RootStackParamList>(screen: T) => {
    if (navigationRef.current?.isReady()) {
      navigationRef.current.navigate(screen as never);
    }
  };

  const allMainMenu = [
    {
      icon: 'account-group' as const,
      label: 'Clientes',
      onPress: () => handleMenuAction(() => navigate('Clientes')),
    },
    {
      icon: 'cube-outline' as const,
      label: 'Produtos',
      onPress: () => handleMenuAction(() => navigate('Produtos')),
    },
    {
      icon: 'truck-fast-outline' as const,
      label: 'Fornecedores',
      onPress: () => handleMenuAction(() => navigate('Fornecedores')),
    },
    {
      icon: 'file-document-outline' as const,
      label: 'Orçamentos',
      onPress: () => handleMenuAction(() => navigate('Orcamentos')),
    },
    {
      icon: 'account-tie' as const,
      label: 'Funcionários',
      onPress: () => handleMenuAction(() => navigate('Funcionarios')),
    },
    {
      icon: 'chart-bar' as const,
      label: 'Relatórios',
      onPress: () => handleMenuAction(() => navigate('Relatorios')),
    },
  ];

  const mainMenu = isFuncionario
    ? allMainMenu.filter(
        (item) => item.label === 'Clientes' || item.label === 'Orçamentos',
      )
    : allMainMenu;

  const bottomMenu = [
    {
      icon: 'cog' as const,
      label: 'Configurações',
      onPress: () => handleMenuAction(() => navigate('Configuracoes')),
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
