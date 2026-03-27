import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Animated,
  ScrollView,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LogoIcon from '@components/LogoIcon';
import { useTheme } from '@context/ThemeContext';

type MenuItem = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  onPress?: () => void;
  danger?: boolean;
  disabled?: boolean;
};

type SideMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  bottomItems: MenuItem[];
};

export const SideMenu: React.FC<SideMenuProps> = ({
  isOpen,
  onClose,
  menuItems,
  bottomItems,
}) => {
  const { colors } = useTheme();
  const translateX = React.useRef(new Animated.Value(300)).current;

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : 300,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isOpen, translateX]);

  const renderItem = (item: MenuItem, index: number) => {
    const color = item.danger ? '#ef4444' : colors.text;
    return (
      <Pressable
        key={`${item.label}-${index}`}
        onPress={item.disabled ? undefined : item.onPress}
        style={({ pressed }) => [
          styles.item,
          {
            backgroundColor:
              pressed && !item.disabled ? `${colors.primary}18` : 'transparent',
            opacity: item.disabled ? 0.5 : 1,
          },
        ]}
      >
        <MaterialCommunityIcons
          name={item.icon}
          size={22}
          color={item.disabled ? colors.muted : color}
        />
        <Animated.Text
          style={[
            styles.itemLabel,
            { color: item.disabled ? colors.muted : color },
          ]}
        >
          {item.label}
        </Animated.Text>
      </Pressable>
    );
  };

  return (
    <>
      {isOpen && <Pressable style={styles.overlay} onPress={onClose} />}
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: colors.surface,
            borderLeftColor: colors.border,
            transform: [{ translateX }],
          },
        ]}
      >
        <View
          style={[
            styles.header,
            {
              borderBottomColor: colors.border,
              paddingTop: (StatusBar.currentHeight ?? 0) + 12,
            },
          ]}
        >
          <LogoIcon />
        </View>
        <ScrollView contentContainerStyle={styles.list}>
          {menuItems.map(renderItem)}
        </ScrollView>
        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          {bottomItems.map(renderItem)}
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    zIndex: 40,
  },
  container: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 280,
    zIndex: 50,
    borderLeftWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 12,
  },
  header: {
    minHeight: 90,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  list: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    gap: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderTopWidth: 1,
    gap: 4,
  },
});
