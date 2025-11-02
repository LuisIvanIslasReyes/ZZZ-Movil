import React from 'react';
import { AlertTriangle, Bell, CheckCircle, Clock, Filter } from 'lucide-react';

export const Alerts: React.FC = () => {
  // Mock data - En producción vendría de una API
  const alerts = [
    {
      id: 1,
      employee: 'Carlos Mendoza',
      type: 'Nivel de Fatiga Alto',
      severity: 'high',
      message: 'Tu frecuencia cardíaca ha estado elevada por más de 30 minutos. Se recomienda tomar un descanso inmediato.',
      timestamp: '2024-10-31 10:30',
      status: 'active',
      department: 'Desarrollo'
    },
    {
      id: 2,
      employee: 'Ana García',
      type: 'Pausa Activa Recomendada',
      severity: 'medium',
      message: 'Detectamos un patrón de fatiga creciente. Te recomendamos realizar ejercicios de respiración profunda.',
      timestamp: '2024-10-31 09:45',
      status: 'active',
      department: 'Marketing'
    },
    {
      id: 3,
      employee: 'Luis Torres',
      type: 'Meta de Pasos Alcanzada',
      severity: 'low',
      message: '¡Felicitaciones! Has completado tu meta de pasos para hoy. Mantén el buen ritmo.',
      timestamp: '2024-10-31 08:20',
      status: 'resolved',
      department: 'Ventas'
    },
    {
      id: 4,
      employee: 'María López',
      type: 'Hidratación Necesaria',
      severity: 'medium',
      message: 'No has registrado actividad de hidratación en las últimas 2 horas. Recuerda beber agua regularmente.',
      timestamp: '2024-10-31 07:15',
      status: 'active',
      department: 'RRHH'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'medium': return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'low': return <CheckCircle className="h-5 w-5 text-green-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            Centro de Alertas
          </h1>
          <p className="text-gray-600">
            Monitorea y gestiona las alertas del sistema ZZZ
          </p>
        </div>
        
        <div className="flex gap-2">
          <button className="btn btn-outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </button>
          <button className="btn btn-primary">
            <CheckCircle className="h-4 w-4 mr-2" />
            Marcar como Leídas
          </button>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat bg-white rounded-lg shadow border-l-4 border-l-red-500">
          <div className="stat-title">Críticas</div>
          <div className="stat-value text-red-600">8</div>
          <div className="stat-desc">Requieren atención inmediata</div>
        </div>
        
        <div className="stat bg-white rounded-lg shadow border-l-4 border-l-yellow-500">
          <div className="stat-title">Advertencias</div>
          <div className="stat-value text-yellow-600">24</div>
          <div className="stat-desc">Monitoreo recomendado</div>
        </div>
        
        <div className="stat bg-white rounded-lg shadow border-l-4 border-l-green-500">
          <div className="stat-title">Informativas</div>
          <div className="stat-value text-green-600">156</div>
          <div className="stat-desc">Logros y confirmaciones</div>
        </div>
        
        <div className="stat bg-white rounded-lg shadow border-l-4 border-l-blue-500">
          <div className="stat-title">Total Hoy</div>
          <div className="stat-value text-blue-600">188</div>
          <div className="stat-desc">↗︎ 12% vs ayer</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-wrap gap-4">
          <select className="select select-bordered">
            <option>Todas las severidades</option>
            <option>Críticas</option>
            <option>Advertencias</option>
            <option>Informativas</option>
          </select>
          
          <select className="select select-bordered">
            <option>Todos los estados</option>
            <option>Activas</option>
            <option>Resueltas</option>
            <option>En proceso</option>
          </select>
          
          <select className="select select-bordered">
            <option>Todos los departamentos</option>
            <option>Desarrollo</option>
            <option>Marketing</option>
            <option>Ventas</option>
            <option>RRHH</option>
          </select>
          
          <select className="select select-bordered">
            <option>Últimas 24 horas</option>
            <option>Última semana</option>
            <option>Último mes</option>
            <option>Personalizado</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className={`bg-white rounded-lg shadow-lg border-l-4 p-6 transition-all hover:shadow-xl ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="flex-shrink-0">
                  {getSeverityIcon(alert.severity)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {alert.type}
                    </h3>
                    <div className={`badge ${
                      alert.severity === 'high' ? 'badge-error' :
                      alert.severity === 'medium' ? 'badge-warning' : 'badge-success'
                    }`}>
                      {alert.severity === 'high' ? 'Crítico' :
                       alert.severity === 'medium' ? 'Advertencia' : 'Info'}
                    </div>
                    <div className={`badge ${
                      alert.status === 'active' ? 'badge-primary' : 'badge-neutral'
                    }`}>
                      {alert.status === 'active' ? 'Activa' : 'Resuelta'}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{alert.message}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>👤 {alert.employee}</span>
                    <span>🏢 {alert.department}</span>
                    <span>🕒 {alert.timestamp}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {alert.status === 'active' && (
                  <>
                    <button className="btn btn-sm btn-primary">
                      Resolver
                    </button>
                    <button className="btn btn-sm btn-ghost">
                      Posponer
                    </button>
                  </>
                )}
                
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                    ⋯
                  </div>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Ver Detalles</a></li>
                    <li><a>Ver Empleado</a></li>
                    <li><a>Historial Similar</a></li>
                    <li><a className="text-red-600">Eliminar</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <div className="join">
          <button className="join-item btn">«</button>
          <button className="join-item btn btn-active">1</button>
          <button className="join-item btn">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">»</button>
        </div>
      </div>
    </div>
  );
};
