import { ScrollView, View, StyleSheet } from "react-native";
import EditableTextCard from "@components/EditableTextCard";
import Button from "@components/botoes/Button";
import Nav from "@components/utilities/Nav";
import SidebarAlert from "@components/sidebars/Sidebaralert";
import ErrorSidebarAlert from "@components/sidebars/ErrorSidebarAlert";
import { MenuItem, Select } from "@components/utilities/Select";
import { estadosBrasileiros } from "@components/dialogs/DialogEndereco";
import DialogRoles from "@components/dialogs/DialogRoles";
import Selecionado from "@components/Selecionado";
import { supabase } from "@lib/supabase";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  formatCpf,
  formatDate,
  formatRg,
  formatTelefone,
} from "@core/utils/format";
import { RootStackParamList } from "@context/types";

const generos = ["Masculino", "Feminino", "Prefiro não dizer"];
const estadosCivis = ["Casado(a)", "Solteiro(a)", "Prefiro não dizer"];

type Navigation = NativeStackNavigationProp<RootStackParamList>;

const CadastroFuncionarios = () => {
  const navigation = useNavigation<Navigation>();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [genero, setGenero] = useState<string>("");
  const [estadoCivil, setEstadoCivil] = useState<string>("");
  const [cargo, setCargo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");
  const [showEnderecoForm, setShowEnderecoForm] = useState(false);

  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [codigoRole, setCodigoRole] = useState<number | null>(null);
  const [roleSelecionada, setRoleSelecionada] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [msgSucesso, setMsgSucesso] = useState("");
  const [sucessoVisivel, setSucessoVisivel] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const [erroVisivel, setErroVisivel] = useState(false);

  const isFormValid = nome.trim() !== "";

  useEffect(() => {
    if (sucessoVisivel) {
      const t = setTimeout(() => setSucessoVisivel(false), 3000);
      return () => clearTimeout(t);
    }
  }, [sucessoVisivel]);

  useEffect(() => {
    if (erroVisivel) {
      const t = setTimeout(() => setErroVisivel(false), 4000);
      return () => clearTimeout(t);
    }
  }, [erroVisivel]);

  const salvarFuncionario = async () => {
    if (isLoading) return;

    if (senha !== confirmarSenha) {
      setMsgErro("As senhas não coincidem!");
      setErroVisivel(true);
      return;
    }
    if (senha.length < 6) {
      setMsgErro("A senha deve ter pelo menos 6 caracteres.");
      setErroVisivel(true);
      return;
    }
    if (!roleSelecionada || codigoRole == null) {
      setMsgErro("Selecione a permissão do usuário.");
      setErroVisivel(true);
      return;
    }

    setIsLoading(true);
    let idEnderecoCriado: number | null = null;

    try {
      if (!nome.trim()) throw new Error("Por favor, informe o nome!");
      if (showEnderecoForm && !rua.trim()) {
        throw new Error("Preencha o endereço ou feche o formulário.");
      }

      if (showEnderecoForm) {
        const { data: endIns, error: errEnd } = await supabase
          .from("endereco")
          .insert([
            {
              rua,
              bairro,
              cidade,
              cep,
              numero,
              estado: estadoSelecionado,
            },
          ])
          .select()
          .single();

        if (errEnd) throw errEnd;
        idEnderecoCriado = endIns.id;
      }

      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password: senha,
          options: {
            data: {
              nome,
              role_id: codigoRole,
            },
          },
        });

      if (signUpError || !signUpData?.user) throw signUpError;
      const authUserId = signUpData.user.id;

      const funcionario = {
        id: authUserId,
        nome,
        cpf: cpf || null,
        rg: rg || null,
        data_nascimento: dataNasc || null,
        genero: genero || null,
        estado_civil: estadoCivil || null,
        telefone: telefone || null,
        email: email || null,
        cargo: cargo || null,
        role_id: codigoRole,
        endereco_id: idEnderecoCriado,
        data_criacao: new Date().toISOString(),
        ultima_atualizacao: new Date().toISOString(),
      };

      const { error: errFunc } = await supabase
        .from("funcionarios")
        .insert(funcionario);
      if (errFunc) throw errFunc;

      setMsgSucesso("Funcionário cadastrado com sucesso!");
      setSucessoVisivel(true);
      navigation.navigate("Funcionarios", { novoFuncionario: true });
    } catch (e: any) {
      if (idEnderecoCriado)
        await supabase.from("endereco").delete().eq("id", idEnderecoCriado);
      setMsgErro(
        "Erro ao salvar funcionário: " + (e?.message ?? "desconhecido")
      );
      setErroVisivel(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SidebarAlert
        message={msgSucesso}
        visible={sucessoVisivel}
        type="success"
        onClose={() => setSucessoVisivel(false)}
      />
      <ErrorSidebarAlert
        message={msgErro}
        visible={erroVisivel}
        onClose={() => setErroVisivel(false)}
      />

      <Nav titulo="Funcionário" onBackPress={() => navigation.goBack()} />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.formContainer}>
          <EditableTextCard
            label="NOME"
            placeholder="Nome Completo"
            value={nome}
            onChangeText={setNome}
          />
          <EditableTextCard
            label="CPF"
            placeholder="000.000.000-00"
            tipo="number"
            value={cpf}
            onChangeText={(t) => setCpf(formatCpf(t))}
          />
          <EditableTextCard
            label="RG"
            placeholder="00.000.000-X"
            value={rg}
            tipo="number"
            onChangeText={(t) => setRg(formatRg(t))}
          />

          <View style={{ width: "100%" }}>
            <Select
              width="100%"
              label="GÊNERO"
              value={genero}
              onChange={setGenero}
            >
              {generos.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </Select>
          </View>

          <View style={{ width: "100%" }}>
            <Select
              width="100%"
              label="ESTADO CIVIL"
              value={estadoCivil}
              onChange={setEstadoCivil}
            >
              {estadosCivis.map((e) => (
                <MenuItem key={e} value={e}>
                  {e}
                </MenuItem>
              ))}
            </Select>
          </View>

          {!showEnderecoForm ? (
            <Button
              title="Endereço"
              variant="outlined"
              type="dialog"
              onPress={() => setShowEnderecoForm(true)}
            />
          ) : (
            <View style={styles.addressBlock}>
              <EditableTextCard
                label="Logradouro"
                value={rua}
                placeholder="Rua/Avenida"
                onChangeText={setRua}
              />
              <EditableTextCard
                label="Bairro"
                value={bairro}
                placeholder="Bairro"
                onChangeText={setBairro}
              />
              <View style={styles.row}>
                <EditableTextCard
                  label="Número"
                  placeholder="000"
                  tipo="number"
                  value={numero}
                  width="48%"
                  onChangeText={setNumero}
                />
                <EditableTextCard
                  label="CEP"
                  placeholder="00000‑000"
                  tipo="number"
                  value={cep}
                  width="48%"
                  onChangeText={setCep}
                />
              </View>
              <EditableTextCard
                label="Cidade"
                value={cidade}
                placeholder="Cidade"
                onChangeText={setCidade}
              />
              <View style={{ width: "100%" }}>
                <Select
                  width="100%"
                  label="Estado"
                  value={estadoSelecionado}
                  onChange={setEstadoSelecionado}
                >
                  {estadosBrasileiros.map((uf) => (
                    <MenuItem key={uf} value={uf}>
                      {uf}
                    </MenuItem>
                  ))}
                </Select>
              </View>
              <Button
                title="Fechar endereço"
                variant="outlined"
                type="dialog"
                onPress={() => setShowEnderecoForm(false)}
              />
            </View>
          )}

          <EditableTextCard
            label="DATA DE NASCIMENTO"
            placeholder="aaaa/mm/dd"
            value={dataNasc}
            tipo="number"
            onChangeText={(t) => setDataNasc(formatDate(t))}
          />
          <EditableTextCard
            label="EMAIL"
            placeholder="email@exemplo.com"
            value={email}
            onChangeText={setEmail}
          />
          <EditableTextCard
            label="TELEFONE"
            placeholder="(00) 00000-0000"
            tipo="number"
            value={telefone}
            onChangeText={(t) => setTelefone(formatTelefone(t))}
          />
          <EditableTextCard
            label="FUNÇÃO"
            placeholder="Ex: Gerente"
            value={cargo}
            onChangeText={setCargo}
          />

          <Button
            title="Permissão"
            variant="outlined"
            type="dialog"
            onPress={() => setShowRoleDialog(true)}
            disabled={!!roleSelecionada}
          />
          {roleSelecionada && (
            <Selecionado
              titulo={roleSelecionada}
              onClear={() => setRoleSelecionada(null)}
            />
          )}

          <EditableTextCard
            label="SENHA"
            placeholder="Digite a senha"
            value={senha}
            tipo="password"
            onChangeText={setSenha}
          />
          <EditableTextCard
            label="CONFIRMAR SENHA"
            placeholder="Confirme a senha"
            tipo="password"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />

          <Button
            title={isLoading ? "SALVANDO..." : "SALVAR"}
            variant="contained"
            color="primary"
            disabled={!isFormValid || isLoading}
            type="submit"
            onPress={salvarFuncionario}
          />
        </View>
      </ScrollView>

      {showRoleDialog && (
        <DialogRoles
          open={showRoleDialog}
          onClose={() => setShowRoleDialog(false)}
          onSelect={(id, titulo) => {
            setCodigoRole(id);
            setRoleSelecionada(titulo);
            setMsgSucesso("Permissão selecionada com sucesso!");
            setSucessoVisivel(true);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 32,
  },
  formContainer: {
    marginTop: 24,
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  addressBlock: {
    width: "100%",
    alignItems: "center",
  },
});

export default CadastroFuncionarios;
