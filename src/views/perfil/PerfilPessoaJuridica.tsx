import Button from "@components/botoes/Button";
import NavBar from "@components/utilities/NavBar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@context/types";
import CardEndereco from "@components/cards/CardEndereco";
import CardPessoaJuridica from "@components/cards/CardPessoaJuridica";
import Nav from "@components/utilities/Nav";

const PerfilPessoaJuridica = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route =
    useRoute<RouteProp<RootStackParamList, "PerfilPessoaJuridica">>();

  const {
    razao_social,
    email,
    nome_fantasia,
    cnpj,
    nome_do_responsavel,
    cpf_do_responsavel,
    cargo_do_responsavel,
    telefone,
    rua,
    bairro,
    cidade,
    estado,
    cep,
    numero,
  } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Nav
        titulo={razao_social}
        onBackPress={() => navigation.navigate("Clientes")}
        showPessoaJuridicaIcon
      />
      <View style={styles.card}>
        <CardPessoaJuridica
          razaoSocial={razao_social || "Não informado"}
          email={email || "Não informado"}
          nome_fantasia={nome_fantasia || "Não informado"}
          cnpj={cnpj || "Não informado"}
          nomeResponsavel={nome_do_responsavel || "Não informado"}
          cpf_do_responsavel={cpf_do_responsavel || "Não informado"}
          cargo_do_responsavel={cargo_do_responsavel || "Não informado"}
          telefone={telefone || "Não informado"}
        />
        <CardEndereco
          rua={rua }
          bairro={bairro }
          cidade={cidade }
          estado={estado }
          numero={numero }
          cep={cep }
        />
      </View>
      <View style={{ alignItems: "center", marginTop: 10, marginBottom: 130 }}>
        <Button
          title="FECHAR"
          variant="outlined"
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
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

export default PerfilPessoaJuridica;
