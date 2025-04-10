import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputCard from "@/components/InputCard";
import Button from "@/components/Button";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E8EAE1",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  texto: {
    fontSize: 30,
    color: "#26579E",
    fontWeight: "bold",
  },
});

const LoginPage = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");

 

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Hello World!!</Text>

      <InputCard
        tipo="string"
        value={user}
        title="Email | Nome de Usuário"
        onChangeText={setUser}
        tipoVisual="placeholder"
      />

      <InputCard
        tipo="string"
        value={email}
        title="E-mail"
        onChangeText={setEmail}
        tipoVisual="placeholder"
      />

      <Button
        title="Login"
        variant="contained"
        color="primary"
        onPress={   () => {}}
      />
    </View>
  );
};

export default LoginPage;
