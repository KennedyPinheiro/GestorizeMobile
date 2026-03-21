import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Animated, // do React Native
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@context/types";
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
    color: "#FFF",
    fontSize: 20,
    opacity: 0.8,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 10,
    marginTop: -40,
  },
});

const Login = ({ navigation }: Props) => {
  const translateYCard = useRef(new Animated.Value(0)).current;
  const translateYLogo = useRef(new Animated.Value(0)).current;
  const scaleLogo = useRef(new Animated.Value(1)).current;

  const handleLoginAnimation = () => {
    Animated.parallel([
      Animated.timing(translateYCard, {
        toValue: -200, // valor seguro, relativo ao layout
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
    ]).start(() => navigation.replace("Homepage"));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <Animated.Image
            source={require("@assets/images/LogoLight.png")}
            style={[
              styles.logo,
              {
                transform: [
                  { translateY: translateYLogo },
                  { scale: scaleLogo },
                ],
              }
            ]}
          />
          <Text style={styles.title}>Gestorize</Text>
          <Text style={styles.subtitle}>
            O seu sistema de gestão empresarial
          </Text>
        </View>

        <Animated.View
          style={[
            styles.cardContainer,
            {
              transform: [{ translateY: translateYCard }],
            }
          ]}
        >
          <LoginCard onLoginSuccess={handleLoginAnimation} />
        </Animated.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};


export default Login;