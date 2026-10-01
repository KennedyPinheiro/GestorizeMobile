import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useTheme, useThemeToggle } from '@context/ThemeContext';

type Props = {
  tipo: 'PF' | 'PJ';
  nome: string;
  email: string | null;
  estado?: string;
  onPress?: () => void;
};

const Cliente = ({
  tipo,
  nome,
  email,
  estado,
  onPress,
}: Props) => {
  const iconName = tipo === 'PF' ? 'person' : 'business';

  const { colors } = useTheme();
  const { compactLists } = useThemeToggle();

  const isDark = colors.background !== '#ffffff';
  const cardBg = isDark ? '#0A4191' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#0f172a';
  const subText = isDark ? '#cbd5e1' : '#6b7280';
  const circleColor = isDark
    ? '#09377B'
    : 'rgba(6, 32, 70, 0.22)';

  const arrowColor = isDark
    ? '#ffffff'
    : '#062046';

  const badgeBackground = isDark
    ? tipo === 'PJ'
      ? 'rgba(0,0,0,0.4)'
      : 'rgba(255,255,255,0.2)'
    : tipo === 'PJ'
      ? 'rgba(0,104,255,0.4)'
      : 'rgba(0,104,255,0.2)';

  const badgeTextColor = isDark
    ? '#ffffff'
    : '#062046';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View
        style={[
          styles.card,
          compactLists && styles.cardCompact,
          {
            backgroundColor: cardBg,
            shadowColor: isDark
              ? '#ffffff'
              : '#000000',
            shadowOpacity: isDark ? 0.08 : 0.8,
          },
        ]}
      >
        <View style={styles.left}>
          <View
            style={[
              styles.circle,
              compactLists && styles.circleCompact, { backgroundColor: circleColor, },]}
          >
            <Ionicons
              name={iconName}
              size={compactLists ? 32 : 50}
              color={isDark ? '#ffffff' : '#062046'}
            />
          </View>

          <View style={styles.info}>
            <View style={styles.titleRow}>
              <Text
                numberOfLines={1}
                style={[
                  styles.title,
                  compactLists && styles.titleCompact,
                  { color: textColor },
                ]}
              >
                {nome}
              </Text>

              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: badgeBackground,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    {
                      color: badgeTextColor,
                    },
                  ]}
                >
                  {tipo}
                </Text>
              </View>
            </View>

            <Text
              numberOfLines={1}
              style={[
                styles.subtitle,
                compactLists && styles.subtitleCompact,
                { color: subText },
              ]}
            >
              Cliente: {email}
            </Text>

            {!compactLists && estado && (
              <Text
                numberOfLines={1}
                style={[styles.subtitle, { color: subText },]}
              >
                {estado}
              </Text>
            )}
          </View>
        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color={arrowColor}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Cliente;

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowRadius: 8,
    elevation: 5,
  },

  cardCompact: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  info: {
    flex: 1,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  circle: {
    width: 65,
    height: 65,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  circleCompact: {
    width: 44,
    height: 44,
  },

  title: {
    flexShrink: 1,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
  },

  titleCompact: {
    fontSize: 15,
    marginBottom: 0,
  },

  subtitle: {
    fontSize: 16,
    marginTop: 2,
  },

  subtitleCompact: {
    fontSize: 13,
    marginTop: 0,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeText: {
    fontWeight: '700',
    fontSize: 12,
  },
});