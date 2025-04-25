import { ScrollView, View, StyleSheet } from "react-native";
import InputCard from "@/components/InputCard";
import DialogEndereço from "@/components/DialogEndereço";
import Button from "@/components/Button";
import NavBar from "@/components/Navbar";
import { useState } from "react";
import { MenuItem, Select } from "@/components/Select";



const generos = ["Masculino", "Feminino", "Prefiro não Dizer"];
const estadoCivil = ["Casado(a)", "Solteiro(a)","Prefiro não Dizer" ]

const CadastroClientePF = ({ onPress }) => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [data, setData] = useState("");
  const [rg, setRG] = useState("");
  const [genero, setGenero] = useState<string>("");
  const [EstadoCivil, setEstadoCivil] = useState<string>("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [endereço, setEndereco] = useState(false);

  const isFormValid = nome.trim() !== "";

  const handleOpenEndereço = () => setEndereco(true);
  const handleCloseEndereço = () => setEndereco(false);

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.container}>
        <NavBar title="CLIENTES" />

        <View style={styles.formContainer}>
          <View style={styles.inputItem}>
            <InputCard
              label="Nome"
              placeholder="Complete Example Name"
              tipo="string"
              value={nome}
              onChangeText={setNome}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="Data de Nascimento"
              placeholder="0000 / 00 / 00"
              tipo="number"
              value={data}
              onChangeText={setData}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="Cpf"
              placeholder="123.456.789-90"
              tipo="string"
              value={cpf}
              onChangeText={setCpf}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="Rg"
              placeholder="123.456.789"
              tipo="string"
              value={rg}
              onChangeText={setRG}
            />
          </View>
          <View style={styles.inputItem}>
            <Select
              value={EstadoCivil}
              onChange={setEstadoCivil}
              label="Estado Civil"
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
              label="Gênero"
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
              label="Celular"
              placeholder="(00) 0 0000 - 0000"
              tipo="number"
              value={celular}
              onChangeText={setCelular}
            />
          </View>
          <View style={styles.inputItem}>
            <InputCard
              label="Email"
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
