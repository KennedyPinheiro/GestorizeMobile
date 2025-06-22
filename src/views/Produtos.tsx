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
import { CategoriaType, MedidaType, ProdutoTipo } from "@context/types";
import SidebarAlert from "@components/sidebars/Sidebaralert";
import ErrorSidebarAlert from "@components/sidebars/ErrorSidebarAlert";
import { supabase } from "@lib/supabase";
import Produto from "@components/ui-lists/Produto"; // componente que exibe nome e preço
import { formatarMedida } from "@@core/format";

const Produtos = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [alertVisible, setAlertVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [erroAlertVisible, setErroAlertVisible] = useState(false);
  const [erroMessage, setErroMessage] = useState("");
  const route = useRoute();
  const isFocused = useIsFocused();
  const [produto, setProduto] = useState<ProdutoTipo[]>([]);
  const [tituloCategoria, setTituloCategoria] = useState<CategoriaType[]>([]);
  const [tituloMedida, setTituloMedida] = useState<MedidaType[]>([]);
  const buscarCategoria = async () => {
    const { data, error } = await supabase
      .from("categorias")
      .select(
        `
      id,
      titulo,
      descricao
    `
      )
      .order("id", { ascending: false });
    if (error) {
      setErroMessage(`Erro ao buscar titulo da categoria: ${error.message}`);
      setErroAlertVisible(true);
    } else {
      setTituloCategoria(data || []);
    }
  };

  const buscarProduto = async () => {
    const { data, error } = await supabase
      .from("produtos")
      .select(
        `
    id,
    nome,
    quantidade,
    medida_id,
    categoria_id
  `
      )
      .order("id", { ascending: false });
    if (error) {
      setErroMessage(`Erro ao buscar produtos: ${error.message}`);
      setErroAlertVisible(true);
    } else {
      setProduto(data);
    }
  };

  const buscarMedida = async () => {
    const { data, error } = await supabase
      .from("medidas")
      .select("id, titulo")
      .order("id", { ascending: false });
    if (error) {
      setErroMessage(`Erro ao buscar titulo da categoria: ${error.message}`);
      setErroAlertVisible(true);
    } else {
      setTituloMedida(data || []);
    }
  };
  useEffect(() => {
    if (isFocused) {
      buscarProduto();
      buscarCategoria();
      buscarMedida();

      const params = route?.params as { novoProduto?: boolean };
      if (params?.novoProduto) {
        setMessage("Produto cadastrado com sucesso!");
        setAlertVisible(true);
        navigation.setParams({ novoProduto: undefined });
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
        title="Produtos"
        backButton={false}
        onBack={() => navigation.navigate("Homepage")}
      />

      <BarraAdd onPressAdd={() => navigation.navigate("CadastroProdutos")} />
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {produto.map((item) => {
          const categoriaEncontrada = tituloCategoria.find(
            (cat) => cat.id === item.categoria_id
          );

          const titulo = categoriaEncontrada
            ? categoriaEncontrada.titulo
            : "Sem Categoria";

          const medidaEncontrada = tituloMedida.find(
            (medida) => medida.id === item.medida_id
          );

          const medidaFormatada = medidaEncontrada
            ? formatarMedida(medidaEncontrada.titulo)
            : "UN";
          return (
            <Produto
              key={item.id}
              nome={item.nome}
              categoria={titulo}
              quantidade={item.quantidade}
              medida={medidaFormatada}
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
    backgroundColor: "#f2f2f3",
  },
});

export default Produtos;
