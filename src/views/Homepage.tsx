import Card from "@components/CardOrcamentos";
import HomeButton from "@components/botoes/HomeButton";
import NavBar from "@components/utilities/NavBar";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CardRelatorios from "@components/CardRelatorios";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "@context/AuthContext";

const Homepage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { roleId } = useAuth();

  return (
    <View style={styles.container}>
      <NavBar title="TELA INICIAL" backButton={true} />

      <View style={styles.contentWrapper}>
        <View style={styles.topCardWrapper}>
          <Card
            titulo="Orçamentos"
            icon={
              <MaterialCommunityIcons
                name="file-document-edit-outline"
                size={20}
                color="#fff"
              />
            }
          />
        </View>

        <View style={styles.buttonGroup}>
          {roleId === 1 && (
            <HomeButton
              title="FUNCIONARIOS"
              icon={
                <MaterialCommunityIcons
                  name="account-plus"
                  size={24}
                  color="#fff"
                />
              }
              variant="contained"
              onPress={() => navigation.navigate("Funcionarios")}
            />
          )}

          <HomeButton
            title="CLIENTES"
            icon={
              <MaterialCommunityIcons
                name="account-plus"
                size={24}
                color="#fff"
              />
            }
            variant="contained"
            onPress={() => navigation.navigate("Clientes")}
          />
          <HomeButton
            title="PRODUTOS"
            icon={
              <MaterialCommunityIcons
                name="cube-outline"
                size={24}
                color="#fff"
              />
            }
            variant="contained"
            onPress={() => navigation.navigate("Produtos")}
          />
          <HomeButton
            title="FORNECEDORES"
            icon={
              <MaterialCommunityIcons
                name="account-tie"
                size={24}
                color="#fff"
              />
            }
            variant="contained"
            onPress={() => navigation.navigate("Fornecedores")}
          />
          <HomeButton
            title="ORÇAMENTOS"
            icon={
              <MaterialCommunityIcons
                name="file-document-outline"
                size={24}
                color="#433d3d"
              />
            }
            variant="contained"
            disabled={true}
          />
        </View>

        <View style={styles.cardsWrapper}>
          <CardRelatorios
            titulo="Relatórios"
            icon={
              <MaterialCommunityIcons name="chart-bar" size={20} color="#fff" />
            }
          />
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f3",
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: "center",
    gap: 25,
  },
  topCardWrapper: {
    marginTop: 70,
    width: "100%",
  },
  buttonGroup: {
    width: "100%",
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
