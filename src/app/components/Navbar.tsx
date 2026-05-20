import { FileText } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-[#E53935]" />
            <span className="text-xl font-semibold text-[#1F2937]">GoDataFlow</span>
          </div>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-[#1F2937] hover:text-[#E53935] transition-colors">
              Inicio
            </a>
            <a href="#" className="text-[#1F2937] hover:text-[#E53935] transition-colors">
              Herramientas
            </a>
            <a href="#" className="text-[#1F2937] hover:text-[#E53935] transition-colors">
              Formatos soportados
            </a>
            <a href="#" className="text-[#1F2937] hover:text-[#E53935] transition-colors">
              Documentación
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
