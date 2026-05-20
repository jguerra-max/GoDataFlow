import { Eye, FileJson, FileText, Table, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

export function RegistroProcesos() {
  const [procesos, setProcesos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar los datos al montar el componente
  useEffect(() => {
    fetchProcesos();
  }, []);

  const fetchProcesos = async () => {
    setLoading(true);
    try {
      // Consultamos la tabla archivos_metadata que ya se utiliza en FileUploader
      const { data, error } = await supabase
        .from('archivos_metadata')
        .select('*');

      if (error) {
        console.error('Error al cargar procesos:', error.message);
      } else if (data) {
        setProcesos(data);
      }
    } catch (err) {
      console.error('Error inesperado de red:', err);
    } finally {
      setLoading(false);
    }
  };

  const getFormatIcon = (format: string) => {
    const formatUpper = format?.toUpperCase() || '';
    if (formatUpper.includes('CSV')) return <Table className="w-5 h-5 text-emerald-600" />;
    if (formatUpper.includes('JSON')) return <FileJson className="w-5 h-5 text-amber-500" />;
    if (formatUpper.includes('TXT')) return <FileText className="w-5 h-5 text-blue-600" />;
    return <FileText className="w-5 h-5 text-gray-600" />;
  };

  const getStatusIcon = (estado: string) => {
    const estadoLower = estado?.toLowerCase() || '';
    if (estadoLower.includes('exitoso') || estadoLower.includes('cargado')) return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    if (estadoLower.includes('error')) return <AlertCircle className="w-4 h-4 text-red-500" />;
    return <Clock className="w-4 h-4 text-amber-500" />;
  };

  const formatearFecha = (fechaString: string) => {
    if (!fechaString) return 'Desconocida';
    const date = new Date(fechaString);
    // Formato de fecha legible (ej. 20/5/2026, 18:30)
    return date.toLocaleString('es-ES', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const abrirVistaPrevia = async (nombreArchivo: string) => {
    if (!nombreArchivo) return;
    try {
      // Obtenemos la URL pública del archivo desde el bucket 'Documentos'
      const { data } = supabase.storage
        .from('Documentos')
        .getPublicUrl(nombreArchivo); // En FileUploader se guardaba con un prefijo de Date.now(), idealmente habría que guardar ese nombre exacto en DB, aquí buscamos por el que haya.
        
      if (data?.publicUrl) {
        window.open(data.publicUrl, '_blank');
      }
    } catch (error) {
      console.error("No se pudo abrir la vista previa", error);
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
          <button 
            onClick={fetchProcesos}
            disabled={loading}
            className="mt-4 md:mt-0 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
          >
            Actualizar datos
          </button>
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
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-10 text-center">
                      <Loader2 className="w-8 h-8 text-[#E53935] animate-spin mx-auto mb-4" />
                      <p className="text-gray-500">Cargando procesos desde Supabase...</p>
                    </td>
                  </tr>
                ) : procesos.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-10 text-center">
                      <div className="flex flex-col items-center justify-center py-6">
                        <FileText className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-gray-500 font-medium">No hay archivos registrados todavía.</p>
                        <p className="text-sm text-gray-400 mt-1">Sube un archivo para que aparezca aquí.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  procesos.map((proceso) => (
                    <tr key={proceso.id || Math.random()} className="hover:bg-gray-50 transition-colors group">
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-gray-50 rounded-xl group-hover:bg-white border border-transparent group-hover:border-gray-100 transition-colors shadow-sm">
                            {getFormatIcon(proceso.tipo_archivo)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">{proceso.nombre_archivo || 'Sin nombre'}</p>
                            <div className="flex items-center gap-1.5 mt-1">
                              {getStatusIcon(proceso.estado)}
                              <span className="text-xs font-medium text-gray-500">{proceso.tipo_archivo || 'Desconocido'}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E53935] to-[#B71C1C] shadow-sm text-white flex items-center justify-center font-bold text-xs uppercase">
                            {(proceso.responsable || 'A')[0]}
                          </div>
                          <span className="text-sm font-medium text-gray-700">{proceso.responsable || 'Anónimo'}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <p className="text-sm text-gray-600 max-w-xs truncate" title={proceso.observaciones || 'Sin observaciones'}>
                          {proceso.observaciones || 'Sin observaciones'}
                        </p>
                      </td>
                      <td className="p-5">
                        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                          {formatearFecha(proceso.created_at)}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => abrirVistaPrevia(proceso.nombre_archivo)}
                            className="p-2 text-gray-400 hover:text-[#E53935] hover:bg-red-50 rounded-lg transition-all hover:scale-105 active:scale-95"
                            title="Ver archivo"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {!loading && procesos.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-sm text-gray-500">
              <span>Mostrando {procesos.length} procesos registrados</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
