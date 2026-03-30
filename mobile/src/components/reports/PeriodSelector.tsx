import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import TooltipChip from '@components/botoes/TooltipChip';
import { useTheme } from '@context/ThemeContext';

type PeriodType = 'hoje' | 'semana' | 'mes' | 'ano';

type PeriodSelectorProps = {
  selectedPeriod: PeriodType;
  onSelect: (period: PeriodType) => void;
};

const periods = [
  { id: 'hoje' as PeriodType, label: 'Hoje' },
  { id: 'semana' as PeriodType, label: 'Semana' },
  { id: 'mes' as PeriodType, label: 'Mês' },
  { id: 'ano' as PeriodType, label: 'Ano' },
];

export const PeriodSelector = ({ selectedPeriod, onSelect }: PeriodSelectorProps) => {
  const { colors, isDark } = useTheme();
  
  return (
    <FlatList
      data={periods}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TooltipChip
          label={item.label}
          active={selectedPeriod === item.id}
          onPress={() => onSelect(item.id)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingHorizontal: 20,
  },
});