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
import { isFuncionarioUser } from '@utils/permissions';

const Homepage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const { user } = useAuth();
  const isFuncionario = isFuncionarioUser(user);

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
              description="Cadastre, edite e acompanhe seus clientes"
              onClick={() => navigation.navigate('Clientes')}
              containerStyle={styles.gridItem}
            />

            {!isFuncionario && (
              <>
                <NavButton
                  icon="cube-outline"
                  label="Produtos"
                  description="Gerencie catálogo, preços e estoque"
                  onClick={() => navigation.navigate('Produtos')}
                  containerStyle={styles.gridItem}
                />

                <NavButton
                  icon="truck-fast-outline"
                  label="Fornecedores"
                  description="Controle parceiros e histórico de compras"
                  onClick={() => navigation.navigate('Fornecedores')}
                  containerStyle={styles.gridItem}
                />
              </>
            )}

            <NavButton
              icon="file-document-outline"
              label="Orçamentos"
              description="Crie, organize e acompanhe propostas"
              onClick={() => navigation.navigate('Orcamentos')}
              containerStyle={styles.gridItem}
            />

            {!isFuncionario && (
              <>
                <NavButton
                  icon="account-tie"
                  label="Funcionários"
                  description="Gerencie equipe, funções e acessos"
                  onClick={() => navigation.navigate('Funcionarios')}
                  containerStyle={styles.gridItem}
                />

                <NavButton
                  icon="chart-bar"
                  label="Relatórios"
                  description="Visualize métricas e desempenhos"
                  onClick={() => navigation.navigate('Relatorios')}
                  containerStyle={styles.gridItem}
                />
              </>
            )}
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
              onClick={() => {}}
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
