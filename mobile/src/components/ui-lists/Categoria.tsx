import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

type Props = {
  titulo: string;
  descricao?: string;
  onPress?: () => void;
  selected?: boolean;
};

const Categoria = ({ titulo, descricao, onPress, selected = false }: Props) => {
  const formatDescricao = (descricao?: string) => {
    if (!descricao) return "";
    return descricao.length > 30
      ? descricao.substring(0, 27) + "..."
      : descricao;
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, selected && styles.containerSelecionado]}>
        <View style={styles.textContainer}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.descricao}>{formatDescricao(descricao)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Categoria;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#516EBC",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    justifyContent: "space-between",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#062046",
  },
  containerSelecionado: {
    borderColor: "lime",
    backgroundColor: "#3b5aa1",
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
