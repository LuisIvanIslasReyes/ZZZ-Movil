import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WeeklySummary: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="calendar-week" size={20} color="#0F3460" />
        <Text style={styles.title}>Resumen Semanal</Text>
      </View>
      
      <View style={styles.cardsContainer}>
        <View style={[styles.card, styles.cardGreen]}>
          <Text style={styles.cardValue}>4</Text>
          <Text style={styles.cardLabel}>Metas completadas</Text>
        </View>
        
        <View style={[styles.card, styles.cardGray]}>
          <Text style={styles.cardValue}>85%</Text>
          <Text style={styles.cardLabel}>Promedio de cumplimiento</Text>
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
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F3460',
    marginLeft: 10,
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cardGreen: {
    backgroundColor: '#D1FAE5',
  },
  cardGray: {
    backgroundColor: '#F3F4F6',
  },
  cardValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F3460',
    marginBottom: 6,
  },
  cardLabel: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default WeeklySummary;
