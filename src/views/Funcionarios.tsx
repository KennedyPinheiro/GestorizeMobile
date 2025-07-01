import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import NavBar from "@components/utilities/NavBar";
import BarraAdd from "@components/utilities/BarraAdd";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SidebarAlert from "@components/sidebars/Sidebaralert";
import ErrorSidebarAlert from "@components/sidebars/ErrorSidebarAlert";
import { supabase } from "@lib/supabase";
import {
  EnderecoTipo,
  FuncionarioTipo,
  RootStackParamList,
} from "@context/types";
import Funcionario from "@components/ui-lists/Funcionario";
import Nav from "@components/utilities/Nav";

const Funcionarios = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [alertVisible, setAlertVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [erroAlertVisible, setErroAlertVisible] = useState(false);
  const [erroMessage, setErroMessage] = useState("");
  const route = useRoute();
  const isFocused = useIsFocused();
  const [funcionario, setFuncionario] = useState<FuncionarioTipo[]>([]);
  const [endereco, setEndereco] = useState<EnderecoTipo[]>([]);

  const buscarEndereco = async () => {
    const { data, error } = await supabase
      .from("endereco")
      .select("id, rua, bairro ,cidade , estado, numero, cep")
      .order("id", { ascending: false });
    if (error) {
      setErroAlertVisible(true);
      setErroMessage(`Erro ao buscar endereço: ${error.message}`);
    } else {
      setEndereco(data);
    }
  };
  const buscarFuncionario = async () => {
    const { data, error } = await supabase
      .from("funcionarios")
      .select(
        "id, nome, cargo, email, data_nascimento, genero, estado_civil, telefone ,endereco_id,rg, cpf"
      )
      .order("nome", { ascending: true });

    if (error) {
      setErroMessage(`Erro ao buscar funcionario: ${error.message}`);
      setErroAlertVisible(true);
    } else {
      setFuncionario(data || []);
    }
  };
  useEffect(() => {
    if (isFocused) {
      buscarFuncionario();
      buscarEndereco();

      const params = route?.params as { novoFuncionario?: boolean };
      if (params?.novoFuncionario) {
        setMessage("Funcionario cadastrado com sucesso!");
        setAlertVisible(true);
        navigation.setParams({ novoFuncionario: undefined });
      }
    }
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <SidebarAlert
        message={message}
        visible={alertVisible}
        type="success"
        onClose={() => setAlertVisible(false)}
      />
      <ErrorSidebarAlert
        message={erroMessage}
        visible={erroAlertVisible}
        onClose={() => setErroAlertVisible(false)}
      />
      <Nav
        titulo="Funcioarios"
        onBackPress={() => navigation.navigate("Homepage")}
      />

      <BarraAdd
        onPressAdd={() => navigation.navigate("CadastroFuncionarios")}
      />
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {funcionario.map((item) => {
          const enderecoDoFuncionario = endereco.find(
            (end) => end.id === item.endereco_id
          );

          return (
            <Funcionario
              key={item.id}
              nome={item.nome}
              funcao={item.cargo || "Example"}
              onPress={() => {
                navigation.navigate("PerfilFuncionario", {
                  id: item.id,
                  nome: item.nome,
                  funcao: item.cargo,
                  email: item.email,
                  data_nascimento: item.data_nascimento,
                  genero: item.genero,
                  estado_civil: item.estado_civil,
                  rg: item.rg,
                  cpf: item.cpf,
                  telefone: item.telefone,
                  rua: enderecoDoFuncionario?.rua || "Não informado",
                  bairro: enderecoDoFuncionario?.bairro || "Não informado",
                  cidade: enderecoDoFuncionario?.cidade || "Não informado",
                  estado: enderecoDoFuncionario?.estado || "Não informado",
                  cep: enderecoDoFuncionario?.cep || "Não informado",
                  numero: enderecoDoFuncionario?.numero || "Não informado",
                });
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

export default Funcionarios;
