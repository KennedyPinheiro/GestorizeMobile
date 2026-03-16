import { Image, StyleSheet, View } from "react-native";

const LogoIcon = () => {
  return (
    <View style={styles.wrapper}>
      <Image
        source={require("@images/Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};
export default LogoIcon;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 64,
  },
  logo: {
    height: 50,
    width: 100,
  },
});
