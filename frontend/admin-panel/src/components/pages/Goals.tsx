import React from 'react';
import { Target } from 'lucide-react';
import { ComingSoon } from '../common/ComingSoon';

export const Goals: React.FC = () => {
  return (
    <ComingSoon
      title="Gestión de Objetivos"
      description="Configura y monitorea los objetivos de bienestar y productividad de los empleados."
      icon={<Target className="h-12 w-12" />}
    />
  );
};
