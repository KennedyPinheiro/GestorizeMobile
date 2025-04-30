import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import InputCard from "@/components/InputCard";
import Button from "@/components/Button";
import LogoIcon from "@/components/LogoIcon";
import Link from "@/components/Link";
import Linha from "@/components/Linha";
import PasswordInputCard from "@/components/PasswordInputCard";


type Props = {
  onLogin?: () => void;
};

  
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
});
const LoginView = ({ onLogin }:Props) => {
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.spacerTop} />
          <LogoIcon />

          <View style={styles.section}>
            <InputCard
              tipo="string"
              value={user}
              placeholder="Email | Nome de Usuário"
              onChangeText={setUser}
              
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
            <Button
              title="Login"
              variant="contained"
              color="primary"
              onPress={()=>{}} // chama handleLogin
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

export default LoginView;
