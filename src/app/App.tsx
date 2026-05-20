import { Navbar } from './components/Navbar';
import { FileUploader } from './components/FileUploader';
import { FileTypeCard } from './components/FileTypeCard';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { FileJson, FileText, Table } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from './supabase/supabaseClient'; //

// Mantenemos la interfaz para la prueba de conexión inicial
interface Perfil {
  id: string | number;
  nombre: string;
}

export default function App() {
  const [datos, setDatos] = useState<Perfil[]>([]);
  const [conexionOk, setConexionOk] = useState<boolean | null>(null);

  useEffect(() => {
    getPerfiles();
  }, []);

  // Esta función sirve para validar que el SDK de Supabase resuelve correctamente el DNS
  async function getPerfiles() {
    try {
      const { data, error } = await supabase
        .from('User') 
        .select('*');

      if (error) {
        console.error('Error cargando usuarios:', error.message);
        setConexionOk(false);
        return;
      }

      if (data) {
        setDatos(data);
        setConexionOk(true);
      }
    } catch (err) {
      console.error('Error crítico de red:', err);
      setConexionOk(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F4F7]">
      <Navbar />

      {/* Indicador de conexión (Cumple con informar al usuario sobre el estado del sistema) */}
      <div className="fixed bottom-4 right-4 z-50">
        {conexionOk === true && (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded border border-green-400 animate-pulse">
            Servidor Activo: {datos.length} registros
          </span>
        )}
        {conexionOk === false && (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded border border-red-400">
            Error de enlace con Supabase
          </span>
        )}
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#1F2937] mb-6">
            Sube y procesa archivos CSV, JSON y TXT
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Carga tus archivos de datos de forma rápida, segura y sencilla desde una interfaz intuitiva.
          </p>

          {/* Aquí se renderiza tu nuevo FileUploader. 
              Recuerda que este componente ahora maneja internamente:
              1. Validación de formato (.csv, .json, .txt)
              2. Subida a Storage
              3. Registro de metadatos (Tamaño, fecha, responsable)
          */}
          <FileUploader />
        </div>
      </section>

      {/* File Type Cards */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <FileTypeCard
              icon={Table}
              title="Archivos CSV"
              description="Carga y procesa tablas y datos estructurados fácilmente."
            />
            <FileTypeCard
              icon={FileJson}
              title="Archivos JSON"
              description="Visualiza y manipula estructuras JSON rápidamente."
            />
            <FileTypeCard
              icon={FileText}
              title="Archivos TXT"
              description="Importa archivos de texto plano para análisis y procesamiento."
            />
          </div>
        </div>
      </section>

      <HowItWorks />
      <Footer />
    </div>
  );
}
