import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useThemeToggle } from '@context/ThemeContext';

type Props = {
  titulo: string;
  onPress?: () => void;
  selected?: boolean;
};

const Medida = ({ titulo, onPress, selected = false }: Props) => {
  const { compactLists } = useThemeToggle();

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          compactLists && styles.containerCompact,
          selected && styles.containerSelecionado,
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={[styles.titulo, compactLists && styles.tituloCompact]}>
            {titulo}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Medida;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#516EBC',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'space-between',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#062046',
  },
  containerCompact: {
    padding: 8,
    marginVertical: 5,
  },
  containerSelecionado: {
    borderColor: 'lime',
    backgroundColor: '#3b5aa1',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
  },
  tituloCompact: {
    fontSize: 17,
  },
  descricao: {
    color: '#fff',
    fontSize: 18,
  },
});
