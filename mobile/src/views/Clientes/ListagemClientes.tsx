import { useCallback, useMemo, useRef, useState } from 'react'
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Nav from '@components/utilities/Nav';
import SearchBar from '@components/ui/SearchBar';
import TooltipChip from '@components/botoes/TooltipChip';
import Cliente from '@components/ui-lists/Cliente';
import { useTheme } from '@context/ThemeContext';
import { ClienteType, RootStackParamList } from '@context/types';
import { getClientes } from '@api/apiClientes';


type Navigation = NativeStackNavigationProp<RootStackParamList>;

const tiposCliente = [
  {
    id: 'PF',
    label: 'Pessoa Física',
  },
  {
    id: 'PJ',
    label: 'Pessoa Jurídica',
  },
] as const;

const Clientes = () => {
  const navigation = useNavigation<Navigation>();
  const { colors } = useTheme();

  const [clientes, setClientes] = useState<ClienteType[]>([]);
  const [selectedTipo, setSelectedTipo] = useState<'PF' | 'PJ' | null>(
    null,
  );
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const scrollY = useRef(new Animated.Value(0)).current;

  const carregarClientes = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getClientes();

      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarClientes();
    }, [carregarClientes]),
  );

  const filteredData = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return clientes.filter((item) => {
      const matchTipo = selectedTipo
        ? item.tipo.toUpperCase() === selectedTipo
        : true;

      const matchSearch =
        !normalizedSearch ||
        item.nome.toLowerCase().includes(normalizedSearch) ||
        item?.email?.toLowerCase().includes(normalizedSearch);

      return matchTipo && matchSearch;
    });
  }, [clientes, search, selectedTipo]);

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

  const handleTipoPress = useCallback((tipo: 'PF' | 'PJ') => {
    setSelectedTipo((previous) =>
      previous === tipo ? null : tipo,
    );
  }, []);

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
        title="Clientes"
        subtitle={`${clientes.length} cadastrados`}
        onBackPress={() => navigation.goBack()}
        rightType="add"
        onAddPress={() => navigation.navigate("NovoCliente", {
          modo: "criar",
        })}
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
          placeholder="Busque por nome ou e-mail"
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.filtersContainer}>
          <FlatList
            data={tiposCliente}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.filtersContent}
            renderItem={({ item }) => {
              const isActive = selectedTipo === item.id;

              return (
                <TooltipChip
                  label={item.label}
                  active={isActive}
                  onPress={() => handleTipoPress(item.id)}
                />
              );
            }}
          />
        </View>
      </Animated.View>

      <Animated.FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={carregarClientes}
        renderItem={({ item }) => (
          <Cliente
            tipo={item.tipo.toUpperCase() as 'PF' | 'PJ'}
            nome={item.nome}
            email={item.email}
            onPress={() => navigation.navigate("NovoCliente", {
              modo: "editar",
            })}
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

export default Clientes;

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

  filtersContainer: {
    marginTop: 10,
  },

  filtersContent: {
    paddingHorizontal: 10,
    gap: 8,
  },

  listContent: {
    padding: 10,
    paddingTop: 135,
  },
});