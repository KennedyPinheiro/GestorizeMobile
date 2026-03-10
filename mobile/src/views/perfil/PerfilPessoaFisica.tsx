import Button from "@components/botoes/Button";
import Nav from "@components/utilities/Nav";
import PessoaFisicaIcon from "@components/Icons/PessoaFisicaIcon";
import EditableTextCard from "@components/EditableTextCard";
import SidebarAlert from "@components/sidebars/Sidebaralert";

import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@context/types";
import { useEffect, useState } from "react";
import { supabase } from "@lib/supabase";
import DialogConfirmarAcao from "@components/dialogs/DialogConfirmarAcao";

const PerfilPessoaFisica = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showDialog, setShowDialog] = useState(false);
  const route = useRoute<RouteProp<RootStackParamList, "PerfilPessoaFisica">>();

  const {
    id,
    nome,
    email,
    telefone,
    genero,
    estado_civil,
    data_nascimento,
    rg,
    cpf,
    rua,
    bairro,
    cidade,
    estado,
    cep,
    numero,
    endereco_id,
  } = route.params;

  const [formData, setFormData] = useState({
    nome,
    email,
    telefone,
    genero,
    estado_civil,
    data_nascimento,
    rg,
    cpf,
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
  const [alertVisible, setAlertVisible] = useState(false);

  const primeiroNome = nome?.split(" ")[0] || "Cliente";

  useEffect(() => {
    const houveMudanca = Object.entries(formData).some(
      ([campo, valor]) =>
        valor !== originalData[campo as keyof typeof originalData]
    );
    setBotaoHabilitado(houveMudanca);
  }, [formData, originalData]);

  useEffect(() => {
    const canal = supabase.channel("cliente-profile-listener");

    if (id) {
      canal
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "clientes",
            filter: `id=eq.${id}`,
          },
          (payload) => {
            const dados = payload.new;
            setFormData((prev) => ({
              ...prev,
              telefone: dados.telefone ?? prev.telefone,
              genero: dados.genero ?? prev.genero,
              estado_civil: dados.estado_civil ?? prev.estado_civil,
              data_nascimento: dados.data_nascimento ?? prev.data_nascimento,
              rg: dados.rg ?? prev.rg,
              cpf: dados.cpf ?? prev.cpf,
              nome: dados.nome ?? prev.nome,
              email: dados.email ?? prev.email,
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
              numero: dados.numero ?? prev.numero,
              cep: dados.cep ?? prev.cep,
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

  const updateCampoCliente = async (
    campo: string,
    valor: string,
    clienteId: string,
    enderecoId?: number
  ) => {
    const camposCliente = [
      "nome",
      "email",
      "telefone",
      "genero",
      "estado_civil",
      "data_nascimento",
      "rg",
      "cpf",
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
      if (camposCliente.includes(campo)) {
        const { error } = await supabase
          .from("pessoa_fisica")
          .update({ [campo]: valor, ultima_atualizacao: new Date() })
          .eq("id", clienteId);

        if (error)
          console.error(
            `Erro ao atualizar ${campo} em pessoa_fisica:`,
            error.message
          );
      } else if (camposEndereco.includes(campo) && enderecoId) {
        const { error } = await supabase
          .from("endereco")
          .update({ [campo]: valor })
          .eq("id", enderecoId);

        if (error)
          console.error(
            `Erro ao atualizar ${campo} em endereco:`,
            error.message
          );
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
        titulo={primeiroNome}
        onBackPress={() => navigation.goBack()}
        showPessoaFisicaIcon
      />

      <ScrollView style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <PessoaFisicaIcon
            color="#000"
            style={styles.userIcon}
            rounded={false}
            size={90}
            iconSize={90}
          />
          <View>
            <Text style={styles.nome}>{formData.nome}</Text>
            <Text style={styles.email}>{formData.email}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <EditableTextCard
          label="Nome Completo"
          value={formData.nome}
          onChangeText={(text) => handleChange("nome", text)}
        />
        <EditableTextCard
          label="Email"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        <View style={styles.row}>
          <EditableTextCard
            label="Gênero"
            value={formData.genero}
            width="48%"
            onChangeText={(text) => handleChange("genero", text)}
          />
          <EditableTextCard
            label="Estado Civil"
            value={formData.estado_civil}
            width="48%"
            onChangeText={(text) => handleChange("estado_civil", text)}
          />
        </View>
        <EditableTextCard
          label="Telefone"
          value={formData.telefone}
          onChangeText={(text) => handleChange("telefone", text)}
        />
        <EditableTextCard
          label="Data Nascimento"
          value={formData.data_nascimento}
          onChangeText={(text) => handleChange("data_nascimento", text)}
        />
        <EditableTextCard
          label="RG"
          value={formData.rg}
          onChangeText={(text) => handleChange("rg", text)}
        />
        <EditableTextCard
          label="CPF"
          value={formData.cpf}
          onChangeText={(text) => handleChange("cpf", text)}
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
                      updateCampoCliente(
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
        titulo="Você tem certeza que deseja excluir este cliente?"
        onSuccess={async () => {
          try {
            const response = await fetch(
              `http://192.168.1.12:3001/delete-cliente/${id}`,
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
    paddingHorizontal: 2,
    gap: 10,
  },
  divider: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default PerfilPessoaFisica;
