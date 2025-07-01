import Button from "@components/botoes/Button";
import NavBar from "@components/utilities/NavBar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@context/types";
import CardFornecedor from "@components/cards/CardFornecedor";
import CardEndereco from "@components/cards/CardEndereco";
import Nav from "@components/utilities/Nav";

const PerfilFornecedor = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "PerfilFornecedor">>();

  const {
    razao_social,
    cnpj,
    email,
    ramo_de_atividade,
    telefone,
    nome_responsavel,
    chave_pix,
    rua,
    bairro,
    cidade,
    estado,
    cep,
    numero,
  } = route.params;

  return (
    <View style={styles.container}>
      <Nav
        titulo={razao_social}
        onBackPress={() => navigation.navigate("Fornecedores")}
        showFornecedorIcon
      />
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 15,
          flexDirection: "column",
          gap: 7,
          margin: 3,
        }}
      >
        <CardFornecedor
          razaoSocial={razao_social || "Não informado"}
          email={email || "Não informado"}
          cnpj={cnpj || "Não informado"}
          nomeResponsavel={nome_responsavel || "Não informado"}
          ramo_atividade={ramo_de_atividade || "Não informado"}
          telefone={telefone || "Não informado"}
          chave_pix={chave_pix || "Não informado"}
        />
        <CardEndereco
          rua={rua}
          bairro={bairro}
          cidade={cidade}
          estado={estado}
          numero={numero}
          cep={cep}
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
});

export default PerfilFornecedor;
