import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  ViewStyle,
} from "react-native";

type ButtonProps = {
  title?: string;
  variant?: "contained" | "outlined" | "delete";
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
  const isOutlined = variant === "outlined";
  const isDelete = variant === "delete";

  const backgroundColor = isDelete
    ? "#FF4C4C" 
    : !isOutlined
    ? color === "primary"
      ? "#26579E"
      : "#888"
    : "transparent";

  const borderColor = isOutlined
    ? color === "primary"
      ? "#26579E"
      : "#888"
    : "transparent";

  const textColor = isDelete
    ? "#000" 
    : !isOutlined
    ? "#fff"
    : color === "primary"
    ? "#26579E"
    : "#888";

  const shadowStyle: ViewStyle = !isOutlined
    ? {
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      }
    : {};

  const containerStyle = [
    styles.base,
    type === "dialog" && styles.dialogButton,
    shadowStyle,
    {
      backgroundColor: disabled ? "#ccc" : backgroundColor,
      borderColor,
      borderWidth: isOutlined ? 2 : 0,
      marginBottom: isOutlined ? 0 : 15,
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
    alignItems: "center",
    justifyContent: "center",
  },
  dialogButton: {
    width: "100%",
    maxWidth: "110%",
    height: 64,
    borderRadius: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: "900",
    fontFamily: "Inter",
  },
});

export default Button;

