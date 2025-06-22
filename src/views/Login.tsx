import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import InputCard from "@components/InputCard";
import Button from "@components/botoes/Button";
import Link from "@components/utilities/Link";
import Linha from "@components/Linha";
import PasswordInputCard from "@components/PasswordInpuCard";
import LoginLogo from "@components/LoginLogo";
import { RootStackParamList } from "@App";
import { supabase } from "@lib/supabase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAE1",
    paddingHorizontal: 16,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  const [email, setemail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  const isFormValid = email.trim() !== "" && senha.trim() !== "";

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro(error.message);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.spacerTop} />
          <LoginLogo />
          <View style={styles.section}>
            <InputCard
              tipo="string"
              placeholder="Email | Nome de Usuário"
              value={email}
              onChangeText={setemail}
            />
            <PasswordInputCard
              value={senha}
              title="Senha"
              onChangeText={setSenha}
              tipoVisual="placeholder"
            />
          </View>
          <View style={[styles.linkSection, { marginTop: -10 }]}>
            <Link title="Esqueceu a Senha?" onPress={() => {}} />
          </View>

          <View style={styles.section}>
            {erro && <Text style={styles.erro}>{erro}</Text>}
            <Button
              title={"Login"}
              variant="contained"
              color="primary"
              type="submit"
              onPress={handleLogin}
              disabled={!isFormValid}
            />
          </View>
          <View style={[styles.section]}>
            <Linha />
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerTexto}>Novo por aqui? </Text>
          <Link title="Faça seu pré-cadastro" onPress={() => {}} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
