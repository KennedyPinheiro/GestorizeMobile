import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import * as Linking from 'expo-linking';
import PasswordInputCard from '@components/PasswordInpuCard';
import Button from '@components/botoes/Button';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '@lib/supabase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAE1',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 900,
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  label: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
    color: '#444',
  },
  erro: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  section: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
});

const ResetPassword = () => {
  const navigation = useNavigation();
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkURL = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        const parsed = Linking.parse(url);
        const token = parsed.queryParams?.access_token as string;

        if (token) {
          const { error } = await supabase.auth.setSession({
            access_token: token,
            refresh_token: '',
          });

          if (error) {
            console.error('Erro ao definir sessão:', error.message);
            setErro('Token inválido ou expirado.');
          }
        }
      }
    };

    checkURL();
  }, []);
  const handleSalvar = async () => {
    if (novaSenha.trim() === '' || confirmacao.trim() === '') {
      setErro('Preencha todos os campos.');
      return;
    }

    if (novaSenha !== confirmacao) {
      setErro('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    setErro(null);

    const { error } = await supabase.auth.updateUser({
      password: novaSenha,
    });

    setLoading(false);

    if (error) {
      setErro(error.message);
    } else {
      Alert.alert('Senha redefinida', 'Você será redirecionado para o login.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login' as never),
        },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Resetar Senha</Text>

        <View style={styles.section}>
          <PasswordInputCard
            title="Nova Senha"
            value={novaSenha}
            onChangeText={setNovaSenha}
            tipoVisual="placeholder"
          />

          <Text style={styles.label}>Confirme a senha</Text>

          <PasswordInputCard
            title="Confirmar Senha"
            value={confirmacao}
            onChangeText={setConfirmacao}
            tipoVisual="placeholder"
          />
        </View>

        {erro && <Text style={styles.erro}>{erro}</Text>}

        <View style={styles.section}>
          <Button
            title="Salvar"
            onPress={handleSalvar}
            disabled={loading}
            variant="contained"
            color="primary"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ResetPassword;
