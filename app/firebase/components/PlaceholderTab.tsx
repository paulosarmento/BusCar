import { LucideIcon } from "lucide-react";

interface PlaceholderTabProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export function PlaceholderTab({
  icon: Icon,
  title,
  description = "Em breve novidades por aqui.",
}: PlaceholderTabProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-dashed">
      <Icon className="w-12 h-12 text-slate-300 mb-4" />
      <h3 className="text-lg font-medium text-slate-600">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}
