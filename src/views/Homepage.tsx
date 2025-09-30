import Card from "@components/CardOrcamentos";
import HomeButton from "@components/botoes/HomeButton";
import NavBar from "@components/utilities/NavBar";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CardRelatorios from "@components/CardRelatorios";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "@context/AuthContext";
import { RootStackParamList } from "@context/types";
import { SafeAreaView } from "react-native-safe-area-context";

const Homepage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { roleId } = useAuth();

  type ButtonConfig = {
    title: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    onPress?: () => void;
    disabled?: boolean;
    visible?: boolean;
  };

  const buttons: ButtonConfig[] = [
    {
      title: "FUNCIONARIOS",
      icon: "account-plus",
      onPress: () => navigation.navigate("Funcionarios"),
      visible: roleId === 1,
    },
    {
      title: "CLIENTES",
      icon: "account-plus",
      onPress: () => navigation.navigate("Clientes"),
    },
    {
      title: "PRODUTOS",
      icon: "cube-outline",
      onPress: () => navigation.navigate("Produtos"),
    },
    {
      title: "FORNECEDORES",
      icon: "account-tie",
      onPress: () => navigation.navigate("Fornecedores"),
    },
    {
      title: "ORÇAMENTOS",
      icon: "file-document-outline",
      disabled: true,
    },
  ];

  return (
    <View style={styles.container}>
      <NavBar title="TELA INICIAL" backButton={true} />
      <SafeAreaView style={styles.contentWrapper}>
        <View style={styles.buttonGroup}>
          <Card titulo="ORÇAMENTOS" />
          {buttons
            .filter((button) => button.visible === undefined || button.visible)
            .map((button) => (
              <HomeButton
                key={button.title}
                title={button.title}
                icon={
                  <MaterialCommunityIcons
                    name={button.icon}
                    size={24}
                    color="#fff"
                  />
                }
                type="dialog"
                color="primary"
                onPress={button.onPress}
                disabled={button.disabled}
              />
            ))}
          <CardRelatorios titulo="RELATORIOS" />
        </View>
      </SafeAreaView>
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
    alignItems: "center",
    gap: 12,
  },
  topCardWrapper: {
    width: "100%",
  },
  buttonGroup: {
    width: "95%",
    alignItems: "center",
    gap: 12,
  },
  cardsWrapper: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
});
