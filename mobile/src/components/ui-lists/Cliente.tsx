import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import TipoCliente from '@components/TipoCliente';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';

type Props = {
  tipo?: 'PF' | 'PJ';
  nome: string;
  email: string;
  estado?: string;
  onPress?: () => void;
};

export type ClienteType = {
  id: string;
  nome: string;
  email: string;
  estado?: string;
  tipo: 'PF' | 'PJ';
};

const Cliente = ({ tipo, nome, email, estado, onPress }: Props) => {
  const iconName = tipo === 'PF' ? 'person' : 'business';
  const { colors } = useTheme();
  const isDark = colors.background !== '#ffffff';

  const cardBg = isDark ? '#0A4191' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#0f172a';
  const subText = isDark ? '#cbd5e1' : '#6b7280';

  const circleColor = isDark ? '#09377B' : 'rgba(6, 32, 70, 0.22)';
  const arrowColor = isDark ? '#ffffff' : '#062046';
  const getBadgeStyle = () => {
    if (isDark) {
      return tipo === 'PJ' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.2)';
    }

    return tipo === 'PJ' ? 'rgba(0,104,255,0.4)' : 'rgba(0,104,255,0.2)';
  };

  const getTextColor = () => {
    if (isDark) {
      return '#ffffff';
    }

    return '#062046';
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: cardBg,
            shadowColor: isDark ? '#ffffff' : '#000000',
            shadowOpacity: isDark ? 0.08 : 0.8,
          },
        ]}
      >
        <View style={styles.left}>
          <View style={[styles.circle, { backgroundColor: circleColor }]}>
            <Ionicons
              name={iconName}
              size={50}
              color={isDark ? '#ffffff' : '#062046'}
            />
          </View>

          <View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}
            >
              <Text style={[styles.title, { color: textColor }]}>{nome}</Text>

              {tipo && (
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: getBadgeStyle(),
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: getTextColor(),
                      fontWeight: '700',
                      fontSize: 12,
                    }}
                  >
                    {tipo}
                  </Text>
                </View>
              )}
            </View>

            <Text style={[styles.subtitle, { color: subText }]}>
              Cliente: {email}
            </Text>

            <Text style={[styles.subtitle, { color: subText }]}>{estado}</Text>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={22} color={arrowColor} />
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
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  left: {
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

  title: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 16,
    marginTop: 2,
  },
});
