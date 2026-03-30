import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';

type ReportType = 'movimentacao' | 'orcamentos' | 'clientes' | 'produtos';

type ReportTypeSelectorProps = {
  selectedType: ReportType;
  onSelect: (type: ReportType) => void;
};

export const ReportTypeSelector = ({
  selectedType, 
  onSelect,
}: ReportTypeSelectorProps) => {
  const { colors, isDark } = useTheme();

  const reportTypes = [
    {
      id: 'movimentacao' as ReportType,
      label: 'Movimentação',
      icon: 'swap-vertical' as const,
    },
    {
      id: 'orcamentos' as ReportType,
      label: 'Orçamentos',
      icon: 'file-document-outline' as const,
    },
    {
      id: 'clientes' as ReportType,
      label: 'Clientes',
      icon: 'account-group' as const,
    },
    {
      id: 'produtos' as ReportType,
      label: 'Produtos',
      icon: 'package-variant' as const,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {reportTypes.map((type) => {
          const isSelected = selectedType === type.id;
          
          return (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.button,
                {
                  backgroundColor: isSelected
                    ? isDark
                      ? colors.surface
                      : colors.primary 
                    : isDark
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.05)',
                  borderColor: colors.border,
                  borderWidth: isSelected && isDark ? 2 : 1,
                },
              ]}
              onPress={() => onSelect(type.id)}
            >
              <MaterialCommunityIcons
                name={type.icon}
                size={20}
                color={isSelected 
                  ? (isDark ? colors.primary : '#fff')
                  : colors.text
                }
              />
              <Text
                style={[
                  styles.label,
                  { 
                    color: isSelected 
                      ? (isDark ? colors.primary : '#fff')
                      : colors.text,
                    fontWeight: isSelected ? '700' : '600',
                  },
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 140,
  },
  label: {
    fontSize: 14,
  },
});