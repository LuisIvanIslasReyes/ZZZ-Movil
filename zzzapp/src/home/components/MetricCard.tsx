import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  iconName: string;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  iconName,
  color,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <MaterialCommunityIcons name={iconName} size={24} color={color} />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}> {unit}</Text>
      </View>
      <View style={styles.comparisonContainer}>
        <MaterialCommunityIcons name="arrow-up" size={12} color="#10B981" />
        <Text style={styles.comparison}>vs anterior</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    margin: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minWidth: '45%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F3460',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0F3460',
  },
  unit: {
    fontSize: 14,
    color: '#718096',
    marginLeft: 4,
  },
  comparisonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  comparison: {
    fontSize: 12,
    color: '#A0AEC0',
    marginLeft: 4,
  },
});

export default MetricCard;
