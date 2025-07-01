import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FornecedorIcon = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="account-tie" size={45} color="#ffffff" />
    </View>
  );
};
export default FornecedorIcon;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 90,
    width:50,
    height:50,
    borderWidth: 1,
    padding: 1,
    borderColor:"#FFF"

  },
});
