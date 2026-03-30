import Nav from '@components/utilities/Nav';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@context/ThemeContext';
import SearchBar from '@components/ui/SearchBar';
import { useState, useRef, useMemo } from 'react';
import TooltipChip from '@components/botoes/TooltipChip';
import { Animated } from 'react-native';
import Funcionario, { FuncionarioType } from '@components/ui-lists/Funcionario';

const Funcionarios = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

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

  const allData = useMemo<FuncionarioType[]>(
    () => [
      {
        id: '1',
        nome: 'Kennedy Xavier',
        email: 'kennedy@email.com',
        role: 'Gestor',
      },
      {
        id: '2',
        nome: 'João Silva',
        email: 'joao@email.com',
        role: 'Funcionario',
      },
    ],
    [],
  );

  const roles = [
    { id: '1', label: 'Gestor' },
    { id: '2', label: 'Funcionario' },
  ];

  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      const matchSearch =
        item.nome.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase());

      const matchRole = selectedRole ? item.role === selectedRole : true;

      return matchSearch && matchRole;
    });
  }, [allData, search, selectedRole]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Nav
        title="Funcionarios"
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
          placehoder="Buscar por nome ou email"
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.filtersContainer}>
          <FlatList
            data={roles}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 10, gap: 8 }}
            renderItem={({ item }) => {
              const isActive = selectedRole === item.label;

              return (
                <TooltipChip
                  label={item.label}
                  active={isActive}
                  onPress={() =>
                    setSelectedRole((prev) =>
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
          <Funcionario
            nome={item.nome}
            email={item.email}
            role={item.role}
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

export default Funcionarios;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  filtersContainer: {
    marginTop: 10,
  },
});
