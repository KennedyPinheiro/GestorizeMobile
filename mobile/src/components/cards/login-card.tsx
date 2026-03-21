import Button from '@components/botoes/Button'
import InputLogin from '@components/inputs/input-login'
import { useAuth } from '@context/AuthContext'
import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

type props={
  onLoginSuccess: () => void
}

export default function LoginCard({ onLoginSuccess }: props) {
  const [email, setEmail] = useState('teste@email.com')
  const [senha, setSenha] = useState('123456')
  const { signIn, loading } = useAuth();
  const [erro, setErro] = useState<string | null>(null);




  const handleLogin = async () => {
    try {
      await signIn(email, senha);
      setErro(null);
      onLoginSuccess();
    } catch (e: any) {
      setErro(e?.response?.data?.message ?? "Erro ao fazer login");
    }
  };
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Bem-Vindo de volta</Text>
      <Text style={styles.subtitle}>
        Entre com suas credenciais para acessar
      </Text>
      <Text style={styles.label}>Email</Text>
      <InputLogin
        placeholder="seu@email.com"
        value={email}
        onChangeText={setEmail}
        icon="mail-outline"
      />
      <Text style={styles.label}>Senha</Text>
      <InputLogin
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        icon="lock-closed-outline"
      />
      <TouchableOpacity>
        <Text style={styles.forgot}>Esqueceu a senha?</Text>
      </TouchableOpacity>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Button title="Entrar" onPress={() => handleLogin()} />

        </View>

    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },

  subtitle: {
    fontSize: 14,
    color: '#444',
    marginTop: 6,
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 10,
    color: '#000',
  },

  forgot: {
    color: '#1E5ED6',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 20,
    fontWeight: '500',
  },
})