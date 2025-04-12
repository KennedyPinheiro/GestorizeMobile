import { Image, StyleSheet } from "react-native";
const LogoIcon = () => {
  return (
    <Image
      source={require("../assets/images/LogoLogin.png")}
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
    height: "100%",
    maxHeight:280,
    maxWidth: 280,
  }
})