import React from 'react';
import { BarChart3 } from 'lucide-react';
import { ComingSoon } from '../common/ComingSoon';

export const Metrics: React.FC = () => {
  return (
    <ComingSoon
      title="Análisis de Métricas"
      description="Visualiza y analiza las métricas de estrés, fatiga y bienestar de los empleados."
      icon={<BarChart3 className="h-12 w-12" />}
    />
  );
};
