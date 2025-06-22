import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BotaoMais from "@components/botoes/MoreButton"; 

type Props = {
  onPressAdd: () => void;
};

const BarraAdd = ({ onPressAdd }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>ADICIONAR</Text>
      <BotaoMais onPress={onPressAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E56C1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  texto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default BarraAdd;
