import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';
import { useMenu } from '@context/MenuContext';

type props = {
  title?: string;
  subtitle?: string;
  onBackPress?: () => void;

  rightType?: 'menu' | 'add';
  onAddPress?: () => void;
};

const Nav = ({
  title,
  subtitle,
  onBackPress,
  rightType = 'add',
  onAddPress,
}: props) => {
  const { colors } = useTheme();
  const { open } = useMenu();

  const isDarkTheme = colors.background !== '#ffffff';

  const backgroundColor = isDarkTheme ? '#ffffff' : '#062046';
  const isDarkBackground = backgroundColor !== '#ffffff';

  const textColor = isDarkBackground ? '#ffffff' : '#0f172a';
  const subtitleColor = isDarkBackground ? '#ffffffcc' : '#475569';
  const iconColor = isDarkBackground ? '#ffffff' : '#0f172a';

  const handleRightPress = () => {
    if (rightType === 'menu') {
      open();
    } else {
      onAddPress?.();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.leftContainer} onPress={onBackPress}>
          <Ionicons name="chevron-back" size={26} color={iconColor} />

          <View style={styles.textWrapper}>
            <Text style={[styles.title, { color: textColor }]}>{title}</Text>

            {subtitle && (
              <Text style={[styles.subtitle, { color: subtitleColor }]}>
                {subtitle}
              </Text>
            )}
          </View>
        </TouchableOpacity>

        {rightType === 'menu' ? (
          <Pressable
            onPress={handleRightPress}
            style={({ pressed }) => [
              styles.iconButton,
              {
                backgroundColor: pressed
                  ? isDarkBackground
                    ? '#ffffff20'
                    : '#00000020'
                  : 'transparent',
              },
            ]}
          >
            <Ionicons name="menu" size={28} color={iconColor} />
          </Pressable>
        ) : (
          <TouchableOpacity
            style={[
              styles.addButton,
              {
                backgroundColor: isDarkBackground ? '#ffffff' : '#062046',
              },
            ]}
            onPress={handleRightPress}
          >
            <Ionicons
              name="add"
              size={24}
              color={isDarkBackground ? '#0f172a' : '#ffffff'}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Nav;

const styles = StyleSheet.create({
  container: {
    height: 140,
    paddingTop: 50,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    justifyContent: 'center',
    zIndex: 20,
    elevation: 20,
  },

  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  textWrapper: {
    justifyContent: 'center',
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
  },

  subtitle: {
    fontSize: 15,
    marginTop: 2,
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
});
