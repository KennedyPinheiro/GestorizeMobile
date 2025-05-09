import React from "react";
import { View,  TouchableOpacity, StyleSheet } from "react-native";
import LogoIcon from "./LogoIcon"; 
import { Ionicons } from "@expo/vector-icons";

type props = {
  onPress: () => void;
};
 
const BackButton = ({ onPress }: props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons
        name="chevron-back"
        size={30}
        color="#fff"
        style={styles.icon}
      />
      <View style={styles.logoIcon}>
        <LogoIcon />
      </View>
      
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginRight: 5,
    alignItems: "center",
  },
  icon: {
    marginRight: -20,
    marginLeft: -50,
  },
  logoIcon:{
    marginTop: -10,
    height: 50,
    width: 50,
    marginRight: 25,
    
  }

});
