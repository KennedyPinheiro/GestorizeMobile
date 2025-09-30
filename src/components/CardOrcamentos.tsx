import { StyleSheet, Text, View, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

type props = {
  titulo: string;
};

const Card = ({ titulo }: props) => {
  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text style={styles.titleText}>{titulo}</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>ENTREGUES</Text>
            <Text style={styles.value}>0</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CONFIRMADOS</Text>
            <Text style={styles.value}>0</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>PENDENTES</Text>
            <Text style={styles.value}>0</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>RECUSADOS</Text>
            <Text style={styles.value}>0</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#142d53",
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
    width: "100%",
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

export default Card;
