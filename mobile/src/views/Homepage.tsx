import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native-paper';
import HomeHeader from '@components/HomeHeader';
import { NavButton } from '@components/botoes/nav-buttons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@context/types';
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';

const Homepage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user, signOut } = useAuth();
  const { colors } = useTheme();

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
            <NavButton
              icon="account-group"
              label="Clientes"
              description="Gerenciar cadastro de clientes"
              onClick={() => navigation.navigate('Clientes')}
              containerStyle={styles.gridItem}
            />
            <NavButton
              icon="cube-outline"
              label="Produtos"
              description="Catálogo e estoque"
              onClick={() => navigation.navigate('Produtos')}
              containerStyle={styles.gridItem}
            />
            <NavButton
              icon="truck-fast-outline"
              label="Fornecedores"
              description="Parceiros comerciais"
              onClick={() => navigation.navigate('Fornecedores')}
              containerStyle={styles.gridItem}
            />
            <NavButton
              icon="file-document-outline"
              label="Orçamentos"
              description="Criar e gerenciar propostas"
              onClick={() => navigation.navigate('Orcamentos')}
              containerStyle={styles.gridItem}
            />
            <NavButton
              icon="account-tie"
              label="Funcionários"
              description="Equipe interna"
              onClick={() => navigation.navigate('Funcionarios')}
              containerStyle={styles.gridItem}
            />
            <NavButton
              icon="chart-bar"
              label="Relatórios"
              description="Em breve"
              onClick={() => navigation.navigate('Relatorios')}
              containerStyle={styles.gridItem}
            />
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
              label="Funcionários"
              description="Equipe interna"
              onClick={() => navigation.navigate('Funcionarios')}
              containerStyle={styles.gridItem}
            />
            <NavButton
              icon="help-circle"
              label="Relatórios"
              description="Em breve"
              containerStyle={styles.gridItem}
            />
          </View>
        </View>

        <StatusBar style={colors.background === '#ffffff' ? 'light' : 'dark'} />
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
    columnGap: 18,
    rowGap: 47,
  },
  gridItem: {
    width: '48%',
  },
  cardsWrapper: {
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
});
