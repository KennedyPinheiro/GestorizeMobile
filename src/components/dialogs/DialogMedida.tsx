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
import { CategoriaType, MedidaType } from "@context/types";
import { supabase } from "@lib/supabase";
import Medida from "@components/ui-lists/Medida";
import DialogAdicionarMedida from "./DialogAdicionarMedida";

type props = {
  open?: boolean;
  onClose: () => void;
  onSelect: (id: number, nome: string) => void;
};

const DialogMedida = ({ open, onClose, onSelect }: props) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dadosMedida, setDadosMedida] = useState<MedidaType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      carregarCategorias();
    }
  }, [open]);

  const carregarCategorias = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("medidas")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
    } else if (data) {
      setDadosMedida(data as CategoriaType[]);
    }
    setLoading(false);
  };

  const onSaveMedida = async (novaMedida: MedidaType) => {
    setDadosMedida((prev) => [...prev, novaMedida]);
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
                  <Text style={styles.title}>Unidade de Medida</Text>
                </View>

                <BarraAdd onPressAdd={() => setDialogVisible(true)} />

                <ScrollView style={styles.content}>
                  {loading ? (
                    <ActivityIndicator size="large" color="#062046" />
                  ) : dadosMedida.length === 0 ? (
                    <Text style={styles.text}>Nenhuma medida cadastrada.</Text>
                  ) : (
                    dadosMedida.map((cat, index) => (
                      <View key={cat.id}>
                        <Medida
                          titulo={cat.titulo}
                          onPress={() => {
                            onSelect(cat.id, cat.titulo);
                            onClose();
                          }}
                        />
                        {index < dadosMedida.length - 1 && (
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

      <DialogAdicionarMedida
        open={dialogVisible}
        onClose={() => setDialogVisible(false)}
        onSave={onSaveMedida}
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

export default DialogMedida;
