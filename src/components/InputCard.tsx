import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardTypeOptions,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  tipo?: "string" | "number" | "password";
  value?: string | number;
  onlyView?: boolean;
  label?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  maxLength?: number;
  onFocus?: () => void;
  onBlur?: () => void;
};

const { height } = Dimensions.get("window");

const InputCard = ({
  tipo = "string",
  value = "",
  onlyView = false,
  label = "",
  placeholder = "",
  onChangeText,
  maxLength,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const keyboardType: KeyboardTypeOptions =
    tipo === "number" ? "numeric" : "default";

  const isPassword = tipo === "password";

  return (
    <View
      style={[styles.container, onlyView && { backgroundColor: "#B0B0B0" }]}
    >
      {!!label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            onlyView && { color: "#ddd" },
            isFocused && styles.inputFocused,
          ]}
          keyboardType={keyboardType}
          editable={!onlyView}
          secureTextEntry={isPassword && secureText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={typeof value === "number" ? value.toString() : value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#cccccc9d"
          maxLength={maxLength}
        />

        {isPassword && !onlyView && (
          <TouchableOpacity
            onPress={() => setSecureText(!secureText)}
            style={styles.iconWrapper}
          >
            <Ionicons
              name={secureText ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#cccccc9d"
            />
          </TouchableOpacity>
        )}
      </View>
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconWrapper: {
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 13,
    color: "#0f3164",
    fontWeight: "600",
    marginBottom: 7,
    marginTop: 5,
  },
  input: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1, 
  paddingRight: 10,
    color: "#fff",
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: "#ffffff70",
    borderRadius: 10,
    marginTop: -5,
    padding: 2,
  },
});
export default InputCard;
