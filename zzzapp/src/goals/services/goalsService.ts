import { apiClient } from '../../api/config';

export interface Goal {
  id: number;
  user: number;
  title: string;
  category: string;
  category_display: string;
  target: string;
  current_progress: string;
  unit: string;
  start_date: string;
  end_date: string;
  is_completed: boolean;
  completed_at: string | null;
  progress_percentage: string;
  created_at: string;
  updated_at: string;
}

export interface CreateGoalData {
  title: string;
  category: string;
  target: string;
  unit: string;
  start_date?: string;
  end_date?: string;
}

export interface UpdateProgressData {
  current_progress: number;
}

class GoalsService {
  /**
   * Obtiene todas las metas del usuario autenticado
   */
  async getUserGoals(): Promise<Goal[]> {
    try {
      const response = await apiClient.get<any>('/goals/');
      
      // La respuesta es paginada, extraer el array de results
      const goals = response.data.results || response.data;
      console.log(`Total de metas cargadas: ${goals.length}`);
      
      return goals;
    } catch (error: any) {
      console.error('Error al obtener metas:', error.response?.data || error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Crea una nueva meta
   */
  async createGoal(goalData: CreateGoalData): Promise<Goal> {
    try {
      const response = await apiClient.post<Goal>('/goals/', goalData);
      return response.data;
    } catch (error: any) {
      console.error('Error al crear meta:', error.response?.data || error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Actualiza una meta existente
   */
  async updateGoal(goalId: number, goalData: Partial<CreateGoalData>): Promise<Goal> {
    try {
      const response = await apiClient.patch<Goal>(`/goals/${goalId}/`, goalData);
      return response.data;
    } catch (error: any) {
      console.error('Error al actualizar meta:', error.response?.data || error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Actualiza el progreso de una meta
   */
  async updateProgress(goalId: number, progress: number): Promise<Goal> {
    try {
      const response = await apiClient.post<{ goal: Goal }>(
        `/goals/${goalId}/update_progress/`,
        { current_progress: progress }
      );
      return response.data.goal;
    } catch (error: any) {
      console.error('Error al actualizar progreso:', error.response?.data || error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Elimina una meta
   */
  async deleteGoal(goalId: number): Promise<void> {
    try {
      await apiClient.delete(`/goals/${goalId}/`);
    } catch (error: any) {
      console.error('Error al eliminar meta:', error.response?.data || error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene el resumen de metas del usuario
   */
  async getGoalsSummary(): Promise<any> {
    try {
      const response = await apiClient.get('/goals/summary/');
      return response.data;
    } catch (error: any) {
      console.error('Error al obtener resumen:', error.response?.data || error.message);
      throw this.handleError(error);
    }
  }

  /**
   * Maneja errores de las peticiones
   */
  private handleError(error: any): Error {
    if (error.response) {
      const message = error.response.data?.detail 
        || error.response.data?.message 
        || error.response.data?.error
        || 'Error al procesar la solicitud';
      
      return new Error(message);
    } else if (error.request) {
      return new Error('No se pudo conectar con el servidor. Verifica tu conexión.');
    } else {
      return new Error(error.message || 'Error desconocido');
    }
  }
}

// Exportar una instancia única del servicio
export const goalsService = new GoalsService();
