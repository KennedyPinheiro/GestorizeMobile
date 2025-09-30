import Button from "@components/botoes/Button";
import CardCategoria from "@components/cards/CardCategoria";
import CardProduto from "@components/cards/CardProduto";
import NavBar from "@components/utilities/NavBar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@context/types";
import Nav from "@components/utilities/Nav";
import DialogConfirmarAcao from "@components/dialogs/DialogConfirmarAcao";
import EditableTextCard from "@components/EditableTextCard";
import ProdutoIcon from "@components/Icons/ProdutoIcon";
import SidebarAlert from "@components/sidebars/Sidebaralert";
import { useEffect, useState } from "react";
import { supabase } from "@lib/supabase";
import ClickableTextCard from "@components/ClickableTextCard";
import DialogFornecedores from "@components/dialogs/DialogFornecedores";
import DialogCategorias from "@components/dialogs/DialogCategoria";
import DialogMedida from "@components/dialogs/DialogMedida";

const PerfilProduto = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "PerfilProduto">>();

  const {
    id,
    nome,
    quantidade,
    medida_titulo,
    descricao,
    data_validade,
    data_de_entrada,
    preco_custo,
    margem_lucro,
    medida_id,
    categoria_id,
    fornecedor_razao_social,
    fornecedor_id,
    categoria_titulo,
  } = route.params;

  const [formData, setFormData] = useState({
    nome,
    quantidade,
    medida_titulo,
    descricao,
    data_validade,
    data_de_entrada,
    preco_custo,
    margem_lucro,
    categoria_id,
    fornecedor_razao_social,
    fornecedor_id,
    categoria_titulo,
    medida_id,
  });

  const [originalData] = useState({ ...formData });
  const [botaoHabilitado, setBotaoHabilitado] = useState(false);
  const [showFornecedor, setShowFornecedor] = useState(false);
  const [showCategoria, setShowCategoria] = useState(false);
  const [showMedida, setShowMedida] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const primeiroNome = nome?.split(" ")[0] || "Produto";

  useEffect(() => {
    const houveMudanca = Object.entries(formData).some(
      ([campo, valor]) =>
        valor !== originalData[campo as keyof typeof originalData]
    );
    setBotaoHabilitado(houveMudanca);
  }, [formData, originalData]);
  useEffect(() => {
    const canal = supabase.channel("produto-profile-listener");

    if (id) {
      canal.on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "produtos",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          const dados = payload.new;
          setFormData((prev) => ({
            ...prev,
            nome: dados.nome ?? prev.nome,
            quantidade: dados.quantidade ?? prev.quantidade,
            medida_titulo: dados.medida ?? prev.medida_titulo,
            medida_id: dados.medida_id ?? prev.medida_id,
            descricao: dados.descricao ?? prev.descricao,
            data_validade: dados.validade ?? prev.data_validade,
            data_de_entrada: dados.entrada ?? prev.data_de_entrada,
            preco_custo: dados.custo ?? prev.preco_custo,
            margem_lucro: dados.margem ?? prev.margem_lucro,
            fornecedor_razao_social:
              dados.fornecedor ?? prev.fornecedor_razao_social,
            categoria_titulo: dados.categoria_titulo ?? prev.categoria_titulo,
          }));
        }
      );

      canal.subscribe();
    }

    return () => {
      supabase.removeChannel(canal);
    };
  }, [id]);
  const handleChange = (campo: string, valor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SidebarAlert
        message="Dados atualizados com sucesso!"
        visible={alertVisible}
        type="success"
        onClose={() => setAlertVisible(false)}
      />

      <Nav
        titulo={primeiroNome}
        onBackPress={() => navigation.goBack()}
        showProdutoIcon
      />

      <ScrollView style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ProdutoIcon
            color="#000"
            style={styles.userIcon}
            rounded={false}
            size={90}
            iconSize={90}
          />
          <View>
            <Text style={styles.nome}>{formData.nome}</Text>
            <Text style={styles.quantidade}>
              {formData.quantidade}
              {formData.medida_titulo}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <EditableTextCard
          label="Nome"
          value={formData.nome}
          onChangeText={(text) => handleChange("nome", text)}
        />
        <EditableTextCard
          label="Quantidade"
          value={String(formData.quantidade)}
          onChangeText={(text) => handleChange("quantidade", text)}
        />
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <ClickableTextCard
              label="Medida"
              value={formData.medida_titulo}
              onPress={() => setShowMedida(true)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <EditableTextCard
              label=" Preço Custo"
              tipo="number"
              value={String(formData.preco_custo || "Não informado")}
              onChangeText={(text) => handleChange("preco_custo", text)}
            />
          </View>
        </View>
        <EditableTextCard
          label="Descrição"
          value={formData.descricao}
          onChangeText={(text) => handleChange("descricao", text)}
        />
        <EditableTextCard
          label="Validade"
          value={formData.data_validade || "Não informado"}
          onChangeText={(text) => handleChange("data_validade", text)}
        />
        <EditableTextCard
          label="Data Entrada"
          value={formData.data_de_entrada || "Não informado"}
          onChangeText={(text) => handleChange("data_de_entrada", text)}
        />
        <EditableTextCard
          label="Margem Lucro"
          value={String(formData.margem_lucro || "Não informado")}
          onChangeText={(text) => handleChange("margem_lucro", text)}
        />
        <ClickableTextCard
          label="Fornecedor"
          value={formData.fornecedor_razao_social}
          onPress={() => setShowFornecedor(true)}
        />
        <ClickableTextCard
          label="Categoria"
          value={formData.categoria_titulo}
          onPress={() => setShowCategoria(true)}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
            paddingHorizontal: 30,
          }}
        >
          <View style={{ flex: 1, padding: 2 }}>
            <Button
              title="Salvar"
              type="dialog"
              disabled={!botaoHabilitado}
              onPress={async () => {
                try {
                  const response = await fetch(
                    `http://192.168.9.10:3000/update-produto/${id}`,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(formData),
                    }
                  );

                  const result = await response.json();

                  if (!response.ok) {
                    console.error("Erro ao atualizar produto:", result.error);
                    return;
                  }

                  setBotaoHabilitado(false);
                  setAlertVisible(true);
                } catch (err) {
                  console.error("Erro ao conectar com o backend:", err);
                }
              }}
            />
          </View>
          <View style={{ marginBottom: 40, flex: 1, paddingHorizontal: 10 }}>
            <Button
              title="Deletar"
              type="dialog"
              variant="delete"
              onPress={() => setShowDialog(true)}
            />
          </View>
        </View>
      </ScrollView>
      <DialogConfirmarAcao
        show={showDialog}
        setShow={setShowDialog}
        titulo="Você tem certeza que deseja excluir este cliente?"
        onSuccess={async () => {
          try {
            const response = await fetch(
              `http://192.168.9.10:3000/delete-produto/${id}`,
              {
                method: "DELETE",
              }
            );

            if (!response.ok) {
              const { error } = await response.json();
              console.error("Erro ao deletar:", error);
              return;
            }

            setShowDialog(false);
            navigation.navigate("Produtos");
          } catch (err) {
            console.error("Erro ao conectar com o backend:", err);
          }
        }}
        onCancelar={() => setShowDialog(false)}
      />
      <DialogFornecedores
        open={showFornecedor}
        onClose={() => setShowFornecedor(false)}
        onSelect={(id, nome) => {
          setFormData({
            ...formData,
            fornecedor_id: id,
            fornecedor_razao_social: nome,
          });
          setShowFornecedor(false);
        }}
      />
      <DialogCategorias
        open={showCategoria}
        onClose={() => setShowCategoria(false)}
        onSelect={(id, titulo) => {
          setFormData({
            ...formData,
            categoria_id: id,
            categoria_titulo: titulo,
          });
          setShowFornecedor(false);
        }}
      />
      <DialogMedida
        open={showMedida}
        onClose={() => setShowMedida(false)}
        onSelect={(id, titulo) => {
          setFormData({ ...formData, medida_id: id, medida_titulo: titulo });
          setShowMedida(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  nome: {
    fontSize: 25,
    fontWeight: "800",
  },
  quantidade: {
    color: "#5e5e5e",
    fontSize: 15,
    marginBottom: 10,
  },
  userIcon: {
    marginRight: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  divider: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default PerfilProduto;
