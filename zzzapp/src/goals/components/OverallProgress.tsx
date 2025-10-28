import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const OverallProgress: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Text style={styles.title}>Progreso General</Text>
          <Text style={styles.subtitle}>3 de 4 metas en progreso</Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.percentage}>62%</Text>
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
