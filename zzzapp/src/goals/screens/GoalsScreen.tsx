import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import GoalsHeader from '../components/GoalsHeader';
import OverallProgress from '../components/OverallProgress';
import GoalCard from '../components/GoalCard';
import WeeklySummary from '../components/WeeklySummary';
import Recommendations from '../components/Recommendations';
import NewGoalModal from '../components/NewGoalModal';

const MetasScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSaveGoal = (goal: { title: string; category: string; target: string; unit: string }) => {
    // Aquí irá la lógica para guardar la meta en la BD
    console.log('Nueva meta:', goal);
  };

  return (
    <>
      <ScrollView 
        style={styles.container}
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <GoalsHeader onNewGoalPress={() => setModalVisible(true)} />
        <OverallProgress />
        <GoalCard />
        <WeeklySummary />
        <Recommendations />
      </ScrollView>

      <NewGoalModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveGoal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EBF0',
  },
});

export default MetasScreen;
