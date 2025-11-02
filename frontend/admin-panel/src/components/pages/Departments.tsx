import React from 'react';
import { Building2 } from 'lucide-react';
import { ComingSoon } from '../common/ComingSoon';

export const Departments: React.FC = () => {
  return (
    <ComingSoon
      title="Gestión de Departamentos"
      description="Administra los departamentos de la empresa y asigna empleados a cada área."
      icon={<Building2 className="h-12 w-12" />}
    />
  );
};
