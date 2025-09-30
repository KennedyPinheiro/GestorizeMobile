import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {  MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  razaoSocial?: string;
  email?: string;
  ramoAtividade?: string;
  cnpj?: string;
  nomeResponsavel?: string;
  telefone?: string;
  chavePix?: string;
  onEdit?: () => void;
};

const CardFornecedor = ({
  razaoSocial,
  email,
  ramoAtividade,
  cnpj,
  nomeResponsavel,
  telefone,
  chavePix,
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
            <Text style={styles.label}>RAZAO SOCIAL:</Text>
            <Text style={styles.value}>{razaoSocial}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>EMAIL:</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editIcon} onPress={onEdit}>
          <MaterialCommunityIcons name="pencil" size={25} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />
      <View style={styles.info}>
        <Text style={styles.label}>RAMO DE ATIVIDADE:</Text>
        <Text style={styles.value}>{ramoAtividade}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>CNPJ:</Text>
        <Text style={styles.value}>{cnpj}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>NOME DO RESPONSÁVEL:</Text>
        <Text style={styles.value}>{nomeResponsavel}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>TELEFONE:</Text>
        <Text style={styles.value}>{telefone}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>CHAVE PIX:</Text>
        <Text style={styles.value}>{chavePix}</Text>
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

export default CardFornecedor;
