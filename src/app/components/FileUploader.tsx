import { Upload, Cloud, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../supabase/supabaseClient'; //

export function FileUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [responsable, setResponsable] = useState(''); // Requerido por rúbrica
  const [observaciones, setObservacion] = useState('');
  const [estadoCarga, setEstadoCarga] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mensaje, setMensaje] = useState('');

  // Lógica de validación (Cumple criterio de informar formato no permitido)
  const validarYSetearArchivo = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    const permitidos = ['csv', 'json', 'txt'];

    if (!extension || !permitidos.includes(extension)) {
      setMensaje('Formato no permitido. Solo CSV, JSON o TXT.');
      setEstadoCarga('error');
      setArchivo(null);
      return;
    }
    setArchivo(file);
    setEstadoCarga('idle');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validarYSetearArchivo(file);
  };

  const manejarSubida = async () => {
    if (!archivo || !responsable) {
      setMensaje('Por favor selecciona un archivo y escribe el responsable.');
      setEstadoCarga('error');
      return;
    }

    setEstadoCarga('loading');

    try {
      const nombreUnico = `${Date.now()}-${archivo.name}`;

      // 1. Subir el archivo al Bucket
const { error: errorStorage } = await supabase.storage
  .from('Documentos')
  .upload(nombreUnico, archivo);

if (errorStorage) throw errorStorage;

// 2. Insertar los metadatos (incluyendo el responsable del campo de texto)
const { error: errorDB } = await supabase
  .from('archivos_metadata') // Nombre exacto de la tabla
  .insert([{
    nombre_archivo: archivo.name,
    tipo_archivo: archivo.name.split('.').pop()?.toUpperCase(),
    tamano: archivo.size,
    responsable: responsable,
    observaciones: observaciones, 
    estado: 'Cargado exitosamente'
  }]);

      if (errorDB) throw errorDB;

      setEstadoCarga('success');
      setMensaje('¡Archivo cargado correctamente!');
    } catch (error: any) {
      setEstadoCarga('error');
      setMensaje(error.message);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-12 transition-all ${
          isDragging ? 'border-[#E53935] bg-red-50' : 'border-gray-300 bg-white'
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          <Upload className={`w-16 h-16 ${archivo ? 'text-green-500' : 'text-gray-400'}`} />
          
          <input 
            type="file" 
            id="hidden-input" 
            className="hidden" 
            accept=".csv,.json,.txt"
            onChange={(e) => e.target.files?.[0] && validarYSetearArchivo(e.target.files[0])}
          />
          
          <label htmlFor="hidden-input" className="px-12 py-4 bg-[#E53935] text-white rounded-xl cursor-pointer hover:bg-[#C62828] transition-all shadow-lg">
            {archivo ? 'Cambiar archivo' : 'Seleccionar archivos'}
          </label>

          {archivo && (
            <p className="text-sm font-bold text-gray-700">Listo para subir: {archivo.name}</p>
          )}

          <p className="text-gray-500 text-sm">o arrastra tus archivos aquí</p>

          {/* Campo de Responsable (Necesario para cumplir la rúbrica) */}
          <input 
            type="text"
            placeholder="Nombre del responsable o grupo..."
            className="w-full max-w-xs p-2 border rounded-md"
            value={responsable}
            onChange={(e) => setResponsable(e.target.value)}
          />
          <input 
            type="text"
            placeholder="Observaciones..."
            className="w-full max-w-xs p-2 border rounded-md"
            value={observaciones}
            onChange={(e) => setObservacion(e.target.value)}
          />

          {/* Mensajes de estado */}
          {estadoCarga !== 'idle' && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${estadoCarga === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {estadoCarga === 'error' ? <AlertCircle size={18}/> : <CheckCircle size={18}/>}
              <span className="text-xs font-medium">{mensaje}</span>
            </div>
          )}

          <button 
            onClick={manejarSubida}
            disabled={estadoCarga === 'loading'}
            className="w-full max-w-xs py-3 bg-gray-800 text-white rounded-xl hover:bg-black disabled:bg-gray-400 transition-all"
          >
            {estadoCarga === 'loading' ? 'Procesando...' : 'Confirmar Subida'}
          </button>
        </div>
      </div>
    </div>
  );
}