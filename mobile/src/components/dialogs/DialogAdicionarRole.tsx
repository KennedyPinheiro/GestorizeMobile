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
import { RoleType } from "@context/types";
import { supabase } from "@lib/supabase";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (role: RoleType) => void;
  disabled?: boolean;
};

const DialogAdicionarRole = ({
  disabled,
  open,
  onClose,
  onSave,
}: Props) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erroVisible, setErroVisible] = useState(false);
  const [errorMessage, setErroMessage] = useState("");

  async function salvarRole() {
    try {
      if (!nome.trim()) {
        setErroMessage("Por favor, informe o nome da permissao.");
        setErroVisible(true);
        return;
      }

      const roleData = {
        nome,
        descricao,
        data_criacao: new Date().toISOString(),
        ultima_atualizacao: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("roles")
        .insert(roleData)
        .select();

      if (error) throw error;

      onSave(data[0]);
      setNome("");
      setDescricao("");
      setErroVisible(false);
      onClose();
    } catch (error) {
      setErroMessage(
        "Erro ao salvar role: " +
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
                <Text style={styles.title}>Adicionar Role</Text>
              </View>

              <View style={styles.content}>
                <InputCard
                  tipo="string"
                  value={nome}
                  onChangeText={setNome}
                  onlyView={false}
                  placeholder="Nome da Role"
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
                  onPress={salvarRole}
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

export default DialogAdicionarRole;

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
