import Button from "@components/botoes/Button";
import CardCategoria from "@components/cards/CardCategoria";
import CardProduto from "@components/cards/CardProduto";
import NavBar from "@components/utilities/NavBar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@context/types";
import Nav from "@components/utilities/Nav";

const PerfilProduto = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "PerfilProduto">>();

  const {
    nome,
    quantidade,
    medida,
    descricao,
    validade,
    entrada,
    custo,
    margem,
    fornecedor,
    categoria,
    categoriaDescricao,
  } = route.params;

  return (
    <View style={styles.container}>
      <Nav
        titulo={nome}
        onBackPress={() => navigation.navigate("Produtos")}
        showPessoaFisicaIcon
      />
      <View style={styles.card}>
        <CardProduto
          nome={nome || "Example"}
          quantidade={quantidade}
          medida={medida}
          descricao={descricao || "Example"}
          validade={validade || "0000 / 00 / 00"}
          entrada={entrada || "0000 / 00 / 00"}
          custo={custo || "R$ 000 , 00 "}
          margem={margem || " 00 %"}
          fornecedor={fornecedor || "Example"}
        />
        <CardCategoria
          titulo={categoria || "Example"}
          descricao={categoriaDescricao || "Example"}
        />
      </View>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Button
          title="FECHAR"
          variant="outlined"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  card: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "column",
    gap: 7,
    margin: 3,
  },
});

export default PerfilProduto;
