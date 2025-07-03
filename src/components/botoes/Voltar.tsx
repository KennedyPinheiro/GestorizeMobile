import React from "react";
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type props = {
  onPress: (event: GestureResponderEvent) => void;
};

const Voltar: React.FC<props> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <MaterialIcons name="arrow-back" size={32} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#070e74bd",
    borderRadius: 16,
    padding: 5,
    elevation: 6,
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    marginTop: 10,
    marginLeft: 10,
  },
  icon: {
    color: "#ffffff",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

export default Voltar;
