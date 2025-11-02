import React from 'react';
import { Settings } from 'lucide-react';
import { ComingSoon } from '../common/ComingSoon';

export const SettingsPage: React.FC = () => {
  return (
    <ComingSoon
      title="Configuración del Sistema"
      description="Configura los parámetros del sistema, notificaciones y preferencias generales."
      icon={<Settings className="h-12 w-12" />}
    />
  );
};
