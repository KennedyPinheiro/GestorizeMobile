import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type props = { onPress: () => void };
const FloatingButton = ({ onPress }: props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2059A8",
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    right: 30,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  plus: {
    fontSize: 36,
    color: "#fff",
    lineHeight: 40,
  },
});

export default FloatingButton;
