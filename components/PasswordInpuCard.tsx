import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  TouchableNativeFeedback,
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

  const keyboardType = "default";

  return (
    <TouchableNativeFeedback>
      <View
        style={[
          styles.container,
          onlyView && { backgroundColor: "#B0B0B0" },
        ]}
      >
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
            placeholder={tipoVisual === "placeholder" ? title : ""}
            placeholderTextColor="#cccccc9d"
            keyboardType={keyboardType}
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
    </TouchableNativeFeedback>
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
