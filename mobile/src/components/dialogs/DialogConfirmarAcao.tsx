import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props<T> = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  callback?: (status: boolean) => void;
  retorno?: T;
  onSuccess?: (retorno: T | undefined) => void;
  onCancelar?: (retorno: T | undefined) => void;
  titulo: string;
};

const DialogConfirmarAcao = <T,>({
  show,
  setShow,
  callback,
  onSuccess,
  onCancelar,
  titulo,
  retorno,
}: Props<T>) => {
  const handleAction = (status: boolean) => {
    if (callback) callback(status);
    if (status && onSuccess) onSuccess(retorno);
    if (!status && onCancelar) onCancelar(retorno);
    setShow(false);
  };

  return (
    <Modal isVisible={show} onBackdropPress={() => setShow(false)}>
      <View style={styles.dialogContainer}>
        <MaterialCommunityIcons name="alert-circle-outline" size={64} color="#f57c00" style={styles.icon} />
        <Text style={styles.title}>{titulo}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.confirmButton} onPress={() => handleAction(true)}>
            <Text style={styles.confirmText}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => handleAction(false)}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  confirmButton: {
    backgroundColor: "#1976d2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    borderColor: "#aaa",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cancelText: {
    color: "#555",
  },
});

export default DialogConfirmarAcao;
