import { Image, StyleSheet } from "react-native";
const LogoIcon = () => {
  return (
    <Image
      source={require("../assets/images/LogoIcon.png")}
      style={styles.container}
    />
  );
}
export default LogoIcon;


const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 65,
    width : 65,

  }
})