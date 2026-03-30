import Nav from '@components/utilities/Nav';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import InputBasico from '@components/InputBasico';
import SelectBasico from '@components/SelectBasico';
import Button from '@components/botoes/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const NovoFuncionario = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const isDarkTheme = colors.background !== '#ffffff';
  const textColor = isDarkTheme ? '#f1f5f9' : '#0f172a';
  const labelColor = isDarkTheme ? '#cbd5e1' : '#475569';
  const inputBackground = isDarkTheme ? '#ffffff27' : '#f1f5f9';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Nav
        title="Novo Funcionário"
        subtitle="Crie um novo funcionário para sua empresa"
        onBackPress={() => navigation.goBack()}
        rightType="menu"
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          enableOnAndroid
          extraScrollHeight={350}
          keyboardShouldPersistTaps="handled"
        >
          <InputBasico
            label="Nome Completo"
            placeholder="Digite o nome"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <InputBasico
            label="Email"
            placeholder="example@email.com"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <SelectBasico
            label="Cargo"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <InputBasico
            label="CPF"
            tipo="number"
            placeholder="000.000.000-00"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <View style={styles.row}>
            <View style={styles.col}>
              <SelectBasico
                label="Gênero"
                backgroundColor={inputBackground}
                textColor={textColor}
                labelColor={labelColor}
              />
            </View>

            <View style={styles.col}>
              <SelectBasico
                label="Estado Civil"
                backgroundColor={inputBackground}
                textColor={textColor}
                labelColor={labelColor}
              />
            </View>
          </View>

          <InputBasico
            label="Telefone"
            tipo="number"
            placeholder="(00) 00000-0000"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <InputBasico
            label="Data de Nascimento"
            placeholder="0000-00-00"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <SelectBasico
            label="Estado"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <InputBasico
            label="Cidade"
            placeholder="Ex: São Paulo"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <InputBasico
            label="Logradouro"
            placeholder="Rua..."
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <InputBasico
            label="Bairro"
            placeholder="Bairro..."
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <View style={styles.row}>
            <View style={styles.col}>
              <InputBasico
                label="Número"
                tipo="number"
                placeholder="000"
                backgroundColor={inputBackground}
                textColor={textColor}
                labelColor={labelColor}
              />
            </View>

            <View style={styles.col}>
              <InputBasico
                label="CEP"
                tipo="number"
                placeholder="00000-000"
                backgroundColor={inputBackground}
                textColor={textColor}
                labelColor={labelColor}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Cadastrar" />
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default NovoFuncionario;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  row: {
    flexDirection: 'row',
    gap: 10,
  },

  col: {
    flex: 1,
  },

  buttonContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
});
