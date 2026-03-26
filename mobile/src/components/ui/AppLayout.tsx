import React, { useState } from 'react';
import { View } from 'react-native';
import { SideMenu } from '@components/SideMenu';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@context/types';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [menuOpen, setMenuOpen] = useState(false);
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
      onPress: () => navigation.navigate('Orcamentos'),
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
        setMenuOpen(false);
      },
      danger: true,
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      {children}

      <SideMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        menuItems={mainMenu}
        bottomItems={bottomMenu}
      />
    </View>
  );
};
