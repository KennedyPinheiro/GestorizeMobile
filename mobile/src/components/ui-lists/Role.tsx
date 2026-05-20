import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeToggle } from '@context/ThemeContext';

type Props = {
  titulo: string;
  descricao?: string;
  onPress?: () => void;
};

const Role = ({ titulo, descricao, onPress }: Props) => {
  const { compactLists } = useThemeToggle();

  return (
    <TouchableOpacity
      style={[styles.container, compactLists && styles.containerCompact]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="account-lock"
          size={compactLists ? 20 : 24}
          color="#ffffff"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.titulo, compactLists && styles.tituloCompact]}>
          {titulo}
        </Text>
        {descricao && !compactLists ? (
          <Text style={styles.descricao}>{descricao}</Text>
        ) : null}
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
  containerCompact: {
    padding: 8,
    marginVertical: 4,
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
  tituloCompact: {
    fontSize: 14,
  },
  descricao: {
    color: '#fff',
    fontSize: 18,
  },
});
