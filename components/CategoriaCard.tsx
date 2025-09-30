import { StyleSheet, Text, View } from "react-native";

type props = {
  titulo: string;
  descricao?: string;
};

const CategoriaCard = ({ titulo, descricao }: props) => {
  const formatDescricao = (descricao?: string) => {
    if (!descricao) return "";
    return descricao.length > 30
      ? descricao.substring(0, 27) + "..."
      : descricao;
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.descricao}>{formatDescricao(descricao)}</Text>
      </View>
    </View>
  );
};

export default CategoriaCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#516EBC",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#062046",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  titulo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
  },
  descricao: {
    color: "#fff",
    fontSize: 18,
  },
});
