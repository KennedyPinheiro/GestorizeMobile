import Nav from '@components/utilities/Nav';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@context/ThemeContext';
import Orcamento from '@components/ui-lists/Orcamento';
import SearchBar from '@components/ui/SearchBar';
import { useState, useRef } from 'react';
import {} from 'react-native-paper';
import TooltipChip from '@components/botoes/TooltipChip';
import { Animated } from 'react-native';

const Orcamentos = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

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

  const allData = Array.from({ length: 100 }, (_, i) => ({
    id: i.toString(),
    title: `Orçamento ${i}`,
    cliente: `Cliente ${i}`,
    valor: 1000 + i * 50,
  }));

  const [visibleData, setVisibleData] = useState(allData.slice(0, 10));

  const loadMore = () => {
    if (visibleData.length >= allData.length) return;

    const nextItems = allData.slice(
      visibleData.length,
      visibleData.length + 10,
    );

    setVisibleData((prev) => [...prev, ...nextItems]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Nav
        title="Orçamentos"
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
        <SearchBar placehoder="Buque pelo titulo ou cliente" />

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
            renderItem={({ item }) => <TooltipChip label={item.label} />}
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

export default Orcamentos;

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
