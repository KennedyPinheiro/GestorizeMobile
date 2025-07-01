import Button from "@components/botoes/Button";
import NavBar from "@components/utilities/NavBar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@context/types";
import CardEndereco from "@components/cards/CardEndereco";
import CardPessoaFisica from "@components/cards/CardPessoaFisica";
import Nav from "@components/utilities/Nav";

const PerfilPessoaFisica = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "PerfilPessoaFisica">>();

  const {
    
    nome,
    email,
    telefone,
    genero,
    estado_civil,
    data_nascimento,
    rg,
    cpf,
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
        titulo={nome}
        onBackPress={() => navigation.navigate("Clientes")}
        showPessoaFisicaIcon
      />
      <View style={styles.card}>
        <CardPessoaFisica
          nome={nome || "Example"}
          email={email || "Example@mail.com"}
          telefone={telefone || "Não informado"}
          genero={genero || "Não informado"}
          estado_civil={estado_civil || "Não informado"}
          data_nascimento={data_nascimento || "Não informado"}
          rg={rg || "Não informado"}
          cpf={cpf ||"Não informado"}
        />
        <CardEndereco
          rua={rua || "Example"}
          bairro={bairro || "Example"}
          cidade={cidade || "Example"}
          estado={estado || "Example"}
          numero={numero || "000"}
          cep={cep || "Não informado"}
        />
      </View>
      <View style={{ alignItems: "center", marginTop: 10, marginBottom: 130}}>
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

export default PerfilPessoaFisica;
