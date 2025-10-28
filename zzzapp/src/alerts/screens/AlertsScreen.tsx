import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import AlertsHeader from '../components/AlertsHeader';
import AlertsFilters from '../components/AlertsFilters';
import AIRecommendation from '../components/AIRecommendation';
import AlertCard from '../components/AlertCard';
import AlertsSummary from '../components/AlertsSummary';

const AlertsScreen: React.FC = () => {
  return (
    <ScrollView 
      style={styles.container}
      bounces={false}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
    >
      <AlertsHeader />
      <AlertsFilters />
      <AIRecommendation />
      
      <AlertCard
        type="critico"
        title="Nivel de Fatiga Alto"
        description="Tu frecuencia cardíaca ha estado elevada por más de 30 minutos. Se recomienda tomar un descanso inmediato."
        timeAgo="Hace 5 minutos"
        badge="Crítico"
        isRead={false}
      />

      <AlertCard
        type="recomendacion"
        title="Pausa Activa Recomendada"
        description="Detectamos un patrón de fatiga creciente. Te recomendamos realizar ejercicios de estiramiento por 5 minutos."
        timeAgo="Hace 15 minutos"
        badge="Recomendación IA"
        isRead={false}
      />

      <AlertCard
        type="advertencia"
        title="Hidratación Necesaria"
        description="No has registrado actividad de hidratación en las últimas 2 horas. Recuerda beber agua regularmente."
        timeAgo="Hace 45 minutos"
        badge="Advertencia"
        isRead={true}
      />

      <AlertsSummary />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EBF0',
  },
});

export default AlertsScreen;
