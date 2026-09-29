import Avatar from '@components/Avatar';
import Nav from '@components/utilities/Nav';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { RootStackParamList } from '@context/types';
import { useTheme } from '@context/ThemeContext';
import EditableTextCard from '@components/EditableTextCard';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

type TipoCliente = 'PF' | 'PJ';

export default function NovoCliente() {
    const navigation = useNavigation<Navigation>();
    const { colors } = useTheme();
    const [tipoCliente, setTipoCliente] = useState<TipoCliente>('PF');
    const [avatar, setAvatar] = useState<string | null>(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [genero, setGenero] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');

    const [cnpj, setCnpj] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [nomeResponsavel, setNomeResponsavel] = useState('');
    const [cpfResponsavel, setCpfResponsavel] = useState('');
    const [cargoResponsavel, setCargoResponsavel] = useState('');

    // Endereço
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');

    const isPF = tipoCliente === 'PF';

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: colors.background },
            ]}
        >
            <Nav
                title="Novo Cliente"
                subtitle={isPF ? 'Pessoa Física' : 'Pessoa Jurídica'}
                onBackPress={() => navigation.goBack()}
                rightType="menu"
            />

            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.avatarContainer}>
                        <Avatar
                            nome={isPF ? nome : nomeFantasia || razaoSocial}
                            imageUri={avatar}
                            size={120}
                            onImageSelected={setAvatar}
                        />

                        <Text
                            style={[
                                styles.avatarLabel,
                                { color: colors.text },
                            ]}
                        >
                            Foto do cliente
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text
                            style={[
                                styles.sectionTitle,
                                { color: colors.text },
                            ]}
                        >
                            Tipo de cliente
                        </Text>

                        <View style={styles.tipoContainer}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[
                                    styles.tipoButton,
                                    {
                                        backgroundColor:
                                            isPF ? '#062046' : colors.surface,
                                    },
                                ]}
                                onPress={() => setTipoCliente('PF')}
                            >
                                <Text
                                    style={[
                                        styles.tipoText,
                                        {
                                            color: isPF ? '#fff' : colors.text,
                                        },
                                    ]}
                                >
                                    Pessoa Física
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[
                                    styles.tipoButton,
                                    {
                                        backgroundColor:
                                            !isPF ? '#062046' : colors.surface,
                                    },
                                ]}
                                onPress={() => setTipoCliente('PJ')}
                            >
                                <Text
                                    style={[
                                        styles.tipoText,
                                        {
                                            color: !isPF ? '#fff' : colors.text,
                                        },
                                    ]}
                                >
                                    Pessoa Jurídica
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text
                            style={[
                                styles.sectionTitle,
                                { color: colors.text },
                            ]}
                        >
                            Dados principais
                        </Text>

                        {isPF ? (
                            <>
                                <EditableTextCard
                                    label="Nome completo"
                                    placeholder="Digite o nome completo"
                                    value={nome}
                                    onChangeText={setNome}
                                />

                                <EditableTextCard
                                    label="CPF"
                                    placeholder="Digite o CPF"
                                    value={cpf}
                                    tipo="number"
                                    onChangeText={setCpf}
                                />

                                <EditableTextCard
                                    label="RG"
                                    placeholder="Digite o RG"
                                    value={rg}
                                    tipo="number"
                                    onChangeText={setRg}
                                />

                                <EditableTextCard
                                    label="Data de nascimento"
                                    placeholder="DD/MM/AAAA"
                                    value={dataNascimento}
                                    onChangeText={setDataNascimento}
                                />

                                <EditableTextCard
                                    label="Gênero"
                                    placeholder="Digite o gênero"
                                    value={genero}
                                    onChangeText={setGenero}
                                />

                                <EditableTextCard
                                    label="Estado civil"
                                    placeholder="Digite o estado civil"
                                    value={estadoCivil}
                                    onChangeText={setEstadoCivil}
                                />
                            </>
                        ) : (
                            <>
                                <EditableTextCard
                                    label="Razão social"
                                    placeholder="Digite a razão social"
                                    value={razaoSocial}
                                    onChangeText={setRazaoSocial}
                                />

                                <EditableTextCard
                                    label="Nome fantasia"
                                    placeholder="Digite o nome fantasia"
                                    value={nomeFantasia}
                                    onChangeText={setNomeFantasia}
                                />

                                <EditableTextCard
                                    label="CNPJ"
                                    placeholder="Digite o CNPJ"
                                    value={cnpj}
                                    tipo="number"
                                    onChangeText={setCnpj}
                                />

                                <EditableTextCard
                                    label="Responsável"
                                    placeholder="Nome do responsável"
                                    value={nomeResponsavel}
                                    onChangeText={setNomeResponsavel}
                                />

                                <EditableTextCard
                                    label="CPF do responsável"
                                    placeholder="CPF do responsável"
                                    value={cpfResponsavel}
                                    tipo="number"
                                    onChangeText={setCpfResponsavel}
                                />

                                <EditableTextCard
                                    label="Cargo do responsável"
                                    placeholder="Cargo do responsável"
                                    value={cargoResponsavel}
                                    onChangeText={setCargoResponsavel}
                                />
                            </>
                        )}
                    </View>

                    <View style={styles.section}>
                        <Text
                            style={[
                                styles.sectionTitle,
                                { color: colors.text },
                            ]}
                        >
                            Contato
                        </Text>

                        <EditableTextCard
                            label="E-mail"
                            placeholder="Digite o e-mail"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <EditableTextCard
                            label="Telefone"
                            placeholder="Digite o telefone"
                            value={telefone}
                            tipo="number"
                            onChangeText={setTelefone}
                        />
                    </View>

                    <View style={styles.section}>
                        <Text
                            style={[
                                styles.sectionTitle,
                                { color: colors.text },
                            ]}
                        >
                            Endereço
                        </Text>

                        <EditableTextCard
                            label="CEP"
                            placeholder="Digite o CEP"
                            value={cep}
                            tipo="number"
                            onChangeText={setCep}
                        />

                        <EditableTextCard
                            label="Rua"
                            placeholder="Digite a rua"
                            value={rua}
                            onChangeText={setRua}
                        />

                        <View style={styles.row}>
                            <EditableTextCard
                                label="Número"
                                placeholder="Número"
                                value={numero}
                                tipo="number"
                                width="48%"
                                onChangeText={setNumero}
                            />

                            <EditableTextCard
                                label="Bairro"
                                placeholder="Bairro"
                                value={bairro}
                                width="48%"
                                onChangeText={setBairro}
                            />
                        </View>

                        <EditableTextCard
                            label="Cidade"
                            placeholder="Digite a cidade"
                            value={cidade}
                            onChangeText={setCidade}
                        />

                        <EditableTextCard
                            label="Estado"
                            placeholder="Digite o estado"
                            value={estado}
                            onChangeText={setEstado}
                        />
                    </View>


                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.saveButton}
                        onPress={() => {
                            console.log({
                                tipo: tipoCliente,
                                avatar,
                                nome,
                                email,
                                telefone,

                                ...(isPF
                                    ? {
                                        cpf,
                                        rg,
                                        data_nascimento: dataNascimento,
                                        genero,
                                        estado_civil: estadoCivil,
                                    }
                                    : {
                                        cnpj,
                                        razao_social: razaoSocial,
                                        nome_fantasia: nomeFantasia,
                                        nome_responsavel: nomeResponsavel,
                                        cpf_responsavel: cpfResponsavel,
                                        cargo_responsavel: cargoResponsavel,
                                    }),

                                endereco: {
                                    cep,
                                    rua,
                                    numero,
                                    bairro,
                                    cidade,
                                    estado,
                                },
                            });
                        }}
                    >
                        <Text style={styles.saveButtonText}>
                            Cadastrar cliente
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    flex: {
        flex: 1,
    },

    content: {
        padding: 16,
        paddingBottom: 40,
    },

    avatarContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 25,
    },

    avatarLabel: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '600',
    },

    section: {
        marginBottom: 15,
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: '800',
        marginBottom: 5,
    },

    tipoContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },

    tipoButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#062046',
    },

    tipoText: {
        fontSize: 15,
        fontWeight: '700',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    saveButton: {
        backgroundColor: '#062046',
        borderRadius: 15,
        paddingVertical: 17,
        alignItems: 'center',
        marginTop: 10,
    },

    saveButtonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '800',
    },
});