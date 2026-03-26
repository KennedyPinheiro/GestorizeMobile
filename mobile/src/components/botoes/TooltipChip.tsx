import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '@context/ThemeContext';

type Props = {
  label: string;
  onPress?: (active: boolean) => void;
};

const TooltipChip = ({ label, onPress }: Props) => {
  const { colors } = useTheme();
  const [active, setActive] = useState(false);

  const isDark = colors.background !== '#ffffff';

  const handlePress = () => {
    const newState = !active;
    setActive(newState);
    onPress?.(newState);
  };

  const backgroundColor = active
    ? isDark
      ? '#ffffff'
      : '#000000'
    : isDark
      ? '#ffffff15'
      : '#00000010';

  const textColor = active
    ? isDark
      ? '#000'
      : '#fff'
    : isDark
      ? '#fff'
      : '#000';

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.container, { backgroundColor }]}
    >
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
};

export default TooltipChip;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },

  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});
