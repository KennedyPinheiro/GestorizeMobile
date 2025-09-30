import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Button from "@components/botoes/Button";

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
  const handlePress01 = () => {
    onPress01();
    onClose();
  };

  const handlePress02 = () => {
    onPress02();
    onClose();
  };

  return (
    <Modal
      visible={show}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.titulo}>SELECIONE</Text>
              </View>
              <View style={styles.body}>
                <Button
                  title={titulo01}
                  onPress={handlePress01}
                  type="dialog"
                />
                <Button
                  title={titulo02}
                  onPress={handlePress02}
                  type="dialog"
                />
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
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 300,
    backgroundColor: "#F3F3F2",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
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
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
  },
  body: {
    backgroundColor: "#F3F3F2",
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: "center",
    gap: 5
    
  },
});

export default DialogSelecione;
