import { ScrollView, View, StyleSheet } from "react-native";
import EditableTextCard from "@components/EditableTextCard";
import Button from "@components/botoes/Button";
import Nav from "@components/utilities/Nav";
import SidebarAlert from "@components/sidebars/Sidebaralert";
import ErrorSidebarAlert from "@components/sidebars/ErrorSidebarAlert";
import { MenuItem, Select } from "@components/utilities/Select";
import { estadosBrasileiros } from "@components/dialogs/DialogEndereco";
import { supabase } from "@lib/supabase";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { formatCNPJ, formatCpf, formatTelefone } from "@core/utils/format";
import { RootStackParamList } from "@context/types";

type Navigation = NativeStackNavigationProp<RootStackParamList>;

const CadastroClientePJ = () => {
  const navigation = useNavigation<Navigation>();

  const [razaoSocial, setRazaoSocial] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [cpfResponsavel, setCpfResponsavel] = useState("");
  const [cargoResponsavel, setCargoResponsavel] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");
  const [showEnderecoForm, setShowEnderecoForm] = useState(false);

  const [msgSucesso, setMsgSucesso] = useState("");
  const [sucessoVisivel, setSucessoVisivel] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const [erroVisivel, setErroVisivel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isFormValid = razaoSocial.trim() !== "";

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

  const salvarCliente = async () => {
    if (isLoading) return;
    let idEnderecoCriado: number | null = null;

    try {
      if (!razaoSocial.trim())
        throw new Error("Por favor, informe a Razão Social!");
      if (showEnderecoForm && !rua.trim()) {
        throw new Error("Preencha o endereço ou feche o formulário.");
      }

      setIsLoading(true);

      if (showEnderecoForm) {
        const { data: endIns, error: errEnd } = await supabase
          .from("endereco")
          .insert([
            { rua, bairro, cidade, cep, numero, estado: estadoSelecionado },
          ])
          .select()
          .single();
        if (errEnd) throw errEnd;
        idEnderecoCriado = endIns.id;
      }

      const pjData = {
        razao_social: razaoSocial,
        nome_fantasia: nomeFantasia || null,
        cnpj: cnpj || null,
        nome_do_responsavel: nomeResponsavel || null,
        cpf_responsavel: cpfResponsavel || null,
        cargo_do_representante: cargoResponsavel || null,
        telefone: telefone || null,
        email: email || null,
        endereco_id: idEnderecoCriado,
        data_criacao: new Date().toISOString(),
        ultima_atualizacao: new Date().toISOString(),
      };

      const { error: errPJ } = await supabase
        .from("pessoa_juridica")
        .insert(pjData);
      if (errPJ) throw errPJ;

      setMsgSucesso("Cliente cadastrado com sucesso!");
      setSucessoVisivel(true);
      navigation.navigate("Clientes", { novoCliente: true });
    } catch (e: any) {
      if (idEnderecoCriado)
        await supabase.from("endereco").delete().eq("id", idEnderecoCriado);
      setMsgErro("Erro ao salvar cliente: " + (e?.message ?? "desconhecido"));
      setErroVisivel(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Alerts */}
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

      <Nav
        titulo="Pessoa Jurídica"
        onBackPress={() => navigation.navigate("Clientes")}
      />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.formContainer}>
          <EditableTextCard
            label="RAZÃO SOCIAL"
            placeholder="Razão Social"
            value={razaoSocial}
            onChangeText={setRazaoSocial}
          />
          <EditableTextCard
            label="NOME FANTASIA"
            placeholder="Nome Fantasia"
            value={nomeFantasia}
            onChangeText={setNomeFantasia}
          />
          <EditableTextCard
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            tipo="number"
            value={cnpj}
            onChangeText={(t) => setCnpj(formatCNPJ(t))}
          />

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
                placeholder="Rua/Avenida"
                value={rua}
                onChangeText={setRua}
              />
              <EditableTextCard
                label="Bairro"
                placeholder="Bairro"
                value={bairro}
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
                  placeholder="00000-000"
                  tipo="number"
                  value={cep}
                  width="48%"
                  onChangeText={setCep}
                />
              </View>
              <EditableTextCard
                label="Cidade"
                placeholder="Cidade"
                value={cidade}
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
            label="NOME DO RESPONSÁVEL"
            placeholder="Nome Completo"
            value={nomeResponsavel}
            onChangeText={setNomeResponsavel}
          />
          <EditableTextCard
            label="CPF DO RESPONSÁVEL"
            placeholder="000.000.000-00"
            tipo="number"
            value={cpfResponsavel}
            onChangeText={(t) => setCpfResponsavel(formatCpf(t))}
          />
          <EditableTextCard
            label="CARGO DO RESPONSÁVEL"
            placeholder="Cargo"
            value={cargoResponsavel}
            onChangeText={setCargoResponsavel}
          />
          <EditableTextCard
            label="TELEFONE COMERCIAL"
            tipo="number"
            placeholder="(00) 00000-0000"
            value={telefone}
            onChangeText={(t) => setTelefone(formatTelefone(t))}
          />
          <EditableTextCard
            label="EMAIL COMERCIAL"
            placeholder="email@exemplo.com"
            value={email}
            onChangeText={setEmail}
          />

          <Button
            title={isLoading ? "SALVANDO..." : "CADASTRAR"}
            variant="contained"
            color="primary"
            disabled={!isFormValid || isLoading}
            type="submit"
            onPress={salvarCliente}
          />
        </View>
      </ScrollView>
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

export default CadastroClientePJ;
