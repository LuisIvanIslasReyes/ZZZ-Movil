import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RecoveryAnalysis: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="clock-outline" size={20} color="#0F3460" />
        <Text style={styles.title}>Análisis de Recuperación</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.item}>
          <Text style={styles.label}>HRV (RMSSD)</Text>
          <Text style={[styles.value, { color: '#22C55E' }]}>45ms</Text>
          <Text style={styles.description}>Óptimo</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Estrés</Text>
          <Text style={[styles.value, { color: '#10B981' }]}>Bajo</Text>
          <Text style={styles.description}>25%</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Recuperación</Text>
          <Text style={[styles.value, { color: '#14B8A6' }]}>Buena</Text>
          <Text style={styles.description}>Estado general</Text>
        </View>
      </View>
      
      {/* Sección de ayuda dentro del mismo contenedor */}
      <View style={styles.helpSection}>
        <View style={styles.helpHeader}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="lightbulb-on" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.helpQuestion}>¿Qué significa esto?</Text>
        </View>
        <View style={styles.helpContent}>
          <Text style={styles.helpDescription}>
            <Text style={styles.bold}>HRV (Variabilidad FC):</Text> Mide qué tan bien se recupera tu cuerpo del estrés. Valores más altos indican mejor estado de recuperación.
            <Text style={styles.bold}> RMSSD {'>'} 40ms</Text> es considerado bueno para trabajadores industriales.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3460',
    marginLeft: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 8,
    fontWeight: '600',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  description: {
    fontSize: 11,
    color: '#718096',
  },
  helpSection: {
    backgroundColor: '#F0F4F8',
    borderRadius: 10,
    padding: 14,
    marginTop: 8,
  },
  helpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0F3460',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  helpQuestion: {
    fontSize: 14,
    color: '#0F3460',
    fontWeight: '700',
    flex: 1,
  },
  helpContent: {
    paddingLeft: 42,
  },
  helpDescription: {
    fontSize: 13,
    color: '#4A5568',
    lineHeight: 20,
  },
  bold: {
    fontWeight: '700',
    color: '#0F3460',
  },
});

export default RecoveryAnalysis;
