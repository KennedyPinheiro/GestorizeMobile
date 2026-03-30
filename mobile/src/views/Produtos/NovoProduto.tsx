import Nav from '@components/utilities/Nav';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import InputBasico from '@components/InputBasico';
import SelectBasico from '@components/SelectBasico';
import Button from '@components/botoes/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useMemo, useState } from 'react';

const NovoProduto = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  
  const [formData, setFormData] = useState({
    nomeProduto: '',
    descricao: '',
    categoria: '',
    dataEntrada: '',
    dataValidade: '',
    quantidade: '',
    medida: '',
    fornecedor: '',
    precoCusto: '',
    margemLucro: '',
  });

  const isDarkTheme = colors.background !== '#ffffff';
  const textColor = isDarkTheme ? '#f1f5f9' : '#0f172a';
  const labelColor = isDarkTheme ? '#cbd5e1' : '#475569';
  const inputBackground = isDarkTheme ? '#ffffff27' : '#f1f5f9';

  const categoriaOptions = useMemo(
    () => [
      { label: 'Alimentos', value: 'alimentos' },
      { label: 'Bebidas', value: 'bebidas' },
      { label: 'Limpeza', value: 'limpeza' },
      { label: 'Higiene', value: 'higiene' },
      { label: 'Eletrônicos', value: 'eletronicos' },
      { label: 'Vestuário', value: 'vestuario' },
      { label: 'Outros', value: 'outros' },
    ],
    [],
  );

  const medidaOptions = useMemo(
    () => [
      { label: 'Unidade', value: 'un' },
      { label: 'Quilograma (kg)', value: 'kg' },
      { label: 'Grama (g)', value: 'g' },
      { label: 'Litro (L)', value: 'l' },
      { label: 'Mililitro (ml)', value: 'ml' },
      { label: 'Caixa', value: 'cx' },
      { label: 'Pacote', value: 'pct' },
      { label: 'Peca', value: 'pc' },
    ],
    [],
  );

  const fornecedorOptions = useMemo(
    () => [
      { label: 'Fornecedor A', value: 'fornecedor_a' },
      { label: 'Fornecedor B', value: 'fornecedor_b' },
      { label: 'Fornecedor C', value: 'fornecedor_c' },
    ],
    [],
  );

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calcularPrecoVenda = () => {
    const precoCusto = parseFloat(formData.precoCusto);
    const margem = parseFloat(formData.margemLucro);
    
    if (!isNaN(precoCusto) && !isNaN(margem)) {
      const precoVenda = precoCusto * (1 + margem / 100);
      return precoVenda.toFixed(2);
    }
    return '';
  };

  const handleSubmit = () => {
    const precoVenda = calcularPrecoVenda();
    const dadosCompletos = {
      ...formData,
      precoVenda,
    };
    console.log('Dados do produto:', dadosCompletos);
    // Aqui você pode adicionar a lógica para salvar o produto
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Nav
        title="Novo Produto"
        subtitle="Cadastre um novo produto no estoque"
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
          <InputBasico
            label="Nome do Produto"
            value={formData.nomeProduto}
            onChangeText={(value) => handleChange('nomeProduto', value)}
            placeholder="Digite o nome do produto"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          <InputBasico
            label="Descrição"
            value={formData.descricao}
            onChangeText={(value) => handleChange('descricao', value)}
            placeholder="Digite a descrição do produto"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
            multiline
            numberOfLines={10}
            textAlignVertical="top"
            style={styles.textArea}
          />

          <SelectBasico
            label="Categoria"
            value={formData.categoria}
            onChange={(value) => handleChange('categoria', value)}
            data={categoriaOptions}
            placeholder="Selecione a categoria"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          {/* Datas */}
          <View style={styles.row}>
            <View style={styles.col}>
              <InputBasico
                label="Data de Entrada"
                value={formData.dataEntrada}
                onChangeText={(value) => handleChange('dataEntrada', value)}
                placeholder="DD/MM/AAAA"
                backgroundColor={inputBackground}
                textColor={textColor}
                labelColor={labelColor}
              />
            </View>

            <View style={styles.col}>
              <InputBasico
                label="Data de Validade"
                value={formData.dataValidade}
                onChangeText={(value) => handleChange('dataValidade', value)}
                placeholder="DD/MM/AAAA"
                backgroundColor={inputBackground}
                textColor={textColor}
                labelColor={labelColor}
              />
            </View>
          </View>

          {/* Quantidade e Medida */}
          <View style={styles.row}>
            <View style={styles.col}>
              <InputBasico
                label="Quantidade"
                tipo="number"
                value={formData.quantidade}
                onChangeText={(value) => handleChange('quantidade', value)}
                placeholder="0"
                backgroundColor={inputBackground}
                textColor={textColor}
                labelColor={labelColor}
              />
            </View>

            <View style={styles.col}>
              <SelectBasico
                label="Unidade de Medida"
                value={formData.medida}
                onChange={(value) => handleChange('medida', value)}
                data={medidaOptions}
                placeholder="Selecione"
                backgroundColor={inputBackground}
                textColor={textColor}
                labelColor={labelColor}
              />
            </View>
          </View>

          {/* Fornecedor */}
          <SelectBasico
            label="Fornecedor"
            value={formData.fornecedor}
            onChange={(value) => handleChange('fornecedor', value)}
            data={fornecedorOptions}
            placeholder="Selecione o fornecedor"
            backgroundColor={inputBackground}
            textColor={textColor}
            labelColor={labelColor}
          />

          {/* Preços */}
          <View style={styles.row}>
            <View style={styles.col}>
              <InputBasico
                label="Preço de Custo (R$)"
                tipo="number"
                value={formData.precoCusto}
                onChangeText={(value) => handleChange('precoCusto', value)}
                placeholder="0,00"
                backgroundColor={inputBackground}
                textColor={textColor}
                labelColor={labelColor}
              />
            </View>

            <View style={styles.col}>
              <InputBasico
                label="Margem de Lucro (%)"
                tipo="number"
                value={formData.margemLucro}
                onChangeText={(value) => handleChange('margemLucro', value)}
                placeholder="0"
                backgroundColor={inputBackground}
                textColor={textColor}
                labelColor={labelColor}
              />
            </View>
          </View>


          <View style={styles.buttonContainer}>
            <Button title="Cadastrar Produto" onPress={handleSubmit} />
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default NovoProduto;

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

  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  precoVendaContainer: {
    marginTop: 16,
    marginBottom: 8,
  },

  precoVendaCard: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },

  precoVendaLabel: {
    fontSize: 14,
    marginBottom: 8,
  },

  precoVendaValor: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  precoVendaObs: {
    fontSize: 12,
  },

  buttonContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
});