import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import BarraAdd from "@components/utilities/BarraAdd";
import DialogAdicionarCategoria from "@components/dialogs/DialogAdicionarCategoria";
import { CategoriaType } from "@context/types";
import Categoria from "@components/ui-lists/Categoria";
import { supabase } from "@lib/supabase";

type props = {
  open?: boolean;
  onClose: () => void;
  onSelect: (id: number, nome: string) => void;
};

const DialogCategorias = ({ open, onClose, onSelect }: props) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dadosCategoria, setDadosCategoria] = useState<CategoriaType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      carregarCategorias();
    }
  }, [open]);

  const carregarCategorias = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("categorias")
      .select("*")
      .order("id", { ascending: true });

    if (!error && data) {
      setDadosCategoria(data as CategoriaType[]);
    }

    setLoading(false);
  };

  const onSaveCategoria = async (novaCategoria: CategoriaType) => {
    setDadosCategoria((prev) => [...prev, novaCategoria]);
    setDialogVisible(false);
  };

  return (
    <>
      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={onClose}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                <View style={styles.header}>
                  <Text style={styles.title}>CATEGORIAS</Text>
                </View>

                <BarraAdd onPressAdd={() => setDialogVisible(true)} />

                <ScrollView style={styles.content}>
                  {loading ? (
                    <ActivityIndicator size="large" color="#062046" />
                  ) : dadosCategoria.length === 0 ? (
                    <Text style={styles.text}>
                      Nenhuma categoria cadastrada.
                    </Text>
                  ) : (
                    dadosCategoria.map((cat, index) => (
                      <View key={cat.id}>
                        <Categoria
                          titulo={cat.titulo}
                          descricao={cat.descricao}
                          onPress={() => {
                            onSelect(cat.id, cat.titulo);
                            onClose();
                          }}
                        />
                        {index < dadosCategoria.length - 1 && (
                          <View style={styles.separator} />
                        )}
                      </View>
                    ))
                  )}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <DialogAdicionarCategoria
        open={dialogVisible}
        onClose={() => setDialogVisible(false)}
        onSave={onSaveCategoria}
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
    borderWidth: 1,
    maxHeight: "80%",
  },
  header: {
    backgroundColor: "#062046",
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    width: "100%",
    height: 60,
    lineHeight: 60,
    textAlign: "center",
  },
  content: {
    paddingHorizontal: 10,
    maxHeight: 300,
  },
  text: {
    padding: 16,
    textAlign: "center",
    color: "#555",
  },
});

export default DialogCategorias;
