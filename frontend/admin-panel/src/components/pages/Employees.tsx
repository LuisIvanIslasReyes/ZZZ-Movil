import React from 'react';
import { Users, Plus, Search, Filter } from 'lucide-react';

export const Employees: React.FC = () => {
  // Mock data - En producción vendría de una API
  const employees = [
    {
      id: 1,
      name: 'Carlos Mendoza',
      email: 'carlos.mendoza@company.com',
      department: 'Desarrollo',
      status: 'Activo',
      stress_level: 'Bajo',
      last_sync: '2024-10-31 10:30'
    },
    {
      id: 2,
      name: 'Ana García',
      email: 'ana.garcia@company.com',
      department: 'Marketing',
      status: 'Activo',
      stress_level: 'Medio',
      last_sync: '2024-10-31 09:45'
    },
    {
      id: 3,
      name: 'Luis Torres',
      email: 'luis.torres@company.com',
      department: 'Ventas',
      status: 'Pausado',
      stress_level: 'Alto',
      last_sync: '2024-10-30 16:20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-6 w-6" />
            Gestión de Empleados
          </h1>
          <p className="text-gray-600">
            Administra los empleados y su información de monitoreo
          </p>
        </div>
        
        <button className="btn btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Empleado
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar empleado..."
              className="input input-bordered w-full pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <select className="select select-bordered">
              <option>Todos los departamentos</option>
              <option>Desarrollo</option>
              <option>Marketing</option>
              <option>Ventas</option>
              <option>RRHH</option>
            </select>
            
            <button className="btn btn-outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-50">
              <tr>
                <th>Empleado</th>
                <th>Departamento</th>
                <th>Estado</th>
                <th>Nivel de Estrés</th>
                <th>Última Sincronización</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-10">
                          <span className="text-sm">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{employee.name}</div>
                        <div className="text-sm opacity-50">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{employee.department}</td>
                  <td>
                    <div className={`badge ${
                      employee.status === 'Activo' ? 'badge-success' : 'badge-warning'
                    }`}>
                      {employee.status}
                    </div>
                  </td>
                  <td>
                    <div className={`badge ${
                      employee.stress_level === 'Bajo' ? 'badge-success' :
                      employee.stress_level === 'Medio' ? 'badge-warning' : 'badge-error'
                    }`}>
                      {employee.stress_level}
                    </div>
                  </td>
                  <td className="text-sm text-gray-500">{employee.last_sync}</td>
                  <td>
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                        ⋯
                      </div>
                      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Ver Detalles</a></li>
                        <li><a>Editar</a></li>
                        <li><a>Historial de Métricas</a></li>
                        <li><a className="text-red-600">Desactivar</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
