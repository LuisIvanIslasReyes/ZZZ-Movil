import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import GoalsHeader from '../components/GoalsHeader';
import OverallProgress from '../components/OverallProgress';
import GoalCard from '../components/GoalCard';
import WeeklySummary from '../components/WeeklySummary';
import Recommendations from '../components/Recommendations';

const MetasScreen: React.FC = () => {
  return (
    <ScrollView 
      style={styles.container}
      bounces={false}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
    >
      <GoalsHeader />
      <OverallProgress />
      <GoalCard />
      <WeeklySummary />
      <Recommendations />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EBF0',
  },
});

export default MetasScreen;
