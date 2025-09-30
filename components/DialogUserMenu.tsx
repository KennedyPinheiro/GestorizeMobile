import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import HomeButton from "@components/HomeButton";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  show: boolean;
  onClose: () => void;
};

const { width } = Dimensions.get("window");

const DialogUserMenu = ({ show, onClose }: Props) => {
  const slideAnim = useRef(new Animated.Value(width)).current;

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
    <Modal transparent animationType="none" visible={show} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.dialog, { transform: [{ translateX: slideAnim }] }]}>
              <HomeButton
                title="PERFIL"
                icon={<MaterialIcons name="person" size={28} color="#fff" />}
                onPress={() => {}}
                variant="contained"
                color="primary"
                type="dialog"
              />
              <HomeButton
                title="CONFIGURAÇÕES"
                icon={<MaterialIcons name="settings" size={28} color="#fff" />}
                onPress={() => {}}
                variant="contained"
                color="primary"
                type="dialog"
              />
              <HomeButton
                title="AJUDA"
                icon={<MaterialIcons name="help-outline" size={28} color="#fff" />}
                onPress={() => {}}
                variant="contained"
                color="primary"
                type="dialog"
              />
              <HomeButton
                title="SAIR"
                icon={<MaterialIcons name="logout" size={28} color="#fff" />}
                onPress={() => {}}
                variant="contained"
                color="primary"
                type="dialog"
              />
            </Animated.View>
          </TouchableWithoutFeedback>
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
