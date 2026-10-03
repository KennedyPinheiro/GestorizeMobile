import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Avatar from '@components/Avatar';

import { useTheme, useThemeToggle } from '@context/ThemeContext';

type Props = {
  tipo: 'PF' | 'PJ';
  nome: string;
  email: string | null;
  avatar?: string | null;
  estado?: string;
  onPress?: () => void;
};

const Cliente = ({
  tipo,
  nome,
  email,
  avatar,
  estado,
  onPress,
}: Props) => {
  const { colors } = useTheme();
  const { compactLists } = useThemeToggle();

  const isDark = colors.background !== '#ffffff';

  const cardBg = isDark ? '#0A4191' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#0f172a';
  const subText = isDark ? '#cbd5e1' : '#6b7280';

  const arrowColor = isDark
    ? '#ffffff'
    : '#062046';

  const badgeBackground = isDark
    ? tipo === 'PJ'
      ? 'rgba(0,0,0,0.35)'
      : 'rgba(255,255,255,0.18)'
    : tipo === 'PJ'
      ? 'rgba(0,104,255,0.15)'
      : 'rgba(0,104,255,0.10)';

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

          <Avatar
            nome={nome}
            imageUri={avatar}
            size={compactLists ? 40 : 85}
          />

          <View style={styles.info}>

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

            <View style={styles.typeRow}>
              <View
                style={[
                  styles.badge,
                  compactLists && styles.badgeCompact,
                  {
                    backgroundColor: badgeBackground,
                    borderColor: badgeTextColor,
                  },
                ]}
              >
                <Ionicons
                  name={
                    tipo === 'PF'
                      ? 'person'
                      : 'business'
                  }
                  size={compactLists ? 11 : 13}
                  color={badgeTextColor}
                />

                <Text
                  style={[
                    styles.badgeText,
                    compactLists && styles.badgeTextCompact,
                    { color: badgeTextColor },
                  ]}
                >
                  {tipo === 'PF'
                    ? 'PESSOA FÍSICA'
                    : 'PESSOA JURÍDICA'}
                </Text>
              </View>
            </View>

            {!compactLists && (
              <>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.subtitle,
                    { color: subText },
                  ]}
                >
                  {email || 'Sem e-mail'}
                </Text>

                {estado && (
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.subtitle,
                      { color: subText },
                    ]}
                  >
                    {estado}
                  </Text>
                )}
              </>
            )}

          </View>
        </View>

        <Ionicons
          name="chevron-forward"
          size={compactLists ? 16 : 20}
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
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 7,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },

  info: {
    flex: 1,
  },

  title: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },

  titleCompact: {
    fontSize: 13,
    marginBottom: 2,
  },

  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
  },

  badgeCompact: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },

  badgeText: {
    fontWeight: '800',
    fontSize: 10,
    letterSpacing: 0.2,
  },

  badgeTextCompact: {
    fontSize: 8,
    letterSpacing: 0.1,
  },

  subtitle: {
    fontSize: 12,
    marginTop: 3,
  },
});