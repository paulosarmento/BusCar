"use client";

import type React from "react";
import { getAuthInstance } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
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
import { Carro, Viagem } from "@/types/types";

export default function Home() {
  const user = useAuthGuard();
  const router = useRouter();
  const { data, loading, fetchData } = useFirebaseData();
  const carros: Carro[] = data.carros;
  const viagens: Viagem[] = data.viagens;

  const [activeTab, setActiveTab] = useState("carros");

  const carrosAtivos = carros.filter((c) => c.ativo).length;
  // const carrosInativos = carros.filter((c: any) => !c.Ativo).length;

  const viagensAbertas = viagens.filter((v) => v.status === "aberta").length;

  const carrosMap = useMemo(
    () => new Map(carros.map((c) => [c.id, c])),
    [carros]
  );

  const viagensMap = useMemo(
    () => new Map(viagens.map((v) => [v.id, v])),
    [viagens]
  );

  const getCarroById = (id: string) => carrosMap.get(id);
  const getViagemById = (id: string) => viagensMap.get(id);

  const carrosHook = useCarros({ fetchData });
  const viagensHook = useViagens({ fetchData });
  const reservasHook = useReservas({
    userId: user?.uid,
    fetchData,
  });

  useEffect(() => {
    fetchData();
    reservasHook.fetchReservas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reservasConfirmadas = reservasHook.reservasConfirmadas;
  // const reservasCanceladas = reservasHook.reservasCanceladas;

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

  async function logout() {
    const auth = getAuthInstance();
    await signOut(auth);
    router.push("/login");
  }

  const viagemButtonLabel =
    carrosAtivos === 0
      ? "Cadastre um carro ativo primeiro"
      : "Cadastrar Viagem";

  const reservaButtonLabel =
    carrosAtivos === 0
      ? "Cadastre um carro ativo primeiro"
      : "Cadastrar Reserva";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <HeaderAdm user={user} setActiveTab={setActiveTab} logout={logout} />

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <StatsCard
            title="Total de Carros"
            value={carros.length}
            icon={<BarChart3 className="w-4 h-4" />}
            borderColor="border-l-4 border-l-yellow-500"
          />
          <StatsCard
            title="Carros Ativos"
            value={carrosAtivos}
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-6">
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

            {activeTab === "carros" && (
              <Button className="gap-2" onClick={carrosHook.openAddDialog}>
                <Plus className="w-4 h-4" />
                Adicionar Carro
              </Button>
            )}

            {activeTab === "viagens" && (
              <Button
                className="gap-2"
                onClick={viagensHook.openAddDialog}
                disabled={carrosAtivos === 0}
              >
                <Plus className="w-4 h-4" />
                {viagemButtonLabel}
              </Button>
            )}
          </div>

          <TabsContent value="carros" className="mt-0">
            <CarrosTab
              carros={carros}
              onAdd={carrosHook.openAddDialog}
              onEdit={carrosHook.openEditDialog}
              onDelete={carrosHook.remove}
            />
          </TabsContent>

          <TabsContent value="viagens" className="mt-0">
            <ViagensTab
              viagens={viagens}
              carrosAtivosCount={carrosAtivos}
              getCarroById={getCarroById}
              onAddViagem={viagensHook.openAddDialog}
              onEditViagem={viagensHook.openEditDialog}
              onDeleteViagem={viagensHook.remove}
              onReservar={reservasHook.openDialog}
            />
          </TabsContent>

          <TabsContent value="agendamentos" className="mt-0">
            <AgendamentosTab
              reservas={reservasHook.reservasDoUsuario}
              getViagemById={getViagemById}
              getCarroById={getCarroById}
              onCancelReserva={reservasHook.cancelar}
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
      />
    </div>
  );
}
