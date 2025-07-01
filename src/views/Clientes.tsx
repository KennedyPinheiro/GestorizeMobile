import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import NavBar from "@components/utilities/NavBar";
import BarraAdd from "@components/utilities/BarraAdd";
import DialogSelecione from "@components/dialogs/DialogSelecione";
import Cliente from "@components/ui-lists/Cliente";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { supabase } from "@lib/supabase";
import { useRoute } from "@react-navigation/native";
import SidebarAlert from "@components/sidebars/Sidebaralert";
import {
  ClienteType,
  EnderecoTipo,
  PessoaFisicaType,
  PessoaJuridicatype,
  RootStackParamList,
} from "@context/types";
import ErrorSidebarAlert from "@components/sidebars/ErrorSidebarAlert";

const Clientes = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [alertVisible, setAlertVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [erroAlertVisible, setErroAlertVisible] = useState(false);
  const [erroMessage, setErroMessage] = useState("");
  const route = useRoute();
  const isFocused = useIsFocused();
  const [showDialog, setShowDialog] = useState(false);
  const [clientesPF, setClientesPF] = useState<PessoaFisicaType[]>([]);
  const [clientesPJ, setClientesPJ] = useState<PessoaJuridicatype[]>([]);
  const [endereco, setEndereco] = useState<EnderecoTipo[]>([]);
  const [termoBusca, setTermoBusca] = useState("");

  function ordenarClientes(
    pf: PessoaFisicaType[],
    pj: PessoaJuridicatype[]
  ): ClienteType[] {
    const todosClientes: ClienteType[] = [
      ...pf.map((item) => ({
        pessoa_fisica: item,
        pessoa_juridica: {} as PessoaJuridicatype,
        tipo: "PF" as const,
      })),
      ...pj.map((item) => ({
        pessoa_fisica: {} as PessoaFisicaType,
        pessoa_juridica: item,
        tipo: "PJ" as const,
      })),
    ];

    return todosClientes.sort((a, b) => {
      const nomeA =
        a.tipo === "PF" ? a.pessoa_fisica.nome : a.pessoa_juridica.razao_social;
      const nomeB =
        b.tipo === "PF" ? b.pessoa_fisica.nome : b.pessoa_juridica.razao_social;
      return nomeA.localeCompare(nomeB);
    });
  }

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

  const buscarClientesPF = async (termo: string = "") => {
    let query = supabase
      .from("pessoa_fisica")
      .select(
        "id, nome, email, data_nascimento, cpf, rg, estado_civil, endereco_id, genero, telefone"
      )
      .order("id", { ascending: false });
  
    if (termo.trim() !== "") {
      query = query.ilike("nome", `%${termo}%`);
    }
  
    const { data, error } = await query;
  
    if (error) {
      setErroMessage(`Erro ao buscar clientes PF: ${error.message}`);
      setErroAlertVisible(true);
    } else {
      setClientesPF(data || []);
    }
  };

  const buscarClientesPJ = async (termo: string = "") => {
    let query = supabase
      .from("pessoa_juridica")
      .select(
        "id, razao_social, email, nome_fantasia, nome_do_responsavel, cnpj, cpf_responsavel, cargo_do_representante, endereco_id, telefone"
      )
      .order("id", { ascending: false });
  
    if (termo.trim() !== "") {
      query = query.ilike("razao_social", `%${termo}%`);
    }
  
    const { data, error } = await query;
  
    if (error) {
      setErroMessage(`Erro ao buscar clientes PJ: ${error.message}`);
      setErroAlertVisible(true);
    } else {
      setClientesPJ(data || []);
    }
  };

  useEffect(() => {
    if (isFocused) {
      buscarClientesPF();
      buscarClientesPJ();
      buscarEndereco();

      const params = (route as any).params;
      if (params?.novoCliente) {
        setMessage("Cliente cadastrado com sucesso!");
        setAlertVisible(true);

        navigation.setParams({ novoCliente: undefined });
      }
    }
  }, [isFocused]);
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      buscarClientesPF(termoBusca);
      buscarClientesPJ(termoBusca);
    }, 400); // Debounce de 400ms
  
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
      <NavBar
        title="Clientes"
        backButton={false}
        onBack={() => navigation.navigate("Homepage")}
      />
      <BarraAdd onPressAdd={() => setShowDialog(true)} />
      <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
        <TextInput
          placeholder="Buscar cliente"
          value={termoBusca}
          onChangeText={(text) => setTermoBusca(text)}
          style={{
            borderWidth: 1,
            borderColor: "#ffffff0",
            borderRadius: 8,
            padding: 10,
          }}
        />
      </View>

      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {ordenarClientes(clientesPF, clientesPJ).map((cliente) => {
          const enderecoCliente = endereco.find((end) =>
            cliente.tipo === "PF"
              ? end.id === cliente.pessoa_fisica.endereco_id
              : end.id === cliente.pessoa_juridica.endereco_id
          );

          return (
            <Cliente
              key={`${cliente.tipo}-${
                cliente.tipo === "PF"
                  ? cliente.pessoa_fisica.id
                  : cliente.pessoa_juridica.id
              }`}
              tipo={cliente.tipo}
              nome={
                cliente.tipo === "PF"
                  ? cliente.pessoa_fisica.nome
                  : cliente.pessoa_juridica.razao_social
              }
              email={
                cliente.tipo === "PF"
                  ? cliente.pessoa_fisica.email || "Email não informado"
                  : cliente.pessoa_juridica.email || "Email não informado"
              }
              onPress={() => {
                if (cliente.tipo === "PF") {
                  navigation.navigate("PerfilPessoaFisica", {
                    id: cliente.pessoa_fisica.id,
                    nome: cliente.pessoa_fisica.nome,
                    email: cliente.pessoa_fisica.email,
                    telefone: cliente.pessoa_fisica.telefone,
                    genero: cliente.pessoa_fisica.telefone,
                    estado_civil: cliente.pessoa_fisica.estado_civil,
                    data_nascimento: cliente.pessoa_fisica.data_nascimento,
                    rg: cliente.pessoa_fisica.rg,
                    cpf: cliente.pessoa_fisica.cpf,
                    rua: enderecoCliente?.rua || "Não informado",
                    bairro: enderecoCliente?.bairro || "Não informado",
                    cidade: enderecoCliente?.cidade || "Não informado",
                    estado: enderecoCliente?.estado || "Não informado",
                    numero: enderecoCliente?.numero || "Não informado",
                    cep: enderecoCliente?.cep || "Não informado",
                  });
                } else {
                  navigation.navigate("PerfilPessoaJuridica", {
                    id: cliente.pessoa_juridica.id,
                    razao_social: cliente.pessoa_juridica.razao_social,
                    nome_fantasia: cliente.pessoa_juridica.nome_fantasia,
                    email: cliente.pessoa_juridica.email,
                    cnpj: cliente.pessoa_juridica.cnpj,
                    nome_do_responsavel:
                      cliente.pessoa_juridica.nome_do_responsavel,
                    cpf_do_responsavel: cliente.pessoa_juridica.cpf_responsavel,
                    cargo_do_responsavel:
                      cliente.pessoa_juridica.cargo_do_representante,
                    telefone: cliente.pessoa_juridica.telefone,
                    rua: enderecoCliente?.rua || "Não informado",
                    bairro: enderecoCliente?.bairro || "Não informado",
                    cidade: enderecoCliente?.cidade || "Não informado",
                    estado: enderecoCliente?.estado || "Não informado",
                    numero: enderecoCliente?.numero || "Não informado",
                    cep: enderecoCliente?.cep || "Não informado",
                  });
                }
              }}
            />
          );
        })}
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
});

export default Clientes;
