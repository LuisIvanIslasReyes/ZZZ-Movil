import { useState, useEffect } from 'react';
import { goalsService, Goal } from '../../goals/services/goalsService';
import { useGoalsRefresh } from '../../goals/context/GoalsContext';

interface StepsGoalData {
  currentSteps: number;
  targetSteps: number;
  progressPercentage: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook personalizado para obtener el progreso de pasos de hoy del usuario
 * Busca metas de categoría 'steps' que estén activas (no completadas o recientemente activas)
 * Se refresca automáticamente cuando se actualiza alguna meta
 */
export const useStepsGoal = (): StepsGoalData => {
  const [currentSteps, setCurrentSteps] = useState<number>(0);
  const [targetSteps, setTargetSteps] = useState<number>(0);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Obtener el flag de refresco desde el contexto
  const { refreshGoalsFlag } = useGoalsRefresh();

  const fetchStepsGoal = async (showLoading: boolean = false) => {
    try {
      if (showLoading) {
        setIsLoading(true);
      }
      setError(null);

      // Obtener todas las metas del usuario
      const goals = await goalsService.getUserGoals();

      // Filtrar metas de pasos (steps) que estén activas
      const stepsGoal = goals.find(
        (goal) => goal.category === 'steps' && !goal.is_completed
      );

      if (stepsGoal) {
        const current = parseFloat(stepsGoal.current_progress) || 0;
        const target = parseFloat(stepsGoal.target) || 8000; // Default 8000 si no está disponible
        const percentage = (current / target) * 100;

        setCurrentSteps(current);
        setTargetSteps(target);
        setProgressPercentage(Math.min(percentage, 100));
      } else {
        // Si no hay meta de pasos activa, mostrar 0 pero sin error
        setCurrentSteps(0);
        setTargetSteps(8000);
        setProgressPercentage(0);
      }
    } catch (err: any) {
      console.error('Error al obtener meta de pasos:', err);
      setError(err.message || 'Error al cargar la meta de pasos');
      // Valores por defecto en caso de error
      setCurrentSteps(0);
      setTargetSteps(8000);
      setProgressPercentage(0);
    } finally {
      if (showLoading) {
         setIsLoading(false);
        setIsInitialLoad(false);
      }
    }
  };

  // Cargar datos al montar el componente, cuando se refresca y cada 5 segundos
  useEffect(() => {
    fetchStepsGoal(true);

    // Recargar progreso de pasos cada 5 segundos para reflejar cambios en tiempo real (sin mostrar loading)
    const interval = setInterval(() => {
      fetchStepsGoal(false);
    }, 5000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [refreshGoalsFlag]);

  return {
    currentSteps,
    targetSteps,
    progressPercentage,
    isLoading,
    error,
    refetch: fetchStepsGoal,
  };
};
