import { ScrollView, View, StyleSheet } from "react-native";
import EditableTextCard from "@components/EditableTextCard";
import Button from "@components/botoes/Button";
import Nav from "@components/utilities/Nav";
import ErrorSidebarAlert from "@components/sidebars/ErrorSidebarAlert";
import { MenuItem, Select } from "@components/utilities/Select";
import { estadosBrasileiros } from "@components/dialogs/DialogEndereco"; // ✅ apenas um import, sem acento

import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { supabase } from "@lib/supabase";
import { EnderecoType, RootStackParamList } from "@context/types";
import { formatCNPJ, formatTelefone } from "@@core/format";
import SidebarAlert from "@components/sidebars/Sidebaralert";

const CadastroFornecedores = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  /* ---------- states ---------- */
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [ramoAtividade, setRamoAtividade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [chavePix, setChavePix] = useState("");

  const [showEnderecoForm, setShowEnderecoForm] = useState(false);
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  /* --- alertas --- */
  const [msgSucesso, setMsgSucesso] = useState("");
  const [sucessoVisivel, setSucessoVisivel] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const [erroVisivel, setErroVisivel] = useState(false);

  const isFormValid = razaoSocial.trim() !== "";

  /* ---------- salvar ---------- */
  const salvarFornecedor = async () => {
    if (isLoading) return;
    setIsLoading(true);

    let idEnderecoCriado: number | null = null;

    try {
      if (!razaoSocial.trim()) {
        throw new Error("Por favor, informe a Razão Social!");
      }

      /* 1‑ Salva endereço (se o usuário preencheu) */
      if (showEnderecoForm) {
        const { data: enderecoInserido, error: erroEndereco } = await supabase
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
          .single(); // ← devolve apenas uma linha

        if (erroEndereco) throw erroEndereco;
        idEnderecoCriado = enderecoInserido.id;
      }

      /* 2‑ Salva fornecedor */
      const { error: erroFornecedor } = await supabase
        .from("fornecedor")
        .insert([
          {
            razao_social: razaoSocial,
            cnpj,
            ramo_de_atividade: ramoAtividade,
            telefone,
            email: email || null,
            endereco_id: idEnderecoCriado, // pode ser null
            nome_responsavel: nomeResponsavel,
            chave_pix: chavePix,
            data_criacao: new Date().toISOString(),
            ultima_atualizacao: new Date().toISOString(),
          },
        ]);

      if (erroFornecedor) throw erroFornecedor;

      /* 3‑ Redireciona e mostra sucesso */
      setMsgSucesso("Fornecedor salvo com sucesso!");
      setSucessoVisivel(true);
      navigation.navigate("Fornecedores", { novoFornecedor: true });
    } catch (err: any) {
      /* rollback do endereço, caso precise */
      if (idEnderecoCriado) {
        await supabase.from("endereco").delete().eq("id", idEnderecoCriado);
      }
      setMsgErro(
        `Erro ao salvar fornecedor: ${err?.message ?? "Desconhecido"}`
      );
      setErroVisivel(true);
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- UI ---------- */
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

      <Nav
        titulo="Fornecedor"
        onBackPress={() => navigation.navigate("Fornecedores")}
      />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.formContainer}>
          <EditableTextCard
            label="RAZÃO SOCIAL"
            placeholder="Exemplo de Razão Social"
            tipo="string"
            value={razaoSocial}
            onChangeText={setRazaoSocial}
          />

          <EditableTextCard
            label="CNPJ"
            placeholder="12.345.678/0001-95"
            tipo="number"
            value={cnpj}
            onChangeText={(t) => setCnpj(formatCNPJ(t))}
          />

          <EditableTextCard
            label="RAMO DE ATIVIDADE"
            placeholder="Exemplo"
            tipo="string"
            value={ramoAtividade}
            onChangeText={setRamoAtividade}
          />

          <EditableTextCard
            label="TELEFONE"
            placeholder="(00) 0 0000-0000"
            tipo="number"
            value={telefone}
            onChangeText={(t) => setTelefone(formatTelefone(t))}
          />

          <EditableTextCard
            label="EMAIL"
            placeholder="example@email.com"
            tipo="string"
            value={email}
            onChangeText={setEmail}
          />

          {!showEnderecoForm ? (
            <Button
              title="Endereço"
              variant="outlined"
              type="dialog"
              onPress={() => setShowEnderecoForm(true)}
            />
          ) : (
            <View style={{ width: "100%" }}>
              <EditableTextCard
                width={"100%"}
                label="Logradouro"
                value={rua}
                placeholder="Logradouro"
                onChangeText={setRua}
              />
              <EditableTextCard
                width={"100%"}
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
                  value={cep}
                  tipo="number"
                  placeholder="00000-000"
                  width="48%"
                  onChangeText={setCep}
                />
              </View>
              <EditableTextCard
                width={"100%"}
                label="Cidade"
                placeholder="Cidade"
                value={cidade}
                onChangeText={setCidade}
              />

              <Select
                width={"100%"}
                label="Estado"
                placeholder="Selecione um estado"
                value={estadoSelecionado}
                onChange={setEstadoSelecionado}
              >
                {estadosBrasileiros.map((uf) => (
                  <MenuItem key={uf} value={uf}>
                    {uf}
                  </MenuItem>
                ))}
              </Select>
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
            tipo="string"
            value={nomeResponsavel}
            onChangeText={setNomeResponsavel}
          />

          <EditableTextCard
            label="CHAVE PIX"
            placeholder="Exemplo"
            tipo="string"
            value={chavePix}
            onChangeText={setChavePix}
          />

          <Button
            title={isLoading ? "SALVANDO..." : "SALVAR"}
            variant="contained"
            color="primary"
            disabled={!isFormValid || isLoading}
            type="submit"
            onPress={salvarFornecedor}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "#fff",
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
    backgroundColor: "#fff",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  formContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    gap: 4,
  },
  inputItem: {
    width: "90%",
    maxWidth: 400,
  },
});

export default CadastroFornecedores;
