import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  nome?: string;
  quantidade?: number;
  medida?: string;
  descricao?: string;
  validade?: string;
  custo?: string;
  entrada?: string;
  margem?: string;
  fornecedor?: string;

  onEdit?: () => void;
};

const CardProduto = ({
  nome,
  quantidade,
  medida,
  descricao,
  custo,
  validade,
  entrada,
  margem,
  fornecedor,

  onEdit,
}: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.cardIcon}>
          <MaterialCommunityIcons
            name="account-tie"
            size={75}
            color="#010000"
          />
        </View>
        <View style={styles.headerText}>
          <View style={styles.info}>
            <Text style={styles.label}>NOME:</Text>
            <Text style={styles.value}>{nome}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>QUANTIDADE:</Text>
            <Text style={styles.value}>
              {quantidade} {medida}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editIcon} onPress={onEdit}>
          <MaterialCommunityIcons name="pencil" size={25} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />
      <View style={styles.info}>
        <Text style={styles.label}>DESCRIÇÃO:</Text>
        <Text style={styles.value}>{descricao}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>DATA DE VALIDADE:</Text>
        <Text style={styles.value}>{validade}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>DATA DE ENTRADA:</Text>
        <Text style={styles.value}>{entrada}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>PREÇO DE CUSTO:</Text>
        <Text style={styles.value}>{custo}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>MARGEM DE LUCRO:</Text>
        <Text style={styles.value}>{margem}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>FORNECEDOR:</Text>
        <Text style={styles.value}>{fornecedor}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#99a7cf",
    borderRadius: 10,
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cardIcon: {
    backgroundColor: "#516EBC",
    padding: 8,
    display: "flex",
    borderRadius: 15,
  },
  headerText: {
    marginLeft: 10,
    flex: 1,
  },
  label: {
    fontWeight: "900",
    color: "#000",
    fontSize: 20,
  },
  value: {
    fontFamily: "SpaceMono-Regular",
    color: "#ffffff",
    fontSize: 18,
  },
  editIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  divider: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  info: {
    marginTop: 10,
  },
});

export default CardProduto;
