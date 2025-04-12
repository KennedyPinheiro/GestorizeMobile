import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

type ButtonProps = {
  title?: string;
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary";
  onPress?: (event: GestureResponderEvent) => void;
};

const Button = ({
  title = "Button",
  variant = "contained",
  color = "primary",
  onPress,
}: ButtonProps) => {
  const backgroundColor =
    variant === "contained"
      ? color === "primary"
        ? "#26579E"
        : "#888"
      : "transparent";

  const borderColor =
    variant === "outlined"
      ? color === "primary"
        ? "#26579E"
        : "#888"
      : "transparent";

  const textColor =
    variant === 
    "contained" ?
     "#fff" : color === "primary" ? "#26579E" : "#888";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.base,
        {
          backgroundColor,
          borderColor,
          borderWidth: variant === "outlined" ? 2 : 0,
        },
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    width: "95%",
    maxWidth: "80%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: "900",
    fontFamily: "Inter",
  },
});

export default Button;
