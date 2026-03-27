import Nav from '@components/utilities/Nav';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@context/ThemeContext';
import SearchBar from '@components/ui/SearchBar';
import { useState, useRef, useMemo } from 'react';
import TooltipChip from '@components/botoes/TooltipChip';
import { Animated } from 'react-native';
import Produto from '@components/ui-lists/Produto';

const Produtos = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
    () => [
      {
        id: '1',
        title: 'Notebook Dell',
        categoria: 'Eletrônicos',
        valor: 4200,
        estoque: 12,
        unidade: 'un',
      },
      {
        id: '2',
        title: 'Mouse Gamer',
        categoria: 'Eletrônicos',
        valor: 150,
        estoque: 50,
        unidade: 'un',
      },
      {
        id: '3',
        title: 'Camiseta Nike',
        categoria: 'Roupas',
        valor: 120,
        estoque: 30,
        unidade: 'un',
      },
      {
        id: '4',
        title: 'Tênis Adidas',
        categoria: 'Calçados',
        valor: 350,
        estoque: 8,
        unidade: 'un',
      },
      {
        id: '5',
        title: 'Mesa de Escritório',
        categoria: 'Móveis',
        valor: 800,
        estoque: 5,
        unidade: 'un',
      },
    ],
    [],
  );

  const categories = useMemo(() => {
    const unique = Array.from(new Set(allData.map((item) => item.categoria)));
    return unique.map((cat, index) => ({
      id: index.toString(),
      label: cat,
    }));
  }, [allData]);

  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.categoria.toLowerCase().includes(search.toLowerCase());

      const matchCategory = selectedCategory
        ? item.categoria === selectedCategory
        : true;

      return matchSearch && matchCategory;
    });
  }, [allData, search, selectedCategory]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Nav
        title="Produtos"
        subtitle={`${filteredData.length} cadastrados`}
        onBackPress={() => navigation.goBack()}
        rightType="add"
      />

      <Animated.View
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
          placehoder="Buscar por nome ou categoria"
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.filtersContainer}>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 10, gap: 8 }}
            renderItem={({ item }) => {
              const isActive = selectedCategory === item.label;

              return (
                <TooltipChip
                  label={item.label}
                  active={isActive}
                  onPress={() =>
                    setSelectedCategory((prev) =>
                      prev === item.label ? null : item.label,
                    )
                  }
                />
              );
            }}
          />
        </View>
      </Animated.View>

      <Animated.FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10, paddingTop: 135 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Produto
            title={item.title}
            categoria={item.categoria}
            valor={item.valor}
            estoque={item.estoque}
            unidade={item.unidade}
            onPress={() => console.log(item)}
          />
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default Produtos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  filtersContainer: {
    marginTop: 10,
  },
});
