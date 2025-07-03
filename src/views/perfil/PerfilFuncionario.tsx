import Button from "@components/botoes/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@context/types";
import Nav from "@components/utilities/Nav";
import PessoaFisicaIcon from "@components/Icons/PessoaFisicaIcon";
import EditableTextCard from "@components/EditableTextCard";
import { useEffect, useState } from "react";
import SidebarAlert from "@components/sidebars/Sidebaralert";
import { supabase } from "@lib/supabase";
import DialogConfirmarAcao from "@components/dialogs/DialogConfirmarAcao";

const PerfilFuncionario = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showEndereco, setShowEndereco] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [idUsuarioLogado, setIdUsuarioLogado] = useState<string | null>(null);

  const [message, setMessage] = useState("Dados atualizados com sucesso!");

  const route = useRoute<RouteProp<RootStackParamList, "PerfilFuncionario">>();

  const {
    id,
    nome,
    funcao,
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

  const [originalData] = useState({
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

  const [botaoHabilitado, setBotaoHabilitado] = useState(false);
  const primeiroNome = nome.split(" ")[0];
  useEffect(() => {
    const houveMudanca = Object.entries(formData).some(
      ([campo, valor]) =>
        valor !== originalData[campo as keyof typeof originalData]
    );
    setBotaoHabilitado(houveMudanca);
  }, [formData, originalData]);

  useEffect(() => {
    const canal = supabase.channel("user-profile-listener");

    if (id) {
      canal
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "funcionarios",
            filter: `id=eq.${id}`,
          },
          async (payload) => {
            const dados = payload.new;

            setFormData((prev) => ({
              ...prev,
              telefone: dados.telefone ?? prev.telefone,
              genero: dados.genero ?? prev.genero,
              estado_civil: dados.estado_civil ?? prev.estado_civil,
              data_nascimento: dados.data_nascimento ?? prev.data_nascimento,
              rg: dados.rg ?? prev.rg,
              cpf: dados.cpf ?? prev.cpf,
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
          async (payload) => {
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

  const updateCampoUsuario = async (
    campo: string,
    valor: string,
    funcionarioId: string,
    enderecoId?: number
  ) => {
    try {
      const response = await fetch(
        `http://192.168.1.12:3001/update-user/${funcionarioId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            [campo]: valor,
            endereco_id: enderecoId,
          }),
        }
      );

      if (!response.ok) {
        const { error } = await response.json();
        console.error(`Erro ao atualizar ${campo}:`, error);
        return;
      }
    } catch (err) {
      console.error(`Erro inesperado ao atualizar ${campo}:`, err);
    }
  };
  useEffect(() => {
    const getUsuarioLogado = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setIdUsuarioLogado(data.user.id);
      }
    };
    getUsuarioLogado();
  }, []);
  

  const handleChange = (campo: string, valor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SidebarAlert
        message={message}
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
            <Text style={styles.cargo}>{funcao}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <EditableTextCard
          label="Nome Completo"
          value={formData.nome || "Não informado"}
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
            value={formData.genero || "Não informado" }
            width="48%"
            onChangeText={(text) => handleChange("genero", text)}
          />
          <EditableTextCard
            label="Estado Civil"
            value={formData.estado_civil || "Não informado"}
            width="48%"
            onChangeText={(text) => handleChange("estado_civil", text)}
          />
        </View>
        <EditableTextCard
          label="Telefone"
          value={formData.telefone || "Não informado"}
          onChangeText={(text) => handleChange("telefone", text)}
        />
        <EditableTextCard
          label="Data Nascimento"
          value={formData.data_nascimento || "Não informado" }
          onChangeText={(text) => handleChange("data_nascimento", text)}
        />
        <EditableTextCard
          label="Registro Geral (RG)"
          value={formData.rg || "Não informado" }
          onChangeText={(text) => handleChange("rg", text)}
        />
        <EditableTextCard
          label="Cadastro Pessoa Fisica (CPF)"
          value={formData.cpf || "Não informado" }
          onChangeText={(text) => handleChange("cpf", text)}
        />
        {!showEndereco ? (
          <View style={{ marginBottom: 30 }}>
            <Button
              variant="outlined"
              type="dialog"
              title="Endereço"
              onPress={() => setShowEndereco(true)}
            />
          </View>
        ) : (
          <View style={{ marginBottom: 30 }}>
            <EditableTextCard
              label="Logradouro"
              value={formData.rua || "Não informado" }
              onChangeText={(text) => handleChange("rua", text)}
            />
            <EditableTextCard
              label="Bairro"
              value={formData.bairro || "Não informado" }
              onChangeText={(text) => handleChange("bairro", text)}
            />
            <View style={styles.row}>
              <EditableTextCard
                label="Número"
                value={formData.numero || "Não informado" }
                width="48%"
                onChangeText={(text) => handleChange("numero", text)}
              />
              <EditableTextCard
                label="CEP"
                value={formData.cep || "Não informado" }
                width="48%"
                onChangeText={(text) => handleChange("cep", text)}
              />
            </View>
            <EditableTextCard
              label="Cidade"
              value={formData.cidade || "Não informado" }
              onChangeText={(text) => handleChange("cidade", text)}
            />
            <EditableTextCard
              label="Estado"
              value={formData.estado || "Não informado" }
              onChangeText={(text) => handleChange("estado", text)}
            />
            <View style={{ marginBottom: 30 }}>
              <Button
                variant="outlined"
                type="dialog"
                title="Fechar"
                onPress={() => setShowEndereco(false)}
              />
            </View>
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
                const campos = Object.entries(formData);
                const promises = [];

                for (const [campo, valor] of campos) {
                  if (String(valor).trim() !== "Não informado") {
                    promises.push(
                      updateCampoUsuario(campo, String(valor), id, endereco_id)
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
              disabled={id === idUsuarioLogado}
              onPress={() => setShowDialog(true)}
            />
          </View>
        </View>
      </ScrollView>
      <DialogConfirmarAcao
        show={showDialog}
        setShow={setShowDialog}
        titulo="Você tem certeza que deseja excluir este funcionário?"
        onSuccess={async () => {
          try {
            const response = await fetch(
              `http://192.168.1.12:3001/delete-user/${id}`,
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
            navigation.navigate("Funcionarios");
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
  cargo: {
    fontSize: 25,
    fontWeight: 800,
    color: "#000",
    marginTop: 2,
  },
  card: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "column",
    gap: 7,
    margin: 3,
  },
  divider: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  userIcon: {
    marginRight: 20,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    gap: 10,
  },
});

export default PerfilFuncionario;
