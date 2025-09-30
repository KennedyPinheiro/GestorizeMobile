import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  onPress?: () => void;
};

const MoreButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress}>
      <MaterialIcons name="add" size={35} color="#000000" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  botao: {
    width: 35,
    height: 35,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MoreButton;
