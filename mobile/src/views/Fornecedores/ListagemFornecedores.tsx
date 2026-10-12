import { useCallback, useMemo, useRef, useState } from 'react';
import {
    Animated,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    View,
} from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Nav from '@components/utilities/Nav';
import SearchBar from '@components/ui/SearchBar';
import Fornecedor from '@components/ui-lists/Fornecedor';

import { useTheme } from '@context/ThemeContext';
import { FornecedorType, RootStackParamList } from '@context/types';
import { getFornecedores } from '@api/apiFornecedores';

import Toast from 'react-native-toast-message';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

const Fornecedores = () => {
    const navigation = useNavigation<Navigation>();
    const { colors } = useTheme();

    const [fornecedores, setFornecedores] = useState<FornecedorType[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const scrollY = useRef(new Animated.Value(0)).current;

    const carregarFornecedores = useCallback(async () => {
        try {
            setLoading(true);

            const response = await getFornecedores();

            setFornecedores(response.data);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao carregar fornecedores',
                text2: 'Não foi possível carregar a lista.',
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarFornecedores();
        }, [carregarFornecedores]),
    );

    const filteredData = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();
        const normalizedNumbers = search.replace(/\D/g, '');

        return fornecedores.filter((item) => {
            if (!normalizedSearch) {
                return true;
            }

            const matchNome = item.nome
                .toLowerCase()
                .includes(normalizedSearch);

            const matchEmail = item.email
                ?.toLowerCase()
                .includes(normalizedSearch);

            const matchCnpj =
                normalizedNumbers.length > 0 &&
                item.cnpj.replace(/\D/g, '').includes(normalizedNumbers);

            const matchRamo = item.ramo_atividade
                ?.toLowerCase()
                .includes(normalizedSearch);

            const matchResponsavel = item.nome_responsavel
                ?.toLowerCase()
                .includes(normalizedSearch);

            return (
                matchNome ||
                matchEmail ||
                matchCnpj ||
                matchRamo ||
                matchResponsavel
            );
        });
    }, [fornecedores, search]);

    const opacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const headerTranslate = scrollY.interpolate({
        inputRange: [0, 120],
        outputRange: [0, -120],
        extrapolate: 'clamp',
    });

    const handleScroll = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            scrollY.setValue(event.nativeEvent.contentOffset.y);
        },
        [scrollY],
    );

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            <Nav
                title="Fornecedores"
                subtitle={`${fornecedores.length} cadastrados`}
                onBackPress={() => navigation.goBack()}
                rightType="add"
                onAddPress={() =>
                    navigation.navigate('NovoFornecedor', {
                        modo: 'criar',
                    })
                }
            />

            <Animated.View
                pointerEvents="box-none"
                style={[
                    styles.headerFilters,
                    {
                        transform: [{ translateY: headerTranslate }],
                        opacity,
                    },
                ]}
            >
                <SearchBar
                    placeholder="Busque por nome, CNPJ ou e-mail"
                    value={search}
                    onChangeText={setSearch}
                />
            </Animated.View>

            <Animated.FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={carregarFornecedores}
                renderItem={({ item }) => (
                    <Fornecedor
                        nome={item.nome}
                        email={item.email}
                        avatar={item.avatar_url}
                        onPress={() =>
                            navigation.navigate('NovoFornecedor', {
                                modo: 'editar',
                                fornecedorId: item.id,
                            })
                        }
                    />
                )}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                removeClippedSubviews
            />
        </View>
    );
};

export default Fornecedores;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerFilters: {
        position: 'absolute',
        top: 140,
        left: 0,
        right: 0,
        marginTop: 12,
        zIndex: 10,
    },

    listContent: {
        padding: 10,
        paddingTop: 135,
        flexGrow: 1,
    },
});