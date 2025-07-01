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
import {
  formatCpf,
  formatDate,
  formatRg,
  formatTelefone,
} from "src/@core/format";
import ErrorSidebarAlert from "@components/sidebars/ErrorSidebarAlert";
import SidebarAlert from "@components/sidebars/Sidebaralert";
import { EnderecoType, RootStackParamList } from "@context/types";
import Nav from "@components/utilities/Nav";

const generos = ["Masculino", "Feminino", "Prefiro não Dizer"];
const estadoCivil = ["Casado(a)", "Solteiro(a)", "Prefiro não Dizer"];

const CadastroClientePF = ({}) => {
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
  const [endereço, setEndereco] = useState(false);
  const [visible, setVisible] = useState(false);
  const [erroVisible, setErroVisible] = useState(false);
  const [erroMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [dadosEndereco, setDadosEndereco] = useState<EnderecoType | null>(null);
  const isFormValid = nome.trim() !== "";
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
      if (!nome.trim()) {
        setMessage("Por favor, informe o nome");
        setVisible(true);
        return;
      }

      if (!dadosEndereco) {
        setMessage("Por favor, cadastre o endereço antes de salvar o cliente.");
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
        nome,
        ultima_atualizacao: new Date().toISOString(),
        data_nascimento: data || null,
        data_criacao: new Date().toISOString(),
        cpf: cpf || null,
        rg: rg || null,
        estado_civil: EstadoCivil || null,
        endereco_id: idEnderecoCriado,
        genero: genero || null,
        telefone: celular || null,
        email: email || null,
      };

      const { error: erroCliente } = await supabase
        .from("pessoa_fisica")
        .insert(clienteData);

      if (erroCliente) {
        throw erroCliente;
      }

      navigation.navigate("Clientes", {
        novoCliente: true,
      });
      setMessage("Sucesso ao cadastrar cliente");
    } catch (error) {
      if (idEnderecoCriado) {
        await supabase.from("endereco").delete().eq("id", idEnderecoCriado);
      }

      setErrorMessage(
        "Erro ao salvar cliente: " + (error as any)?.message || "desconhecido"
      );
      setVisible(true);
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
    <View style={styles.container}>
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
      <Nav
        titulo="Pessoa Fisíca"
        onBackPress={() => navigation.navigate("Clientes")}
      />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.formContainer}>
          <View style={styles.inputItem}>
            <InputCard
              label="NOME"
              placeholder="Complete Example Name"
              tipo="string"
              value={nome}
              onChangeText={setNome}
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
              label="EMAIL"
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
      </ScrollView>

      {endereço && (
        <DialogEndereço
          onClose={handleCloseEndereço}
          onSave={onPress}
          visible={endereço}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "#ffffff",
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
    backgroundColor: "#ffffff",
    flex: 1,
  },
  formContainer: {
    marginTop: 24,
  
    width: "100%",
    alignItems: "center",
    gap: 2,
  },
  inputItem: {
    width: "90%",
    maxWidth: 400,
  },
});

export default CadastroClientePF;
