import { ScrollView, View, StyleSheet } from "react-native";
import InputCard from "@components/InputCard";
import DialogEndereço from "@components/dialogs/DialogEndereco";
import Button from "@components/botoes/Button";
import NavBar from "@components/utilities/NavBar";
import { useEffect, useState } from "react";
import { MenuItem, Select } from "@components/utilities/Select";
import { supabase } from "@lib/supabase";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@App";
import {
  formatCpf,
  formatDate,
  formatRg,
  formatTelefone,
} from "src/@core/format";
import ErrorSidebarAlert from "@components/sidebars/ErrorSidebarAlert";
import SidebarAlert from "@components/sidebars/Sidebaralert";
import { EnderecoType} from "@context/types";
import DialogRoles from "@components/dialogs/DialogRoles";
import Selecionado from "@components/Selecionado";

const generos = ["Masculino", "Feminino", "Prefiro não Dizer"];
const estadoCivil = ["Casado(a)", "Solteiro(a)", "Prefiro não Dizer"];

const CadastroFuncionarios = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [data, setData] = useState("");
  const [rg, setRG] = useState("");
  const [genero, setGenero] = useState<string>("");
  const [EstadoCivil, setEstadoCivil] = useState<string>("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [cargo, setCargo] = useState("");
  const [endereço, setEndereco] = useState(false);
  const [visible, setVisible] = useState(false);
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erroVisible, setErroVisible] = useState(false);
  const [erroMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [dadosEndereco, setDadosEndereco] = useState<EnderecoType | null>(null);
  const [role, setRole] = useState(false);

  const [codigoRole, setCodigoRole] = useState(0);
  const [roleSelecionada, setRoleSelecionada] = useState<string | null>(null);
  const isFormValid = nome.trim() !== "";
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenEndereço = () => setEndereco(true);
  const handleCloseEndereço = () => setEndereco(false);

  const handleOpenRole = () => setRole(true);
  const handleCloseRole = () => setRole(false);

  const handleSelectRole = (id: number, titulo: string) => {
    setCodigoRole(id);
    setRoleSelecionada(titulo);
    setVisible(true);
    setMessage("Role salvo com sucesso");
    handleCloseRole();
  };

  async function onPress(endereco: EnderecoType) {
    setDadosEndereco(endereco);
    setVisible(true);
    setMessage("Endereço salvo com sucesso");
    handleCloseEndereço();
  }

  async function salvarFuncionario() {
    if (isLoading) return;

    if (senha !== confirmarSenha) {
      setErrorMessage("As senhas não coincidem!");
      setErroVisible(true);
      return;
    }

    if (senha.length < 6) {
      setErrorMessage("A senha deve ter pelo menos 6 caracteres.");
      setErroVisible(true);
      return;
    }

    setIsLoading(true);
    let idEnderecoCriado: number | null = null;

    try {
      if (!nome.trim()) {
        setErrorMessage("Por favor, informe o nome");
        setVisible(true);
        return;
      }

      if (!dadosEndereco) {
        setErrorMessage(
          "Por favor, cadastre o endereço antes de salvar o funcionário."
        );
        setVisible(true);
        return;
      }

      if (!roleSelecionada) {
        setErrorMessage("Por favor,selecione uma permissão do usuario.");
        setVisible(true);
        return;
      }

      const { data: enderecoInserido, error: erroEndereco } = await supabase
        .from("endereco")
        .insert(dadosEndereco)
        .select();

      if (erroEndereco || !enderecoInserido || enderecoInserido.length === 0) {
        throw erroEndereco || new Error("Falha ao inserir endereço");
      }

      idEnderecoCriado = enderecoInserido[0].id;

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: {
            nome,
          },
        },
      });
      
      if (signUpError || !signUpData?.user) {
        throw signUpError || new Error("Erro ao registrar usuário no Supabase Auth");
      }
      
      const authUserId = signUpData.user.id;
      const funcionarioData = {
        id: authUserId, 
        nome,
        cpf: cpf || null,
        rg: rg || null,
        data_nascimento: data || null,
        genero: genero || null,
        estado_civil: EstadoCivil || null,
        telefone: celular || null,
        email: email || null,
        cargo: cargo || null,
        role_id: codigoRole,
        data_criacao: new Date().toISOString(),
        ultima_atualizacao: new Date().toISOString(),
        endereco_id: idEnderecoCriado,
      };

      const { error: erroFuncionario } = await supabase
        .from("funcionarios")
        .insert(funcionarioData);

      if (erroFuncionario) {
        throw erroFuncionario;
      }

      setMessage("Funcionário cadastrado com sucesso!");
      setVisible(true);
      navigation.navigate("Funcionarios", {
        novoFuncionario: true,
      });
    } catch (error) {
      if (idEnderecoCriado) {
        await supabase.from("endereco").delete().eq("id", idEnderecoCriado);
      }

      setErrorMessage(
        "Erro ao salvar funcionário: " + (error as any)?.message ||
          "desconhecido"
      );
      setErroVisible(true);
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  }

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);
  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainer}
    >
      <SidebarAlert
        message={message}
        visible={visible}
        type="success"
        onClose={() => setVisible(false)}
      />
      <ErrorSidebarAlert
        message={erroMessage}
        visible={erroVisible}
        onClose={() => setErroVisible(false)}
      />
      <View style={styles.container}>
        <NavBar title="Funcionario" backButton={false} />

        <View style={styles.formContainer}>
          <View style={styles.inputItem}>
            <InputCard
              label="NOME COMPLETO"
              placeholder="Complete Example Name"
              tipo="string"
              value={nome}
              onChangeText={setNome}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="CPF"
              placeholder="123.456.789-09"
              tipo="string"
              value={cpf}
              onChangeText={(text) => {
                setCpf(formatCpf(text));
              }}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="RG"
              placeholder="12.345.678"
              tipo="string"
              value={rg}
              onChangeText={(text) => {
                setRG(formatRg(text));
              }}
            />
          </View>
          <View style={styles.inputItem}>
            <Select
              value={genero}
              onChange={setGenero}
              label="GÊNERO"
              size="small"
            >
              {generos.map((MF) => (
                <MenuItem key={MF} value={MF}>
                  {MF}
                </MenuItem>
              ))}
            </Select>
          </View>
          <View style={styles.inputItem}>
            <Select
              value={EstadoCivil}
              onChange={setEstadoCivil}
              label="ESTADO CIVIL"
              size="small"
            >
              {estadoCivil.map((CD) => (
                <MenuItem key={CD} value={CD}>
                  {CD}
                </MenuItem>
              ))}
            </Select>
          </View>
          <View style={styles.inputItem}>
            <Button
              title="ENDEREÇO"
              onPress={handleOpenEndereço}
              variant="contained"
              color="primary"
              type="dialog"
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="DATA DE NASCIMENTO"
              placeholder="0000 / 00 /00"
              tipo="string"
              value={data}
              onChangeText={(text) => {
                setData(formatDate(text));
              }}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="EMAIL"
              placeholder="example@email.com"
              tipo="string"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="TELEFONE"
              placeholder="(00) 00000-0000"
              tipo="number"
              value={celular}
              onChangeText={(text) => {
                setCelular(formatTelefone(text));
              }}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="FUNÇÃO"
              placeholder="Example"
              tipo="string"
              value={cargo}
              onChangeText={setCargo}
            />
          </View>
          <View style={styles.inputItem}>
            <Button
              title="PERMISSÃO"
              variant="contained"
              color="primary"
              type="dialog"
              onPress={handleOpenRole}
              disabled={!!roleSelecionada}
            />
            {roleSelecionada && (
              <Selecionado
                titulo={roleSelecionada}
                onClear={() => setRoleSelecionada(null)}
              />
            )}
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="SENHA"
              placeholder="Digite sua senha"
              tipo="password"
              value={senha}
              onChangeText={setSenha}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="CONFIRMAR SENHA"
              placeholder="Confirme sua senha"
              tipo="password"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
          </View>
          <Button
            title={isLoading ? "SALVANDO..." : "SALVAR"}
            variant="contained"
            color="primary"
            disabled={!isFormValid || isLoading }
            type="submit"
            onPress={salvarFuncionario}
          />
        </View>
      </View>

      {endereço && (
        <DialogEndereço
          onClose={handleCloseEndereço}
          onSave={onPress}
          visible={endereço}
        />
      )}
      {role && (
        <DialogRoles
          onClose={handleCloseRole}
          open={role}
          onSelect={handleSelectRole}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#F3F3F2",
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
    backgroundColor: "#F3F3F2",
  },
  formContainer: {
    marginTop: 24,
    marginBottom: 155,
    width: "100%",
    alignItems: "center",
    gap: 2,
  },
  inputItem: {
    width: "90%",
    maxWidth: 400,
  },
});

export default CadastroFuncionarios;
