import React from "react";
import { View, StyleSheet, Text } from "react-native";
import TipoCliente from "./TipoCliente";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  tipo: "PF" | "PJ";
  nome: string;
  email: string;
};

const Clientes = ({ tipo, nome, email }: Props) => {
  const iconName = tipo === "PF" ? "account" : "office-building";

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <MaterialCommunityIcons name={iconName} size={50} color="#000" />{" "}
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <TipoCliente tipo={tipo} />
    </View>
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
    borderColor: "#062046",
  },
  imageContainer: {
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#062046",
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

export default Clientes;
