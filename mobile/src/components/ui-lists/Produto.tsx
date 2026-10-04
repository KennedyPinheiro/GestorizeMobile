import { Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, useThemeToggle } from '@context/ThemeContext';

type Props = {
  nome: string;
  descricao?: string | null;
  preco?: number | null;
  estoque: number;
  unidade?: string | null;
  categoria?: string | null;
  imagem?: string | null;
  onPress?: () => void;
};

const Produto = ({
  nome,
  descricao,
  preco,
  estoque,
  unidade,
  categoria,
  imagem,
  onPress,
}: Props) => {
  const { colors } = useTheme();
  const { compactLists } = useThemeToggle();

  const isDark = colors.background !== '#ffffff';

  const cardBg = isDark ? '#0A4191' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#0f172a';
  const subText = isDark ? '#cbd5e1' : '#6b7280';

  const circleColor = isDark
    ? '#09377B'
    : 'rgba(6, 32, 70, 0.22)';

  const arrowColor = isDark ? '#ffffff' : '#062046';

  const badgeBg = isDark
    ? 'rgba(255,255,255,0.2)'
    : 'rgba(0,104,255,0.2)';

  const badgeText = isDark ? '#ffffff' : '#062046';

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
            shadowColor: isDark ? '#ffffff' : '#000000',
            shadowOpacity: isDark ? 0.08 : 0.8,
          },
        ]}
      >
        <View style={styles.left}>
          <View
            style={[
              styles.circle,
              compactLists && styles.circleCompact,
              {
                backgroundColor: circleColor,
              },
            ]}
          >
            {imagem ? (
              <Image
                source={{ uri: imagem }}
                style={[
                  styles.image,
                  compactLists && styles.imageCompact,
                ]}
              />
            ) : (
              <Ionicons
                name="cube-outline"
                size={compactLists ? 32 : 50}
                color={isDark ? '#ffffff' : '#062046'}
              />
            )}
          </View>

          <View style={styles.info}>
            <View style={styles.row}>
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

              {!compactLists && categoria && (
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: badgeBg,
                    },
                  ]}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      color: badgeText,
                      fontWeight: '700',
                      fontSize: 12,
                    }}
                  >
                    {categoria}
                  </Text>
                </View>
              )}
            </View>

            {!compactLists && descricao && (
              <Text
                numberOfLines={1}
                style={[
                  styles.description,
                  { color: subText },
                ]}
              >
                {descricao}
              </Text>
            )}

            <Text
              numberOfLines={1}
              style={[
                styles.subtitle,
                compactLists && styles.subtitleCompact,
                { color: subText },
              ]}
            >
              Valor: R${' '}
              {(preco ?? 0).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>

            {!compactLists && (
              <Text
                numberOfLines={1}
                style={[
                  styles.subtitle,
                  { color: subText },
                ]}
              >
                Estoque: {estoque} {unidade ?? ''}
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

export default Produto;

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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minWidth: 0,
  },

  info: {
    flex: 1,
    minWidth: 0,
  },

  circle: {
    width: 65,
    height: 65,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  circleCompact: {
    width: 44,
    height: 44,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imageCompact: {
    width: '100%',
    height: '100%',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minWidth: 0,
  },

  badge: {
    maxWidth: 120,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
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

  description: {
    fontSize: 14,
    marginTop: 2,
  },

  subtitle: {
    fontSize: 16,
    marginTop: 2,
  },

  subtitleCompact: {
    fontSize: 13,
    marginTop: 0,
  },
});