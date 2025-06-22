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
import {  MedidaType } from "@context/types";
import { supabase } from "@lib/supabase";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (medida: MedidaType) => void;
  disabled?: boolean;
};

const DialogAdicionarMedida = ({ disabled, open, onClose, onSave }: Props) => {
  const [titulo, setTitulo] = useState("");
  const [erroVisible, setErroVisible] = useState(false);
  const [errorMessage, setErroMessage] = useState("");

  async function salverMedida() {
    try {
      if (!titulo.trim()) {
        setErroMessage("Por favor, informe o nome da medida");
        setErroVisible(true);
        return;
      }

      const medidaData = {
        titulo,
      };

      const { data, error } = await supabase
        .from("medidas")
        .insert(medidaData)
        .select();

      if (error) throw error;

      onSave(data[0]);
      setTitulo("");
      setErroVisible(false);
      onClose();
    } catch (error) {
      setErroMessage(
        "Erro ao salvar medida: " +
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
                <Text style={styles.title}>Adicionar Medida</Text>
              </View>

              <View style={styles.content}>
                <InputCard
                  tipo="string"
                  value={titulo}
                  onChangeText={setTitulo}
                  onlyView={false}
                  placeholder="Titulo da medida"
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  title="Adicionar"
                  onPress={salverMedida}
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

export default DialogAdicionarMedida;

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
