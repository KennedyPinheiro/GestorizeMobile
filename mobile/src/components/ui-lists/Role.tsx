import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RoleType } from '@context/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  titulo: string;
  descricao?: string;
  onPress?: () => void;
};

const Role = ({ titulo, descricao, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="account-lock" size={24} color="#ffffff" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titulo}>{titulo}</Text>
        {descricao ? <Text style={styles.descricao}>{descricao}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

export default Role;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#516EBC',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'space-between',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#062046',
  },
  iconContainer: {
    color: '#fff',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  descricao: {
    color: '#fff',
    fontSize: 18,
  },
});
