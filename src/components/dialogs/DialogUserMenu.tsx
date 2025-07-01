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
import { MaterialIcons } from "@expo/vector-icons";
import { supabase } from "@lib/supabase";
import ErrorSidebarAlert from "@components/sidebars/ErrorSidebarAlert";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@context/AuthContext";
import { EnderecoTipo, RootStackParamList } from "@context/types";
import { formatarCampo } from "@@core/format";

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
  const [endereco, setEndereco] = useState<EnderecoTipo[]>([]);

  const { user, signOut } = useAuth();

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
              <HomeButton
                title="PERFIL"
                icon={<MaterialIcons name="person" size={28} color="#ffffff" />}
                onPress={async () => {
                  try {
                    if (!user?.id) {
                      setErrorMessage("Usuário não autenticado.");
                      setErrorVisible(true);
                      return;
                    }

                    const { data: userData, error: userError } = await supabase
                      .from("users")
                      .select("id, nome, email,role_id")
                      .eq("id", user.id)
                      .single();

                    if (userError || !userData) {
                      setErrorMessage("Erro ao buscar dados do usuário.");
                      setErrorVisible(true);
                      return;
                    }

                    const { data: funcionarioData, error: funcionarioError } =
                      await supabase
                        .from("funcionarios")
                        .select(
                          "cargo, data_nascimento, genero, estado_civil, telefone, endereco_id, rg, cpf"
                        )
                        .eq("id", user.id)
                        .single();

                    if (funcionarioError || !funcionarioData) {
                      setErrorMessage("Erro ao buscar dados do funcionário.");
                      setErrorVisible(true);
                      return;
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

                    onClose();

                    navigation.navigate("UserPerfil", {
                      id: userData.id,
                      nome: formatarCampo(userData.nome),
                      email: formatarCampo(userData.email),
                      funcao: formatarCampo(funcionarioData.cargo),
                      data_nascimento: formatarCampo(
                        funcionarioData.data_nascimento
                      ),
                      endereco_id:funcionarioData.endereco_id,
                      genero: formatarCampo(funcionarioData.genero),
                      estado_civil: formatarCampo(funcionarioData.estado_civil),
                      telefone: formatarCampo(funcionarioData.telefone),
                      rg: formatarCampo(funcionarioData.rg),
                      cpf: formatarCampo(funcionarioData.cpf),
                      ...enderecoFinal,
                    });
                  } catch (err) {
                    setErrorMessage("Erro ao carregar dados do perfil.");
                    setErrorVisible(true);
                  }
                }}
                variant="contained"
                color="primary"
                type="dialog"
              />
              <HomeButton
                title="CONFIGURAÇÕES"
                icon={
                  <MaterialIcons name="settings" size={28} color="#433d3d" />
                }
                onPress={() => {}}
                variant="contained"
                color="primary"
                type="dialog"
                disabled={true}
              />
              <HomeButton
                title="AJUDA"
                icon={
                  <MaterialIcons
                    name="help-outline"
                    size={28}
                    color="#433d3d"
                  />
                }
                onPress={() => {}}
                variant="contained"
                color="primary"
                type="dialog"
                disabled={true}
              />
              <HomeButton
                title="SAIR"
                icon={<MaterialIcons name="logout" size={28} color="#fff" />}
                onPress={async () => {
                  try {
                    await signOut();
                  } catch (err) {
                    setErrorMessage("Erro inesperado ao sair.");
                    setErrorVisible(true);
                  }
                }}
                variant="contained"
                color="primary"
                type="dialog"
              />
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
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: "70%",
    gap: 12,
    alignItems: "center",
    elevation: 6,
  },
});

export default DialogUserMenu;
