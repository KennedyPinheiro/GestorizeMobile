import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  razaoSocial: string;
  email: string;
};

const FornecedorCard = ({ razaoSocial, email }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="account-tie" size={55} color="#000" />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.razaoSocial}>{razaoSocial}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4B6EC1",
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#062046",
  },
  iconContainer: {
    backgroundColor: "#D9D9D9",
    padding: 6,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#062046",
  },
  infoContainer: {
    flex: 1,
  },
  razaoSocial: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  email: {
    color: "#fff",
    fontSize: 14,
    marginTop: 2,
  },
});

export default FornecedorCard;
