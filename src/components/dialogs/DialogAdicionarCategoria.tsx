import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import InputCard from "@components/InputCard";
import Button from "@components/botoes/Button";
import ErrorSidebarAlert from "@components/sidebars/ErrorSidebarAlert";
import { CategoriaType } from "@context/types";
import { supabase } from "@lib/supabase";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (categiria: CategoriaType) => void;
  disabled?: boolean;
};

const DialogAdicionarCategoria = ({
  disabled,
  open,
  onClose,
  onSave,
}: Props) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erroVisible, setErroVisible] = useState(false);
  const [errorMessage, setErroMessage] = useState("");

  async function salvarCategoria() {
    try {
      if (!titulo.trim()) {
        setErroMessage("Por favor, informe o nome da categoria");
        setErroVisible(true);
        return;
      }

      const categoriaData = {
        titulo,
        descricao,
      };

      const { data, error } = await supabase
        .from("categorias")
        .insert(categoriaData)
        .select();

      if (error) throw error;

      onSave(data[0]); 
      setTitulo("");
      setDescricao("");
      setErroVisible(false);
      onClose();
    } catch (error) {
      setErroMessage(
        "Erro ao salvar categoria: " +
          ((error as any)?.message || "Erro desconhecido")
      );
      setErroVisible(true);
    }
  }

  return (
    <Modal
      transparent
      visible={open}
      onRequestClose={onClose}
      animationType="fade"
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.container}>
              <ErrorSidebarAlert
                visible={erroVisible}
                onClose={() => setErroVisible(false)}
                message={errorMessage}
              />

              <View style={styles.header}>
                <Text style={styles.title}>Adicionar Categoria</Text>
              </View>

              <View style={styles.content}>
                <InputCard
                  tipo="string"
                  value={titulo}
                  onChangeText={setTitulo}
                  onlyView={false}
                  placeholder="Titulo da categoria"
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
                <Button
                  title="Adicionar"
                  onPress={salvarCategoria}
                  disabled={disabled}
                />
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
