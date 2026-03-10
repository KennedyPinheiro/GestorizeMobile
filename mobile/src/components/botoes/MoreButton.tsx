import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  onPress?: () => void;
};

const MoreButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress}>
      <MaterialIcons name="add" size={24} color="#fff" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  botao: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#0F2A5F",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MoreButton;
