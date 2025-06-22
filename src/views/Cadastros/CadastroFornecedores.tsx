import { ScrollView, View, StyleSheet } from "react-native";
import InputCard from "@components/InputCard";
import DialogEndereço from "@components/dialogs/DialogEndereco";
import Button from "@components/botoes/Button";
import NavBar from "@components/utilities/NavBar";
import { useState } from "react";
import { RootStackParamList } from "@App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "@lib/supabase";
import { EnderecoType } from "@context/types";
import ErrorSidebarAlert from "@components/sidebars/ErrorSidebarAlert";
import SidebarAlert from "@components/sidebars/Sidebaralert";
import { formatCNPJ, formatTelefone } from "@@core/format";

const CadastroFornecedores = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [ramoAtividade, setRamoAtividade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [chavePix, setChavePix] = useState("");
  const [endereço, setEndereco] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const [erroVisible, setErroVisible] = useState(false);
  const [dadosEndereco, setDadosEndereco] = useState<EnderecoType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = razaoSocial.trim() !== "";

  const handleOpenEndereço = () => setEndereco(true);
  const handleCloseEndereço = () => setEndereco(false);

  async function onPress(endereco: EnderecoType) {
    setDadosEndereco(endereco);
    setVisible(true);
    setMessage("Endereço salvo com sucesso");
    handleCloseEndereço();
  }
  async function salvarFornecedor() {
    if (isLoading) return;
    setIsLoading(true);
  
    let idEnderecoCriado: number | null = null;
  
    try {
      if (!razaoSocial.trim()) {
        setErrorMessage("Por favor, informe a Razão Social!!");
        setErroVisible(true);
        setIsLoading(false);
        return;
      }
  
      if (!dadosEndereco) {
        setErrorMessage("Por favor, cadastre o endereço antes de salvar fornecedor.");
        setErroVisible(true);
        setIsLoading(false);
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
  
      const fornecedorData = {
        razao_social: razaoSocial,
        cnpj,
        ramo_de_atividade: ramoAtividade,
        telefone,
        email: email || null,
        endereco_id: idEnderecoCriado,
        nome_responsavel: nomeResponsavel,
        chave_pix: chavePix,
        ultima_atualizacao: new Date().toISOString(),
        data_criacao: new Date().toISOString(),
      };
  
      const { error: erroFornecedor } = await supabase
        .from("fornecedor")
        .insert(fornecedorData);
  
      if (erroFornecedor) {
        throw erroFornecedor;
      }
  
      navigation.navigate("Fornecedores", {
        novoFornecedor: true,
      });
    } catch (error) {
      if (idEnderecoCriado) {
        await supabase.from("endereco").delete().eq("id", idEnderecoCriado);
      }
  
      setErrorMessage("Erro ao salvar fornecedor: " + (error as any)?.message || "desconhecido");
      setVisible(true);
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  }
  

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
        <NavBar title="FORNECEDORES" />

        <View style={styles.formContainer}>
          <View style={styles.inputItem}>
            <InputCard
              label="RAZÃO SOCIAL "
              placeholder="Exemplo de Razão Social"
              tipo="string"
              value={razaoSocial}
              onChangeText={setRazaoSocial}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="CNPJ"
              placeholder="12.345.678/0001-95"
              tipo="string"
              value={cnpj}
              onChangeText={(text) => {
                setCnpj(formatCNPJ(text));
              }}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="RAMO DE ATIVIDADE"
              placeholder="Exemplo de Nome"
              tipo="string"
              value={ramoAtividade}
              onChangeText={setRamoAtividade}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="TELEFONE"
              placeholder="(00) 0 0000 - 0000"
              tipo="string"
              value={telefone}
              onChangeText={(text) => {
                setTelefone(formatTelefone(text));
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
              label=" NOME DO RESPONSAVEL"
              placeholder="Exemplo de Nome Completo"
              tipo="string"
              value={nomeResponsavel}
              onChangeText={setNomeResponsavel}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="CHAVE PIX"
              placeholder="Exemplo"
              tipo="string"
              value={chavePix}
              onChangeText={setChavePix}
            />
          </View>

          <Button
            title={isLoading ? "SALVANDO..." : "SALVAR"}
            variant="contained"
            color="primary"
            disabled={!isFormValid}
            type="submit"
            onPress={salvarFornecedor}
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

export default CadastroFornecedores;
