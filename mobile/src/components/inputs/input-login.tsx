import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';

interface InputLoginProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
}

const withOpacity = (color: string, opacity: number) => {
  const hexOpacity = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0');
  return `${color}${hexOpacity}`;
};

export default function InputLogin({
  placeholder = 'Digite...',
  value,
  onChangeText,
  secureTextEntry = false,
  icon = 'mail-outline',
}: InputLoginProps) {
  const { colors, isDark } = useTheme();

  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const baseColor = isDark ? '#ffffff' : '#000000';
  const backgroundColor = withOpacity(baseColor, 0.09);

  const focusedBg = isDark
    ? withOpacity('#ffffff', 0.16)
    : withOpacity('#000000', 0.06);

  const iconColor = isFocused ? colors.primary : isDark ? '#ffffff' : '#1E1E1E';

  const textColor = isDark ? '#ffffff' : '#000000';

  const placeholderColor = isDark ? '#ffffff80' : '#00000080';

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        inputRef.current?.blur();
        setIsFocused(false);
      }}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: isFocused ? focusedBg : backgroundColor,
            borderColor: isFocused ? colors.primary : 'transparent',
          },
        ]}
      >
        <Ionicons name={icon} size={24} color={iconColor} />

        <TextInput
          ref={inputRef}
          style={[styles.input, { color: textColor }]}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          underlineColorAndroid="transparent"
          onFocus={() => setIsFocused(true)}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            <Ionicons
              name={isSecure ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color={iconColor}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 64,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    color: '#000',
    fontSize: 20,
  },
});
