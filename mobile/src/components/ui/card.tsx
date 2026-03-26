import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { useTheme } from '@context/ThemeContext';

type CardProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export const Card: React.FC<CardProps> = ({ children, onClick, style }) => {
  const { colors } = useTheme();

  if (onClick) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onClick}
        style={[
          styles.card,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
          style,
        ]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
});
