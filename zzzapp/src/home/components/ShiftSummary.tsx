import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ShiftSummary: React.FC = () => {
  return (
    <LinearGradient
      colors={['#0F3460', '#1e5a8e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>Resumen del Turno</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>7.5h</Text>
          <Text style={styles.statLabel}>Tiempo trabajado</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>Pausas tomadas</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>Bueno</Text>
          <Text style={styles.statLabel}>Estado general</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 12,
    marginVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 12,
    color: '#B8D4E8',
    textAlign: 'center',
  },
});

export default ShiftSummary;
