import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  View,
} from "react-native";

type HomeButtonProps = {
  title?: string;
  icon?: React.ReactNode;
  variant?: "contained" | "outlined";
  color?: "primary" | "secondary";
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  type?: "dialog" | "submit";
};

const HomeButton = ({
  title = "Button",
  icon,
  variant = "contained",
  color = "primary",
  onPress,
  disabled = false,
  type = "submit",
}: HomeButtonProps) => {
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
    variant === "contained" ? "#fff" : color === "primary" ? "#26579E" : "#888";

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
      <View style={styles.content}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <View style={styles.textWrapper}>
          <Text style={[styles.text, { color: disabled ? "#888" : textColor }]}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    width: "95%",
    maxWidth: "80%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  dialogButton: {
    width: "100%",
    maxWidth: "110%",
    height: 64,
    borderRadius: 20,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    position: "relative",
  },
  icon: {
    zIndex: 2, 
  },
  textWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Inter",
    textAlign: "center",
  },
});

export default HomeButton;
