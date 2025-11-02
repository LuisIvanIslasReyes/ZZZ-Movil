import React from 'react';

interface ComingSoonProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full">
        <div className="text-blue-600">
          {icon}
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-lg text-gray-600 max-w-md mb-8">{description}</p>
      
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Funcionalidades en desarrollo
        </h3>
        
        <div className="space-y-3 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">Interfaz de usuario completa</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">Integración con backend</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">Funciones de gestión avanzada</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">Reportes y analytics</span>
          </div>
        </div>
      </div>
      
      <button className="btn btn-primary mt-6">
        Volver al Dashboard
      </button>
    </div>
  );
};
