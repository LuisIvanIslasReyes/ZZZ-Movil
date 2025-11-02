import React from 'react';

export const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-primary">¡Funciona!</h2>
          <p>Si puedes ver esto, significa que:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>✅ React está cargando</li>
            <li>✅ Tailwind CSS está funcionando</li>
            <li>✅ DaisyUI está activo</li>
            <li>✅ Los gradientes funcionan</li>
          </ul>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">¡Genial!</button>
          </div>
        </div>
      </div>
    </div>
  );
};