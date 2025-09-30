import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
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
import FloatingButton from "@components/botoes/FloatingButton";

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
  const [termoBusca, setTermoBusca] = useState("");

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
  const buscarFuncionarioFiltrado = async (termo: string) => {
    const { data, error } = await supabase
      .from("funcionarios")
      .select(
        "id, nome, cargo, email, data_nascimento, genero, estado_civil, telefone ,endereco_id,rg, cpf"
      )
      .ilike("nome", `%${termo}%`)
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
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (termoBusca.trim() === "") {
        buscarFuncionario();
      } else {
        buscarFuncionarioFiltrado(termoBusca);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [termoBusca]);
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
        titulo="FUNCIONÁRIOS"
        onBackPress={() => navigation.navigate("Homepage")}
      />

      <View style={styles.barraBuscaContainer}>
        <TextInput
          placeholder="Buscar funcionario por nome"
          placeholderTextColor="#444141"
          value={termoBusca}
          onChangeText={setTermoBusca}
          style={styles.inputBusca}
        />
      </View>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {funcionario.map((item, index) => {
          const enderecoDoFuncionario = endereco.find(
            (end) => end.id === item.endereco_id
          );

          return (
            <View
              key={item.id}
              style={{
                borderBottomWidth: index < funcionario.length - 1 ? 1 : 0,
                borderBottomColor: "#ccc",
                paddingVertical: 8,
              }}
            >
              <Funcionario
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
                    endereco_id: item.endereco_id,
                  });
                }}
              />
            </View>
          );
        })}
      </ScrollView>

      <FloatingButton
        onPress={() => navigation.navigate("CadastroFuncionarios")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  barraBuscaContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom : 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  inputBusca: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#333",
  },
});

export default Funcionarios;
