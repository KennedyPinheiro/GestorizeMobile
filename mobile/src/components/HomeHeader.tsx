import React from 'react';
import { View, StyleSheet, Pressable, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LogoIcon from '@components/LogoIcon';
import { useTheme } from '@context/ThemeContext';
import { useMenu } from '@context/MenuContext';

const HomeHeader = () => {
  const { colors } = useTheme();
  const { open, close, isOpen } = useMenu();
  const isDark = colors.background !== '#ffffff';
  const headerBackground = isDark ? '#ffffff' : '#062046';
  const isDarkBackground = headerBackground !== '#ffffff';
  const iconColor = isDarkBackground ? '#fff' : '#000';

  const handleMenu = () => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: headerBackground,
          paddingTop: (StatusBar.currentHeight ?? 25) + 6,
        },
      ]}
    >
      <LogoIcon
        variant="header"
        background={isDarkBackground ? 'dark' : 'light'}
      />

      <Pressable
        accessibilityLabel={isOpen ? 'Fechar menu' : 'Abrir menu'}
        onPress={handleMenu}
        style={({ pressed }) => [
          styles.iconButton,
          {
            backgroundColor: pressed
              ? isDarkBackground
                ? '#ffffff'
                : '#00000020'
              : 'transparent',
          },
        ]}
      >
        <MaterialCommunityIcons
          name={isOpen ? 'close' : 'menu'}
          size={28}
          color={iconColor}
        />
      </Pressable>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    height: 140,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
