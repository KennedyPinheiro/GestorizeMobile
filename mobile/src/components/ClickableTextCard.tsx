import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import type { DimensionValue } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  label?: string;
  value?: string;
  width?: DimensionValue;
  onPress?: (event: GestureResponderEvent) => void;
  placeholder?: string;
};

const ClickableTextCard = ({
  label = 'Campo',
  value = '',
  width = '100%',
  onPress,
  placeholder = 'Selecionar...',
}: Props) => {
  const isEmpty = !value;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.container, { width }]}>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.label}>{label}</Text>
            <Text style={[styles.valueText, isEmpty && styles.placeholderText]}>
              {value || placeholder}
            </Text>
          </View>
          <MaterialIcons name="arrow-drop-down" size={28} color="#666" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ClickableTextCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 13,
    color: '#6e6e6e',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  placeholderText: {
    color: '#999',
    fontWeight: 'normal',
  },
});
