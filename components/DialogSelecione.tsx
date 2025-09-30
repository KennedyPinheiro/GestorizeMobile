import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Button from "@components/Button";

type Props = {
  show: boolean;
  onClose: () => void;
  titulo01: string;
  titulo02: string;
  onPress01: () => void;
  onPress02: () => void;
};

const DialogSelecione = ({
  show,
  onClose,
  titulo01,
  titulo02,
  onPress01,
  onPress02,
}: Props) => {
  return (
    <Modal visible={show} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.titulo}>SELECIONE</Text>
              </View>
              <View style={styles.body}>
                <Button title={titulo01} onPress={onPress01} />
                <Button title={titulo02} onPress={onPress02} />
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
    backgroundColor: "rgba(0,0,0,0.3)", // overlay translúcido
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 280,
    backgroundColor: "#F3F3F2",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    borderWidth: 1,
    borderColor: "#062046",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    backgroundColor: "#062046",
    paddingVertical: 20,
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
  },
  body: {
    backgroundColor: "#F3F3F2",
    paddingVertical: 10,
    paddingHorizontal: 2,
    alignItems: "center",
  },
});

export default DialogSelecione;
