import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import InputCard from "@components/InputCard"; 
import Button from "./Button";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit?: (nome: string, descricao: string) => void;
};

const DialogAdicionarCategoria = ({ visible, onClose, onSubmit }: Props) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleAdd = () => {
    if (!nome.trim()) {
      alert("Informe o nome da categoria.");
      return;
    }

    onSubmit?.(nome, descricao);
    setNome("");
    setDescricao("");
    onClose();
  };

  return (
    <Modal transparent visible={visible} onRequestClose={onClose} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.title}>Adicionar Categoria</Text>
              </View>

              <View style={styles.content}>
                <InputCard
                  tipo="string"
                  value={nome}
                  onChangeText={setNome}
                  onlyView={false}
                  placeholder="Nome da Categoria"
                />
                <InputCard
                  tipo="string"
                  value={descricao}
                  onChangeText={setDescricao}
                  onlyView={false}
                  placeholder="Descrição"
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button title="Adicionar" onPress={handleAdd} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DialogAdicionarCategoria;

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
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  content: {
    padding: 16,
    gap: 2,
  },
  buttonContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
});
