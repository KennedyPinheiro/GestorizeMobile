import { StyleSheet, View, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  color?: string;
  style?: ViewStyle | ViewStyle[];
  rounded?: boolean;
};

const PessoaFisicaIcon = ({ color = "#FFF", style, rounded = true }: Props) => {
  return (
    <View
      style={[
        styles.container,
        { borderColor: color },
        rounded ? styles.rounded : styles.squared,
        style,
      ]}
    >
      <MaterialCommunityIcons name="account-group" size={30} color={color} />
    </View>
  );
};

export default PessoaFisicaIcon;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderWidth: 1,
    padding: 1,
  },
  rounded: {
    borderRadius: 90,
  },
  squared: {
    borderRadius: 5,
  },
});
