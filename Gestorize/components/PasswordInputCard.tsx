import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  value?: string;
  onlyView?: boolean;
  title?: string;
  tipoVisual?: "placeholder" | "label";
  onChangeText?: (text: string) => void;
};

const { height } = Dimensions.get("window");

const PasswordInputCard = ({
  value = "",
  onlyView = false,
  title = "Digite sua senha...",
  tipoVisual = "placeholder",
  onChangeText,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(true);

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

      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            onlyView && { color: "#ddd" },
            isFocused && styles.inputFocused,
          ]}
          secureTextEntry={secureText}
          editable={!onlyView}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          onChangeText={onChangeText}
          placeholder=""
          placeholderTextColor="#cccccc9d"
        />

        <TouchableOpacity
          onPress={() => setSecureText(!secureText)}
          style={styles.icon}
        >
          <Ionicons
            name={secureText ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="#cccccc9d"
          />
        </TouchableOpacity>
      </View>
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
    fontSize: 20,
    color: "#ffffff3e",
    fontWeight: "600",
    zIndex: 1,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  input: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  icon: {
    marginLeft: 10,
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: "#ffffff70",
    borderRadius: 10,
    padding: 5,
  },
});

export default PasswordInputCard;
