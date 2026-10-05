import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardTypeOptions,
} from 'react-native';
import type { DimensionValue } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  label?: string;
  value?: string;
  tipo?: 'string' | 'number' | 'password';
  onChangeText?: (text: string) => void;
  width?: DimensionValue;
  placeholder?: string;
  editable?: boolean;
};

const EditableTextCard = ({
  label = 'Campo',
  value = '',
  tipo = 'string',
  onChangeText,
  width = '100%',
  placeholder = '',
  editable = true,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const [secureText, setSecureText] = useState(true);

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const keyboardType: KeyboardTypeOptions =
    tipo === 'number' ? 'numeric' : 'default';

  const isPassword = tipo === 'password';

  const handleFocus = () => {
    if (editable) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);

    if (onChangeText) {
      onChangeText(internalValue);
    }
  };

  const handleChangeText = (text: string) => {
    setInternalValue(text);
    onChangeText?.(text);
  };

  const displayValue =
    isPassword && secureText
      ? '\u2022'.repeat(internalValue.length)
      : internalValue;

  return (
    <View
      style={[
        styles.container,
        !editable && styles.containerDisabled,
        { width },
      ]}
    >
      <Text
        style={[
          styles.label,
          !editable && styles.labelDisabled,
        ]}
      >
        {label}
      </Text>

      <View style={styles.inputWrapper}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.flex}
          onPress={() => {
            if (!editable) {
              return;
            }

            inputRef.current?.focus();
          }}
        >
          <TextInput
            ref={inputRef}
            style={[
              styles.input,
              !isEditing && styles.inputReadOnly,
              !editable && styles.inputDisabled,
              isPassword && { flex: 1 },
            ]}
            value={internalValue}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor={editable ? '#999' : '#aaa'}
            secureTextEntry={isPassword && secureText}
            editable={editable}
            pointerEvents={isEditing ? 'auto' : 'none'}
          />
        </TouchableOpacity>

        {isPassword && (
          <TouchableOpacity
            onPress={() => setSecureText(!secureText)}
            style={styles.iconWrapper}
            disabled={!editable}
          >
            <Ionicons
              name={secureText ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color={editable ? '#000' : '#999'}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default EditableTextCard;

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

  containerDisabled: {
    backgroundColor: '#F2F3F5',
    borderColor: '#C9CDD2',
  },

  label: {
    fontSize: 13,
    color: '#6e6e6e',
    fontWeight: 'bold',
    marginBottom: 5,
  },

  labelDisabled: {
    color: '#8A8F98',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    padding: 0,
    minHeight: 25,
  },

  inputReadOnly: {
  },

  inputDisabled: {
    color: '#666B73',
  },

  flex: {
    flex: 1,
  },

  iconWrapper: {
    paddingLeft: 10,
  },
});