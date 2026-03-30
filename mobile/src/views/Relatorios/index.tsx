import React, { useRef, useState, useMemo, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@context/types';
import { useTheme } from '@context/ThemeContext';
import Nav from '@components/utilities/Nav';
import { MetricCard } from '@components/reports/MetricCard';
import { ReportChart } from '@components/reports/ReportChart';
import TooltipChip from '@components/botoes/TooltipChip';
import Button from '@components/botoes/Button';
import { Text } from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'Relatorios'>;
type ReportType = 'movimentacao' | 'orcamentos' | 'clientes' | 'produtos';
type PeriodType = 'hoje' | 'semana' | 'mes' | 'ano';

const periods = [
  { id: 'hoje' as PeriodType, label: 'Hoje' },
  { id: 'semana' as PeriodType, label: 'Semana' },
  { id: 'mes' as PeriodType, label: 'Mês' },
  { id: 'ano' as PeriodType, label: 'Ano' },
];

const reportTypes = [
  { id: 'movimentacao' as ReportType, label: 'Movimentação' },
  { id: 'orcamentos' as ReportType, label: 'Orçamentos' },
  { id: 'clientes' as ReportType, label: 'Clientes' },
  { id: 'produtos' as ReportType, label: 'Produtos' },
];

const Relatorios = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('hoje');
  const [selectedReportType, setSelectedReportType] =
    useState<ReportType>('movimentacao');

  const scrollViewRef = useRef<ScrollView>(null);

  const metricsData = useMemo(() => ({
    faturamento: {
      value: 'R$ 15.300,00',
      change: 12.5,
      icon: 'currency-brl' as const,
    },
    orcamentos: {
      value: '147',
      change: 8.2,
      icon: 'file-document-outline' as const,
    },
    clientes: { value: '348', change: 15.3, icon: 'account-group' as const },
  }), []);

  const chartData = useMemo(() => {
    switch (selectedReportType) {
      case 'movimentacao':
        return {
          data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [{ data: [1200, 1900, 1500, 2200, 2800, 3200, 2500] }],
          },
          total: 'R$ 15.300,00',
        };
      case 'orcamentos':
        return {
          data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [{ data: [12, 19, 15, 22, 28, 32, 25] }],
          },
          total: '147 orçamentos',
        };
      case 'clientes':
        return {
          data: {
            labels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
            datasets: [{ data: [45, 52, 48, 60, 68, 75, 82, 88, 94, 101, 108, 115] }],
          },
          total: '348 clientes',
        };
      case 'produtos':
        return {
          data: [
            { name: 'Produto A', quantity: 35, color: colors.primary, legendFontColor: colors.muted, legendFontSize: 12 },
            { name: 'Produto B', quantity: 28, color: colors.success, legendFontColor: colors.muted, legendFontSize: 12 },
            { name: 'Produto C', quantity: 22, color: '#f59e0b', legendFontColor: colors.muted, legendFontSize: 12 },
            { name: 'Produto D', quantity: 15, color: colors.error, legendFontColor: colors.muted, legendFontSize: 12 },
          ],
          total: '100 unidades',
        };
      default:
        return null;
    }
  }, [selectedReportType, colors]);

  const handlePeriodChange = useCallback((period: PeriodType) => {
    setSelectedPeriod(period);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Nav
        title="Relatórios"
        subtitle="Análise de métricas e indicadores"
        onBackPress={() => navigation.goBack()}
        rightType="download"
      />

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Período
          </Text>

          <FlatList
            data={periods}
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipContainer}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TooltipChip
                label={item.label}
                active={selectedPeriod === item.id}
                onPress={() => handlePeriodChange(item.id)}
              />
            )}
          />
        </View>

        <View style={styles.metricsGrid}>
          <MetricCard {...metricsData.faturamento} title="Faturamento" iconColor={colors.success} />
          <MetricCard {...metricsData.orcamentos} title="Orçamentos" />
          <MetricCard {...metricsData.clientes} title="Clientes" />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Tipo de Relatório
          </Text>

          <FlatList
            data={reportTypes}
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipContainer}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TooltipChip
                label={item.label}
                active={selectedReportType === item.id}
                onPress={() => setSelectedReportType(item.id)}
              />
            )}
          />
        </View>

        {chartData && (
          <ReportChart
            type={selectedReportType}
            data={chartData.data}
            total={chartData.total}
          />
        )}

        <View style={styles.buttonContainer}>
          <Button
            title="Exportar Relatório"
            variant="contained"
            color="primary"
            onPress={() => console.log('Exportando...')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Relatorios;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
    paddingTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 10 ,
    paddingHorizontal: 20,
  },
  chipContainer: {
    gap: 12,
    paddingHorizontal: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
});
