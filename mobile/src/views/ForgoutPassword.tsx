import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import InputCard from "@components/InputCard";
import Button from "@components/botoes/Button";
import { supabase } from "@lib/supabase";
import { useNavigation } from "@react-navigation/native";
import Voltar from "@components/botoes/Voltar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAE1",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  topo: {
    position: "absolute",
    top: 40,
    left: 16,
    zIndex: 1,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  instrucoes: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#444",
  },
  section: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  erro: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  sucesso: {
    color: "green",
    textAlign: "center",
    marginBottom: 10,
  },
});

const ForgoutPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setErro(null);
    setMensagem(null);
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: "",
    });
    if (error) {
      setErro(error.message);
    } else {
      setMensagem(
        "Email de redefinição enviado com sucesso!!. Favor verifique sua caixa de email."
      );
    }
    setLoading(false);
  };

  const isFormValid = email.trim() !== "";

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.topo}>
          <Voltar onPress={() => navigation.goBack()} />
        </View>

        <View style={styles.centro}>
          <Text style={styles.titulo}>Esqueceu a senha</Text>
          <Text style={styles.instrucoes}>
            Por favor, informe o seu email para receber o link de redefinição de
            senha.
          </Text>

          <View style={styles.section}>
            <InputCard
              tipo="string"
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {erro && <Text style={styles.erro}>{erro}</Text>}
          {mensagem && <Text style={styles.sucesso}>{mensagem}</Text>}
          <View style={styles.section}>
            <Button
              title="Enviar Email de Redefinição"
              onPress={handleResetPassword}
              disabled={!isFormValid || loading}
              variant="contained"
              color="primary"
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ForgoutPassword;
