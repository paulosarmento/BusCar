import { Button } from "@/app/components/Ui/button";
import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import {
  Car,
  MapPin,
  Navigation,
  Calendar,
  Users,
  Compass,
  Palmtree,
  Hotel,
  Utensils,
  Plus,
} from "lucide-react";

interface DashboardMenuProps {
  role: string;
  activeTab: string;
  hasCarrosAtivos: boolean;
  onAddViagem: () => void;
  onAddDestino: () => void;
}

export function DashboardMenu({
  role,
  activeTab,
  hasCarrosAtivos,
  onAddViagem,
  onAddDestino,
}: DashboardMenuProps) {
  return (
    // AJUSTE CRÍTICO: Removi 'sticky top-...' e 'backdrop-blur'.
    // Agora é um componente estático que rola com a página, limpando a visão.
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 py-2">
      {/* LISTA DE ABAS - Estilo Pílula Limpo */}
      <div className="w-full overflow-x-auto pb-2 xl:pb-0 scrollbar-hide -mx-4 px-4 xl:mx-0 xl:px-0">
        <TabsList className="bg-white border rounded-lg p-1 h-auto inline-flex w-auto min-w-full sm:min-w-0 justify-start shadow-sm">
          {role === "admin" ? (
            <>
              <TabsTrigger
                value="carros"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium text-slate-600 data-[state=active]:bg-slate-100 data-[state=active]:text-primary transition-all"
              >
                <Car className="w-4 h-4" /> Carros
              </TabsTrigger>
              <TabsTrigger
                value="viagens"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium text-slate-600 data-[state=active]:bg-slate-100 data-[state=active]:text-primary transition-all"
              >
                <MapPin className="w-4 h-4" /> Viagens
              </TabsTrigger>
              <TabsTrigger
                value="destinos"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium text-slate-600 data-[state=active]:bg-slate-100 data-[state=active]:text-primary transition-all"
              >
                <Navigation className="w-4 h-4" /> Rotas
              </TabsTrigger>
              <TabsTrigger
                value="agendamentos"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium text-slate-600 data-[state=active]:bg-slate-100 data-[state=active]:text-primary transition-all"
              >
                <Calendar className="w-4 h-4" /> Reservas
              </TabsTrigger>
              <TabsTrigger
                value="usuarios"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium text-slate-600 data-[state=active]:bg-slate-100 data-[state=active]:text-primary transition-all"
              >
                <Users className="w-4 h-4" /> Clientes
              </TabsTrigger>
            </>
          ) : (
            <>
              <TabsTrigger
                value="viagens"
                className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium text-slate-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 transition-all"
              >
                <MapPin className="w-4 h-4" /> Viagens
              </TabsTrigger>
              <TabsTrigger
                value="agendamentos"
                className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium text-slate-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 transition-all"
              >
                <Calendar className="w-4 h-4" /> Minhas Reservas
              </TabsTrigger>

              <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block self-center" />

              <TabsTrigger
                value="tours"
                className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium text-slate-600 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 transition-all"
              >
                <Compass className="w-4 h-4" /> Tours
              </TabsTrigger>
              <TabsTrigger
                value="passeios"
                className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium text-slate-600 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 transition-all"
              >
                <Palmtree className="w-4 h-4" /> Passeios
              </TabsTrigger>
            </>
          )}
        </TabsList>
      </div>

      {/* BOTÕES DE AÇÃO */}
      <div className="flex items-center gap-2 shrink-0">
        {activeTab === "viagens" && role === "admin" && (
          <Button
            onClick={onAddViagem}
            disabled={!hasCarrosAtivos}
            className="w-full sm:w-auto shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            {hasCarrosAtivos ? "Nova Viagem" : "Sem Carros Ativos"}
          </Button>
        )}
        {activeTab === "destinos" && role === "admin" && (
          <Button
            onClick={onAddDestino}
            className="w-full sm:w-auto shadow-sm"
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Rota
          </Button>
        )}
      </div>
    </div>
  );
}
