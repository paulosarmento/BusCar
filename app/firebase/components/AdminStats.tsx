import { StatsCard } from "@/app/firebase/components/StatsCard";
import { BarChart3, Calendar, Car, MapPin, Sparkles } from "lucide-react";

interface AdminStatsProps {
  carros: any[];
  carrosAtivos: any[];
  reservasConfirmadas: number;
  viagensAbertas: number;
}

export function AdminStats({
  carros,
  carrosAtivos,
  reservasConfirmadas,
  viagensAbertas,
}: AdminStatsProps) {
  return (
    <div className="mb-8 animate-in slide-in-from-top-4 duration-500">
      <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-yellow-500" />
        Visão Geral
      </h2>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total de Carros"
          value={carros.length}
          icon={<Car className="w-4 h-4 text-slate-500" />}
          borderColor="border-l-4 border-l-slate-800"
        />
        <StatsCard
          title="Frota Ativa"
          value={carrosAtivos.length}
          icon={<BarChart3 className="w-4 h-4 text-blue-500" />}
          borderColor="border-l-4 border-l-blue-500"
        />
        <StatsCard
          title="Reservas Confirmadas"
          value={reservasConfirmadas}
          icon={<Calendar className="w-4 h-4 text-green-500" />}
          borderColor="border-l-4 border-l-green-500"
        />
        <StatsCard
          title="Viagens Abertas"
          value={viagensAbertas}
          icon={<MapPin className="w-4 h-4 text-red-500" />}
          borderColor="border-l-4 border-l-red-500"
        />
      </div>
    </div>
  );
}
