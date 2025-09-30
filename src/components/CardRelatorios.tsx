import { StyleSheet, Text, View } from "react-native";

type props = {
  titulo: string;
};

const CardRelatorios = ({ titulo }: props) => {
  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text style={styles.titleText}>{titulo}</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>NOVOS</Text>
            <Text style={styles.value}>0</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>VERIFICADOS</Text>
            <Text style={styles.value}>0</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#062046",
    borderRadius: 10,
    padding: 25,
    gap: 30,
    width: "100%",
  },
  grid: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  column: {
    flexDirection: "column",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
  },
  label: {
    color: "#FFF",
    fontSize: 25,
  },
  value: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
  },
  titulo: {
    display: "flex",
    alignItems: "center",
  },
  titleText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 25,
  },
});

export default CardRelatorios;
