import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

type Props = {
  nome: string;
  email: string | null;
  onPress?: () => void;
};

const Fornecedor = ({ nome, email, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <MaterialCommunityIcons name="account-tie" size={70} color="#000" />
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
    backgroundColor: "#516EBC",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 1,
  },
  imageContainer: {
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  nome: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
  },
  email: {
    color: "#fff",
    fontSize: 18,
  },
});

export default Fornecedor;
