import Nav from '@components/utilities/Nav';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@context/ThemeContext';
import SearchBar from '@components/ui/SearchBar';
import { useState, useRef, useMemo } from 'react';
import TooltipChip from '@components/botoes/TooltipChip';
import { Animated } from 'react-native';
import Fornecedor from '@components/ui-lists/Fornecedor';

const Fornecedores = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [search, setSearch] = useState('');
  const [selectedTipo, setSelectedTipo] = useState<string | null>(null);

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
        nome: 'Tech Distribuidora',
        email: 'contato@tech.com',
        local: 'São Paulo - SP',
        tipo: 'Distribuidor',
      },
      {
        id: '2',
        nome: 'Fábrica Brasil',
        email: 'vendas@fabrica.com',
        local: 'Belo Horizonte - MG',
        tipo: 'Fabricante',
      },
      {
        id: '3',
        nome: 'Importadora Global',
        email: 'import@global.com',
        local: 'Rio de Janeiro - RJ',
        tipo: 'Importador',
      },
      {
        id: '4',
        nome: 'Atacado Express',
        email: 'contato@atacado.com',
        local: 'Salvador - BA',
        tipo: 'Distribuidor',
      },
    ],
    [],
  );

  const tipos = useMemo(() => {
    const unique = Array.from(new Set(allData.map((item) => item.tipo)));
    return unique.map((tipo, index) => ({
      id: index.toString(),
      label: tipo,
    }));
  }, [allData]);

  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      const matchSearch =
        item.nome.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.local.toLowerCase().includes(search.toLowerCase());

      const matchTipo = selectedTipo ? item.tipo === selectedTipo : true;

      return matchSearch && matchTipo;
    });
  }, [allData, search, selectedTipo]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Nav
        title="Fornecedores"
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
          placehoder="Buscar por nome, email ou local"
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.filtersContainer}>
          <FlatList
            data={tipos}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 10, gap: 8 }}
            renderItem={({ item }) => {
              const isActive = selectedTipo === item.label;

              return (
                <TooltipChip
                  label={item.label}
                  active={isActive}
                  onPress={() =>
                    setSelectedTipo((prev) =>
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
          <Fornecedor
            nome={item.nome}
            email={item.email}
            local={item.local}
            tipo={item.tipo}
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

export default Fornecedores;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  filtersContainer: {
    marginTop: 10,
  },
});
