import React, { useState, useRef, useEffect } from 'react';
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
  backgroundColor?: string;
  textColor?: string;
  labelColor?: string;
  multiline?: boolean;
  numberOfLines?: number;
  minHeight?: number;
  maxHeight?: number;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  style?: object;
};

const InputBasico = ({
  label = 'Campo',
  value = '',
  tipo = 'string',
  onChangeText,
  width = '100%',
  placeholder = '',
  backgroundColor = '#e5e7eb',
  textColor = '#111827',
  labelColor = '#6b7280',
  multiline = false,
  numberOfLines = 4,
  minHeight = 50,
  maxHeight = 200,
  textAlignVertical = 'top',
  style,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const [secureText, setSecureText] = useState(true);
  const [contentHeight, setContentHeight] = useState(minHeight);
  const inputRef = useRef<TextInput>(null);

  const keyboardType: KeyboardTypeOptions =
    tipo === 'number' ? 'numeric' : 'default';

  const isPassword = tipo === 'password';

  useEffect(() => {
    if (value !== internalValue) {
      setInternalValue(value);
    }
  }, [value, internalValue]);

  const handleBlur = () => {
    setIsEditing(false);
    onChangeText?.(internalValue);
  };

  const handleContentSizeChange = (event: any) => {
    if (multiline) {
      const newHeight = event.nativeEvent.contentSize.height;
      const calculatedHeight = Math.min(Math.max(newHeight, minHeight), maxHeight);
      setContentHeight(calculatedHeight);
    }
  };

  const displayValue =
    isPassword && secureText && !multiline
      ? '\u2022'.repeat(internalValue.length)
      : internalValue;

  const isEditingMode = isEditing || multiline;

  const getInputHeight = () => {
    if (!multiline) return undefined;
    return contentHeight;
  };

  return (
    <View style={[styles.container, { width, backgroundColor }, style]}>
      <Text style={[styles.label, { color: labelColor }]}>
        {label}
      </Text>

      <View style={styles.inputWrapper}>
        {isEditingMode ? (
          <TextInput
            ref={inputRef}
            style={[
              styles.input,
              { color: textColor },
              isPassword && { flex: 1 },
              multiline && styles.multilineInput,
              multiline && { height: getInputHeight() },
            ]}
            value={internalValue}
            onChangeText={(text) => {
              setInternalValue(text);
              onChangeText?.(text);
            }}
            onBlur={!multiline ? handleBlur : undefined}
            autoFocus={!multiline}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor="#9ca3af"
            secureTextEntry={isPassword && secureText}
            multiline={multiline}
            numberOfLines={multiline ? numberOfLines : 1}
            textAlignVertical={multiline ? textAlignVertical : 'center'}
            scrollEnabled={multiline && contentHeight >= maxHeight}
            onContentSizeChange={handleContentSizeChange}
          />
        ) : (
          <TouchableOpacity
            style={[styles.flex, isPassword && { flex: 1 }]}
            onPress={() => setIsEditing(true)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.valueText,
                { color: textColor },
                !internalValue && styles.placeholderText,
              ]}
              numberOfLines={1}
            >
              {internalValue ? displayValue : placeholder || ' '}
            </Text>
          </TouchableOpacity>
        )}

        {isPassword && !multiline && (
          <TouchableOpacity
            onPress={() => setSecureText(!secureText)}
            style={styles.iconWrapper}
          >
            <Ionicons
              name={secureText ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={labelColor}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputBasico;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginVertical: 8,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },

  valueText: {
    fontSize: 22,
    fontWeight: '700',
  },

  placeholderText: {
    color: '#9ca3af',
    fontWeight: '400',
  },

  input: {
    fontSize: 22,
    fontWeight: '700',
    padding: 0,
  },

  multilineInput: {
    fontSize: 18,
    fontWeight: '500',
    paddingVertical: 8,
    textAlignVertical: 'top',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  iconWrapper: {
    paddingLeft: 10,
  },

  flex: {
    flex: 1,
  },
});