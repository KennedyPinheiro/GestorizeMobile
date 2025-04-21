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
  disabled?: boolean;
  type?: "dialog" | "submit";
};

const Button = ({
  title = "Button",
  variant = "contained",
  color = "primary",
  onPress,
  disabled = false,
  type = "submit",
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
    variant === "contained"
      ? "#fff"
      : color === "primary"
      ? "#26579E"
      : "#888";

  const containerStyle = [
    styles.base,
    type === "dialog" && styles.dialogButton,
    {
      backgroundColor: disabled ? "#ccc" : backgroundColor,
      borderColor,
      borderWidth: variant === "outlined" ? 2 : 0,
    },
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={containerStyle}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: disabled ? "#888" : textColor }]}>
        {title}
      </Text>
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
  dialogButton: {
    width: "100%",
    maxWidth: "110%",
    height: 64, // similar ao InputCard
    borderRadius: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: "900",
    fontFamily: "Inter",
  },
});

export default Button;
