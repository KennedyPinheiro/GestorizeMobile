import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useTheme, useThemeToggle } from '@context/ThemeContext';

type Props = {
  nome: string;
  email?: string | null;
  telefone?: string | null;
  cnpj?: string | null;
  ramo_atividade?: string | null;
  nome_responsavel?: string | null;
  local?: string;
  avatar?: string | null;
  tipo?: string;
  onPress?: () => void;
};

const formatarCnpj = (valor?: string | null) => {
  if (!valor) return null;

  const numeros = valor.replace(/\D/g, '');

  if (numeros.length !== 14) return valor;

  return numeros.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5',
  );
};

const Fornecedor = ({
  nome,
  email,
  telefone,
  cnpj,
  ramo_atividade,
  nome_responsavel,
  local,
  avatar,
  tipo,
  onPress,
}: Props) => {
  const { colors } = useTheme();
  const { compactLists } = useThemeToggle();

  const isDark = colors.background !== '#ffffff';

  const cardBg = isDark ? '#0A4191' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#0f172a';
  const subText = isDark ? '#cbd5e1' : '#6b7280';

  const circleColor = isDark ? '#09377B' : '#e8eef7';
  const arrowColor = isDark ? '#ffffff' : '#062046';

  const badgeBg = isDark
    ? 'rgba(255,255,255,0.18)'
    : 'rgba(0,104,255,0.10)';

  const badgeText = isDark ? '#ffffff' : '#062046';

  const cnpjFormatado = formatarCnpj(cnpj);

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View
        style={[
          styles.card,
          compactLists && styles.cardCompact,
          {
            backgroundColor: cardBg,
            shadowColor: isDark ? '#ffffff' : '#000000',
            shadowOpacity: isDark ? 0.08 : 0.12,
          },
        ]}
      >
        <View style={[styles.left, compactLists && styles.leftCompact]}>
          {/* Avatar */}
          <View
            style={[
              styles.circle,
              compactLists && styles.circleCompact,
              { backgroundColor: circleColor },
            ]}
          >
            {avatar ? (
              <Image
                source={{ uri: avatar }}
                style={styles.avatar}
                resizeMode="cover"
              />
            ) : (
              <Ionicons
                name="business-outline"
                size={compactLists ? 24 : 42}
                color={isDark ? '#ffffff' : '#062046'}
              />
            )}
          </View>

          <View style={styles.info}>
            {/* Nome */}
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

            {/* Ramo de atividade */}
            {!compactLists && ramo_atividade ? (
              <View style={[styles.badge, { backgroundColor: badgeBg }]}>
                <Text
                  numberOfLines={1}
                  style={[styles.badgeText, { color: badgeText }]}
                >
                  {ramo_atividade}
                </Text>
              </View>
            ) : null}

            {/* E-mail */}
            {email ? (
              <View style={styles.detailRow}>
                {!compactLists && (
                  <Ionicons
                    name="mail-outline"
                    size={15}
                    color={subText}
                  />
                )}

                <Text
                  numberOfLines={1}
                  style={[
                    styles.subtitle,
                    compactLists && styles.subtitleCompact,
                    { color: subText },
                  ]}
                >
                  {email}
                </Text>
              </View>
            ) : !compactLists ? (
              <Text style={[styles.subtitle, { color: subText }]}>
                Sem e-mail
              </Text>
            ) : null}

            {/* Informações adicionais no modo normal */}
            {!compactLists && (
              <>
                {telefone ? (
                  <View style={styles.detailRow}>
                    <Ionicons
                      name="call-outline"
                      size={15}
                      color={subText}
                    />

                    <Text
                      numberOfLines={1}
                      style={[styles.subtitle, { color: subText }]}
                    >
                      {telefone}
                    </Text>
                  </View>
                ) : null}

                {cnpjFormatado ? (
                  <View style={styles.detailRow}>
                    <Ionicons
                      name="document-text-outline"
                      size={15}
                      color={subText}
                    />

                    <Text
                      numberOfLines={1}
                      style={[styles.subtitle, { color: subText }]}
                    >
                      CNPJ: {cnpjFormatado}
                    </Text>
                  </View>
                ) : null}

                {nome_responsavel ? (
                  <View style={styles.detailRow}>
                    <Ionicons
                      name="person-outline"
                      size={15}
                      color={subText}
                    />

                    <Text
                      numberOfLines={1}
                      style={[styles.subtitle, { color: subText }]}
                    >
                      {nome_responsavel}
                    </Text>
                  </View>
                ) : null}

                {local ? (
                  <View style={styles.detailRow}>
                    <Ionicons
                      name="location-outline"
                      size={15}
                      color={subText}
                    />

                    <Text
                      numberOfLines={1}
                      style={[styles.subtitle, { color: subText }]}
                    >
                      {local}
                    </Text>
                  </View>
                ) : null}

                {tipo ? (
                  <View style={[styles.typeRow, { backgroundColor: badgeBg }]}>
                    <Text style={[styles.typeText, { color: badgeText }]}>
                      {tipo}
                    </Text>
                  </View>
                ) : null}
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

export default Fornecedor;

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
    marginRight: 8,
  },

  leftCompact: {
    marginRight: 6,
  },

  info: {
    flex: 1,
    minWidth: 0,
  },

  circle: {
    width: 85,
    height: 85,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  circleCompact: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  avatar: {
    width: '100%',
    height: '100%',
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

  badge: {
    alignSelf: 'flex-start',
    maxWidth: '100%',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
    marginBottom: 4,
  },

  badgeText: {
    fontWeight: '800',
    fontSize: 10,
    letterSpacing: 0.2,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 3,
    minWidth: 0,
  },

  subtitle: {
    flex: 1,
    fontSize: 12,
    marginTop: 3,
  },

  subtitleCompact: {
    fontSize: 11,
    marginTop: 0,
  },

  typeRow: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 5,
  },

  typeText: {
    fontSize: 10,
    fontWeight: '800',
  },
});