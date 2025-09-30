import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardTypeOptions,
} from "react-native";
import type { DimensionValue } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  label?: string;
  value?: string;
  tipo?: "string" | "number" | "password";
  onChangeText?: (text: string) => void;
  width?: DimensionValue;
  placeholder?: string;
  fullWidth?: boolean;
};

const EditableTextCard = ({
  label = "Campo",
  value = "",
  tipo = "string",
  onChangeText,
  width = "100%",
  placeholder = "",
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const [secureText, setSecureText] = useState(true);

  const keyboardType: KeyboardTypeOptions =
    tipo === "number" ? "numeric" : "default";
  const isPassword = tipo === "password";

  const handleBlur = () => {
    setIsEditing(false);
    if (onChangeText) {
      onChangeText(internalValue);
    }
  };

  const displayValue =
    isPassword && secureText
      ? "\u2022".repeat(internalValue.length)
      : internalValue;

  return (
    <View style={[styles.container, { width }]}>
      {internalValue ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputWrapper,
          !internalValue && { alignItems: "center" }, 
        ]}
      >
        {isEditing ? (
          <TextInput
            style={[styles.input, isPassword && { flex: 1 }]}
            value={internalValue}
            onChangeText={setInternalValue}
            onBlur={handleBlur}
            autoFocus
            keyboardType={keyboardType}
            placeholder={!internalValue ? label : placeholder}
            placeholderTextColor="#3f3f3f"
            secureTextEntry={isPassword && secureText}
          />
        ) : (
          <TouchableOpacity
            style={[styles.flex, isPassword && { flex: 1 }]}
            onPress={() => setIsEditing(true)}
          >
            <Text
              style={[
                styles.valueText,
                !internalValue && styles.placeholderText,
              ]}
            >
              {internalValue ? displayValue : label}
            </Text>
          </TouchableOpacity>
        )}

        {isPassword && (
          <TouchableOpacity
            onPress={() => setSecureText(!secureText)}
            style={styles.iconWrapper}
          >
            <Ionicons
              name={secureText ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default EditableTextCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#fff",
    minHeight: 72,
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
  placeholderText: {
    color: "#999",
    fontWeight: "normal",
    fontSize: 25,
  },
  input: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
    padding: 0,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 40,
  },
  iconWrapper: {
    paddingLeft: 10,
  },
  flex: {
    flex: 1,
  },
});
