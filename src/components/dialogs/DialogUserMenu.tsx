import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import HomeButton from "@components/botoes/HomeButton";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { supabase } from "@lib/supabase";
import ErrorSidebarAlert from "@components/sidebars/ErrorSidebarAlert";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@context/AuthContext";
import { formatarCampo } from "@@core/format";
import { RootStackParamList } from "@context/types";

type Props = {
  show: boolean;
  onClose: () => void;
};

const { width } = Dimensions.get("window");

const DialogUserMenu = ({ show, onClose }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const slideAnim = useRef(new Animated.Value(width)).current;
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { user, signOut } = useAuth();

  const fetchUserData = async () => {
    try {
      if (!user?.id) {
        throw new Error("Usuário não autenticado.");
      }

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, nome, email, role_id")
        .eq("id", user.id)
        .single();

      if (userError || !userData) {
        throw new Error("Erro ao buscar dados do usuário.");
      }

      const { data: funcionarioData, error: funcionarioError } = await supabase
        .from("funcionarios")
        .select(
          "cargo, data_nascimento, genero, estado_civil, telefone, endereco_id, rg, cpf"
        )
        .eq("id", user.id)
        .single();

      if (funcionarioError || !funcionarioData) {
        throw new Error("Erro ao buscar dados do funcionário.");
      }

      const { data: enderecoData } = funcionarioData.endereco_id
        ? await supabase
            .from("endereco")
            .select("rua, bairro, cidade, estado, numero, cep")
            .eq("id", funcionarioData.endereco_id)
            .single()
        : { data: null };

      const enderecoFinal = {
        rua: formatarCampo(enderecoData?.rua),
        bairro: formatarCampo(enderecoData?.bairro),
        cidade: formatarCampo(enderecoData?.cidade),
        estado: formatarCampo(enderecoData?.estado),
        numero: formatarCampo(enderecoData?.numero),
        cep: formatarCampo(enderecoData?.cep),
      };

      return {
        userData,
        funcionarioData,
        enderecoFinal,
      };
    } catch (err: any) {
      setErrorMessage(err.message || "Erro ao carregar dados.");
      setErrorVisible(true);
      throw err;
    }
  };

  const handleNavigateToPerfil = async () => {
    try {
      const { userData, funcionarioData, enderecoFinal } =
        await fetchUserData();

      onClose();

      navigation.navigate("UserPerfil", {
        id: userData.id,
        nome: formatarCampo(userData.nome),
        email: formatarCampo(userData.email),
        funcao: formatarCampo(funcionarioData.cargo),
        data_nascimento: formatarCampo(funcionarioData.data_nascimento),
        endereco_id: funcionarioData.endereco_id,
        genero: formatarCampo(funcionarioData.genero),
        estado_civil: formatarCampo(funcionarioData.estado_civil),
        telefone: formatarCampo(funcionarioData.telefone),
        rg: formatarCampo(funcionarioData.rg),
        cpf: formatarCampo(funcionarioData.cpf),
        ...enderecoFinal,
      });
    } catch {}
  };
  const logout = async () => {
    try {
      await signOut();
    } catch (err) {
      setErrorMessage("Erro inesperado ao sair.");
      setErrorVisible(true);
    }
  };
  type ButtonConfig = {
    title: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    onPress?: () => void;
    disabled?: boolean;
    visible?: boolean;
    type?: "dialog";
  };

  const buttons: ButtonConfig[] = [
    {
      title: "PERFIL",
      icon: "person",
      onPress: handleNavigateToPerfil,
    },
    {
      title: "CONFIGURAÇÕES",
      icon: "settings",
      onPress: () => ({}),
      disabled: true,
    },
    {
      title: "AJUDA",
      icon: "help-outline",
      onPress: () => ({}),
      disabled: true,
    },
    {
      title: "SAIR",
      icon: "logout",
      onPress: logout,
    },
  ];

  useEffect(() => {
    if (show) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [show]);

  return (
    <Modal
      transparent
      animationType="none"
      visible={show}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.dialog,
                { transform: [{ translateX: slideAnim }] },
              ]}
            >
              {buttons
                .filter(
                  (button) => button.visible === undefined || button.visible
                )
                .map((button) => (
                  <HomeButton
                    key={button.title}
                    title={button.title}
                    icon={
                      <MaterialIcons
                        name={button.icon}
                        size={24}
                        color="#fff"
                      />
                    }
                    type="dialog"
                    color="primary"
                    onPress={button.onPress}
                    disabled={button.disabled}
                  />
                ))}
            </Animated.View>
          </TouchableWithoutFeedback>
          <ErrorSidebarAlert
            message={errorMessage}
            visible={errorVisible}
            onClose={() => setErrorVisible(false)}
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  dialog: {
    backgroundColor: "#E8EAE1",
    paddingVertical: 20,
    paddingHorizontal: 10,
    height: "100%",
    width: "60%",
    gap: 12,
    alignItems: "center",
  },
});

export default DialogUserMenu;
