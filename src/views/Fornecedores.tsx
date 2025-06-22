import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import NavBar from "@components/utilities/NavBar";
import BarraAdd from "@components/utilities/BarraAdd";

import { useIsFocused, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Fornecedor from "@components/ui-lists/Fornecedor";
import { supabase } from "@lib/supabase";
import { useRoute } from "@react-navigation/native";
import SidebarAlert from "@components/sidebars/Sidebaralert";
import { FornecedorTipo } from "@context/types";
import ErrorSidebarAlert from "@components/sidebars/ErrorSidebarAlert";

const Fornecedores = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [alertVisible, setAlertVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [erroAlertVisible, setErroAlertVisible] = useState(false);
  const [erroMessage, setErroMessage] = useState("");
  const route = useRoute();
  const isFocused = useIsFocused();
  const [fornecedor, setFornecedor] = useState<FornecedorTipo[]>([]);

  const buscarFornecedor = async () => {
    const { data, error } = await supabase
      .from("fornecedor")
      .select("id, razao_social, email")
      .order("id", { ascending: false });

    if (error) {
      setErroMessage(`Erro ao buscar fornecedores: ${error.message}`);
      setErroAlertVisible(true);
    } else {
      setFornecedor(data || []);
    }
  };

  useEffect(() => {
    if (isFocused) {
      buscarFornecedor();

      const params = route?.params as { novoFornecedor?: boolean };
      if (params?.novoFornecedor) {
        setMessage("Fornecedor cadastrado com sucesso!");
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
        title="Fornecedores"
        backButton={false}
        onBack={() => navigation.navigate("Homepage")}
      />

      <BarraAdd
        onPressAdd={() => navigation.navigate("CadastroFornecedores")}
      />
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {fornecedor.map((item) => (
          <Fornecedor
            key={item.id}
            nome={item.razao_social}
            email={item.email}
          />
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

export default Fornecedores;
