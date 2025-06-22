import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import NavBar from "@components/utilities/NavBar";
import BarraAdd from "@components/utilities/BarraAdd";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "@App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SidebarAlert from "@components/sidebars/Sidebaralert";
import ErrorSidebarAlert from "@components/sidebars/ErrorSidebarAlert";
import { supabase } from "@lib/supabase";
import { FuncionarioTipo } from "@context/types";
import Funcionario from "@components/ui-lists/Funcionario";

const Funcionarios = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [alertVisible, setAlertVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [erroAlertVisible, setErroAlertVisible] = useState(false);
  const [funcionario, setFuncionario] = useState<FuncionarioTipo[]>([]);
  const [erroMessage, setErroMessage] = useState("");
  const route = useRoute();
  const isFocused = useIsFocused();

  const buscarFuncionario = async () => {
    const { data, error } = await supabase
      .from("funcionarios")
      .select("id, nome, cargo")
      .order("id", { ascending: false });

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

      const params = route?.params as { novoFornecedor?: boolean };
      if (params?.novoFornecedor) {
        setMessage("Funcionario cadastrado com sucesso!");
        setAlertVisible(true);
        navigation.setParams({ novoFornecedor: undefined });
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
        title="FUNCIONARIOS"
        backButton={false}
        onBack={() => navigation.navigate("Homepage")}
      />

      <BarraAdd
        onPressAdd={() => navigation.navigate("CadastroFuncionarios")}
      />
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {funcionario.map((item) => (
          <Funcionario key={item.id} nome={item.nome} funcao={item.cargo} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f3",
  },
});

export default Funcionarios;
