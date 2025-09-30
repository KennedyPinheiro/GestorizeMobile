import { StyleSheet, Text, View } from "react-native";

type props = {
  tipo?: "PF" | "PJ";
};

const TipoCliente = ({ tipo }: props) => {
  const backgroundColor = tipo === "PF" ? "#922b227d" : "#8d05ac88"; 

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
    borderRadius: 75, 
    padding: 10,
    width: 50, 
    height: 50, 
  },
  text: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "900",
  },
});

export default TipoCliente;
