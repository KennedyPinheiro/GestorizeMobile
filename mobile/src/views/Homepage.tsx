import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native-paper';
import HomeHeader from '@components/HomeHeader';
import { NavButton } from '@components/botoes/nav-buttons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@context/types';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { canAccessRoute } from '@utils/permissions';

const Homepage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const { user } = useAuth();

  const quickActions = [
    {
      route: 'Clientes' as const,
      icon: 'account-group' as const,
      label: 'Clientes',
      description: 'Cadastre, edite e acompanhe seus clientes',
    },
    {
      route: 'Produtos' as const,
      icon: 'cube-outline' as const,
      label: 'Produtos',
      description: 'Gerencie catálogo, preços e estoque',
    },
    {
      route: 'Fornecedores' as const,
      icon: 'truck-fast-outline' as const,
      label: 'Fornecedores',
      description: 'Controle parceiros e histórico de compras',
    },
    {
      route: 'Orcamentos' as const,
      icon: 'file-document-outline' as const,
      label: 'Orçamentos',
      description: 'Crie, organize e acompanhe propostas',
    },
    {
      route: 'Funcionarios' as const,
      icon: 'account-tie' as const,
      label: 'Funcionários',
      description: 'Gerencie equipe, funções e acessos',
    },
    {
      route: 'Relatorios' as const,
      icon: 'chart-bar' as const,
      label: 'Relatórios',
      description: 'Visualize métricas e desempenhos',
    },
  ].filter((item) => canAccessRoute(user, item.route));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HomeHeader />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.contentWrapper}>
          <Text
            variant="titleMedium"
            style={[styles.sectionTitle, { color: colors.text }]}
          >
            Acesso Rápido
          </Text>
          <View style={styles.grid}>
            {quickActions.map((item) => (
              <NavButton
                key={item.route}
                icon={item.icon}
                label={item.label}
                description={item.description}
                onClick={() => navigation.navigate(item.route)}
                containerStyle={styles.gridItem}
              />
            ))}
          </View>

          <Text
            variant="titleMedium"
            style={[styles.sectionTitle, { color: colors.text }]}
          >
            Mais Opções
          </Text>
          <View style={styles.grid}>
            <NavButton
              icon="cog"
              label="Configurações"
              description="Personalize preferências e ajustes do sistema"
              onClick={() => navigation.navigate('Configuracoes')}
              containerStyle={styles.gridItem}
            />

            <NavButton
              icon="help-circle"
              label="Ajuda"
              description="Suporte, dúvidas frequentes e orientações"
              onClick={() => navigation.navigate('Ajuda')}
              containerStyle={styles.gridItem}
            />
          </View>
        </View>

        <StatusBar style={colors.background === '#ffffff' ? 'dark' : 'light'} />
      </ScrollView>
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 4,
    color: '#0f172a',
    fontWeight: '800',
    fontSize: 18,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 12,
    rowGap: 18,
  },
  gridItem: {
    flexBasis: '47%',
    flexGrow: 1,
  },
  cardsWrapper: {
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
});
