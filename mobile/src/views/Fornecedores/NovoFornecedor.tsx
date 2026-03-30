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
import { useMemo, useState } from 'react';

const NovoFornecedor = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [formData, setFormData] = useState({
    razaoSocial: '',
    cnpj: '',
    ramoAtividade: '',
    telefone: '',
    email: '',
    chavePix: '',
    tipo: '',
    estado: '',
    cidade: '',
    logradouro: '',
    bairro: '',
    numero: '',
    cep: '',
  });

  const isDarkTheme = colors.background !== '#ffffff';
  const textColor = isDarkTheme ? '#f1f5f9' : '#0f172a';
  const labelColor = isDarkTheme ? '#cbd5e1' : '#475569';
  const inputBackground = isDarkTheme ? '#ffffff27' : '#f1f5f9';

  const tipoOptions = useMemo(
    () => [
      { label: 'Serviços', value: 'servicos' },
      { label: 'Produtos', value: 'produtos' },
      { label: 'Ambos', value: 'ambos' },
    ],
    [],
  );

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Dados do fornecedor:', formData);
    // Aqui você pode adicionar a lógica para salvar o fornecedor
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Nav
        title="Novo Fornecedor"
        subtitle="Cadastre um novo fornecedor"
        onBackPress={() => navigation.goBack()}
        rightType="menu"
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          enableOnAndroid
          extraScrollHeight={120}
          keyboardShouldPersistTaps="handled"
        >
          {/* Dados do Fornecedor */}
          <InputBasico
            label="Razão Social"
            value={formData.razaoSocial}
            onChangeText={(value) => handleChange('razaoSocial', value)}
            placeholder="Digite a razão social"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <InputBasico
            label="CNPJ"
            tipo="number"
            value={formData.cnpj}
            onChangeText={(value) => handleChange('cnpj', value)}
            placeholder="00.000.000/0000-00"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <InputBasico
            label="Ramo de Atividade"
            value={formData.ramoAtividade}
            onChangeText={(value) => handleChange('ramoAtividade', value)}
            placeholder="Ex: Comércio, Indústria, Serviços"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <SelectBasico
            label="Tipo"
            value={formData.tipo}
            onChange={(value) => handleChange('tipo', value)}
            data={tipoOptions}
            placeholder="Selecione o tipo"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <InputBasico
            label="Telefone"
            tipo="number"
            value={formData.telefone}
            onChangeText={(value) => handleChange('telefone', value)}
            placeholder="(00) 00000-0000"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <InputBasico
            label="Email"
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
            placeholder="fornecedor@email.com"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <InputBasico
            label="Chave PIX"
            value={formData.chavePix}
            onChangeText={(value) => handleChange('chavePix', value)}
            placeholder="CPF, CNPJ, Email, Telefone ou aleatória"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          {/* Endereço */}
          <SelectBasico
            label="Estado"
            value={formData.estado}
            onChange={(value) => handleChange('estado', value)}
            placeholder="Selecione o estado"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <InputBasico
            label="Cidade"
            value={formData.cidade}
            onChangeText={(value) => handleChange('cidade', value)}
            placeholder="Ex: São Paulo"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <InputBasico
            label="Logradouro"
            value={formData.logradouro}
            onChangeText={(value) => handleChange('logradouro', value)}
            placeholder="Rua, Avenida, etc."
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <InputBasico
            label="Bairro"
            value={formData.bairro}
            onChangeText={(value) => handleChange('bairro', value)}
            placeholder="Bairro"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <View style={styles.row}>
            <View style={styles.col}>
              <InputBasico
                label="Número"
                tipo="number"
                value={formData.numero}
                onChangeText={(value) => handleChange('numero', value)}
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
                value={formData.cep}
                onChangeText={(value) => handleChange('cep', value)}
                placeholder="00000-000"
                backgroundColor={inputBackground}
                textColor={textColor}
                labelColor={labelColor}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Cadastrar Fornecedor" onPress={handleSubmit} />
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default NovoFornecedor;

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
