import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import NavTitle from "@/components/NavTitle";
import UserIcon from "@/components/UserIcon";
import LogoIcon from "@/components/LogoIcon";
import BackButton from "@/components/BackButton";
import DialogUserMenu from "@/components/DialogUserMenu";

type props = {
  backButton?: boolean;
  actionMenu?: () => void;
  title: string;
};


const NavBar = ({ backButton, actionMenu ,title }: props) => {
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
      marginRight: 4,         
    marginLeft: 4,          
    width: 30,              
    height: 30,             
    resizeMode: 'contain'
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
        <NavTitle title={title} />
        <UserIcon onPress={handleShowDialog} />
      </View>
      <DialogUserMenu show={show} onClose={handleClose} onSuccess={() => {}} />;
    </View>
  );
};

export default NavBar;
