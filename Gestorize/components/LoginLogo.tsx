import { Image } from "react-native";
const loginLogo = () => {
  return (
    <Image
      source={require("../assets/images/LogoLogin.png")}
      style={{ width: 160, height: 150 , marginVertical:-20}}
    />
  );
}
export default loginLogo;