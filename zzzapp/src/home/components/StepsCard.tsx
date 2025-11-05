import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useStepsGoal } from '../hooks/useStepsGoal';

const StepsCard: React.FC = () => {
  const { currentSteps, targetSteps, progressPercentage, isLoading } = useStepsGoal();
  
  const steps = currentSteps;
  const goal = targetSteps;
  const percentage = progressPercentage;

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContent}>
          <ActivityIndicator size="small" color="#10B981" />
          <Text style={styles.loadingText}>Cargando pasos...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Text style={styles.title}>Pasos Hoy</Text>
          <Text style={styles.steps}>{steps.toLocaleString()}</Text>
          <Text style={styles.goal}>Meta: {goal.toLocaleString()}</Text>
        </View>
        <View style={styles.rightContent}>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <MaterialCommunityIcons name="shoe-print" size={28} color="#10B981" />
              <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  loadingText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#718096',
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
    fontSize: 16,
    fontWeight: '700',
    color: '#0F3460',
    marginBottom: 8,
  },
  steps: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0F3460',
    marginBottom: 4,
  },
  goal: {
    fontSize: 14,
    color: '#718096',
  },
  rightContent: {
    marginLeft: 20,
  },
  circleContainer: {
    width: 80,
    height: 80,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
    marginTop: 2,
  },
});

export default StepsCard;
