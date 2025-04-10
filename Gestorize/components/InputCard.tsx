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
  title?: string;
  tipoVisual?: "placeholder" | "label";
  onChangeText?: (text: string) => void;
};

const { width, height } = Dimensions.get("window"); // pega dimensões da tela

const InputCard = ({
  tipo = "string",
  value = "",
  onlyView = false,
  title = "Digite algo...",
  tipoVisual = "placeholder",
  onChangeText,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const keyboardType: KeyboardTypeOptions =
    tipo === "number" ? "numeric" : "default";

  const showPlaceholder = tipoVisual === "placeholder" && !isFocused && !value;
  const showLabel = tipoVisual === "label";

  return (
    <View
      style={[
        styles.container,
        onlyView && { backgroundColor: "#B0B0B0" },
      ]}
    >
      {(showPlaceholder || showLabel) && (
        <Text style={styles.title}>{title}</Text>
      )}

      <TextInput
        style={[styles.input, onlyView && { color: "#ddd" }]}
        keyboardType={keyboardType}
        editable={!onlyView}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChangeText={onChangeText}
        placeholder=""
        placeholderTextColor="#ccc"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,             
    height: height * 0.06,          
    backgroundColor: "#7294CA",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 15,
    alignSelf: "center",
    justifyContent: "center",
  },
  title: {
    position: "absolute",
    top: 8,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "600",
    zIndex: 1,
  },
  input: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default InputCard;
