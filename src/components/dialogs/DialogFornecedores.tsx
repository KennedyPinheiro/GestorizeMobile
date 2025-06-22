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
import { supabase } from "@lib/supabase";
import { FornecedorTipo } from "@context/types";
import Fornecedor from "@components/ui-lists/Fornecedor";

type Props = {
  open?: boolean;
  onClose: () => void;
  onSelect: (id: number, nome: string) => void;
};

const DialogFornecedores = ({ open, onClose, onSelect }: Props) => {
  const [fornecedores, setFornecedores] = useState<FornecedorTipo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      carregarFornecedores();
    }
  }, [open]);

  const carregarFornecedores = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("fornecedor")
      .select("id, razao_social, email")
      .order("id", { ascending: true });

    if (error) {
    } else {
      setFornecedores(data || []);
    }

    setLoading(false);
  };

  return (
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
                <Text style={styles.title}>Fornecedores</Text>
              </View>

              <ScrollView style={styles.content}>
                {loading ? (
                  <ActivityIndicator size="large" color="#062046" />
                ) : fornecedores.length === 0 ? (
                  <Text style={styles.text}>Nenhum fornecedor encontrado.</Text>
                ) : (
                  fornecedores.map((forn) => (
                    <Fornecedor
                      key={forn.id}
                      nome={forn.razao_social}
                      email={forn.email}
                      onPress={() => {
                        onSelect(forn.id, forn.razao_social);
                        onClose();
                      }}
                    />
                  ))
                )}
              </ScrollView>
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
    maxHeight: "80%",
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
    paddingHorizontal: 10,
    maxHeight: 300,
  },
  text: {
    padding: 16,
    textAlign: "center",
    color: "#555",
  },
});

export default DialogFornecedores;
