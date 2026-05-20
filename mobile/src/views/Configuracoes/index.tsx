import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Nav from '@components/utilities/Nav';
import { useAuth } from '@context/AuthContext';
import { RootStackParamList } from '@context/types';
import { useTheme, useThemeToggle } from '@context/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Configuracoes'>;

const Configuracoes = ({ navigation }: Props) => {
  const { colors, isDark } = useTheme();
  const { compactLists, mode, setCompactLists, toggle } = useThemeToggle();
  const { user, signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const userInitials = useMemo(() => {
    const name = user?.nome ?? user?.name ?? 'Usuario';
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part[0])
      .join('')
      .toUpperCase();
  }, [user]);

  const switchTrackColor = {
    false: isDark ? '#27446f' : '#cbd5e1',
    true: isDark ? '#93c5fd' : colors.primary,
  };

  const handleThemeChange = () => {
    toggle();
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Nav
        title="Configurações"
        subtitle="Preferências do aplicativo"
        onBackPress={() => navigation.goBack()}
        rightType="menu"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View
          style={[
            styles.profile,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text
              style={[
                styles.avatarText,
                { color: isDark ? '#062046' : '#ffffff' },
              ]}
            >
              {userInitials || 'U'}
            </Text>
          </View>
          <View style={styles.profileText}>
            <Text style={[styles.profileName, { color: colors.text }]}>
              {user?.nome ?? user?.name ?? 'Usuário'}
            </Text>
            <Text style={[styles.profileEmail, { color: colors.muted }]}>
              {user?.email ?? 'Conta ativa'}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Sistema
          </Text>

          <SettingRow
            icon="account-circle-outline"
            title="Perfil"
            description="Dados da conta"
            colors={colors}
            onPress={() => navigation.navigate('UserPerfil')}
          />
          <SettingRow
            icon="bell-outline"
            title="Notificações"
            description={
              notificationsEnabled ? 'Alertas ativos' : 'Alertas pausados'
            }
            colors={colors}
            right={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                thumbColor="#ffffff"
                trackColor={switchTrackColor}
              />
            }
          />
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Aparência
          </Text>

          <SettingRow
            icon="theme-light-dark"
            title="Tema escuro"
            description={mode === 'dark' ? 'Ativado' : 'Desativado'}
            colors={colors}
            right={
              <Switch
                value={mode === 'dark'}
                onValueChange={handleThemeChange}
                thumbColor={mode === 'dark' ? '#ffffff' : '#f8fafc'}
                trackColor={switchTrackColor}
              />
            }
          />

          <SettingRow
            icon="format-list-bulleted"
            title="Listas compactas"
            description={
              compactLists ? 'Densidade reduzida' : 'Densidade padrão'
            }
            colors={colors}
            right={
              <Switch
                value={compactLists}
                onValueChange={setCompactLists}
                thumbColor="#ffffff"
                trackColor={switchTrackColor}
              />
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Sessão
          </Text>

          <SettingRow
            icon="logout"
            title="Sair"
            description="Encerrar acesso neste dispositivo"
            colors={colors}
            danger
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>
    </View>
  );
};

type SettingRowProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description: string;
  colors: ReturnType<typeof useTheme>['colors'];
  right?: React.ReactNode;
  danger?: boolean;
  onPress?: () => void;
};

const SettingRow = ({
  icon,
  title,
  description,
  colors,
  right,
  danger,
  onPress,
}: SettingRowProps) => {
  const contentColor = danger ? colors.error : colors.text;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.82 : 1,
        },
      ]}
    >
      <View
        style={[styles.rowIcon, { backgroundColor: `${colors.primary}18` }]}
      >
        <MaterialCommunityIcons name={icon} size={22} color={contentColor} />
      </View>

      <View style={styles.rowText}>
        <Text style={[styles.rowTitle, { color: contentColor }]}>{title}</Text>
        <Text style={[styles.rowDescription, { color: colors.muted }]}>
          {description}
        </Text>
      </View>

      {right ??
        (onPress ? (
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={danger ? colors.error : colors.muted}
          />
        ) : null)}
    </Pressable>
  );
};

export default Configuracoes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 36,
    gap: 18,
  },
  profile: {
    minHeight: 96,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
  },
  profileEmail: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 2,
  },
  row: {
    minHeight: 76,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowIcon: {
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    flex: 1,
    minWidth: 0,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  rowDescription: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: '500',
  },
});
