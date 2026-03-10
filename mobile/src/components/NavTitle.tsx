import { StyleSheet, Text, View } from "react-native";

type props = {
  title: string;
};

const NavTitle = ({ title }: props) => {
  return (
    <View style={styes.container}>
      <Text style={styes.tittle}>{title}</Text>
    </View>
  );
};

export default NavTitle;

const styes = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#193A69",
    borderRadius: 25,
    minWidth: "55%",
    marginRight: 15,
    marginLeft: -15,
  },
  tittle: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});
