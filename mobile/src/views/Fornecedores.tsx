import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import NavBar from '@components/utilities/NavBar';
import BarraAdd from '@components/utilities/BarraAdd';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Fornecedor from '@components/ui-lists/Fornecedor';
import { supabase } from '@lib/supabase';
import { useRoute } from '@react-navigation/native';
import SidebarAlert from '@components/sidebars/Sidebaralert';
import {
  EnderecoTipo,
  FornecedorTipo,
  RootStackParamList,
} from '@context/types';
import ErrorSidebarAlert from '@components/sidebars/ErrorSidebarAlert';
import Nav from '@components/utilities/Nav';
import { formatCNPJ } from '@core/utils/format';

const Fornecedores = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [alertVisible, setAlertVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [erroAlertVisible, setErroAlertVisible] = useState(false);
  const [erroMessage, setErroMessage] = useState('');
  const route = useRoute();
  const isFocused = useIsFocused();
  const [fornecedor, setFornecedor] = useState<FornecedorTipo[]>([]);
  const [endereco, setEndereco] = useState<EnderecoTipo[]>([]);
  const [termoBusca, setTermoBusca] = useState('');

  const buscarEndereco = async () => {
    const { data, error } = await supabase
      .from('endereco')
      .select('id, rua, bairro ,cidade , estado, numero, cep')
      .order('id', { ascending: false });
    if (error) {
      setErroAlertVisible(true);
      setErroMessage(`Erro ao buscar endereço: ${error.message}`);
    } else {
      setEndereco(data);
    }
  };
  const buscarFornecedor = async (termo: string = '') => {
    let query = supabase
      .from('fornecedor')
      .select(
        `
        id,
        razao_social,
        email,
        cnpj,
        ramo_de_atividade,
        telefone,
        endereco_id,
        nome_responsavel,
        chave_pix
      `,
      )
      .order('razao_social', { ascending: true });

    if (termo.trim() !== '') {
      query = query.ilike('razao_social', `%${termo}%`);
    }

    const { data, error } = await query;

    if (error) {
      setErroMessage(`Erro ao buscar fornecedores: ${error.message}`);
      setErroAlertVisible(true);
    } else {
      setFornecedor(data || []);
    }
  };

  useEffect(() => {
    if (isFocused) {
      buscarFornecedor(termoBusca);
      buscarEndereco();

      const params = route?.params as { novoFornecedor?: boolean };
      if (params?.novoFornecedor) {
        setMessage('Fornecedor cadastrado com sucesso!');
        setAlertVisible(true);
        navigation.setParams({ novoFornecedor: undefined });
      }
    }
  }, [isFocused]);

  useEffect(() => {
    const delay = setTimeout(() => {
      buscarFornecedor(termoBusca);
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
        titulo="Fornecedor"
        onBackPress={() => navigation.navigate('Homepage')}
      />

      <BarraAdd
        onPressAdd={() => navigation.navigate('CadastroFornecedores')}
      />
      <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
        <TextInput
          placeholder="Buscar fornecedor por nome"
          placeholderTextColor="#999"
          value={termoBusca}
          onChangeText={setTermoBusca}
          style={styles.inputBusca}
        />
      </View>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {fornecedor.map((item) => {
          const enderecoDoFornecedor = endereco.find(
            (end) => end.id === item.endereco_id,
          );
          const cnpjFormatado = item.cnpj
            ? formatCNPJ(item.cnpj)
            : 'CNPJ não informado';

          return (
            <Fornecedor
              key={item.id}
              nome={item.razao_social}
              email={item.email}
              onPress={() => {
                navigation.navigate('PerfilFornecedor', {
                  id: item.id,
                  razao_social: item.razao_social,
                  email: item.email,
                  cnpj: cnpjFormatado || 'Não informado',
                  nome_responsavel: item.nome_responsavel || 'Não informado',
                  ramo_de_atividade: item.ramo_de_atividade || 'Não informado',
                  telefone: item.telefone || 'Não informado',
                  chave_pix: item.chave_pix || 'Não informado',
                  endereco_id: item.endereco_id,
                  rua: enderecoDoFornecedor?.rua || 'Não informado',
                  bairro: enderecoDoFornecedor?.bairro || 'Não informado',
                  cidade: enderecoDoFornecedor?.cidade || 'Não informado',
                  estado: enderecoDoFornecedor?.estado || 'Não informado',
                  cep: enderecoDoFornecedor?.cep || 'Não informado',
                  numero: enderecoDoFornecedor?.numero || 'Não informado',
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

export default Fornecedores;
