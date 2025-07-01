import Button from "@components/botoes/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@context/types";
import Nav from "@components/utilities/Nav";
import EditableTextCard from "@components/EditableTextCard";
import { useState, useEffect } from "react";
import PessoaFisicaIcon from "@components/Icons/PessoaFisicaIcon";
import { supabase } from "@lib/supabase";
import SidebarAlert from "@components/sidebars/Sidebaralert";

const UserPerfil = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "UserPerfil">>();
  const [showEndereco, setShowEndereco] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [message, setMessage] = useState("Dados atualizados com sucesso!");

  const {
    id,
    nome,
    funcao,
    email,
    telefone,
    genero,
    estado_civil,
    data_nascimento,
    endereco_id,
    rg,
    cpf,
    rua,
    bairro,
    cidade,
    estado,
    cep,
    numero,
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
    endereco_id,
    cidade,
    estado,
    cep,
    numero,
  });

  const [originalData] = useState({
    // valores originais
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

  useEffect(() => {
    const houveMudanca = Object.entries(formData).some(
      ([campo, valor]) =>
        valor !== originalData[campo as keyof typeof originalData]
    );
    setBotaoHabilitado(houveMudanca);
  }, [formData, originalData]);

  useEffect(() => {
    const canal = supabase.channel('user-profile-listener');
  
    if (id) {
      canal
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'funcionarios',
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
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'endereco',
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
    const camposFuncionario = [
      "nome",
      "email",
      "cpf",
      "rg",
      "data_nascimento",
      "genero",
      "estado_civil",
      "telefone",
      "cargo",
    ];
    const camposEndereco = [
      "rua",
      "bairro",
      "cidade",
      "estado",
      "numero",
      "cep",
    ];
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", funcionarioId);
    console.log(data);

    try {
      if (camposFuncionario.includes(campo)) {
        const { error: funcionarioError } = await supabase
          .from("funcionarios")
          .update({ [campo]: valor, ultima_atualizacao: new Date() })
          .eq("id", funcionarioId);

        if (funcionarioError) {
          console.error(
            `Erro ao atualizar ${campo} na tabela funcionarios:`,
            funcionarioError.message
          );
        }

        if (campo === "nome" || campo === "email") {
          const { error: userError } = await supabase
            .from("users")
            .update({ [campo]: valor })
            .eq("id", funcionarioId);

          if (userError) {
            console.error(
              `Erro ao atualizar ${campo} na tabela users:`,
              userError.message
            );
          }
        }
      } else if (camposEndereco.includes(campo)) {
        if (!enderecoId) {
          console.error("Endereço não encontrado.");
          return;
        }

        const { error } = await supabase
          .from("endereco")
          .update({ [campo]: valor })
          .eq("id", enderecoId);

        if (error) {
          console.error(
            `Erro ao atualizar ${campo} na tabela endereco:`,
            error.message
          );
        }
      }
    } catch (err) {
      console.error(`Erro inesperado ao atualizar ${campo}:`, err);
    }
  };

  const handleChange = (campo: string, valor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  };

  return (
    <View style={{ flex: 1 }}>
      <SidebarAlert
        message={message}
        visible={alertVisible}
        type="success"
        onClose={() => setAlertVisible(false)}
      />
      <Nav
        titulo={nome}
        onBackPress={() => navigation.goBack()}
        showPessoaFisicaIcon
      />
      <ScrollView style={styles.container}>
        <View style={{ alignItems: "center", marginTop: 60 }}>
          <PessoaFisicaIcon color="#000" style={styles.userIcon} />
          <Text style={styles.nome}>{formData.nome}</Text>
          <Text style={styles.email}>{funcao}</Text>
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
          label="Registro Geral (RG)"
          value={formData.rg}
          onChangeText={(text) => handleChange("rg", text)}
        />
        <EditableTextCard
          label="Cadastro Pessoa Fisica (CPF)"
          value={formData.cpf}
          onChangeText={(text) => handleChange("cpf", text)}
        />
        {!showEndereco ? (
          <View style={{ marginBottom: 70 }}>
            <Button
              variant="outlined"
              type="dialog"
              title="Endereço"
              onPress={() => setShowEndereco(true)}
            />
          </View>
        ) : (
          <View style={{ marginBottom: 70 }}>
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
          </View>
        )}
        <View style={{ marginBottom: 40 }}>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
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
    transform: [{ scale: 3 }],
    marginBottom: 60,
  },
  nome: {
    fontSize: 25,
    fontWeight: "800",
  },
  email: {
    color: "#5e5e5e",
    fontSize: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    gap: 10,
  },
});

export default UserPerfil;
