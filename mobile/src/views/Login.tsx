import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@context/types";
import { useAuth } from "@context/AuthContext";
import LoginCard from "@components/cards/login-card";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D2B52",
  },

  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },

  logo: {
    width: 140,
    height: 140,
    marginBottom: 10,
  },

  subtitle: {
    color: "#FFF",
    fontSize: 14,
    opacity: 0.8,
  },

  cardContainer: {
    flex: 1,
    backgroundColor: "#EDEDED",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -40,
  },
});
const Login = ({ navigation }: Props) => {
  const [email, setemail] = useState("teste@email.com");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const { signIn, loading } = useAuth();

  const isFormValid = email.trim() !== "" && senha.trim() !== "";

  const handleLogin = async () => {
    try {
      await signIn(email, senha);
      setErro(null);
    } catch (e: any) {
      setErro(e?.response?.data?.message ?? "Erro ao fazer login");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@assets/images/LogoLight.png")} style={styles.logo} />

        <Text style={styles.subtitle}>O seu sistema de gestão empresarial</Text>
      </View>

      <View style={styles.cardContainer}>
        <LoginCard />
      </View>
    </View>
  );
};

export default Login;
