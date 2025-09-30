import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  nome: string;
  funcao: string | null;
  onPress?: () => void;
};

const Funcionario = ({ nome, funcao, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>

      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="account-tie" size={70} color="#555" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.funcao}>{funcao}</Text>
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
  funcao: {
    fontSize: 20,
    color: "#666",
  },
});

export default Funcionario;
