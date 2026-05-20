import { Eye, FileJson, FileText, Table, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function RegistroProcesos() {
  // Datos simulados (mock data) para ilustrar cómo se vería la interfaz
  const procesos = [
    {
      id: 1,
      uploader: 'Juan Pérez',
      filename: 'datos_ventas_2025.csv',
      format: 'CSV',
      observation: 'Reporte trimestral de ventas consolidado.',
      date: 'Hace 2 horas',
      status: 'success',
    },
    {
      id: 2,
      uploader: 'María Gómez',
      filename: 'configuracion_app.json',
      format: 'JSON',
      observation: 'Actualización de parámetros del sistema y variables de entorno.',
      date: 'Hace 5 horas',
      status: 'success',
    },
    {
      id: 3,
      uploader: 'Carlos Ruiz',
      filename: 'logs_errores_servidor.txt',
      format: 'TXT',
      observation: 'Revisión de caídas ocurridas durante el fin de semana.',
      date: 'Hace 1 día',
      status: 'pending',
    },
  ];

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'CSV': return <Table className="w-5 h-5 text-emerald-600" />;
      case 'JSON': return <FileJson className="w-5 h-5 text-amber-500" />;
      case 'TXT': return <FileText className="w-5 h-5 text-blue-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <section id="registro" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-[#1F2937] mb-2">Registro de Procesos</h2>
            <p className="text-gray-600">Historial de archivos cargados y procesados en el sistema.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="p-5">Archivo</th>
                  <th className="p-5">Usuario</th>
                  <th className="p-5">Observación</th>
                  <th className="p-5">Fecha</th>
                  <th className="p-5 text-center">Vista Previa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {procesos.map((proceso) => (
                  <tr key={proceso.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gray-50 rounded-xl group-hover:bg-white border border-transparent group-hover:border-gray-100 transition-colors shadow-sm">
                          {getFormatIcon(proceso.format)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{proceso.filename}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            {getStatusIcon(proceso.status)}
                            <span className="text-xs font-medium text-gray-500">{proceso.format}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E53935] to-[#B71C1C] shadow-sm text-white flex items-center justify-center font-bold text-xs">
                          {proceso.uploader.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{proceso.uploader}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <p className="text-sm text-gray-600 max-w-xs truncate" title={proceso.observation}>
                        {proceso.observation}
                      </p>
                    </td>
                    <td className="p-5">
                      <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">{proceso.date}</span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center">
                        <button 
                          className="p-2 text-gray-400 hover:text-[#E53935] hover:bg-red-50 rounded-lg transition-all hover:scale-105 active:scale-95"
                          title="Ver archivo"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-sm text-gray-500">
            <span>Mostrando {procesos.length} procesos recientes</span>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-[#1F2937] shadow-sm">
              Ver historial completo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
