import React from 'react';
import { FileText } from 'lucide-react';
import { ComingSoon } from '../common/ComingSoon';

export const Reports: React.FC = () => {
  return (
    <ComingSoon
      title="Generación de Reportes"
      description="Genera reportes detallados sobre el rendimiento y bienestar de los empleados."
      icon={<FileText className="h-12 w-12" />}
    />
  );
};
