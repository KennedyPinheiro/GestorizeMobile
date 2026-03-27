import Nav from '@components/utilities/Nav';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@context/ThemeContext';
import Orcamento from '@components/ui-lists/Orcamento';
import SearchBar from '@components/ui/SearchBar';
import { useState, useRef, useMemo, useEffect } from 'react';
import {} from 'react-native-paper';
import TooltipChip from '@components/botoes/TooltipChip';
import { Animated } from 'react-native';

const Produtos = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

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

  const allData = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        id: i.toString(),
        title: `Orçamento ${i}`,
        cliente: `Cliente ${i}`,
        valor: 1000 + i * 50,
        data: new Date(Date.now() - i * 86400000),
      })),
    [],
  );
  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.cliente.toLowerCase().includes(search.toLowerCase());

      let matchFilter = true;

      if (selectedFilter === '1') {
        matchFilter = Date.now() - item.data.getTime() <= 24 * 60 * 60 * 1000;
      }

      if (selectedFilter === '2') {
        matchFilter =
          Date.now() - item.data.getTime() <= 7 * 24 * 60 * 60 * 1000;
      }

      if (selectedFilter === '3') {
        const now = new Date();
        matchFilter =
          item.data.getMonth() === now.getMonth() &&
          item.data.getFullYear() === now.getFullYear();
      }

      return matchSearch && matchFilter;
    });
  }, [allData, search, selectedFilter]);

  const sortedData = useMemo(() => {
    const data = [...filteredData];
    if (selectedFilter === '4') {
      return data.sort((a, b) => b.valor - a.valor);
    }
    if (selectedFilter === '5') {
      return data.sort((a, b) => a.valor - b.valor);
    }

    return data;
  }, [filteredData, selectedFilter]);
  const [visibleData, setVisibleData] = useState(sortedData.slice(0, 10));

  const loadMore = () => {
    if (visibleData.length >= sortedData.length) return;

    const nextItems = sortedData.slice(
      visibleData.length,
      visibleData.length + 10,
    );

    setVisibleData((prev) => [...prev, ...nextItems]);
  };

  useEffect(() => {
    setVisibleData(sortedData.slice(0, 10));
  }, [sortedData]);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Nav
        title="Produtos"
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
              { id: '1', label: 'Últimas 24h' },
              { id: '2', label: 'Últimos 7 dias' },
              { id: '3', label: 'Este mês' },
              { id: '4', label: 'Maior valor' },
              { id: '5', label: 'Menor valor' },
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 10, gap: 8 }}
            renderItem={({ item }) => {
              const isActive = selectedFilter === item.id;

              return (
                <TooltipChip
                  label={item.label}
                  active={isActive}
                  onPress={() =>
                    setSelectedFilter((prev) =>
                      prev === item.id ? null : item.id,
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
          <Orcamento
            title={item.title}
            cliente={item.cliente}
            valor={item.valor}
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

export default Produtos;

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
