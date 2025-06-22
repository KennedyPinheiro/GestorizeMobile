import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import NavBar from "@components/utilities/NavBar";
import BarraAdd from "@components/utilities/BarraAdd";
import DialogSelecione from "@components/dialogs/DialogSelecione";
import Cliente from "@components/ui-lists/Cliente";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { RootStackParamList } from "@App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { supabase } from "@lib/supabase";
import { useRoute } from "@react-navigation/native";
import SidebarAlert from "@components/sidebars/Sidebaralert";
import {
  ClienteType,
  PessoaFisicaType,
  PessoaJuridicatype,
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

  function intercalarClientes(
    pf: PessoaFisicaType[],
    pj: PessoaJuridicatype[]
  ): ClienteType[] {
    const maxLength = Math.max(pf.length, pj.length);
    const resultado: ClienteType[] = [];

    for (let i = 0; i < maxLength; i++) {
      if (i < pf.length) {
        resultado.push({
          pessoa_fisica: pf[i],
          pessoa_juridica: {} as PessoaJuridicatype,
          tipo: "PF",
        });
      }
      if (i < pj.length) {
        resultado.push({
          pessoa_fisica: {} as PessoaFisicaType,
          pessoa_juridica: pj[i],
          tipo: "PJ",
        });
      }
    }

    return resultado;
  }

  const buscarClientesPF = async () => {
    const { data, error } = await supabase
      .from("pessoa_fisica")

      .select("id, nome, email")
      .order("id", { ascending: false });

    if (error) {
      setErroMessage(`Erro ao buscar clientes PF: ${error}`);
      setErroAlertVisible(true);
    } else {
      setClientesPF(data || []);
    }
  };

  const buscarClientesPJ = async () => {
    const { data, error } = await supabase
      .from("pessoa_juridica")
      .select("id, razao_social, email")
      .order("id", { ascending: false });

    if (error) {
      setErroMessage(`Erro ao buscar clientes PF: ${error}`);
      setErroAlertVisible(true);
    } else {
      setClientesPJ(data || []);
    }
  };

  useEffect(() => {
    if (isFocused) {
      buscarClientesPF();
      buscarClientesPJ();

      const params = (route as any).params;
      if (params?.novoCliente) {
        setMessage("Cliente cadastrado com sucesso!");
        setAlertVisible(true);

        navigation.setParams({ novoCliente: undefined });
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
      <NavBar
        title="CLIENTES"
        backButton={false}
        onBack={() => navigation.navigate("Homepage")}
      />
      <BarraAdd onPressAdd={() => setShowDialog(true)} />

      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {intercalarClientes(clientesPF, clientesPJ).map((cliente) => (
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
    backgroundColor: "#f2f2f3",
  },
});

export default Clientes;
