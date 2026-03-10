import { StyleSheet, Text, View } from "react-native";

type props = {
  titulo: string;
  icon?: React.ReactNode;
};

const CardRelatorios = ({ titulo, icon }: props) => {
  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{titulo}</Text>
          <View style={styles.icon}>{icon}</View>
        </View>
      </View>

      <View style={styles.items}>
        <View style={styles.row}>
          <Text style={styles.label}>Novos</Text>
          <Text style={styles.value}>0</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Verificados</Text>
          <Text style={styles.value}>0</Text>
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
    width: "100%",
    paddingHorizontal: 20,
  },
  titulo: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    backgroundColor: "#193A69",
    borderRadius: 20,
    width: 242,
    height: 41,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  
  icon: {
    marginLeft: 10,
  },
  items: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 140,
    marginBottom: 10,
  },
  label: {
    color: "#FFF",
    fontSize: 16,
    marginRight:-10
  },
  value: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    
  },
});

export default CardRelatorios;
