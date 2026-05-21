import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Nav from '@components/utilities/Nav';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@context/ThemeContext';

const Ajuda = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Nav
        title="Ajuda"
        subtitle="Suporte e orientações"
        onBackPress={() => navigation.goBack()}
        rightType="menu"
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Atendimento
        </Text>
        <Text style={[styles.text, { color: colors.muted }]}>
          Para solicitar suporte, entre em contato com a administração do
          sistema.
        </Text>

        <Text style={[styles.title, { color: colors.text }]}>
          Acesso
        </Text>
        <Text style={[styles.text, { color: colors.muted }]}>
          As telas disponíveis variam conforme o perfil do usuário conectado.
        </Text>
      </ScrollView>
    </View>
  );
};

export default Ajuda;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 8,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
  },
});
