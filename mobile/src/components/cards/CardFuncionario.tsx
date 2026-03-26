import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  nome?: string;
  funcao?: string;
  email?: string;
  genero?: string;
  data_nascimento?: string;
  estado_civil?: string;
  rg?: string;
  cpf?: string;
  telefone?: string;
  onEdit?: () => void;
};

const CardFuncionario = ({
  nome,
  funcao,
  email,
  data_nascimento,
  genero,
  estado_civil,
  rg,
  cpf,
  telefone,

  onEdit,
}: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.cardIcon}>
          <MaterialCommunityIcons
            name="account-tie"
            size={75}
            color="#ffffff"
          />
        </View>
        <View style={styles.headerText}>
          <View style={styles.info}>
            <Text style={styles.label}>NOME:</Text>
            <Text style={styles.value}>{nome}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>FUNÇÂO:</Text>
            <Text style={styles.value}>{funcao}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.editIcon}
          onPress={onEdit}
          disabled={true}
        >
          <MaterialCommunityIcons name="pencil" size={25} color="#2f3442" />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />
      <View style={styles.info}>
        <Text style={styles.label}>EMAIL:</Text>
        <Text style={styles.value}>{email}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>TELEFONE:</Text>
        <Text style={styles.value}>{telefone}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>GENERO:</Text>
        <Text style={styles.value}>{genero}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>ESTADO CIVIL:</Text>
        <Text style={styles.value}>{estado_civil}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>DATA DE NASCIMENTO:</Text>
        <Text style={styles.value}>{data_nascimento}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>RG:</Text>
        <Text style={styles.value}>{rg}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>CPF:</Text>
        <Text style={styles.value}>{cpf}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#4b69bb',
    borderRadius: 10,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardIcon: {
    backgroundColor: '#2f3442',
    padding: 8,
    display: 'flex',
    borderRadius: 15,
  },
  headerText: {
    marginLeft: 10,
    flex: 1,
  },
  label: {
    fontWeight: 900,
    color: '#000',
    fontSize: 20,
  },
  value: {
    fontFamily: 'SpaceMono-Regular',
    color: '#ffffff',
    fontSize: 18,
  },
  editIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  divider: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  info: {
    marginTop: 10,
  },
});

export default CardFuncionario;
