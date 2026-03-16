import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import BarraAdd from "@components/utilities/BarraAdd";
import DialogSelecione from "@components/dialogs/DialogSelecione";
import Cliente from "@components/ui-lists/Cliente";
import { useNavigation, useIsFocused, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SidebarAlert from "@components/sidebars/Sidebaralert";
import ErrorSidebarAlert from "@components/sidebars/ErrorSidebarAlert";
import Nav from "@components/utilities/Nav";
import { RootStackParamList } from "@context/types";
import api from "@configs/axios";

type ClienteApi = {
  id: number;
  nome: string;
  email: string | null;
  tipo: "pf" | "pj";
};

const Clientes = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [alertVisible, setAlertVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [erroAlertVisible, setErroAlertVisible] = useState(false);
  const [erroMessage, setErroMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [clientes, setClientes] = useState<ClienteApi[]>([]);
  const [termoBusca, setTermoBusca] = useState("");

  const buscarClientes = async (termo: string = "") => {
    try {
      const { data } = await api.get("/clientes");
      const lista: ClienteApi[] = data?.data ?? data ?? [];
      const filtrados =
        termo.trim() === ""
          ? lista
          : lista.filter((c) => c.nome.toLowerCase().includes(termo.toLowerCase()));
      setClientes(filtrados);
    } catch (error: any) {
      setErroMessage(
        `Erro ao buscar clientes: ${
          error?.response?.data?.message ?? error?.message ?? "desconhecido"
        }`
      );
      setErroAlertVisible(true);
    }
  };

  useEffect(() => {
    if (isFocused) {
      buscarClientes();
      const params = (route as any).params;
      if (params?.novoCliente) {
        setMessage("Cliente cadastrado com sucesso!");
        setAlertVisible(true);
        navigation.setParams({ novoCliente: undefined });
      }
    }
  }, [isFocused]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => buscarClientes(termoBusca), 400);
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
      <Nav titulo="Clientes" onBackPress={() => navigation.navigate("Homepage")} />
      <BarraAdd onPressAdd={() => setShowDialog(true)} />
      <View style={styles.barraBuscaContainer}>
        <TextInput
          placeholder="Buscar cliente por nome"
          placeholderTextColor="#999"
          value={termoBusca}
          onChangeText={setTermoBusca}
          style={styles.inputBusca}
        />
      </View>

      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {clientes.map((cliente) => (
          <Cliente
            key={cliente.id}
            tipo={cliente.tipo.toUpperCase() === "PJ" ? "PJ" : "PF"}
            nome={cliente.nome}
            email={cliente.email || "Email não informado"}
            onPress={() =>
              navigation.navigate("PerfilPessoaFisica", {
                id: cliente.id,
                nome: cliente.nome,
                email: cliente.email || "Email não informado",
                telefone: "",
                genero: "",
                estado_civil: "",
                data_nascimento: "",
                rg: "",
                cpf: "",
                endereco_id: null,
                rua: "",
                bairro: "",
                cidade: "",
                estado: "",
                numero: "",
                cep: "",
              })
            }
          />
        ))}
      </ScrollView>

      <DialogSelecione
        show={showDialog}
        onClose={() => setShowDialog(false)}
        titulo01="Pessoa Física"
        titulo02="Pessoa Jurídica"
        onPress01={() => {
          setShowDialog(false);
          navigation.navigate("PessoaFisica");
        }}
        onPress02={() => {
          setShowDialog(false);
          navigation.navigate("PessoaJuridica");
        }}
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
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  inputBusca: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#333",
  },
});

export default Clientes;
