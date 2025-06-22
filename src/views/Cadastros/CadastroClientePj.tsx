import { ScrollView, View, StyleSheet } from "react-native";
import InputCard from "@components/InputCard";
import DialogEndereço from "@components/dialogs/DialogEndereco";
import Button from "@components/botoes/Button";
import NavBar from "@components/utilities/NavBar";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@App";
import { useNavigation } from "@react-navigation/native";
import SidebarAlert from "@components/sidebars/Sidebaralert";
import ErrorSidebarAlert from "@components/sidebars/ErrorSidebarAlert";
import { supabase } from "@lib/supabase";
import { formatCNPJ, formatCpf, formatTelefone } from "src/@core/format";
import { EnderecoType } from "@context/types";

const CadastroClientePJ = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [name, setName] = useState("");
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [cpf, setCpf] = useState<string>("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [cargoRepresentante, setCargoRepresentante] = useState("");
  const [endereço, setEndereco] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const [erroVisible, setErroVisible] = useState(false);
  const [dadosEndereco, setDadosEndereco] = useState<EnderecoType | null>(null);
  const isFormValid = razaoSocial.trim() !== "";
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenEndereço = () => setEndereco(true);
  const handleCloseEndereço = () => setEndereco(false);

  async function onPress(endereco: EnderecoType) {
    setDadosEndereco(endereco);
    setVisible(true);
    setMessage("Endereço salvo com sucesso");
    handleCloseEndereço();
  }
  async function salvarCliente() {
    if (isLoading) return;
    let idEnderecoCriado: number | null = null;

    try {
      if (!razaoSocial.trim()) {
        setErrorMessage("Por favor, informe o nome");
        setVisible(true);
        return;
      }

      if (!dadosEndereco) {
        setErrorMessage(
          "Por favor, cadastre o endereço antes de salvar o cliente."
        );
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

      const clienteData = {
        razao_social: razaoSocial,
        ultima_atualizacao: new Date().toISOString(),
        nome_fantasia: name,
        data_criacao: new Date().toISOString(),
        nome_do_responsavel: nomeResponsavel,
        cnpj: cnpj,
        cpf_responsavel: cpf || null,
        cargo_do_representante: cargoRepresentante,
        endereco_id: idEnderecoCriado,
        telefone: celular || null,
        email: email || null,
      };

      const { error: erroCliente } = await supabase
        .from("pessoa_juridica")
        .insert(clienteData);

      if (erroCliente) {
        throw erroCliente;
      }

      navigation.navigate("Clientes", {
        novoCliente: true,
      });
    } catch (error) {
      if (idEnderecoCriado) {
        await supabase.from("endereco").delete().eq("id", idEnderecoCriado);
      }

      setErrorMessage(
        "Erro ao salvar cliente: " + (error as any)?.message || "desconhecido"
      );
      setVisible(true);
    }finally {
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
        <NavBar title="Pessoa Juridica" backButton={false} />

        <View style={styles.formContainer}>
          <View style={styles.inputItem}>
            <InputCard
              label="RAZÃO SOCIAL"
              placeholder="Exemplo de Razão Social"
              tipo="string"
              value={razaoSocial}
              onChangeText={setRazaoSocial}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="NOME FANTASIA"
              placeholder="Example de Nome Fantasia"
              tipo="string"
              value={name}
              onChangeText={setName}
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
              label="NOME DO RESPONSAVEL"
              placeholder="Exemplo de Nome Completo"
              tipo="string"
              value={nomeResponsavel}
              onChangeText={setNomeResponsavel}
            />
          </View>

          <View style={styles.inputItem}>
            <InputCard
              label="CPF DO RESPONSAVEL"
              placeholder="123.456.789 - 00"
              tipo="number"
              value={cpf}
              onChangeText={(text) => {
                setCpf(formatCpf(text));
              }}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="CARGO DO RESPONSAVEL"
              placeholder="Example"
              tipo="string"
              value={cargoRepresentante}
              onChangeText={setCargoRepresentante}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="TELEFONE COMERCIAL"
              placeholder="(00) 0 0000 - 0000"
              tipo="number"
              value={celular}
              onChangeText={(text) => {
                setCelular(formatTelefone(text));
              }}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="EMAIL COMERCIAL"
              placeholder="example@email.com"
              tipo="string"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Button
            title="CADASTRAR"
            variant="contained"
            color="primary"
            disabled={!isFormValid}
            type="submit"
            onPress={salvarCliente}
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

export default CadastroClientePJ;
