import { StyleSheet, Text, View } from "react-native";

type props = {
  tipo?: "PF" | "PJ";
};

const TipoCliente = ({ tipo }: props) => {
  const backgroundColor = tipo === "PF" ? "#802D26" : "#660C7A"; // Marrom e roxo, semelhantes à imagem

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>{tipo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    height: 60,
    width: 60,
  },
  text: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default TipoCliente;
