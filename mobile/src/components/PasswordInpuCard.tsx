import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  value?: string;
  onlyView?: boolean;
  title?: string;
  tipoVisual?: 'placeholder' | 'label';
  onChangeText?: (text: string) => void;
};

const { height } = Dimensions.get('window');

const PasswordInputCard = ({
  value = '',
  onlyView = false,
  title = 'Digite sua senha...',
  tipoVisual = 'placeholder',
  onChangeText,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(true);

  return (
    <View
      style={[styles.container, onlyView && { backgroundColor: '#B0B0B0' }]}
    >
      {/* Label quando tipoVisual é "label" */}
      {tipoVisual === 'label' && <Text style={styles.label}>{title}</Text>}

      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            onlyView && { color: '#ddd' },
            isFocused && styles.inputFocused,
          ]}
          secureTextEntry={secureText}
          editable={!onlyView}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          onChangeText={onChangeText}
          placeholder={tipoVisual === 'placeholder' ? title : ''}
          placeholderTextColor="#cccccc9d"
          keyboardType="default"
        />

        <TouchableOpacity
          onPress={() => setSecureText(!secureText)}
          style={styles.icon}
        >
          <Ionicons
            name={secureText ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="#cccccc9d"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: '110%',
    height: height * 0.08,
    backgroundColor: '#7294CA',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 15,
    justifyContent: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  input: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  icon: {
    marginLeft: 10,
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: '#ffffff70',
    borderRadius: 10,
    padding: 5,
  },
  label: {
    position: 'absolute',
    top: -20,
    left: 10,
    fontSize: 12,
    color: '#0f3164',
    fontWeight: '600',
  },
});

export default PasswordInputCard;
