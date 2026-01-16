"use client";

import { getAuthInstance } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Compass,
  Hotel,
  LayoutDashboard,
  Palmtree,
  Utensils,
} from "lucide-react";

// Components
import { Tabs, TabsContent } from "../components/Ui/tabs";
import { HeaderAdm } from "../components/HeaderAdm";
import { CarrosTab } from "../components/CarrosTab";
import { ViagensTab } from "../components/ViagensTab";
import { AgendamentosTab } from "../components/AgendamentosTab";
import { DestinosTabs } from "../components/DestinosTab";

// Hooks
import { useAuthGuard } from "../../hooks/useAuthGuard";
import { useCarros } from "../../hooks/useCarros";
import { useViagens } from "../../hooks/useViagens";
import { useFirebaseData } from "../../hooks/useFirebaseData";
import { useReservas } from "@/hooks/useReservas";
import { useDestinos } from "@/hooks/useDestinos";
import type { TabKey } from "@/types/types";
import { AdminStats } from "./components/AdminStats";
import { DashboardMenu } from "./components/DashboardMenu";
import { PlaceholderTab } from "./components/PlaceholderTab";
import { DashboardDialogs } from "./components/DashboardDialogs";

export default function Home() {
  const user = useAuthGuard();
  const router = useRouter();

  const {
    loading,
    fetchData,
    carrosAtivos,
    viagensAbertas,
    carrosInativos,
    reservasConfirmadas,
    carros,
    viagens,
    destinos,
    destinosAtivos,
    destinosInativos,
  } = useFirebaseData();

  const [activeTab, setActiveTab] = useState<TabKey>("carros");

  // Memos
  const carrosMap = useMemo(
    () => new Map(carros.map((c) => [c.id, c])),
    [carros]
  );
  const viagensMap = useMemo(
    () => new Map(viagens.map((v) => [v.id, v])),
    [viagens]
  );

  const getCarroById = useCallback(
    (id: string) => carrosMap.get(id),
    [carrosMap]
  );
  const getViagemById = useCallback(
    (id: string) => viagensMap.get(id),
    [viagensMap]
  );

  // Hooks de Lógica de Negócio
  const carrosHook = useCarros({ fetchData });
  const reservasHook = useReservas({ userId: user?.uid });
  const viagensHook = useViagens({
    fetchData,
    onViagemRemovida: reservasHook.fetchReservas,
  });
  const destinosHook = useDestinos({ fetchData });

  const role = user?.providerData?.some((p: any) => p.providerId === "password")
    ? "admin"
    : "user";

  useEffect(() => {
    fetchData();
    reservasHook.fetchReservas();
    if (role === "user") setActiveTab("viagens");
    if (role === "admin") setActiveTab("carros");
  }, [role]);

  const logout = async () => {
    await signOut(getAuthInstance());
    router.replace("/login");
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="bg-white p-4 rounded-full shadow-sm">
            <LayoutDashboard className="w-8 h-8 text-primary/50" />
          </div>
          <div className="text-slate-400 font-medium tracking-wide text-sm">
            CARREGANDO...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <HeaderAdm user={user} setActiveTab={setActiveTab} logout={logout} />

      <main className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
        {/* COMPONENTE 1: Estatísticas */}
        {role === "admin" && (
          <AdminStats
            carros={carros}
            carrosAtivos={carrosAtivos}
            reservasConfirmadas={reservasConfirmadas}
            viagensAbertas={viagensAbertas}
          />
        )}

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TabKey)}
          className="w-full space-y-6"
        >
          {/* COMPONENTE 2: Menu e Botões */}
          <DashboardMenu
            role={role}
            activeTab={activeTab}
            hasCarrosAtivos={carrosAtivos.length > 0}
            onAddViagem={viagensHook.openAddDialog}
            onAddDestino={destinosHook.openAddDialog}
          />

          {/* CONTEÚDO DAS ABAS */}
          <div className="bg-transparent min-h-[400px]">
            <TabsContent value="carros" className="mt-0 focus-visible:ring-0">
              <CarrosTab
                carrosAtivos={carrosAtivos}
                carrosInativos={carrosInativos}
                onAdd={carrosHook.openAddDialog}
                onEdit={carrosHook.openEditDialog}
                onDelete={carrosHook.remove}
                qtdCarros={carros.length}
              />
            </TabsContent>

            <TabsContent value="viagens" className="mt-0 focus-visible:ring-0">
              <ViagensTab
                role={role}
                viagens={viagens}
                carrosAtivosCount={carrosAtivos.length}
                getCarroById={getCarroById}
                onAddViagem={viagensHook.openAddDialog}
                onEditViagem={viagensHook.openEditDialog}
                onDeleteViagem={viagensHook.remove}
                onReservar={reservasHook.openDialog}
              />
            </TabsContent>

            <TabsContent value="destinos" className="mt-0 focus-visible:ring-0">
              <DestinosTabs
                destinosInativos={destinosInativos}
                onAdd={destinosHook.openAddDialog}
                onEdit={destinosHook.openEditDialog}
                onDelete={destinosHook.remove}
                destinosAtivos={destinosAtivos}
                qtdDestinos={destinos.length}
              />
            </TabsContent>

            <TabsContent
              value="agendamentos"
              className="mt-0 focus-visible:ring-0"
            >
              <AgendamentosTab
                role={role}
                reservas={reservasHook.reservasDoUsuario}
                getViagemById={getViagemById}
                getCarroById={getCarroById}
                onCancelReserva={reservasHook.cancelarReserva}
                modalAberta={reservasHook.modalAberta}
                reservaAtual={reservasHook.reservaAtual}
                setModalAberta={reservasHook.setModalAberta}
                onVerDetalhes={reservasHook.verDetalhes}
                handleGerarPix={reservasHook.handleGerarPix}
                viagemSelecionada={reservasHook.viagemSelecionada}
              />
            </TabsContent>

            {/* Placeholders simplificados */}
            {role === "user" && (
              <>
                <TabsContent value="tours" className="mt-0">
                  <PlaceholderTab icon={Compass} title="Tours & Passeios" />
                </TabsContent>
                <TabsContent value="passeios" className="mt-0">
                  <PlaceholderTab icon={Palmtree} title="Passeios" />
                </TabsContent>
                <TabsContent value="pousadas" className="mt-0">
                  <PlaceholderTab
                    icon={Hotel}
                    title="Parceiros de Hospedagem"
                  />
                </TabsContent>
                <TabsContent value="restaurantes" className="mt-0">
                  <PlaceholderTab icon={Utensils} title="Gastronomia Local" />
                </TabsContent>
              </>
            )}
          </div>
        </Tabs>
      </main>

      {/* COMPONENTE 3: Diálogos Agrupados */}
      <DashboardDialogs
        carrosHook={carrosHook}
        viagensHook={viagensHook}
        reservasHook={reservasHook}
        destinosHook={destinosHook}
        carros={carros}
        destinos={destinos}
        getCarroById={getCarroById}
      />
    </div>
  );
}
