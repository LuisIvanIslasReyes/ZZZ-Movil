import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import Header from '../components/Header';
import MetricCard from '../components/MetricCard';
import RecoveryAnalysis from '../components/RecoveryAnalysis';
import StepsCard from '../components/StepsCard';
import TrendsChart from '../components/TrendsChart';
import ShiftSummary from '../components/ShiftSummary';

const HomeScreen: React.FC = () => {
  return (
    <ScrollView 
      style={styles.container}
      bounces={false}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
    >
      <Header />

      <View style={styles.metricsGrid}>
        <MetricCard
          title="Frecuencia Cardíaca"
          value="88"
          unit="BPM"
          iconName="heart-pulse"
          color="#FFC107"
        />
        <MetricCard
          title="Nivel de Actividad"
          value="80"
          unit="%"
          iconName="lightning-bolt"
          color="#4CAF50"
        />
        <MetricCard
          title="Variabilidad FC"
          value="45"
          unit="ms"
          iconName="chart-line"
          color="#81C784"
        />
        <MetricCard
          title="Nivel de Estrés"
          value="Bajo"
          unit=""
          iconName="meditation"
          color="#66BB6A"
        />
      </View>

      <RecoveryAnalysis />

      <StepsCard />

      <TrendsChart />

      <ShiftSummary />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EBF0',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingTop: 16,
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
