import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import NavTitle from "@components/NavTitle";
import UserIcon from "@components/UserIcon";
import LogoIcon from "@components/LogoIcon";
import BackButton from "@components/botoes/BackButton";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DialogUserMenu from "@components/dialogs/DialogUserMenu";
import { RootStackParamList } from "@context/types";

type props = {
  backButton?: boolean;
  actionMenu?: () => void;
  onBack?: () => void;
  title: string;
};

const NavBar = ({ title }: props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShowDialog = () => {
    setShow(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <View style={styles.leftIcon}>
          <LogoIcon />
        </View>

        <Text style={styles.tittle}>{title}</Text>
        <View style={styles.rightIcon}>
          <UserIcon onPress={handleShowDialog} />
        </View>
      </View>
      <DialogUserMenu show={show} onClose={handleClose} />
    </View>
  );
};

export default NavBar;
const styles = StyleSheet.create({
  container: {
    height: "15%",
    width: "100%",
    justifyContent: "center",
    paddingTop: 35,
    backgroundColor: "#062046",
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  logoIcon: {
    position: "absolute",
    left: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  tittle: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
  },
  leftIcon: {
    position: "absolute",
    left: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  rightIcon: {
    position: "absolute",
    right: 45,
  },
});
