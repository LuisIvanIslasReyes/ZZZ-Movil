import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Goal } from '../services/goalsService';

interface GoalCardProps {
  goal: Goal;
  onEdit?: (goal: Goal) => void;
  onDelete?: (goalId: number) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onEdit, onDelete }) => {
  // Mapeo de categorías a iconos
  const categoryIcons: { [key: string]: string } = {
    'steps': 'walk',
    'heart_rate': 'heart-pulse',
    'recovery': 'sleep',
    'stress': 'head-lightbulb-outline',
    'activity': 'run',
    'hrv': 'chart-line-variant',
    'sleep': 'power-sleep',
    'productivity': 'briefcase-check',
    'hydration': 'water',
    'nutrition': 'food-apple',
    'weight': 'scale-bathroom',
    'exercise': 'dumbbell',
  };

  // Obtener el icono según la categoría
  const icon = categoryIcons[goal.category] || 'target';
  
  // Calcular porcentaje de progreso
  const progressPercentage = parseFloat(goal.progress_percentage) || 0;
  const currentValue = parseFloat(goal.current_progress) || 0;
  const targetValue = parseFloat(goal.target) || 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name={icon as any} size={24} color="#F97316" />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.title}>{goal.title}</Text>
            <View style={[styles.statusBadge, goal.is_completed && styles.completedBadge]}>
              <Text style={[styles.statusText, goal.is_completed && styles.completedText]}>
                {goal.is_completed ? 'Completada' : 'En progreso'}
              </Text>
            </View>
          </View>
        </View>
        {onEdit && (
          <TouchableOpacity onPress={() => onEdit(goal)}>
            <MaterialCommunityIcons name="pencil" size={20} color="#718096" />
          </TouchableOpacity>
        )}
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.numbersRow}>
          <View style={styles.numbersContainer}>
            <Text style={styles.currentValue}>{currentValue.toLocaleString()}</Text>
            <Text style={styles.targetValue}> / {targetValue.toLocaleString()} {goal.unit}</Text>
          </View>
          <Text style={styles.percentageText}>{Math.round(progressPercentage)}%</Text>
        </View>
        
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: `${Math.min(progressPercentage, 100)}%` }]} />
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
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFF7ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F3460',
    marginBottom: 6,
  },
  statusBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  completedBadge: {
    backgroundColor: '#D1FAE5',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  completedText: {
    color: '#059669',
  },
  progressSection: {
    width: '100%',
  },
  numbersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  numbersContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currentValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F3460',
  },
  targetValue: {
    fontSize: 15,
    color: '#718096',
  },
  percentageText: {
    fontSize: 15,
    color: '#718096',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0F3460',
    borderRadius: 4,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 4,
  },
});

export default GoalCard;
