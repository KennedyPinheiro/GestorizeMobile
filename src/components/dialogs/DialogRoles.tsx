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
import { supabase } from "@lib/supabase";
import { RoleType } from "@context/types"; // Defina esse tipo com { id: number; nome: string }
import DialogAdicionarRole from "./DialogAdicionarRole";
import Role from "@components/ui-lists/Role";

type Props = {
  open?: boolean;
  onClose: () => void;
  onSelect: (id: number, nome: string) => void;
};

const DialogRoles = ({ open, onClose, onSelect }: Props) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      carregarRoles();
    }
  }, [open]);

  const carregarRoles = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("roles")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Erro ao buscar roles:", error.message);
        setRoles([]);
      } else {
        setRoles(data as RoleType[]);
      }
    } catch (err) {
      console.error("Erro inesperado ao carregar roles:", err);
      setRoles([]);
    } finally {
      setLoading(false);
    }
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
                  <Text style={styles.title}>Acessos (Roles)</Text>
                </View>

                <BarraAdd onPressAdd={() => setDialogVisible(true)} />

                <ScrollView style={styles.content}>
                  {loading ? (
                    <ActivityIndicator size="large" color="#062046" />
                  ) : roles.length === 0 ? (
                    <Text style={styles.text}>Nenhuma role cadastrada.</Text>
                  ) : (
                    roles.map((role) => (
                      <Role
                        key={role.id}
                        titulo={role.nome}
                        onPress={() => {
                          onSelect(role.id, role.nome);
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
    marginTop: 5,
    maxHeight: 300,
  },
  text: {
    padding: 16,
    textAlign: "center",
    color: "#555",
  },
  item: {
    padding: 16,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
  },
});

export default DialogRoles;
