import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import NavBar from '@components/utilities/NavBar';
import BarraAdd from '@components/utilities/BarraAdd';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  CategoriaType,
  FornecedorTipo,
  MedidaType,
  ProdutoTipo,
  RootStackParamList,
} from '@context/types';
import SidebarAlert from '@components/sidebars/Sidebaralert';
import ErrorSidebarAlert from '@components/sidebars/ErrorSidebarAlert';
import { supabase } from '@lib/supabase';
import Produto from '@components/ui-lists/Produto'; // componente que exibe nome e preço
import { formatarMedida } from '@@core/format';
import Nav from '@components/utilities/Nav';

const Produtos = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [alertVisible, setAlertVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [erroAlertVisible, setErroAlertVisible] = useState(false);
  const [erroMessage, setErroMessage] = useState('');
  const route = useRoute();
  const isFocused = useIsFocused();
  const [produto, setProduto] = useState<ProdutoTipo[]>([]);
  const [tituloCategoria, setTituloCategoria] = useState<CategoriaType[]>([]);
  const [tituloMedida, setTituloMedida] = useState<MedidaType[]>([]);
  const [fornecedor, setFornecedor] = useState<FornecedorTipo[]>([]);
  const [termoBusca, setTermoBusca] = useState('');

  const buscarCategoria = async () => {
    const { data, error } = await supabase
      .from('categorias')
      .select(
        `
      id,
      titulo,
      descricao
    `,
      )
      .order('id', { ascending: false });
    if (error) {
      setErroMessage(`Erro ao buscar titulo da categoria: ${error.message}`);
      setErroAlertVisible(true);
    } else {
      setTituloCategoria(data || []);
    }
  };
  const buscarFornecedor = async () => {
    const { data, error } = await supabase
      .from('fornecedor')
      .select(
        'id, razao_social, email ,cnpj, ramo_de_atividade, telefone, endereco_id, nome_responsavel,chave_pix',
      )
      .order('id', { ascending: false });

    if (error) {
      setErroMessage(`Erro ao buscar fornecedores: ${error.message}`);
      setErroAlertVisible(true);
    } else {
      setFornecedor(data || []);
    }
  };
  const buscarProduto = async (termo: string = '') => {
    let query = supabase
      .from('produtos')
      .select(
        `
        id,
        nome,
        descricao,
        quantidade,
        medida_id,
        categoria_id,
        data_validade,
        preco_custo,
        data_de_entrada,
        margem_lucro,
        fornecedor_id
      `,
      )
      .order('nome', { ascending: true });

    if (termo.trim() !== '') {
      query = query.ilike('nome', `%${termo}%`);
    }

    const { data, error } = await query;

    if (error) {
      setErroMessage(`Erro ao buscar produtos: ${error.message}`);
      setErroAlertVisible(true);
    } else {
      setProduto(data || []);
    }
  };

  const buscarMedida = async () => {
    const { data, error } = await supabase
      .from('medidas')
      .select('id, titulo')
      .order('id', { ascending: false });
    if (error) {
      setErroMessage(`Erro ao buscar titulo da categoria: ${error.message}`);
      setErroAlertVisible(true);
    } else {
      setTituloMedida(data || []);
    }
  };

  useEffect(() => {
    if (isFocused) {
      buscarProduto(termoBusca);
      buscarCategoria();
      buscarMedida();
      buscarFornecedor();

      const params = route?.params as { novoProduto?: boolean };
      if (params?.novoProduto) {
        setMessage('Produto cadastrado com sucesso!');
        setAlertVisible(true);
        navigation.setParams({ novoProduto: undefined });
      }
    }
  }, [isFocused]);
  useEffect(() => {
    const delay = setTimeout(() => {
      buscarProduto(termoBusca);
    }, 400);

    return () => clearTimeout(delay);
  }, [termoBusca]);

  return (
    <View style={styles.container}>
      <SidebarAlert
        message={message}
        visible={alertVisible}
        type="success"
        onClose={() => setAlertVisible(false)}
      />
      <ErrorSidebarAlert
        message={erroMessage}
        visible={erroAlertVisible}
        onClose={() => setErroAlertVisible(false)}
      />
      <Nav
        titulo="Produtos"
        onBackPress={() => navigation.navigate('Homepage')}
      />

      <BarraAdd onPressAdd={() => navigation.navigate('CadastroProdutos')} />
      <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
        <TextInput
          placeholder="Buscar produto por nome"
          placeholderTextColor="#999"
          value={termoBusca}
          onChangeText={setTermoBusca}
          style={styles.inputBusca}
        />
      </View>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {produto.map((item) => {
          const categoriaEncontrada = tituloCategoria.find(
            (cat) => cat.id === item.categoria_id,
          );

          const medidaEncontrada = tituloMedida.find(
            (medida) => medida.id === item.medida_id,
          );

          const medidaFormatada = medidaEncontrada
            ? formatarMedida(medidaEncontrada.titulo)
            : 'UN';
          return (
            <Produto
              key={item.id}
              nome={item.nome}
              categoria={categoriaEncontrada?.titulo}
              quantidade={item.quantidade}
              medida={medidaFormatada}
              onPress={() => {
                const fornecedorEncontrado = fornecedor.find(
                  (f) => f.id === item.fornecedor_id,
                );

                navigation.navigate('PerfilProduto', {
                  id: item.id,
                  nome: item.nome,
                  quantidade: item.quantidade ?? 0,
                  medida_id: item.medida_id,
                  medida_titulo: medidaEncontrada?.titulo ?? 'Não Informado',
                  categoria_titulo:
                    categoriaEncontrada?.titulo ?? 'Não Informado',
                  descricao: item.descricao ?? '',
                  data_validade: item.data_validade,
                  preco_custo: item.preco_custo ?? 0,
                  data_de_entrada: item.data_de_entrada,
                  categoria_id: item.categoria_id,
                  margem_lucro: item.margem_lucro ?? 0,
                  fornecedor_razao_social:
                    fornecedorEncontrado?.razao_social ?? 'Não Informado',
                  fornecedor_id: item.fornecedor_id,
                });
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  barraBuscaContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },

  inputBusca: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
});

export default Produtos;
