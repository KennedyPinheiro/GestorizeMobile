import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  razaoSocial?: string;
  email?: string;
  nome_fantasia?: string;
  cnpj: string;
  nomeResponsavel?: string;
  cpf_do_responsavel?: string;
  cargo_do_responsavel?: string;
  telefone?: string;
  onEdit?: () => void;
};

const CardPessoaJuridica = ({
  razaoSocial,
  email,
  nome_fantasia,
  cnpj,
  nomeResponsavel,
  cpf_do_responsavel,
  cargo_do_responsavel,
  telefone,
  onEdit,
}: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.cardIcon}>
          <MaterialCommunityIcons
            name="office-building"
            size={75}
            color="#ffffff"
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
        <TouchableOpacity style={styles.editIcon} onPress={onEdit} disabled={true}>
          <MaterialCommunityIcons name="pencil" size={25} color="#2f3442" />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />
      <View style={styles.info}>
        <Text style={styles.label}>NOME FANTASIA:</Text>
        <Text style={styles.value}>{nome_fantasia}</Text>
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
        <Text style={styles.label}>CPF DO RESPONSÁVEL:</Text>
        <Text style={styles.value}>{cpf_do_responsavel}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>CARGO DO RESPONSAVEL:</Text>
        <Text style={styles.value}>{cargo_do_responsavel}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>TELEFONE:</Text>
        <Text style={styles.value}>{telefone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#4b69bb",
    borderRadius: 10,
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cardIcon: {
    backgroundColor: "#2f3442",
    padding: 8,
    display: "flex",
    borderRadius: 15,
  },
  headerText: {
    marginLeft: 10,
    flex: 1,
  },
  label: {
    fontWeight: 900,
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

export default CardPessoaJuridica;
