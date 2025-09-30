import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import NavTitle from "@components/NavTitle";
import UserIcon from "@components/UserIcon";
import LogoIcon from "@components/LogoIcon";
import BackButton from "@components/BackButton";
import DialogUserMenu from "@components/DialogUserMenu";

type props = {
  backButton?: boolean;
  actionMenu?: () => void;
  title: string;
};


const NavBar = ({ backButton ,title }: props) => {
  const [show, setShow] = useState(false);


  const styles = StyleSheet.create({
    container: {
      display: "flex",
      backgroundColor: "#062046",
      height: "13%",
      width: '100%',
    },
    nav: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: -35,
      paddingHorizontal: 12
    },
    logoIcon: {
      marginTop: -10,
      height: 60,
      width: 50,
      marginRight: 40,
      marginLeft:-60
    },
  });

  const handleClose = () => {
    setShow(false);
  };

  const handleShowDialog = () => {
    setShow(true);
   
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
        <NavTitle title={title} />
        <UserIcon onPress={handleShowDialog} />
      </View>
      <DialogUserMenu show={show} onClose={handleClose} />;
    </View>
  );
};

export default NavBar;
