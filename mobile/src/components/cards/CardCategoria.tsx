import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  titulo?: string;
  descricao?: string;

  onEdit?: () => void;
};

const CardCategoria = ({ titulo, descricao, onEdit }: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>CATEGORIA</Text>
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
          TITULO: <Text style={styles.value}>{titulo}</Text>
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>
          DESCRIÇÃO: <Text style={styles.value}>{descricao}</Text>
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
    fontWeight: '900',
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

export default CardCategoria;
