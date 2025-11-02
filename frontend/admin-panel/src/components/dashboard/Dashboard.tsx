import React from 'react';
import { 
  Users, 
  Building2, 
  AlertTriangle, 
  TrendingUp,
  Activity,
  Target,
  Clock,
  Heart
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  // Mock data - En producción vendría de una API
  const stats = {
    total_employees: 156,
    active_employees: 142,
    critical_alerts: 8,
    avg_stress_level: 6.2,
    total_departments: 12,
    completed_goals: 89
  };

  const recentAlerts = [
    {
      id: 1,
      employee: 'Carlos Mendoza',
      type: 'Nivel de Fatiga Alto',
      severity: 'high',
      time: 'Hace 5 minutos'
    },
    {
      id: 2,
      employee: 'Ana García',
      type: 'Pausa Activa Recomendada',
      severity: 'medium',
      time: 'Hace 15 minutos'
    },
    {
      id: 3,
      employee: 'Luis Torres',
      type: 'Meta de Pasos Alcanzada',
      severity: 'low',
      time: 'Hace 1 hora'
    }
  ];

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ReactNode;
    trend?: 'up' | 'down' | 'neutral';
    color: string;
  }> = ({ title, value, subtitle, icon, trend, color }) => (
    <div className={`stat bg-white rounded-lg shadow-lg border-l-4 ${color}`}>
      <div className="stat-figure text-secondary">
        <div className={`p-3 rounded-full bg-opacity-10 ${color.replace('border-l-', 'bg-')}`}>
          {icon}
        </div>
      </div>
      <div className="stat-title text-gray-600">{title}</div>
      <div className="stat-value text-2xl font-bold">{value}</div>
      {subtitle && (
        <div className="stat-desc flex items-center gap-1">
          {trend && (
            <TrendingUp 
              className={`h-4 w-4 ${
                trend === 'up' ? 'text-green-500' : 
                trend === 'down' ? 'text-red-500' : 'text-gray-500'
              }`}
            />
          )}
          {subtitle}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Resumen general del sistema de monitoreo ZZZ
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Empleados"
          value={stats.total_employees}
          subtitle="156 días usando ZZZ"
          icon={<Users className="h-6 w-6 text-blue-600" />}
          color="border-l-blue-500"
          trend="up"
        />
        
        <StatCard
          title="Empleados Activos"
          value={stats.active_employees}
          subtitle="91% de participación"
          icon={<Activity className="h-6 w-6 text-green-600" />}
          color="border-l-green-500"
          trend="up"
        />
        
        <StatCard
          title="Alertas Críticas"
          value={stats.critical_alerts}
          subtitle="Requieren atención"
          icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
          color="border-l-red-500"
          trend="down"
        />
        
        <StatCard
          title="Nivel Promedio de Estrés"
          value={`${stats.avg_stress_level}/10`}
          subtitle="Dentro del rango normal"
          icon={<Heart className="h-6 w-6 text-purple-600" />}
          color="border-l-purple-500"
          trend="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Alertas Recientes</h2>
              <button className="btn btn-sm btn-outline">Ver Todas</button>
            </div>
            
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-3 h-3 rounded-full
                      ${alert.severity === 'high' ? 'bg-red-500' : 
                        alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}
                    `} />
                    <div>
                      <p className="font-medium text-gray-900">{alert.employee}</p>
                      <p className="text-sm text-gray-600">{alert.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
            
            <div className="space-y-3">
              <button className="btn btn-primary w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Agregar Empleado
              </button>
              
              <button className="btn btn-secondary w-full justify-start">
                <Building2 className="h-4 w-4 mr-2" />
                Nuevo Departamento
              </button>
              
              <button className="btn btn-accent w-full justify-start">
                <Target className="h-4 w-4 mr-2" />
                Configurar Meta
              </button>
              
              <button className="btn btn-info w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                Generar Reporte
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Estado del Sistema</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Sincronización de Datos</span>
                <div className="badge badge-success">Activa</div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Servidor Backend</span>
                <div className="badge badge-success">En línea</div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Base de Datos</span>
                <div className="badge badge-success">Conectada</div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Alertas IA</span>
                <div className="badge badge-warning">Procesando</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Tiempo Promedio de Uso</p>
              <p className="text-2xl font-bold text-blue-900">7.5h</p>
              <p className="text-blue-700 text-sm">89% óptimo</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Metas Completadas</p>
              <p className="text-2xl font-bold text-green-900">{stats.completed_goals}</p>
              <p className="text-green-700 text-sm">Este mes</p>
            </div>
            <Target className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Alertas Preventivas</p>
              <p className="text-2xl font-bold text-purple-900">42</p>
              <p className="text-purple-700 text-sm">Esta semana</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};
