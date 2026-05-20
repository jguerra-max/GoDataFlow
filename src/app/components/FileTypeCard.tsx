import { LucideIcon } from 'lucide-react';

interface FileTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FileTypeCard({ icon: Icon, title, description }: FileTypeCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-[#E53935]/20 group">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E53935] transition-colors">
          <Icon className="w-6 h-6 text-[#E53935] group-hover:text-white transition-colors" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#1F2937] mb-2">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
