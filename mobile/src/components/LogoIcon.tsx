import React from 'react';
import { Image, StyleSheet, View, ImageSourcePropType } from 'react-native';
import { useTheme } from '@context/ThemeContext';

type LogoIconProps = {
  variant?: 'default' | 'header' | 'login';
  background?: 'light' | 'dark';
};

const LogoIcon: React.FC<LogoIconProps> = ({
  variant = 'default',
  background,
}) => {
  const { colors } = useTheme();

  const isDarkTheme = colors.background !== '#ffffff';
  const effectiveBackground = background ?? (isDarkTheme ? 'dark' : 'light');

  const source: ImageSourcePropType =
    effectiveBackground === 'dark'
      ? require('@images/LogoLight.png')
      : require('@images/Logo.png');

  return (
    <View style={[styles.wrapper, styles[variant]]}>
      <Image source={source} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

export default LogoIcon;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 64,
  },

  logo: {
    height: 50,
    width: 100,
  },

  default: {},

  header: {
    height: 50,
  },

  login: {
    height: 120,
    marginTop: 40,
  },
});
