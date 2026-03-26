import { StyleSheet, View, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  color?: string;
  style?: ViewStyle | ViewStyle[];
  rounded?: boolean;
  iconSize?: number;
  size?: number;
};

const PessoaFisicaIcon = ({
  color = '#FFF',
  style,
  size = 50,
  rounded = true,
  iconSize = 45,
}: Props) => {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderColor: color,
        },
        styles.container,
        rounded ? styles.rounded : styles.squared,
        style,
      ]}
    >
      <MaterialCommunityIcons name="account" size={iconSize} color={color} />
    </View>
  );
};

export default PessoaFisicaIcon;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  rounded: {
    borderRadius: 90,
  },
  squared: {
    borderRadius: 5,
  },
});
