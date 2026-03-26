import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  rua?: string;
  bairro?: string;
  cidade?: string;
  numero?: string;
  estado?: string;
  cep?: string;
  onEdit?: () => void;
};

const CardEndereco = ({
  rua,
  bairro,
  numero,
  cidade,
  estado,
  cep,
  onEdit,
}: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>ENDEREÇO</Text>
        </View>

        <TouchableOpacity
          style={styles.editIcon}
          onPress={onEdit}
          disabled={true}
        >
          <MaterialCommunityIcons name="pencil" size={25} color="#2f3442" />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>
          RUA: <Text style={styles.value}>{rua}</Text>
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>
          BAIRRO: <Text style={styles.value}>{bairro}</Text>
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>
          CIDADE <Text style={styles.value}>{cidade}</Text>
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>
          NÚMERO <Text style={styles.value}>{numero}</Text>
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>
          ESTADO: <Text style={styles.value}>{estado}</Text>
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>
          CEP: <Text style={styles.value}>{cep}</Text>
        </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 10,
    display: 'flex',
  },
  titleContainer: {
    backgroundColor: '#2f3442',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontWeight: 900,
    fontSize: 17,
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    top: -4,
  },
  label: {
    fontWeight: 900,
    fontSize: 20,
    color: '#000',
    marginBottom: 4,
  },
  value: {
    fontFamily: 'SpaceMono-Regular',
    color: '#fff',
    fontSize: 18,
  },
  info: {
    marginTop: 10,
  },
});

export default CardEndereco;
