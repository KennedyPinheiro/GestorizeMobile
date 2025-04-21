import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import NavTittle from "./NavTittle";
import UserIcon from "./UserIcon";
import LogoIcon from "./LogoIcon";
import BackButton from "./BackButton";
import DialogUserMenu from "./DialogUserMenu";

type props = {
  backButton?: boolean;
  actionMenu?: () => void;
};


const NavBar = ({ backButton, actionMenu }: props) => {
  const [show, setShow] = useState(false);


  const styles = StyleSheet.create({
    container: {
      display: "flex",
      backgroundColor: "#062046",
      height: "17%",
    },
    nav: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: -35,
    },
    logoIcon: {
      marginLeft: -40,
      marginTop: -20,
    },
  });

  const handleClose = () => {
    setShow(false);
  };

  const handleShowDialog = () => {
    setShow(true);
    console.log("show");
  };
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        {backButton ? (
          <View style={styles.logoIcon}>
            <LogoIcon />
          </View>
        ) : (
          <BackButton onPress={() => {}} />
        )}
        <NavTittle tittle="CLIENTES PJ" />
        <UserIcon onPress={handleShowDialog} />
      </View>
      <DialogUserMenu show={show} onClose={handleClose} onSuccess={() => {}} />;
    </View>
  );
};

export default NavBar;
