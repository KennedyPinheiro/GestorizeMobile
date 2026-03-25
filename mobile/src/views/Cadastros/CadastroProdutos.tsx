import { ScrollView, View, StyleSheet, Text, SafeAreaView } from "react-native";

import Button from "@components/botoes/Button";

import { useEffect, useState } from "react";

import DialogCategorias from "@components/dialogs/DialogCategoria";
import { formatDate, parsePercent, parseReal } from "@core/utils/format";
import Selecionado from "@components/Selecionado";
import SidebarAlert from "@components/sidebars/Sidebaralert";
import { supabase } from "@lib/supabase";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DialogFornecedores from "@components/dialogs/DialogFornecedores";
import DialogMedida from "@components/dialogs/DialogMedida";
import ErrorSidebarAlert from "@components/sidebars/ErrorSidebarAlert";
import { RootStackParamList } from "@context/types";
import Nav from "@components/utilities/Nav";
import EditableTextCard from "@components/EditableTextCard";
import ClickableTextCard from "@components/ClickableTextCard";

const unidades = ["Unidade", "Litro", "Quilo", "Caixa"];

const CadastroProdutos = () => {
  const [nomeProduto, setNomeProduto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState(false);
  const [fornecedorId, setFornecedor] = useState(false);
  const [codigoFornecedor, setCodigoFornecedor] = useState(0);
  const [codigoCategoria, setCodigoCategoria] = useState(0);
  const [codigoMedida, setCodigoMedida] = useState(0);
  const [dataEntrada, setDataEntrada] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [precoCustoTexto, setPrecoCustoTexto] = useState("");
  const [margemLucroTexto, setMargemLucroTexto] = useState("");
  const [precoCusto, setPrecoCusto] = useState<number>();
  const [unidadeMedida, setUnidadeMedida] = useState(false);
  const [erroAlertVisible, setErroAlertVisible] = useState(false);
  const [erroMessage, setErroMessage] = useState("");
  const [medidaSelecionada, setMedidaSelecionada] = useState<string>();
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState<string>();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>();
  const [alertVisible, setAlertVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [margemLucro, setMargemLucro] = useState("");
  const isFormValid = nomeProduto.trim() !== "";
  const handleOpenCategoria = () => setCategoria(true);
  const handleCloseCategoria = () => setCategoria(false);
  const handleOpenFornecedor = () => setFornecedor(true);
  const handleCloseFornecedor = () => setFornecedor(false);
  const handleOpenMedida = () => setUnidadeMedida(true);
  const handleCloseMedida = () => setUnidadeMedida(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectCategoria = (id: number, nomeCategoria: string) => {
    setCodigoCategoria(id);
    setCategoriaSelecionada(nomeCategoria);
    setAlertVisible(true);
    setMessage("Categoria Selecionada");
  };
  const handleSelectForncedor = (id: number, nomeFornecedor: string) => {
    setCodigoFornecedor(id);
    setFornecedorSelecionado(nomeFornecedor);
    setAlertVisible(true);
    setMessage("Fornecedor Selecionada");
  };

  const handleSelectMedida = (id: number, titulo: string) => {
    setCodigoMedida(id);
    setMedidaSelecionada(titulo);
    setAlertVisible(true);
    setMessage("Unidade de Medida Selecionada");
  };
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  async function salvarProduto() {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (!nomeProduto.trim()) {
        setMessage("Por favor, insira o nome do produto.");
        setAlertVisible(true);
        setIsLoading(false);
        return;
      }

      if (!categoriaSelecionada) {
        setMessage("Selecione uma categoria.");
        setAlertVisible(true);
        setIsLoading(false);
        return;
      }
      if (!medidaSelecionada) {
        setMessage("Selecione uma medida.");
        setAlertVisible(true);
        setIsLoading(false);
        return;
      }

      const { error } = await supabase.from("produtos").insert({
        nome: nomeProduto,
        descricao: descricao,
        categoria_id: codigoCategoria,
        data_de_entrada: dataEntrada || null,
        quantidade: parseInt(quantidade) || 0,
        medida_id: codigoMedida,
        data_validade: dataValidade || null,
        preco_custo: precoCusto || null,
        margem_lucro: parseFloat(margemLucro) || null,
        fornecedor_id: codigoFornecedor || null,
        data_criacao: new Date().toISOString(),
        ultima_atualizacao: new Date().toISOString(),
      });

      if (error) {
        throw error;
      }

      setMessage("Produto salvo com sucesso!");
      setAlertVisible(true);

      setTimeout(() => {
        navigation.navigate("Produtos", {
          novoProduto: true,
        });
      }, 1500);
    } catch (error: any) {
      setErroMessage("Erro ao salvar produto: " + error.message);
      setErroAlertVisible(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (alertVisible) {
      const timer = setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertVisible]);
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
        titulo="Produto"
        onBackPress={() => navigation.navigate("Produtos")}
      />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.formContainer}>
          <View style={styles.inputItem}>
            <EditableTextCard
              label="Nome do Produto"
              placeholder="Produto Name"
              tipo="string"
              value={nomeProduto}
              onChangeText={setNomeProduto}
            />
          </View>

          <View style={styles.inputItem}>
            <EditableTextCard
              label="Descrição"
              placeholder="Descrição"
              tipo="string"
              value={descricao}
              onChangeText={setDescricao}
            />
          </View>
          <View style={styles.inputItem}>
            <ClickableTextCard
              label=" Categoria"
              placeholder="Selecionar Categoria"
              value={categoriaSelecionada}
              onPress={handleOpenCategoria}
            />
          </View>
          <View style={styles.inputItem}>
            <EditableTextCard
              label="Data de Entrada"
              placeholder="0000 / 00 / 00"
              tipo="number"
              value={dataEntrada}
              onChangeText={(text) => {
                setDataEntrada(formatDate(text));
              }}
            />
          </View>

          <View style={styles.inputItem}>
            <EditableTextCard
              label="Quantidade em Estoque"
              placeholder="000"
              tipo="number"
              value={quantidade}
              onChangeText={setQuantidade}
            />
          </View>

          <View style={styles.inputItem}>
            <ClickableTextCard
              label=" Uidade de Medida"
              placeholder="Selecionar Unidade de Medida"
              value={medidaSelecionada}
              onPress={handleOpenMedida}
            />
          </View>

          <View style={styles.inputItem}>
            <ClickableTextCard
              label="Fornecedor"
              placeholder="Selecionar Fornecedor"
              value={fornecedorSelecionado}
              onPress={handleOpenFornecedor}
            />
          </View>

          <View style={styles.inputItem}>
            <EditableTextCard
              label="Data de Validade"
              placeholder="0000 / 00 / 00"
              tipo="number"
              value={dataValidade}
              onChangeText={(text) => {
                setDataValidade(formatDate(text));
              }}
            />
          </View>

          <View style={styles.inputItem}>
            <EditableTextCard
              label="Preço de Custo"
              placeholder="R$ 0,00"
              tipo="number"
              value={precoCustoTexto}
              onChangeText={(text) => {
                setPrecoCustoTexto(text);
                const parsed = parseReal(text);
                if (!isNaN(parsed)) setPrecoCusto(parsed);
              }}
            />
          </View>

          <View style={styles.inputItem}>
            <EditableTextCard
              label="Margem de Lucro"
              placeholder="0,00%"
              tipo="number"
              value={margemLucroTexto}
              onChangeText={(text) => {
                setMargemLucroTexto(text);
                const parsed = parsePercent(text);
                if (!isNaN(parsed)) {
                  setMargemLucro(parsed.toString());
                }
              }}
            />
          </View>

          <Button
            title={isLoading ? "SALVANDO..." : "ADICIONAR"}
            variant="contained"
            color="primary"
            disabled={!isFormValid || isLoading}
            type="submit"
            onPress={salvarProduto}
          />
        </View>
      </ScrollView>
      {categoria && (
        <DialogCategorias
          onClose={handleCloseCategoria}
          open={categoria}
          onSelect={handleSelectCategoria}
        />
      )}
      {fornecedorId && (
        <DialogFornecedores
          onClose={handleCloseFornecedor}
          open={fornecedorId}
          onSelect={handleSelectForncedor}
        />
      )}
      {unidadeMedida && (
        <DialogMedida
          onClose={handleCloseMedida}
          open={unidadeMedida}
          onSelect={handleSelectMedida}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "#ffffff",
    width: "100%",
    flexGrow: 1,
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 32,
  },
  container: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#ffffff",
    flex: 1,
  },
  formContainer: {
    marginTop: 24,
    width: "100%",
    alignItems: "center",
    gap: 2,
  },
  inputItem: {
    width: "90%",
    maxWidth: 400,
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    textDecorationStyle: "solid",
    alignItems: "center",
    fontWeight: "900",
    fontSize: 15,
    width: "80%",
    backgroundColor: "#6aa76a",
    borderRadius: 10,
    color: "#fff",
    padding: 10,
    marginBottom: 5,
    marginTop: -10,
    alignSelf: "center",
  },
});

export default CadastroProdutos;
