"use client";

import { getAuthInstance } from "@/lib/firebase";

import { signOut } from "firebase/auth";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../components/Ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/Ui/tabs";
import { Car, Calendar, Plus, BarChart3, MapPin } from "lucide-react";
import { StatsCard } from "../components/StatsCard";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import { HeaderAdm } from "../components/HeaderAdm";
import { CarrosTab } from "../components/CarrosTab";
import { ViagensTab } from "../components/ViagensTab";
import { AgendamentosTab } from "../components/AgendamentosTab";
import { CarroDialog } from "../components/CarroDialog";
import { ViagemDialog } from "../components/ViagemDialog";
import { ReservaDialog } from "../components/ReservaDialog";
import { useCarros } from "../../hooks/useCarros";
import { useViagens } from "../../hooks/useViagens";
import { useReservas } from "../../hooks/useReservas";
import { useFirebaseData } from "../../hooks/useFirebaseData";
import type { TabKey } from "@/types/types";

export default function Home() {
  const user = useAuthGuard();
  const router = useRouter();
  const {
    data,
    loading,
    fetchData,
    carrosAtivos,
    viagensAbertas,
    carrosInativos,
    reservasConfirmadas,
    carros,
    viagens,
    reservas,
  } = useFirebaseData();

  const [activeTab, setActiveTab] = useState<TabKey>("carros");

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

  const carrosHook = useCarros({ fetchData });

  const reservasHook = useReservas({
    userId: user?.uid,
  });

  const viagensHook = useViagens({
    fetchData,
    onViagemRemovida: reservasHook.fetchReservas,
  });

  useEffect(() => {
    fetchData();
    reservasHook.fetchReservas();
  }, []);

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-foreground text-lg font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  const logout = async () => {
    try {
      await signOut(getAuthInstance());
      router.replace("/login");
    } catch (err) {
      console.error("Erro ao fazer logout", err);
    }
  };

  const hasCarrosAtivos = carrosAtivos.length > 0;

  const viagemButtonLabel = hasCarrosAtivos
    ? "Cadastrar Viagem"
    : "Cadastre um carro ativo primeiro";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <HeaderAdm user={user} setActiveTab={setActiveTab} logout={logout} />

      <div className="container mx-auto px-4 lg:px-8 py-8   ">
        <div className="hidden sm:block">
          <div className="grid gap-4 md:grid-cols-4 mb-8 ">
            <StatsCard
              title="Total de Carros"
              value={carros.length}
              icon={<BarChart3 className="w-4 h-4" />}
              borderColor="border-l-4 border-l-yellow-500"
            />
            <StatsCard
              title="Carros Ativos"
              value={carrosAtivos.length}
              icon={<BarChart3 className="w-4 h-4" />}
              borderColor="border-l-4 border-l-blue-500"
            />
            <StatsCard
              title="Reservas Ativas"
              value={reservasConfirmadas}
              icon={<BarChart3 className="w-4 h-4" />}
              borderColor="border-l-4 border-l-green-500"
            />
            <StatsCard
              title="Viagens Abertas"
              value={viagensAbertas}
              icon={<BarChart3 className="w-4 h-4" />}
              borderColor="border-l-4 border-l-red-500"
            />
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TabKey)}
          className="w-full"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="carros" className="gap-2">
                  <Car className="w-4 h-4" />
                  Carros
                </TabsTrigger>
                <TabsTrigger value="viagens" className="gap-2">
                  <MapPin className="w-4 h-4" />
                  Viagens
                </TabsTrigger>
                <TabsTrigger value="agendamentos" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  Agendamentos
                </TabsTrigger>
              </TabsList>
            </div>

            {activeTab === "carros" && (
              <Button
                className="gap-2 w-full sm:w-auto"
                onClick={carrosHook.openAddDialog}
              >
                <Plus className="w-4 h-4" />
                Adicionar Carro
              </Button>
            )}
            {activeTab === "viagens" && (
              <Button
                className="gap-2 w-full sm:w-auto"
                onClick={viagensHook.openAddDialog}
                disabled={!hasCarrosAtivos}
              >
                <Plus className="w-4 h-4" />
                {viagemButtonLabel}
              </Button>
            )}
          </div>

          <TabsContent value="carros" className="mt-0">
            <CarrosTab
              carrosAtivos={carrosAtivos}
              carrosInativos={carrosInativos}
              onAdd={carrosHook.openAddDialog}
              onEdit={carrosHook.openEditDialog}
              onDelete={carrosHook.remove}
              qtdCarros={carros.length}
            />
          </TabsContent>

          <TabsContent value="viagens" className="mt-0">
            <ViagensTab
              viagens={viagens}
              carrosAtivosCount={carrosAtivos.length}
              getCarroById={getCarroById}
              onAddViagem={viagensHook.openAddDialog}
              onEditViagem={viagensHook.openEditDialog}
              onDeleteViagem={viagensHook.remove}
              onReservar={reservasHook.openDialog}
            />
          </TabsContent>

          <TabsContent value="paradas" className="mt-0">
            <div className="mt-4">Paradas</div>
          </TabsContent>

          <TabsContent value="agendamentos" className="mt-0">
            <AgendamentosTab
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
        </Tabs>
      </div>

      <CarroDialog
        open={carrosHook.isDialogOpen}
        onOpenChange={carrosHook.setIsDialogOpen}
        formData={carrosHook.formData}
        setFormData={carrosHook.setFormData}
        editingCar={!!carrosHook.editingCar}
        isSubmitting={carrosHook.isSubmitting}
        onSubmit={carrosHook.submit}
        onClose={carrosHook.closeDialog}
        handleUploadFoto={carrosHook.handleUploadFoto}
        uploadingFoto={carrosHook.uploadingFoto}
      />

      <ViagemDialog
        open={viagensHook.isDialogOpen}
        onOpenChange={viagensHook.setIsDialogOpen}
        formData={viagensHook.formData}
        setFormData={viagensHook.setFormData}
        carros={carros}
        editing={!!viagensHook.editingViagem}
        isSubmitting={viagensHook.isSubmitting}
        onSubmit={viagensHook.submit}
        onClose={viagensHook.closeDialog}
      />

      <ReservaDialog
        open={reservasHook.isDialogOpen}
        onOpenChange={reservasHook.setIsDialogOpen}
        viagem={reservasHook.viagemSelecionada}
        getCarroById={getCarroById}
        formData={reservasHook.formData}
        setFormData={reservasHook.setFormData}
        isSubmitting={reservasHook.isSubmitting}
        onSubmit={reservasHook.submit}
        onClose={reservasHook.closeDialog}
        showPayment={reservasHook.showPayment}
        reservaAtual={reservasHook.reservaAtual}
        onPaymentSuccess={() =>
          reservasHook.confirmarPagamento(
            reservasHook.reservaAtual?.id || "",
            reservasHook.reservaAtual?.mercadoPagoOrderId || ""
          )
        }
      />
    </div>
  );
}
