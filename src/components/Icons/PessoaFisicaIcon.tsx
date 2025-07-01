import { StyleSheet, View, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  color?: string;
  style?: ViewStyle | ViewStyle[];
};

const PessoaFisicaIcon = ({ color = "#FFF", style }: Props) => {
  return (
    <View style={[styles.container, { borderColor: color }, style]}>
      <MaterialCommunityIcons name="account" size={30} color={color} />
    </View>
  );
};

export default PessoaFisicaIcon;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 90,
    width: 40,
    height: 40,
    borderWidth: 1,
    padding: 1,
  },
});
