import React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeHeader from "@components/HomeHeader";
import { SideMenu } from "@components/SideMenu";
import CardRelatorios from "@components/CardRelatorios";
import { NavButton } from "@components/botoes/nav-buttons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@context/types";
import { useAuth } from "@context/AuthContext";
import { useTheme } from "@context/ThemeContext";

const Homepage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { colors } = useTheme();

  const mainMenu = [
    { icon: "account-group" as const, label: "Clientes", onPress: () => navigation.navigate("Clientes") },
    { icon: "cube-outline" as const, label: "Produtos", onPress: () => navigation.navigate("Produtos") },
    { icon: "truck-fast-outline" as const, label: "Fornecedores", onPress: () => navigation.navigate("Fornecedores") },
    { icon: "file-document-outline" as const, label: "Orçamentos", onPress: () => {}, disabled: true },
    { icon: "account-tie" as const, label: "Funcionários", onPress: () => navigation.navigate("Funcionarios") },
    { icon: "chart-bar" as const, label: "Relatórios", onPress: () => {}, disabled: true },
  ];

  const bottomMenu = [
    { icon: "cog" as const, label: "Configurações", onPress: () => {} },
    { icon: "help-circle" as const, label: "Ajuda", onPress: () => {} },
    {
      icon: "logout" as const,
      label: "Sair",
      onPress: async () => {
        await signOut();
        setMenuOpen(false);
      },
      danger: true,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HomeHeader onMenuToggle={() => setMenuOpen((v) => !v)} isMenuOpen={menuOpen} />
      <SideMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        menuItems={mainMenu}
        bottomItems={bottomMenu}
      />

      <View style={styles.contentWrapper}>
        <Text variant="titleMedium" style={[styles.sectionTitle, { color: colors.text }]}>
          Acesso Rápido
        </Text>
        <View style={styles.grid}>
          <NavButton
            icon="account-group"
            label="Clientes"
            description="Gerenciar cadastro de clientes"
            onClick={() => navigation.navigate("Clientes")}
            containerStyle={styles.gridItem}
          />
          <NavButton
            icon="cube-outline"
            label="Produtos"
            description="Catálogo e estoque"
            onClick={() => navigation.navigate("Produtos")}
            containerStyle={styles.gridItem}
          />
          <NavButton
            icon="truck-fast-outline"
            label="Fornecedores"
            description="Parceiros comerciais"
            onClick={() => navigation.navigate("Fornecedores")}
            containerStyle={styles.gridItem}
          />
          <NavButton
            icon="file-document-outline"
            label="Orçamentos"
            description="Criar e gerenciar propostas"
            disabled
            containerStyle={styles.gridItem}
          />
        </View>

        <Text variant="titleMedium" style={[styles.sectionTitle, { color: colors.text }]}>
          Mais Opções
        </Text>
        <View style={styles.grid}>
          <NavButton
            icon="account-tie"
            label="Funcionários"
            description="Equipe interna"
            onClick={() => navigation.navigate("Funcionarios")}
            containerStyle={styles.gridItem}
          />
          <NavButton
            icon="chart-bar"
            label="Relatórios"
            description="Em breve"
            disabled
            containerStyle={styles.gridItem}
          />
        </View>

        <View style={styles.cardsWrapper}>
          <CardRelatorios
            titulo="Relatórios"
            icon={<MaterialCommunityIcons name="chart-bar" size={20} color="#fff" />}
          />
        </View>
      </View>

      <StatusBar style={colors.background === "#ffffff" ? "light" : "dark"} />
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },
  sectionTitle: {
    marginTop: 12,
    marginBottom: 4,
    color: "#0f172a",
    fontWeight: "700",
  },
  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 12,
    rowGap: 12,
  },
  gridItem: {
    width: "48%",
  },
  cardsWrapper: {
    marginTop: 16,
    width: "100%",
    alignItems: "center",
    gap: 12,
  }
});
