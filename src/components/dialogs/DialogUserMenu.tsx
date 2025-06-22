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
import { RootStackParamList } from "@App";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@context/AuthContext";

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
  const { signOut } = useAuth();

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
                icon={<MaterialIcons name="person" size={28} color="#433d3d" />}
                onPress={() => {}}
                variant="contained"
                color="primary"
                type="dialog"
                disabled={true}
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
                    await signOut(); // isso já resolve tudo, inclusive a navegação
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
