import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AlertsSummary: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen de Alertas - Hoy</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#DC2626' }]}>1</Text>
          <Text style={styles.statLabel}>Críticas</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#D97706' }]}>2</Text>
          <Text style={styles.statLabel}>Advertencias</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#0F3460' }]}>2</Text>
          <Text style={styles.statLabel}>Recomendaciones</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F3460',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default AlertsSummary;
