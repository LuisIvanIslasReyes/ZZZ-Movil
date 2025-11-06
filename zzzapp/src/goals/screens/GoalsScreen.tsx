import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, View, Text, ActivityIndicator, RefreshControl } from 'react-native';
import GoalsHeader from '../components/GoalsHeader';
import OverallProgress from '../components/OverallProgress';
import GoalCard from '../components/GoalCard';
import WeeklySummary from '../components/WeeklySummary';
import Recommendations from '../components/Recommendations';
import NewGoalModal from '../components/NewGoalModal';
import { goalsService, Goal } from '../services/goalsService';
import { useAuth } from '../../context/AuthContext';

const MetasScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  // Cargar metas al montar el componente y configurar refresco automático
  useEffect(() => {
    loadGoals(true);

    // Recargar metas cada 5 segundos para reflejar cambios en tiempo real (sin mostrar loading)
    const interval = setInterval(() => {
      loadGoals(false);
    }, 5000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  const loadGoals = async (showLoading: boolean = false) => {
    try {
      if (showLoading) {
        setIsLoading(true);
      }
      const data = await goalsService.getUserGoals();
      setGoals(data);
    } catch (error: any) {
      console.error('Error al cargar metas:', error);
    } finally {
      if (showLoading) {
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    }
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadGoals(false);
    setRefreshing(false);
  }, []);

  const handleSaveGoal = () => {
    // Recargar las metas después de crear una nueva
    loadGoals(false);
  };

  const handleEditGoal = (goal: Goal) => {
    // TODO: Implementar edición de meta
    console.log('Editar meta:', goal);
  };

  const handleDeleteGoal = async (goalId: number) => {
    try {
      await goalsService.deleteGoal(goalId);
      loadGoals(false); // Recargar lista
    } catch (error: any) {
      console.error('Error al eliminar meta:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0F3460" />
        <Text style={styles.loadingText}>Cargando metas...</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView 
        style={styles.container}
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#0F3460']}
            tintColor="#0F3460"
          />
        }
      >
        <GoalsHeader onNewGoalPress={() => setModalVisible(true)} />
        <OverallProgress goals={goals} />
        {goals.length > 0 ? (
          goals.map((goal) => (
            <GoalCard 
              key={goal.id} 
              goal={goal}
              onEdit={handleEditGoal}
              onDelete={handleDeleteGoal}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tienes metas aún</Text>
            <Text style={styles.emptySubtext}>
              Crea tu primera meta para empezar a mejorar tu bienestar
            </Text>
          </View>
        )}
        
        <WeeklySummary goals={goals} />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8EBF0',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#718096',
  },
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 40,
    marginHorizontal: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F3460',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
  },
});

export default MetasScreen;
