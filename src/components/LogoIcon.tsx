import { Image, StyleSheet } from "react-native";
const LogoIcon = () => {
  return (
    <Image source={require("@images/LogoIcon.png")} style={styles.container} />
  );
};
export default LogoIcon;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    height: 70,
    width: 70,
  },
});
