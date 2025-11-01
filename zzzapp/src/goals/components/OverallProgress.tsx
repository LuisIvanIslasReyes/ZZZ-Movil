import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Goal } from '../services/goalsService';

interface OverallProgressProps {
  goals: Goal[];
}

const OverallProgress: React.FC<OverallProgressProps> = ({ goals }) => {
  // Calcular metas en progreso (no completadas)
  const goalsInProgress = goals.filter(goal => !goal.is_completed).length;
  
  // Calcular porcentaje promedio
  const averageProgress = goals.length > 0
    ? goals.reduce((sum, goal) => sum + parseFloat(goal.progress_percentage.toString()), 0) / goals.length
    : 0;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Text style={styles.title}>Progreso General</Text>
          <Text style={styles.subtitle}>
            {goalsInProgress} de {goals.length} metas en progreso
          </Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.percentage}>{Math.round(averageProgress)}%</Text>
          <Text style={styles.label}>Promedio</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#10B981',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.95,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  percentage: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  label: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.95,
  },
});

export default OverallProgress;
