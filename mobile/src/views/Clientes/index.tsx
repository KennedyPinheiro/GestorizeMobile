import Nav from '@components/utilities/Nav';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@context/ThemeContext';
import Orcamento from '@components/ui-lists/Orcamento';
import SearchBar from '@components/ui/SearchBar';
import { useState, useRef, useEffect, useMemo } from 'react';
import {} from 'react-native-paper';
import TooltipChip from '@components/botoes/TooltipChip';
import { Animated } from 'react-native';
import Cliente, { ClienteType } from '@components/ui-lists/Cliente';

const Clientes = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [selectedTipo, setSelectedTipo] = useState<'PF' | 'PJ' | null>(null);
  const [search, setSearch] = useState('');

  const scrollY = useRef(new Animated.Value(0)).current;
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

  const allData = useMemo<ClienteType[]>(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        id: i.toString(),
        nome: `Cliente ${i}`,
        email: `cliente${i}@exemplo.com`,
        estado: `Minas Gerais - MG`,
        tipo: i % 2 === 0 ? 'PF' : 'PJ',
      })),
    [],
  );

  const filteredData = allData.filter((item) => {
    const matchTipo = selectedTipo ? item.tipo === selectedTipo : true;

    const matchSearch =
      item.nome.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase());

    return matchTipo && matchSearch;
  });
  const [visibleData, setVisibleData] = useState(filteredData.slice(0, 10));

  useEffect(() => {
    setVisibleData(filteredData.slice(0, 10));
  }, [selectedTipo, search]);

  const loadMore = () => {
    if (visibleData.length >= filteredData.length) return;

    const nextItems = filteredData.slice(
      visibleData.length,
      visibleData.length + 10,
    );

    setVisibleData((prev) => [...prev, ...nextItems]);
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Nav
        title="Clientes"
        subtitle="100 cadastrados"
        onBackPress={() => navigation.goBack()}
        rightType="add"
      />
      <Animated.View
        pointerEvents="box-none"
        style={{
          position: 'absolute',
          marginTop: 12,
          top: 140,
          left: 0,
          right: 0,
          transform: [{ translateY: headerTranslate }],
          opacity,
          zIndex: 10,
        }}
      >
        <SearchBar
          placehoder="Buque pelo titulo ou cliente"
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.filtersContainer}>
          <FlatList
            data={[
              { id: 'PF', label: 'Pessoa Física' },
              { id: 'PJ', label: 'Pessoa Jurídica' },
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 10, gap: 8 }}
            renderItem={({ item }) => {
              const isActive = selectedTipo === item.id;

              return (
                <TooltipChip
                  label={item.label}
                  active={isActive}
                  onPress={() =>
                    setSelectedTipo((prev) =>
                      prev === item.id ? null : (item.id as 'PF' | 'PJ'),
                    )
                  }
                />
              );
            }}
          />
        </View>
      </Animated.View>
      <Animated.FlatList
        data={visibleData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10, paddingTop: 135 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Cliente
            tipo={item.tipo}
            nome={item.nome}
            email={item.email}
            estado={item.estado}
          />
        )}
        onEndReached={loadMore}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default Clientes;

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
  filtersContainer: {
    marginTop: 10,
  },
});
