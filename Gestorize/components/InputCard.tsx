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

const {  height } = Dimensions.get("window");

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
        style={[
          styles.input,
          onlyView && { color: "#ddd" },
          isFocused && styles.inputFocused 
        ]}
        keyboardType={keyboardType}
        editable={!onlyView}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChangeText={onChangeText}
        placeholder=""
        placeholderTextColor="#cccccc9d"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: "110%",
    height: height * 0.06,
    backgroundColor: "#7294CA",
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 15,
    marginBottom: 15,
    justifyContent: "center",
  },
  title: {
    position: "absolute",
    left: 30,
    right: 0,
    textAlign: "left",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    color: "#ffffff3e",
    fontWeight: "600",
    zIndex: 1,
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
