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
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 sticky top-[73px] z-10 bg-slate-50/95 backdrop-blur py-2 -mx-4 px-4 xl:mx-0 xl:px-0 xl:static xl:bg-transparent">
      {/* LISTA DE ABAS */}
      <div className="w-full overflow-x-auto pb-1 xl:pb-0 scrollbar-hide">
        <TabsList className="bg-white border p-1 h-auto inline-flex w-auto min-w-full sm:min-w-0 justify-start">
          {role === "admin" ? (
            <>
              <TabsTrigger
                value="carros"
                className="gap-2 px-4 py-2 data-[state=active]:bg-slate-100 data-[state=active]:text-primary"
              >
                <Car className="w-4 h-4" /> Carros
              </TabsTrigger>
              <TabsTrigger
                value="viagens"
                className="gap-2 px-4 py-2 data-[state=active]:bg-slate-100 data-[state=active]:text-primary"
              >
                <MapPin className="w-4 h-4" /> Viagens
              </TabsTrigger>
              <TabsTrigger
                value="destinos"
                className="gap-2 px-4 py-2 data-[state=active]:bg-slate-100 data-[state=active]:text-primary"
              >
                <Navigation className="w-4 h-4" /> Rotas
              </TabsTrigger>
              <TabsTrigger
                value="agendamentos"
                className="gap-2 px-4 py-2 data-[state=active]:bg-slate-100 data-[state=active]:text-primary"
              >
                <Calendar className="w-4 h-4" /> Reservas
              </TabsTrigger>
              <TabsTrigger
                value="usuarios"
                className="gap-2 px-4 py-2 data-[state=active]:bg-slate-100 data-[state=active]:text-primary"
              >
                <Users className="w-4 h-4" /> Clientes
              </TabsTrigger>
            </>
          ) : (
            <>
              <TabsTrigger
                value="viagens"
                className="gap-2 px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
              >
                <MapPin className="w-4 h-4" /> Viagens
              </TabsTrigger>
              <TabsTrigger
                value="agendamentos"
                className="gap-2 px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
              >
                <Calendar className="w-4 h-4" /> Minhas Reservas
              </TabsTrigger>
              <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block" />
              <TabsTrigger value="tours" className="gap-2 px-4 py-2">
                <Compass className="w-4 h-4" /> Tours
              </TabsTrigger>
              <TabsTrigger value="passeios" className="gap-2 px-4 py-2">
                <Palmtree className="w-4 h-4" /> Passeios
              </TabsTrigger>
              <TabsTrigger value="pousadas" className="gap-2 px-4 py-2">
                <Hotel className="w-4 h-4" /> Pousadas
              </TabsTrigger>
              <TabsTrigger value="restaurantes" className="gap-2 px-4 py-2">
                <Utensils className="w-4 h-4" /> Gastronomia
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
