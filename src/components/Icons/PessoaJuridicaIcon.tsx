import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PessoaFisicaIcon = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="account-group" size={30} color="#ffffff" />
    </View>
  );
};
export default PessoaFisicaIcon;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 90,
    width:40,
    height:40,
    borderWidth: 1,
    padding: 1,
    borderColor:"#FFF"

  },
});
