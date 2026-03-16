import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import Button from "@components/botoes/Button";
import Link from "@components/utilities/Link";
import LoginLogo from "@components/LoginLogo";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@context/types";
import EditableTextCard from "@components/EditableTextCard";
import { useAuth } from "@context/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  spacerTop: {
    marginBottom: -60,
  },
  section: {
    width: "100%",
    alignItems: "center",
  },
  linkSection: {
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 20,
    marginBottom: 30,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  footerTexto: {
    marginRight: 5,
  },
  erro: { color: "red", textAlign: "center", marginBottom: 10 },
});
const Login = ({ navigation }: Props) => {
  const [email, setemail] = useState("teste@email.com");
  const [senha, setSenha] = useState("123456");
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.spacerTop} />
          <LoginLogo />
          <View style={styles.section}>
            <EditableTextCard
              label="Email"
              tipo="string"
              placeholder="Example@mail.com"
              value={email}
              onChangeText={setemail}
            />
            <EditableTextCard
              label="Senha"
              tipo="password"
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
            />
          </View>
          <View style={[styles.linkSection,]}>
            <Link title="Esqueceu a Senha?" onPress={() => { }} />
          </View>

          <View style={styles.section}>
            {erro && <Text style={styles.erro}>{erro}</Text>}
            <Button
              title={"Login"}
              variant="contained"
              color="primary"
              type="submit"
              onPress={handleLogin}
              disabled={!isFormValid || loading}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
