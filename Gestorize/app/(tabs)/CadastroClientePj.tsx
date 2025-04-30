import { ScrollView, View, StyleSheet } from "react-native";
import InputCard from "@/components/InputCard";
import DialogEndereço from "@/components/DialogEndereço";
import Button from "@/components/Button";
import NavBar from "@/components/Navbar";
import { useState } from "react";



const CadastroClientePF = ({ onPress }) => {
  const [RazaoSocial, setRazaoSocial] = useState("");
  const [Cnpj, setCnpj] = useState("");
  const [Name, setName] = useState("");
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [cpf, setCpf] = useState<string>("");
  const [email, setEmail] = useState("");
  const [endereço, setEndereco] = useState(false);

  const isFormValid = RazaoSocial.trim() !== "";

  const handleOpenEndereço = () => setEndereco(true);
  const handleCloseEndereço = () => setEndereco(false);

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.container}>
        <NavBar title="EMPRESAS" />

        <View style={styles.formContainer}>
          <View style={styles.inputItem}>
            <InputCard
              label="RAZÃO SOCIAL"
              placeholder="Exemplo de Razão Social"
              tipo="string"
              value={RazaoSocial}
              onChangeText={setRazaoSocial}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="NOME FANTASIA"
              placeholder="Example de Nome Fantasia"
              tipo="string"
              value={Name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="CNPJ"
              placeholder="12.345.678/0001-95"
              tipo="string"
              value={Cnpj}
              onChangeText={setCnpj}
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
              onChangeText={setCpf}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="CARGO DO RESPONSAVEL"
              placeholder="Example"
              tipo="string"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="TELEFONE COMERCIAL"
              placeholder="(00) 0 0000 - 0000"
              tipo="number"
              value={email}
              onChangeText={setEmail}
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
    marginBottom: 95,
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
