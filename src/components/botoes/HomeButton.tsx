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
  const COLORS = {
    primary: "#26579E",
    secondary: "#888",
    disabledBackground: "#ccc",
    disabledText: "#888",
    white: "#fff",
    transparent: "transparent",
  };

  const baseColor = color === "primary" ? COLORS.primary : COLORS.secondary;
  const isContained = variant === "contained" || type === "dialog";

  const backgroundColor = disabled
    ? COLORS.disabledBackground
    : isContained
    ? baseColor
    : COLORS.transparent;

  const borderColor = variant === "outlined" ? baseColor : COLORS.transparent;

  const textColor = disabled
    ? COLORS.disabledText
    : isContained
    ? COLORS.white
    : baseColor;

  const containerStyle = [
    styles.base,
    type === "dialog" ? styles.dialogButton : styles.roundedButton,
    {
      backgroundColor,
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
        <View style={styles.icon}>{icon}</View>
        <View style={styles.textWrapper}>
          <View style={styles.teste}>
            <Text
              style={[
                styles.text,
                {
                  color: textColor,
                  fontSize: type === "dialog" ? 25 : 18,
                },
              ]}
            >
             {title}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 3,
    boxShadow: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  roundedButton: {
    borderRadius: 20,
  },
  dialogButton: {
    alignItems: "center",
    alignContent: "center",
    borderRadius: 10,
    height: 70,
  },
  content: {
    flexDirection: "row",
    height: "100%",
    gap: 10,
  },
  icon: {
    margin: 10,
  },
  textWrapper: {
    flex: 1,
    alignItems: "flex-start",
  },
  text: {
    marginTop: 10,
    fontWeight: "bold",
    fontFamily: "Inter",
    textAlign: "left",
  },
  teste: {
    alignContent: "center",
    justifyContent: "flex-start",
  },
});

export default HomeButton;
