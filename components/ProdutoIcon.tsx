import { StyleSheet, View, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  color?: string;
  style?: ViewStyle | ViewStyle[];
  rounded?: boolean;
};

const ProdutoIcon = ({ color = "#FFF", style, rounded = true }: Props) => {
  return (
    <View
      style={[
        styles.container,
        { borderColor: color },
        rounded ? styles.rounded : styles.squared,
        style,
      ]}
    >
      <MaterialCommunityIcons name="package-variant" size={45} color={color} />
    </View>
  );
};

export default ProdutoIcon;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
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
