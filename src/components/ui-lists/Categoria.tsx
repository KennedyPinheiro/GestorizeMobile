import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  titulo: string;
  descricao?: string;
  onPress?: () => void;
  selected?: boolean;
};

const Categoria = ({ titulo, descricao, onPress, selected = false }: Props) => {
  const formatDescricao = (descricao?: string) => {
    if (!descricao) return "Sem descrição";
    return descricao.length > 30
      ? descricao.substring(0, 27) + "..."
      : descricao;
  };

  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.containerSelecionado]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="shape-outline" size={50} color="#555" />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.leftContent}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.descricao}>{formatDescricao(descricao)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Categoria;

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
  containerSelecionado: {
    backgroundColor: "#d0e3ff",
    borderColor: "#26579E",
    borderWidth: 2,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContent: {
    flex: 1,
  },
  titulo: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#222",
  },
  descricao: {
    fontSize: 20,
    color: "#666",
    marginTop: 2,
  },
});
