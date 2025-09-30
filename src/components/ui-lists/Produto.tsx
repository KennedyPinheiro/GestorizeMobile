import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  nome: string;
  quantidade: number;
  medida: string;
  categoria?: string;
  onPress?: () => void;
  iconSize?: number;
};

const Produto = ({
  medida,
  nome,
  quantidade,
  categoria,
  onPress,
  iconSize = 70,
}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="package-variant"
          size={iconSize}
          color="#555"
        />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.leftContent}>
          <Text style={styles.nome}>{nome}</Text>
          <Text style={styles.categoria}>
            {categoria ? categoria : "Sem categoria"}
          </Text>
        </View>

      
        <View style={styles.rightContent}>
          <Text style={styles.quantidade}>
            {quantidade} {medida}
          </Text>
        </View>
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
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    marginLeft: 10,
  },
  nome: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#222",
  },
  categoria: {
    fontSize: 20,
    color: "#666",
    marginTop: 2,
  },
  quantidade: {
    fontSize: 20,
    color: "#666",
  },
});

export default Produto;
