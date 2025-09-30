import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardTypeOptions,
  ViewStyle,
} from "react-native";
import type { DimensionValue } from "react-native";

type Props = {
  label?: string;
  value?: string;
  tipo?: "string" | "number";
  onChangeText?: (text: string) => void;
  width?: DimensionValue;
};

const EditableTextCard = ({
  label = "Campo",
  value = "",
  tipo = "string",
  onChangeText,
  width = "100%", // valor padrão
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  const keyboardType: KeyboardTypeOptions =
    tipo === "number" ? "numeric" : "default";

  const handleBlur = () => {
    setIsEditing(false);
    if (onChangeText) {
      onChangeText(internalValue);
    }
  };

  return (
    <View style={[styles.container, { width }]}>
      <Text style={styles.label}>{label}</Text>

      {isEditing ? (
        <TextInput
          style={styles.input}
          value={internalValue}
          onChangeText={setInternalValue}
          onBlur={handleBlur}
          autoFocus
          keyboardType={keyboardType}
        />
      ) : (
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Text style={styles.valueText}>{internalValue || " "}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EditableTextCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 13,
    color: "#6e6e6e",
    fontWeight: "bold",
    marginBottom: 5,
  },
  valueText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },
  input: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
    padding: 0,
  },
});
