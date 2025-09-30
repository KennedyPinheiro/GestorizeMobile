import { StyleSheet, Text, View, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

type props = {
  titulo: string;
  icon?: React.ReactNode;
};

const Card = ({ titulo, icon }: props) => {
  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{titulo}</Text>
          <View style={styles.icon}> {icon}</View>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={[styles.column, styles.leftColumn]}>
          <View style={styles.row}>
            <Text style={styles.label}>Entregues</Text>
            <Text style={styles.value}>5</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Pendentes</Text>
            <Text style={styles.value}>15</Text>
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>Confirmados</Text>
            <Text style={styles.value}>2</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Recusados</Text>
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
    borderRadius: 20,
    padding: 25,
    width: "auto",
  },
  title: {
    backgroundColor: "#193A69",
    borderRadius: 20,
    width: 242,
    height: 41,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },
  titleText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  icon: {
    marginLeft: 10,
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
  leftColumn: {
    marginRight: screenWidth < 400 ? 20 : screenWidth < 600 ? 40 : 80,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
  label: {
    color: "#FFF",
    fontSize: 16,
  },
  value: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  titulo: {
    display: "flex",
    alignItems: "center",
  },
});

export default Card;