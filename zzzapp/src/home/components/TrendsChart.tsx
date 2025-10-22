import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TrendsChart: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'hoy' | 'semana' | 'mes'>('hoy');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tendencias de Estrés y Recuperación</Text>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={styles.tab}
            onPress={() => setSelectedTab('hoy')}
          >
            <Text style={[styles.tabText, selectedTab === 'hoy' && styles.tabTextActive]}>
              Hoy
            </Text>
            {selectedTab === 'hoy' && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.tab}
            onPress={() => setSelectedTab('semana')}
          >
            <Text style={[styles.tabText, selectedTab === 'semana' && styles.tabTextActive]}>
              Semana
            </Text>
            {selectedTab === 'semana' && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.tab}
            onPress={() => setSelectedTab('mes')}
          >
            <Text style={[styles.tabText, selectedTab === 'mes' && styles.tabTextActive]}>
              Mes
            </Text>
            {selectedTab === 'mes' && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        </View>
      </View>

      {/* Área de la gráfica (vacía por ahora) */}
      <View style={styles.chartArea}>
        <Text style={styles.chartPlaceholder}>Gráfica</Text>
      </View>

      {/* Leyenda */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
          <Text style={styles.legendText}>Nivel de Estrés (%)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.legendText}>HRV - RMSSD (ms)</Text>
        </View>
      </View>

      {/* Análisis de Tendencia */}
      <View style={styles.analysisContainer}>
        <View style={styles.analysisHeader}>
          <MaterialCommunityIcons name="chart-timeline-variant" size={20} color="#0F3460" />
          <Text style={styles.analysisTitle}>Análisis de Tendencia:</Text>
        </View>
        <Text style={styles.analysisText}>
          Tu estado de recuperación es bueno. Mantén este nivel de actividad.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F3460',
    marginBottom: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A0AEC0',
  },
  tabTextActive: {
    color: '#0F3460',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#0F3460',
    borderRadius: 2,
  },
  chartArea: {
    height: 200,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartPlaceholder: {
    fontSize: 14,
    color: '#A0AEC0',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#4A5568',
  },
  analysisContainer: {
    backgroundColor: '#F0F4F8',
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#0F3460',
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  analysisTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F3460',
  },
  analysisText: {
    fontSize: 13,
    color: '#4A5568',
    lineHeight: 20,
  },
});

export default TrendsChart;
