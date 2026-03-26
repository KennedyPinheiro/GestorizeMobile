import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SidebarAlert from '../sidebars/Sidebaralert';
import ErrorSidebarAlert from '../sidebars/ErrorSidebarAlert';

type Props = {
  nome: string;
  quantidade: number;
  medida: string;
  categoria?: string;
  onPress?: () => void;
};

const Produto = ({ medida, nome, quantidade, categoria, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="package-variant" size={60} color="#000" />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.categoria}>
          {categoria ? categoria : 'Sem Categoria'}
        </Text>
      </View>

      <Text style={styles.quantidade}>
        {quantidade} {medida}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#516EBC',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#062046',
  },
  iconContainer: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#062046',
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    color: '#fff',
    fontWeight: 900,
    fontSize: 25,
  },
  categoria: {
    color: '#fff',
    fontWeight: 600,
    fontSize: 18,
    marginTop: 2,
  },
  quantidade: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 600,
  },
});

export default Produto;
