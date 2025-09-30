import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  tipo: "PF" | "PJ";
  nome: string;
  email: string;
  onPress?: () => void;
};

const Cliente = ({ tipo, nome, email, onPress }: Props) => {
  const iconName = tipo === "PF" ? "account" : "account-group";

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={iconName} size={70} color="#555" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    gap: 15,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 25,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#222",
  },
  email: {
    fontSize: 20,
    color: "#666",
  },
});

export default Cliente;
