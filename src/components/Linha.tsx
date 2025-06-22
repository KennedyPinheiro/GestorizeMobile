import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: -10,   
  },
  linha: {
    width: 130, 
    height: 1.2,
    backgroundColor: "#26579E",
  },
  texto: {
    marginHorizontal: 8,
    color: "#302b2b84",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const Linha = () => {
  return (
    <View style={styles.container}>
      <View style={styles.linha} />
      <Text style={styles.texto}>Ou</Text>
      <View style={styles.linha} />
    </View>
  );
};

export default Linha;
