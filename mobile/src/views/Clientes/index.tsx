import Nav from '@components/utilities/Nav';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@context/ThemeContext';
import SearchBar from '@components/ui/SearchBar';
import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import TooltipChip from '@components/botoes/TooltipChip';
import { Animated } from 'react-native';
import Cliente, { ClienteType } from '@components/ui-lists/Cliente';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@context/types';

const Clientes = () => {
  const navigation =
      useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const [selectedTipo, setSelectedTipo] = useState<'PF' | 'PJ' | null>(null);
  const [search, setSearch] = useState('');
  const [visibleData, setVisibleData] = useState<ClienteType[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const opacity = useMemo(() => {
    return scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
  }, [scrollY]);

  const headerTranslate = useMemo(() => {
    return scrollY.interpolate({
      inputRange: [0, 120],
      outputRange: [0, -120],
      extrapolate: 'clamp',
    });
  }, [scrollY]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollY.setValue(event.nativeEvent.contentOffset.y);
    },
    [scrollY],
  );

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

  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      const matchTipo = selectedTipo ? item.tipo === selectedTipo : true;
      const matchSearch = search === '' || 
        item.nome.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase());

      return matchTipo && matchSearch;
    });
  }, [allData, selectedTipo, search]);

  useEffect(() => {
    setVisibleData(filteredData.slice(0, 10));
  }, [filteredData]);


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
        subtitle={`${filteredData.length} cadastrados`}
        onBackPress={() => navigation.goBack()}
        rightType="add"
        onAddPress={()=> navigation.navigate('NovoCliente')}
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
          paddingHorizontal: 16, 
        }}
      >
        <SearchBar
          placeholder="Busque pelo nome ou email" 
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
            contentContainerStyle={styles.filtersContent}
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

      {/* FlatList principal */}
      <Animated.FlatList
        data={visibleData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 135 }}
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
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <SearchBar 
              placeholder="Nenhum cliente encontrado" 
              value={search} 
              onChangeText={setSearch}
            />
          </View>
        }
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
  filtersContainer: {
    marginTop: 10,
  },
  filtersContent: {
    paddingHorizontal: 0,
    gap: 8,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
});