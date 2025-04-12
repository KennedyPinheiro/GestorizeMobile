import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

type Props = {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
};

const Link = ({ title = "Digite algo...", onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.texto}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: "right",
    marginTop: 0,
  },

  texto: {
    color: "#038CEE",
  },
});
export default Link;
