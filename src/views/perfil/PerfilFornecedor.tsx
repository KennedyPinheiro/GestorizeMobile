import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@context/types";
import { supabase } from "@lib/supabase";

import Nav from "@components/utilities/Nav";
import Button from "@components/botoes/Button";
import EditableTextCard from "@components/EditableTextCard";
import SidebarAlert from "@components/sidebars/Sidebaralert";
import FornecedorIcon from "@components/Icons/FornecedorIcon";
import DialogConfirmarAcao from "@components/dialogs/DialogConfirmarAcao";

const PerfilFornecedor = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "PerfilFornecedor">>();

  const {
    id,
    razao_social,
    cnpj,
    email,
    ramo_de_atividade,
    telefone,
    nome_responsavel,
    chave_pix,
    rua,
    bairro,
    cidade,
    estado,
    cep,
    numero,
    endereco_id,
  } = route.params;

  const [formData, setFormData] = useState({
    razao_social,
    cnpj,
    email,
    ramo_de_atividade,
    telefone,
    nome_responsavel,
    chave_pix,
    rua,
    bairro,
    cidade,
    estado,
    cep,
    numero,
  });

  const [originalData] = useState({ ...formData });
  const [botaoHabilitado, setBotaoHabilitado] = useState(false);
  const [showEndereco, setShowEndereco] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const houveMudanca = Object.entries(formData).some(
      ([campo, valor]) =>
        valor !== originalData[campo as keyof typeof originalData]
    );
    setBotaoHabilitado(houveMudanca);
  }, [formData, originalData]);

  useEffect(() => {
    const canal = supabase.channel("fornecedor-listener");

    if (id) {
      canal
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "fornecedor",
            filter: `id=eq.${id}`,
          },
          (payload) => {
            const dados = payload.new;
            setFormData((prev) => ({
              ...prev,
              razao_social: dados.razao_social ?? prev.razao_social,
              cnpj: dados.cnpj ?? prev.cnpj,
              email: dados.email ?? prev.email,
              ramo_de_atividade:
                dados.ramo_de_atividade ?? prev.ramo_de_atividade,
              telefone: dados.telefone ?? prev.telefone,
              nome_responsavel: dados.nome_responsavel ?? prev.nome_responsavel,
              chave_pix: dados.chave_pix ?? prev.chave_pix,
            }));
          }
        )
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "endereco",
            filter: `id=eq.${endereco_id}`,
          },
          (payload) => {
            const dados = payload.new;
            setFormData((prev) => ({
              ...prev,
              rua: dados.rua ?? prev.rua,
              bairro: dados.bairro ?? prev.bairro,
              cidade: dados.cidade ?? prev.cidade,
              estado: dados.estado ?? prev.estado,
              cep: dados.cep ?? prev.cep,
              numero: dados.numero ?? prev.numero,
            }));
          }
        );

      canal.subscribe();
    }

    return () => {
      supabase.removeChannel(canal);
    };
  }, [id, endereco_id]);

  const handleChange = (campo: string, valor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  };

  const updateCampoFornecedor = async (
    campo: string,
    valor: string,
    fornecedorId: string,
    enderecoId?: number
  ) => {
    const camposFornecedor = [
      "razao_social",
      "cnpj",
      "email",
      "ramo_de_atividade",
      "telefone",
      "nome_responsavel",
      "chave_pix",
    ];
    const camposEndereco = [
      "rua",
      "bairro",
      "cidade",
      "estado",
      "numero",
      "cep",
    ];

    try {
      if (camposFornecedor.includes(campo)) {
        const { error } = await supabase
          .from("fornecedor")
          .update({ [campo]: valor, ultima_atualizacao: new Date() })
          .eq("id", fornecedorId);

        if (error) {
          console.error(
            `Erro ao atualizar ${campo} em fornecedor:`,
            error.message
          );
        }
      } else if (camposEndereco.includes(campo) && enderecoId) {
        const { error } = await supabase
          .from("endereco")
          .update({ [campo]: valor })
          .eq("id", enderecoId);

        if (error) {
          console.error(
            `Erro ao atualizar ${campo} em endereco:`,
            error.message
          );
        }
      }
    } catch (err) {
      console.error(`Erro inesperado ao atualizar ${campo}:`, err);
    }
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
        titulo={formData.razao_social}
        onBackPress={() => navigation.goBack()}
        showFornecedorIcon
      />

      <ScrollView style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FornecedorIcon
            style={styles.userIcon}
            size={90}
            iconSize={90}
            color="#000"
            rounded={false}
          />
          <View>
            <Text style={styles.nome}>{formData.razao_social}</Text>
            <Text style={styles.email}>{formData.email}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <EditableTextCard
          label="Razão Social"
          value={formData.razao_social}
          onChangeText={(text) => handleChange("razao_social", text)}
        />
        <EditableTextCard
          label="CNPJ"
          value={formData.cnpj}
          onChangeText={(text) => handleChange("cnpj", text)}
        />
        <EditableTextCard
          label="Email"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        <EditableTextCard
          label="Ramo de Atividade"
          value={formData.ramo_de_atividade}
          onChangeText={(text) => handleChange("ramo_de_atividade", text)}
        />
        <EditableTextCard
          label="Telefone"
          value={formData.telefone}
          onChangeText={(text) => handleChange("telefone", text)}
        />
        <EditableTextCard
          label="Nome do Responsável"
          value={formData.nome_responsavel}
          onChangeText={(text) => handleChange("nome_responsavel", text)}
        />
        <EditableTextCard
          label="Chave PIX"
          value={formData.chave_pix}
          onChangeText={(text) => handleChange("chave_pix", text)}
        />

        {!showEndereco ? (
          <View style={{ marginBottom: 30 }}>
            <Button
              title="Endereço"
              variant="outlined"
              type="dialog"
              onPress={() => setShowEndereco(true)}
            />
          </View>
        ) : (
          <View style={{ marginBottom: 30 }}>
            <EditableTextCard
              label="Logradouro"
              value={formData.rua}
              onChangeText={(text) => handleChange("rua", text)}
            />
            <EditableTextCard
              label="Bairro"
              value={formData.bairro}
              onChangeText={(text) => handleChange("bairro", text)}
            />
            <View style={styles.row}>
              <EditableTextCard
                label="Número"
                value={formData.numero}
                width="48%"
                onChangeText={(text) => handleChange("numero", text)}
              />
              <EditableTextCard
                label="CEP"
                value={formData.cep}
                width="48%"
                onChangeText={(text) => handleChange("cep", text)}
              />
            </View>
            <EditableTextCard
              label="Cidade"
              value={formData.cidade}
              onChangeText={(text) => handleChange("cidade", text)}
            />
            <EditableTextCard
              label="Estado"
              value={formData.estado}
              onChangeText={(text) => handleChange("estado", text)}
            />
            <Button
              title="Fechar"
              variant="outlined"
              type="dialog"
              onPress={() => setShowEndereco(false)}
            />
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
            paddingHorizontal: 30,
          }}
        >
          <View style={{ flex: 1, padding: 1 }}>
            <Button
              title="Salvar"
              type="dialog"
              disabled={!botaoHabilitado}
              onPress={async () => {
                const promises = [];

                for (const [campo, valor] of Object.entries(formData)) {
                  if (String(valor).trim() !== "Não informado") {
                    promises.push(
                      updateCampoFornecedor(
                        campo,
                        String(valor),
                        String(id),
                        endereco_id
                      )
                    );
                  }
                }

                await Promise.all(promises);
                setBotaoHabilitado(false);
                setAlertVisible(true);
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
        titulo="Você tem certeza que deseja excluir este fornecedor?"
        onSuccess={async () => {
          try {
            const response = await fetch(
              `http://192.168.1.12:3000/delete-fornecedor/${id}`,
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
            navigation.navigate("Clientes");
          } catch (err) {
            console.error("Erro ao conectar com o backend:", err);
          }
        }}
        onCancelar={() => setShowDialog(false)}
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
  email: {
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

export default PerfilFornecedor;
