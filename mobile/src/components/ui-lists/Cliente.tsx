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
  imagem?: string | null;
  estado?: string;
  onPress?: () => void;
};

const Cliente = ({
  tipo,
  nome,
  email,
  imagem,
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

  const tipoLabel =
    tipo === 'PF'
      ? 'Pessoa Física'
      : 'Pessoa Jurídica';

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
            imageUri={imagem}
            size={compactLists ? 44 : 65}
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
                  size={compactLists ? 13 : 16}
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

            <Text
              numberOfLines={1}
              style={[
                styles.subtitle,
                compactLists && styles.subtitleCompact,
                { color: subText },
              ]}
            >
              {email || 'Sem e-mail'}
            </Text>

            {!compactLists && estado && (
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

  title: {
    flexShrink: 1,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 5,
  },

  titleCompact: {
    fontSize: 15,
    marginBottom: 3,
  },

  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 8,
  },

  badgeText: {
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 0.4,
  },

  badgeTextCompact: {
    fontSize: 10,
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 15,
    marginTop: 2,
  },

  subtitleCompact: {
    fontSize: 12,
    marginTop: 1,
  },
});