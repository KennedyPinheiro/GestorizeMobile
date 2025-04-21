import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardTypeOptions,
  Dimensions,
} from "react-native";

type Props = {
  tipo?: "string" | "number";
  value?: string;
  onlyView?: boolean;
  label?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
};

const { height } = Dimensions.get("window");

const InputCard = ({
  tipo = "string",
  value = "",
  onlyView = false,
  label = "",
  placeholder = "",
  onChangeText,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const keyboardType: KeyboardTypeOptions =
    tipo === "number" ? "numeric" : "default";

  return (
    
    <View
      style={[
        styles.container,
        onlyView && { backgroundColor: "#B0B0B0" },
      ]}
    >
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          onlyView && { color: "#ddd" },
          isFocused && styles.inputFocused,
        ]}
        keyboardType={keyboardType}
        editable={!onlyView}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#cccccc9d"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: "110%",
    height: height * 0.08,
    backgroundColor: "#7294CA",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 15,
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    color: "#ffffffc0",
    fontWeight: "600",
    marginBottom: 2,
  },
  input: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: "#ffffff70",
    borderRadius: 10,
    padding: 5,
  },
});

export default InputCard;
