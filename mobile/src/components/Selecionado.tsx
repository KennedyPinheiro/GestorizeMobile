import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// use qualquer ícone ou substitua por um `Text` com "X"

type Props = {
  titulo: string;
  onClear: () => void;
};

const Selecionado = ({ titulo, onClear }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{titulo}</Text>
      <TouchableOpacity onPress={onClear} style={styles.button}>
        <Text> X </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Selecionado;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#6aa76a',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -10,
    marginBottom: 10,
    width: '80%',
    alignSelf: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    marginLeft: 10,
    padding: 4,
  },
});
