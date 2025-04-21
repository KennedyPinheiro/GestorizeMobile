import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import InputCard from "@/components/InputCard";
import { Select, MenuItem } from "@/components/Select";
import Button from "@/components/Button";

const estadosBrasileiros = [
  "Acre",
  "Alagoas",
  "Amapá",
  "Amazonas",
  "Bahia",
  "Ceará",
  "Distrito Federal",
  "Espírito Santo",
  "Goiás",
  "Maranhão",
  "Mato Grosso",
  "Mato Grosso do Sul",
  "Minas Gerais",
  "Pará",
  "Paraíba",
  "Paraná",
  "Pernambuco",
  "Piauí",
  "Rio de Janeiro",
  "Rio Grande do Norte",
  "Rio Grande do Sul",
  "Rondônia",
  "Roraima",
  "Santa Catarina",
  "São Paulo",
  "Sergipe",
  "Tocantins",
];

type DialogEnderecoProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (endereco: {
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
  }) => void;
};

const DialogEndereco = ({ visible, onClose, onSave }: DialogEnderecoProps) => {
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [estado, setEstado] = useState<string>("");
  const handleSalvar = () => {
    onSave({ rua, bairro, cidade, estado });

    setRua("");
    setBairro("");
    setCidade("");
    setEstado("");
    onClose();
  };

  return (
    <Modal
    visible={visible}
    animationType="none"
    transparent={true}
    onRequestClose={onClose}
  >
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Endereço</Text>
            </View>
  
            <View style={styles.content}>
              <InputCard
                label="Rua"
                placeholder="Digite o nome da rua"
                tipo="string"
                value={rua}
                onChangeText={setRua}
              />
              <InputCard
                label="Bairro"
                placeholder="Digite o nome do bairro"
                tipo="string"
                value={bairro}
                onChangeText={setBairro}
              />
              <InputCard
                label="Cidade"
                placeholder="Digite o nome da cidade"
                tipo="string"
                value={cidade}
                onChangeText={setCidade}
              />
              <InputCard
                label="Número"
                placeholder="Digite o n°"
                tipo="number"
                value={numero}
                onChangeText={setNumero}
              />
              <Select
                value={estado}
                onChange={setEstado}
                label="Estado"
                size="small"
              >
                {estadosBrasileiros.map((uf) => (
                  <MenuItem key={uf} value={uf}>
                    {uf}
                  </MenuItem>
                ))}
              </Select>
              <InputCard
                label="Cep"
                placeholder="Digite o seu Cep"
                tipo="number"
                value={cep}
                onChangeText={setCep}
              />
              <View style={styles.buttonContainer}>
                <Button title="Confirmar" onPress={handleSalvar} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 20,
    overflow: "hidden",
    borderColor: "#062046",
    borderWidth: 3,
  },
  header: {
    backgroundColor: "#062046",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 900,
    textAlign: "center",
    color: "#fff",
  },
  content: {
    padding: 20,
  },
  buttonContainer: {
    alignItems: "center",
  },
});

export default DialogEndereco;
