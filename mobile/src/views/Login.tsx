import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@context/types';
import { useAuth } from '@context/AuthContext';
import LoginCard from '@components/cards/login-card';
import { useTheme } from '@context/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: Props) => {
  const { colors, isDark } = useTheme();

  const translateYCard = useRef(new Animated.Value(0)).current;
  const translateYLogo = useRef(new Animated.Value(0)).current;
  const scaleLogo = useRef(new Animated.Value(1)).current;

  // 🔄 inversão do topo
  const headerBackground = isDark ? '#ffffff' : '#0D2B52';
  const isDarkHeader = headerBackground !== '#ffffff';

  // 🎯 cores dinâmicas
  const textColor = isDarkHeader ? '#ffffff' : '#0f172a';
  const subtitleColor = isDarkHeader ? '#ffffffcc' : '#475569';

  // 🔄 card invertido também
  const cardBackground = isDark ? '#0b274f' : '#ffffff';

  // 🎯 logo dinâmica
  const logoSource = isDarkHeader
    ? require('@assets/images/LogoLight.png')
    : require('@assets/images/Logo.png');

  const handleLoginAnimation = () => {
    Animated.parallel([
      Animated.timing(translateYCard, {
        toValue: -200,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateYLogo, {
        toValue: -50,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleLogo, {
        toValue: 0.7,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: headerBackground }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Animated.Image
            source={logoSource}
            style={[
              styles.logo,
              {
                transform: [
                  { translateY: translateYLogo },
                  { scale: scaleLogo },
                ],
              },
            ]}
          />

          <Text style={[styles.title, { color: textColor }]}>Gestorize</Text>

          <Text style={[styles.subtitle, { color: subtitleColor }]}>
            O seu sistema de gestão empresarial
          </Text>
        </View>

        {/* CARD */}
        <Animated.View
          style={[
            styles.cardContainer,
            {
              backgroundColor: cardBackground,
              transform: [{ translateY: translateYCard }],
            },
          ]}
        >
          <LoginCard onLoginSuccess={handleLoginAnimation} />
        </Animated.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D2B52',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  logo: {
    width: 200,
    height: 170,
    marginBottom: 10,
  },
  title: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    color: '#FFF',
    fontSize: 14,
    opacity: 0.8,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#EDEDED',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -40,
  },
});
