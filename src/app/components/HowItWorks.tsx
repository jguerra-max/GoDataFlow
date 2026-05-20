import { Upload, Search, Eye, Download } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    { icon: Upload, text: 'Sube tu archivo' },
    { icon: Search, text: 'El sistema analiza el contenido' },
    { icon: Eye, text: 'Visualiza o procesa los datos' },
    { icon: Download, text: 'Descarga resultados' },
  ];

  return (
    <div id="modo-de-uso" className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#E53935]/10 to-transparent rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-48 h-48 mx-auto bg-white rounded-xl shadow-xl flex items-center justify-center">
                  <svg className="w-24 h-24 text-[#E53935]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Steps */}
          <div>

            <div className="space-y-6 mb-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E53935] text-white flex items-center justify-center flex-shrink-0 shadow-lg">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <p className="text-gray-700">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
