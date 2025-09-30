import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  ViewStyle,
} from "react-native";

type porps = {
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
}: porps) => {
  const isOutlined = variant === "outlined";
  const isDelete = variant === "delete";

  const backgroundColor = isDelete
    ? "#e96262"
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
    ? "#ffffff"
    : !isOutlined
    ? "#fff"
    : color === "primary"
    ? "#26579E"
    : "#888";

  const shadowStyle: ViewStyle = !isOutlined
    ? {
        elevation: 3,
        boxShadow: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
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
      marginBottom: type === "dialog" ? 0 : isOutlined ? 0 : 15,
    },
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={containerStyle}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: disabled ? "#5e5e5e" : textColor }]}>
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
    maxWidth: "100%",
    height: 65,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "900",
    fontFamily: "Inter",
  },
});

export default Button;
