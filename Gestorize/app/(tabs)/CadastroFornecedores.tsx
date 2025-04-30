import {
  ScrollView,
  View,
  StyleSheet,
} from "react-native";
import InputCard from "@/components/InputCard";
import DialogEndereço from "@/components/DialogEndereço";
import Button from "@/components/Button";
import NavBar from "@/components/Navbar";
import { useState } from "react";

const CadastroFornecedores = ({ onPress }) => {
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [ramoAtividade, setRamoAtividade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [chavePix, setChavePix] = useState("");
  const [endereço, setEndereco] = useState(false);

  const isFormValid = razaoSocial.trim() !== "";

  const handleOpenEndereço = () => setEndereco(true);
  const handleCloseEndereço = () => setEndereco(false);

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainer}
    >
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
              onChangeText={setCnpj}
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
              onChangeText={setTelefone}
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
            title="CADASTRAR"
            variant="contained"
            color="primary"
            disabled={!isFormValid}
            type="submit"
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
    marginBottom:80,
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