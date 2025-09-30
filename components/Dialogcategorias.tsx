import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import CategoriaCard from "@components/CategoriaCard";
import BarraAdd from "./BarraAdd";
import DialogAdicionarCategoria from "./DialogAdicionarCategoria";

type props = {
  open?: boolean;
  onClose: () => void;
};

const DialogCategorias = ({ onClose }: props) => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  return (
    <>
      <Modal transparent visible={true} animationType="fade" onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.container}>
                <View style={styles.header}>
                  <Text style={styles.title}>Categorias</Text>
                </View>

                <BarraAdd onPressAdd={handleOpenDialog} />

                <View style={styles.content}>
                  <CategoriaCard
                    titulo="Categoria 1"
                    descricao="Descrição da categoria com exemplo grande de texto."
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <DialogAdicionarCategoria
        visible={open}
        onClose={() => setOpen(false)}
      />
    </>
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
    overflow: "hidden",
    borderColor: "#062046",
    borderWidth: 3,
  },
  header: {
    backgroundColor: "#062046",
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
    padding: 5,
  },
});

export default DialogCategorias;
