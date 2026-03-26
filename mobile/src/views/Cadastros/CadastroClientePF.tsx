import { ScrollView, View, StyleSheet } from 'react-native';
import EditableTextCard from '@components/EditableTextCard';
import Button from '@components/botoes/Button';
import Nav from '@components/utilities/Nav';

import ErrorSidebarAlert from '@components/sidebars/ErrorSidebarAlert';

import { MenuItem, Select } from '@components/utilities/Select';
import { estadosBrasileiros } from '@components/dialogs/DialogEndereco';

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { supabase } from '@lib/supabase';
import { RootStackParamList } from '@context/types';
import { formatCpf, formatDate, formatRg, formatTelefone } from '@@core/format';
import SidebarAlert from '@components/sidebars/Sidebaralert';

const generos = ['Masculino', 'Feminino', 'Prefiro não dizer'];
const estadosCivis = ['Casado(a)', 'Solteiro(a)', 'Prefiro não dizer'];

const CadastroPessoaFisica = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [nome, setNome] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [genero, setGenero] = useState<string>('');
  const [estadoCivil, setEstadoCivil] = useState<string>('');

  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const [showEnderecoForm, setShowEnderecoForm] = useState(false);
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);
  const [msgSucesso, setMsgSucesso] = useState('');
  const [sucessoVisivel, setSucessoVisivel] = useState(false);
  const [msgErro, setMsgErro] = useState('');
  const [erroVisivel, setErroVisivel] = useState(false);

  const isFormValid = nome.trim() !== '';

  const salvarCliente = async () => {
    if (isLoading) return;
    setIsLoading(true);

    let idEnderecoCriado: number | null = null;
    try {
      if (!nome.trim()) throw new Error('Por favor, informe o nome!');
      if (showEnderecoForm && !rua.trim()) {
        throw new Error('Preencha o endereço ou feche o formulário.');
      }

      if (showEnderecoForm) {
        const { data: endIns, error: errEnd } = await supabase
          .from('endereco')
          .insert([
            {
              rua,
              bairro,
              cidade,
              cep,
              numero,
              estado: estadoSelecionado,
            },
          ])
          .select()
          .single();

        if (errEnd) throw errEnd;
        idEnderecoCriado = endIns.id;
      }

      const { error: errPF } = await supabase.from('pessoa_fisica').insert([
        {
          nome,
          data_nascimento: dataNasc || null,
          cpf: cpf || null,
          rg: rg || null,
          genero: genero || null,
          estado_civil: estadoCivil || null,
          telefone: telefone || null,
          email: email || null,
          endereco_id: idEnderecoCriado,
          data_criacao: new Date().toISOString(),
          ultima_atualizacao: new Date().toISOString(),
        },
      ]);
      if (errPF) throw errPF;

      setMsgSucesso('Cliente salvo com sucesso!');
      setSucessoVisivel(true);
      navigation.navigate('Clientes', { novoCliente: true });
    } catch (e: any) {
      if (idEnderecoCriado) {
        await supabase.from('endereco').delete().eq('id', idEnderecoCriado);
      }
      setMsgErro(`Erro ao salvar cliente: ${e?.message ?? 'Desconhecido'}`);
      setErroVisivel(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SidebarAlert
        message={msgSucesso}
        visible={sucessoVisivel}
        type="success"
        onClose={() => setSucessoVisivel(false)}
      />
      <ErrorSidebarAlert
        message={msgErro}
        visible={erroVisivel}
        onClose={() => setErroVisivel(false)}
      />

      <Nav
        titulo="Pessoa Física"
        onBackPress={() => navigation.navigate('Clientes')}
      />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.formContainer}>
          <EditableTextCard
            label="NOME"
            placeholder="Nome Completo"
            value={nome}
            onChangeText={setNome}
          />
          <EditableTextCard
            label="DATA DE NASCIMENTO"
            tipo="number"
            placeholder="aaaa/mm/dd"
            value={dataNasc}
            onChangeText={(t) => setDataNasc(formatDate(t))}
          />
          <EditableTextCard
            label="CPF"
            tipo="number"
            placeholder="000.000.000-00"
            value={cpf}
            onChangeText={(t) => setCpf(formatDate(t))}
          />
          <EditableTextCard
            label="RG"
            placeholder="00.000.000‑X"
            tipo="number"
            value={rg}
            onChangeText={(t) => setRg(formatRg(t))}
          />
          <View style={{ width: '100%' }}>
            <Select
              width={'100%'}
              label="ESTADO CIVIL"
              value={estadoCivil}
              onChange={setEstadoCivil}
            >
              {estadosCivis.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </View>

          {!showEnderecoForm ? (
            <Button
              title="Endereço"
              variant="outlined"
              type="dialog"
              onPress={() => setShowEnderecoForm(true)}
            />
          ) : (
            <View style={styles.addressBlock}>
              <EditableTextCard
                label="Logradouro"
                value={rua}
                placeholder="Rua/Avenida"
                onChangeText={setRua}
              />
              <EditableTextCard
                label="Bairro"
                value={bairro}
                placeholder="Bairro"
                onChangeText={setBairro}
              />
              <View style={styles.row}>
                <EditableTextCard
                  label="Número"
                  placeholder="000"
                  tipo="number"
                  value={numero}
                  width="48%"
                  onChangeText={setNumero}
                />
                <EditableTextCard
                  label="CEP"
                  tipo="number"
                  placeholder="00000‑000"
                  value={cep}
                  width="48%"
                  onChangeText={setCep}
                />
              </View>
              <EditableTextCard
                label="Cidade"
                value={cidade}
                placeholder="Cidade"
                onChangeText={setCidade}
              />
              <View style={{ width: '100%' }}>
                <Select
                  width={'100%'}
                  label="Estado"
                  value={estadoSelecionado}
                  onChange={setEstadoSelecionado}
                >
                  {estadosBrasileiros.map((uf) => (
                    <MenuItem key={uf} value={uf}>
                      {uf}
                    </MenuItem>
                  ))}
                </Select>
              </View>

              <Button
                title="Fechar endereço"
                variant="outlined"
                type="dialog"
                onPress={() => setShowEnderecoForm(false)}
              />
            </View>
          )}

          <View style={{ width: '100%' }}>
            <Select
              width={'100%'}
              label="GÊNERO"
              value={genero}
              onChange={setGenero}
            >
              {generos.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </Select>
          </View>

          <EditableTextCard
            label="TELEFONE"
            placeholder="(00) 00000‑0000"
            tipo="number"
            value={telefone}
            onChangeText={(t) => setTelefone(formatTelefone(t))}
          />
          <EditableTextCard
            label="EMAIL"
            placeholder="email@exemplo.com"
            value={email}
            onChangeText={setEmail}
          />

          <Button
            title={isLoading ? 'SALVANDO...' : 'SALVAR'}
            variant="contained"
            color="primary"
            disabled={!isFormValid || isLoading}
            type="submit"
            onPress={salvarCliente}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  formContainer: {
    marginTop: 24,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  addressBlock: { width: '100%', alignItems: 'center' },
});

export default CadastroPessoaFisica;
