import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import InputCard from '@components/InputCard';
import SidebarAlert from '@components/sidebars/Sidebaralert';
import Nav from '@components/utilities/Nav';
import { useAuth } from '@context/AuthContext';
import { RootStackParamList } from '@context/types';
import { useTheme } from '@context/ThemeContext';

type Navigation = NativeStackNavigationProp<RootStackParamList>;
type UserProfileRoute = RouteProp<RootStackParamList, 'UserPerfil'>;
type UserProfileParams = Partial<NonNullable<RootStackParamList['UserPerfil']>>;

type ProfileForm = {
  nome: string;
  email: string;
  genero: string;
  estado_civil: string;
  telefone: string;
  data_nascimento: string;
  cpf: string;
  estado: string;
  cidade: string;
  rua: string;
  bairro: string;
  numero: string;
  cep: string;
};

const fallbackForm: ProfileForm = {
  nome: 'Kennedy Pinheiro',
  email: 'kennedy@email.com',
  genero: '',
  estado_civil: '',
  telefone: '(00) 00000 - 0000',
  data_nascimento: '0000 - 00 - 00',
  cpf: '000.000.000 - 00',
  estado: '',
  cidade: 'Example',
  rua: 'Example',
  bairro: 'Example',
  numero: '000',
  cep: '00000 - 000',
};

const UserPerfil = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<UserProfileRoute>();
  const { user } = useAuth();
  const { colors, isDark } = useTheme();
  const [alertVisible, setAlertVisible] = useState(false);

  const initialForm = useMemo<ProfileForm>(() => {
    const params = (route.params ?? {}) as UserProfileParams;
    return {
      nome: params.nome ?? user?.nome ?? user?.name ?? fallbackForm.nome,
      email: params.email ?? user?.email ?? fallbackForm.email,
      genero: params.genero ?? user?.genero ?? fallbackForm.genero,
      estado_civil:
        params.estado_civil ?? user?.estado_civil ?? fallbackForm.estado_civil,
      telefone: params.telefone ?? user?.telefone ?? fallbackForm.telefone,
      data_nascimento:
        params.data_nascimento ??
        user?.data_nascimento ??
        fallbackForm.data_nascimento,
      cpf: params.cpf ?? user?.cpf ?? fallbackForm.cpf,
      estado: params.estado ?? user?.estado ?? fallbackForm.estado,
      cidade: params.cidade ?? user?.cidade ?? fallbackForm.cidade,
      rua: params.rua ?? user?.rua ?? fallbackForm.rua,
      bairro: params.bairro ?? user?.bairro ?? fallbackForm.bairro,
      numero: params.numero ?? user?.numero ?? fallbackForm.numero,
      cep: params.cep ?? user?.cep ?? fallbackForm.cep,
    };
  }, [route.params, user]);

  const [formData, setFormData] = useState(initialForm);

  const hasChanges = useMemo(
    () =>
      Object.entries(formData).some(
        ([field, value]) => value !== initialForm[field as keyof ProfileForm],
      ),
    [formData, initialForm],
  );

  const theme = useMemo(
    () => ({
      background: isDark ? '#062046' : '#f4f7fb',
      fieldBg: isDark ? '#1f3e68' : '#ffffff',
      fieldBorder: isDark ? '#315982' : '#d9e2ef',
      fieldLabel: isDark ? '#b5c7df' : '#64748b',
      fieldText: isDark ? '#ffffff' : '#0f172a',
      divider: isDark ? '#6f86a6' : '#cad6e7',
      saveBg: hasChanges ? colors.primary : '#8f8f8f',
      saveText: isDark && hasChanges ? '#062046' : '#ffffff',
    }),
    [colors.primary, hasChanges, isDark],
  );

  const params = (route.params ?? {}) as UserProfileParams;
  const role = params.funcao ?? user?.funcao ?? user?.role ?? 'Cargo example';

  const updateField = (field: keyof ProfileForm, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSave = () => {
    setAlertVisible(true);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SidebarAlert
        message="Perfil atualizado com sucesso!"
        visible={alertVisible}
        type="success"
        onClose={() => setAlertVisible(false)}
      />

      <Nav
        title="Funcionarios"
        subtitle={role}
        onBackPress={() => navigation.goBack()}
        rightType="menu"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <View style={styles.identity}>
          <View style={[styles.avatar, { borderColor: theme.divider }]}>
            <MaterialCommunityIcons
              name="account-outline"
              size={64}
              color={theme.fieldText}
            />
          </View>
          <Text style={[styles.identityName, { color: theme.fieldText }]}>
            {formData.nome.toUpperCase()}
          </Text>
          <Text style={[styles.identityEmail, { color: theme.fieldLabel }]}>
            {formData.email}
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.divider }]} />

        <ProfileField
          label="Nome Completo"
          value={formData.nome}
          onChangeText={(value) => updateField('nome', value)}
          theme={theme}
        />
        <ProfileField
          label="Email"
          value={formData.email}
          onChangeText={(value) => updateField('email', value)}
          keyboardType="email-address"
          theme={theme}
        />

        <View style={styles.row}>
          <ProfileField
            label="Gênero"
            value={formData.genero}
            onChangeText={(value) => updateField('genero', value)}
            theme={theme}
            width="49%"
          />
          <ProfileField
            label="Estado Civil"
            value={formData.estado_civil}
            onChangeText={(value) => updateField('estado_civil', value)}
            theme={theme}
            width="49%"
          />
        </View>

        <ProfileField
          label="Telefone"
          value={formData.telefone}
          onChangeText={(value) => updateField('telefone', value)}
          keyboardType="phone-pad"
          theme={theme}
        />
        <ProfileField
          label="Data de nascimento"
          value={formData.data_nascimento}
          onChangeText={(value) => updateField('data_nascimento', value)}
          theme={theme}
        />
        <ProfileField
          label="CPF"
          value={formData.cpf}
          onChangeText={(value) => updateField('cpf', value)}
          keyboardType="number-pad"
          theme={theme}
        />
        <ProfileField
          label="ESTADO"
          value={formData.estado}
          onChangeText={(value) => updateField('estado', value)}
          theme={theme}
          uppercaseLabel
        />
        <ProfileField
          label="Cidade"
          value={formData.cidade}
          onChangeText={(value) => updateField('cidade', value)}
          theme={theme}
        />
        <ProfileField
          label="Logradouro"
          value={formData.rua}
          onChangeText={(value) => updateField('rua', value)}
          theme={theme}
        />
        <ProfileField
          label="Bairro"
          value={formData.bairro}
          onChangeText={(value) => updateField('bairro', value)}
          theme={theme}
        />

        <View style={styles.row}>
          <ProfileField
            label="Número"
            value={formData.numero}
            onChangeText={(value) => updateField('numero', value)}
            keyboardType="number-pad"
            theme={theme}
            width="49%"
          />
          <ProfileField
            label="Cep"
            value={formData.cep}
            onChangeText={(value) => updateField('cep', value)}
            keyboardType="number-pad"
            theme={theme}
            width="49%"
          />
        </View>

        <Pressable
          onPress={handleSave}
          disabled={!hasChanges}
          style={[styles.saveButton, { backgroundColor: theme.saveBg }]}
        >
          <Text style={[styles.saveText, { color: theme.saveText }]}>
            Salvar
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

type ProfileFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  theme: {
    fieldBg: string;
    fieldBorder: string;
    fieldLabel: string;
    fieldText: string;
  };
  keyboardType?: 'default' | 'email-address' | 'number-pad' | 'phone-pad';
  uppercaseLabel?: boolean;
  width?: `${number}%`;
};

const ProfileField = ({
  label,
  value,
  onChangeText,
  theme,
  keyboardType = 'default',
  uppercaseLabel,
  width = '100%',
}: ProfileFieldProps) => {
  return (
    <InputCard
      label={uppercaseLabel ? label.toUpperCase() : label}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      width={width}
      placeholder={label}
      placeholderTextColor={theme.fieldLabel}
      containerStyle={[
        styles.inputCard,
        {
          backgroundColor: theme.fieldBg,
          borderColor: theme.fieldBorder,
        },
      ]}
      labelStyle={[styles.inputLabel, { color: theme.fieldLabel }]}
      inputStyle={[styles.inputValue, { color: theme.fieldText }]}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 32,
    paddingBottom: 28,
  },
  identity: {
    alignItems: 'center',
  },
  avatar: {
    width: 118,
    height: 118,
    borderRadius: 59,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  identityName: {
    fontSize: 17,
    fontWeight: '900',
  },
  identityEmail: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  divider: {
    height: 2,
    marginTop: 30,
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  inputCard: {
    minHeight: 74,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '800',
  },
  inputValue: {
    fontSize: 19,
    fontWeight: '900',
  },
  saveButton: {
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 6,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '900',
  },
});

export default UserPerfil;
