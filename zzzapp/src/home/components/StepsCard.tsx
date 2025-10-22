import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const StepsCard: React.FC = () => {
  const steps = 6420;
  const goal = 8000;
  const percentage = (steps / goal) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Text style={styles.title}>Pasos de Hoy</Text>
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
