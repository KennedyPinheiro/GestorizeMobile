import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import NavTitle from "@components/NavTitle";
import UserIcon from "@components/UserIcon";
import LogoIcon from "@components/LogoIcon";
import BackButton from "@components/botoes/BackButton";

import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DialogUserMenu from "@components/dialogs/DialogUserMenu";


type props = {
  backButton?: boolean;
  actionMenu?: () => void;
  onBack?: () => void;
  title: string;
};

const NavBar = ({ backButton, title, onBack }: props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
        {backButton?(
          <View style={styles.logoIcon}>
            <LogoIcon />
          </View>
        ):(
          <BackButton  onPress={() => onBack ? onBack() : navigation.goBack()} />
        )}
        <NavTitle title={title} />
        <UserIcon onPress={handleShowDialog} />
      </View>
      <DialogUserMenu show={show} onClose={handleClose} />
    </View>
  );
};

export default NavBar;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#062046",
    height: "13%",
    width: "100%",
  },
  nav: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -35,
    paddingHorizontal: 12,
  },
  logoIcon: {
    marginTop: -10,
    height: 60,
    width: 50,
    marginRight: 40,
    marginLeft: -60,
  },
});
