"use client";

import type React from "react";

import { getAuthInstance } from "@/lib/firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/card";
import { Button } from "../components/button";
import { Avatar, AvatarFallback } from "../components/avatar";
import { Badge } from "../components/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/dialog";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Switch } from "../components/switch";
import { LogOut, Pause } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select";
import { Checkbox } from "../components/checkbox";
import {
  Car,
  Calendar,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  BarChart3,
  MapPin,
  Users,
  Clock,
} from "lucide-react";

interface Carro {
  id: string;
  Modelo: string;
  Placa: string;
  Ativo: boolean;
  foto?: string;
}

interface Viagem {
  id: string;
  carroId: string;
  dataHora: string;
  capacidadeMax: number;
  status: string;
  createdAt?: string;
}

interface Reserva {
  id: string;
  viagemId: string;
  usuarioId: string;
  aceitaLotacao4: boolean;
  status: string;
  createdAt?: string;
}

export default function Home() {
  const [dados, setDados] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("carros");

  const [reservas, setReservas] = useState<Reserva[]>([]);
  const reservasDoUsuario = reservas.filter(
    (reserva) => reserva.usuarioId === user?.uid
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Carro | null>(null);
  const [formData, setFormData] = useState({
    Modelo: "",
    Placa: "",
    Ativo: true,
    foto: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isViagemDialogOpen, setIsViagemDialogOpen] = useState(false);
  const [editingViagem, setEditingViagem] = useState<Viagem | null>(null);
  const [viagemFormData, setViagemFormData] = useState({
    carroId: "",
    dataHora: "",
    capacidadeMax: 4,
    status: "aberta",
  });
  const [isViagemSubmitting, setIsViagemSubmitting] = useState(false);

  const [isReservaDialogOpen, setIsReservaDialogOpen] = useState(false);
  const [viagemSelecionada, setViagemSelecionada] = useState<Viagem | null>(
    null
  );
  const [reservaFormData, setReservaFormData] = useState({
    aceitaLotacao4: false,
  });
  const [isReservaSubmitting, setIsReservaSubmitting] = useState(false);

  const fetchReservas = async () => {
    try {
      const res = await fetch("/api/firebase");
      const data = await res.json();
      setReservas(data.reservas);
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
      setReservas([]); // Ensure it's always an array even on error
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch("/api/firebase");
      const data = await res.json();
      setDados(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchReservas();
  }, []);

  useEffect(() => {
    const auth = getAuthInstance();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [router]);

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

  const handleOpenAddDialog = () => {
    setEditingCar(null);
    setFormData({ Modelo: "", Placa: "", Ativo: true, foto: "" });
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (carro: Carro) => {
    setEditingCar(carro);
    setFormData({
      Modelo: carro.Modelo,
      Placa: carro.Placa,
      Ativo: carro.Ativo,
      foto: carro.foto || "",
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCar(null);
    setFormData({ Modelo: "", Placa: "", Ativo: true, foto: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingCar) {
        const res = await fetch(`/api/carros/${editingCar.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error("Erro ao editar carro");
      } else {
        const res = await fetch("/api/carros", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error("Erro ao adicionar carro");
      }

      await fetchData();
      handleCloseDialog();
    } catch (error) {
      console.error(error);
      alert(editingCar ? "Erro ao editar carro" : "Erro ao adicionar carro");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este carro?")) return;

    try {
      const res = await fetch(`/api/carros/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao excluir carro");

      await fetchData();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir carro");
    }
  };

  const handleOpenAddViagemDialog = () => {
    setEditingViagem(null);
    setViagemFormData({
      carroId: "",
      dataHora: "",
      capacidadeMax: 4,
      status: "aberta",
    });
    setIsViagemDialogOpen(true);
  };

  const handleOpenEditViagemDialog = (viagem: Viagem) => {
    setEditingViagem(viagem);
    let dataHoraFormatted = "";
    if (viagem.dataHora) {
      try {
        const date = new Date(viagem.dataHora);
        if (!isNaN(date.getTime())) {
          dataHoraFormatted = date.toISOString().slice(0, 16);
        }
      } catch (e) {
        console.error("Error parsing date:", e);
      }
    }
    setViagemFormData({
      carroId: viagem.carroId,
      dataHora: dataHoraFormatted,
      capacidadeMax: viagem.capacidadeMax,
      status: viagem.status,
    });
    setIsViagemDialogOpen(true);
  };

  const handleCloseViagemDialog = () => {
    setIsViagemDialogOpen(false);
    setEditingViagem(null);
    setViagemFormData({
      carroId: "",
      dataHora: "",
      capacidadeMax: 4,
      status: "aberta",
    });
  };

  const handleViagemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsViagemSubmitting(true);

    try {
      if (editingViagem) {
        const res = await fetch(`/api/viagens/${editingViagem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(viagemFormData),
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Erro ao editar viagem");
        }
      } else {
        const res = await fetch("/api/viagens", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(viagemFormData),
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Erro ao adicionar viagem");
        }
      }

      await fetchData();
      handleCloseViagemDialog();
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsViagemSubmitting(false);
    }
  };

  const handleDeleteViagem = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta viagem?")) return;

    try {
      const res = await fetch(`/api/viagens/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao excluir viagem");

      await fetchData();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir viagem");
    }
  };

  const handleOpenReservaDialog = (viagem: Viagem) => {
    setViagemSelecionada(viagem);
    setReservaFormData({ aceitaLotacao4: false });
    setIsReservaDialogOpen(true);
  };

  const handleCloseReservaDialog = () => {
    setIsReservaDialogOpen(false);
    setViagemSelecionada(null);
    setReservaFormData({ aceitaLotacao4: false });
  };

  const handleReservaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsReservaSubmitting(true);

    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          viagemId: viagemSelecionada?.id,
          usuarioId: user?.uid,
          aceitaLotacao4: reservaFormData.aceitaLotacao4,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Erro ao criar reserva");
      }

      alert("Reserva criada com sucesso!");
      await fetchData();
      await fetchReservas();
      handleCloseReservaDialog();
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsReservaSubmitting(false);
    }
  };

  const handleCancelReserva = async (id: string) => {
    if (!confirm("Tem certeza que deseja cancelar esta reserva?")) return;

    try {
      const res = await fetch(`/api/reservas/${id}/cancelar`, {
        method: "POST",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Erro ao cancelar reserva");
      }

      alert("Reserva cancelada com sucesso!");
      await fetchReservas();
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  const carros = dados.carros || [];
  const carrosAtivos = carros.filter((c: any) => c.Ativo).length;
  const carrosInativos = carros.filter((c: any) => !c.Ativo).length;

  const viagens = dados.viagens || [];
  const viagensAbertas = viagens.filter(
    (v: any) => v.status === "aberta"
  ).length;

  const getCarroById = (id: string) => carros.find((c: any) => c.id === id);
  const getViagemById = (id: string) => viagens.find((v: any) => v.id === id);

  const reservasConfirmadas = (reservas || []).filter(
    (r) => r.status === "confirmada" && r.usuarioId === user?.uid
  ).length;

  const reservasCanceladas = (reservas || []).filter(
    (r) => r.status === "cancelada" && r.usuarioId === user?.uid
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Car className="w-6 h-6 text-primary" />
              </div>
              <div onClick={() => setActiveTab("carros")}>
                <h1 className="text-xl font-bold text-foreground">
                  Dashboard Administrativo
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Gestão de Frota e Agendamentos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="border-2 border-primary/20">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-foreground">
                    {user.displayName || "Administrador"}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="gap-2 bg-transparent"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Total de Carros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                {carros.length}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                veículos cadastrados
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Carros Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                {carrosAtivos}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                disponíveis para aluguel
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Reservas Ativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">
                {reservasConfirmadas}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                agendamentos confirmados
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Viagens Abertas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-600">
                {viagensAbertas}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                disponíveis para reserva
              </p>
            </CardContent>
          </Card>
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
              <Button className="gap-2" onClick={handleOpenAddDialog}>
                <Plus className="w-4 h-4" />
                Adicionar Carro
              </Button>
            )}
            {activeTab === "viagens" && (
              <Button
                className="gap-2"
                onClick={handleOpenAddViagemDialog}
                disabled={carrosAtivos === 0}
              >
                <Plus className="w-4 h-4" />
                {carrosAtivos === 0
                  ? "Cadastre um carro ativo primeiro"
                  : "Cadastrar Viagem"}
              </Button>
            )}
          </div>

          <TabsContent value="carros" className="mt-0">
            {carros.length === 0 ? (
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="w-5 h-5" />
                    Nenhum carro cadastrado
                  </CardTitle>
                  <CardDescription>
                    Comece adicionando veículos à sua frota para gerenciar
                    aluguéis.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="gap-2" onClick={handleOpenAddDialog}>
                    <Plus className="w-4 h-4" />
                    Cadastrar Primeiro Carro
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {carros.map((carro: any) => (
                  <Card
                    key={carro.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="aspect-video w-full bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                      {carro.foto ? (
                        <img
                          src={carro.foto || "/placeholder.svg"}
                          alt={carro.Modelo}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Car className="w-16 h-16 text-slate-300" />
                        </div>
                      )}
                      <Badge
                        variant={carro.Ativo ? "default" : "destructive"}
                        className="absolute top-3 right-3 shadow-md"
                      >
                        {carro.Ativo ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-lg">{carro.Modelo}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-foreground">
                          {carro.Placa}
                        </span>
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2 bg-transparent"
                          onClick={() => handleOpenEditDialog(carro)}
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2 bg-transparent text-destructive hover:text-destructive"
                          onClick={() => handleDelete(carro.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Excluir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="viagens" className="mt-0">
            {viagens.length === 0 ? (
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Nenhuma viagem cadastrada
                  </CardTitle>
                  <CardDescription>
                    Crie viagens disponíveis para que os clientes possam fazer
                    reservas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="gap-2"
                    onClick={handleOpenAddViagemDialog}
                    disabled={carrosAtivos === 0}
                  >
                    <Plus className="w-4 h-4" />
                    {carrosAtivos === 0
                      ? "Cadastre um carro ativo primeiro"
                      : "Cadastrar Primeira Viagem"}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {viagens.map((viagem: any) => {
                  const carro = getCarroById(viagem.carroId);
                  return (
                    <Card
                      key={viagem.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 h-48 md:h-auto bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden flex-shrink-0">
                          {carro?.foto ? (
                            <img
                              src={carro.foto || "/placeholder.svg"}
                              alt={carro.Modelo}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Car className="w-12 h-12 text-slate-300" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <CardTitle className="text-lg flex items-center gap-2">
                                  <MapPin className="w-5 h-5 text-primary" />
                                  {carro?.Modelo || "Carro não encontrado"}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-2">
                                  <span className="font-mono">
                                    {carro?.Placa}
                                  </span>
                                </CardDescription>
                              </div>
                              <Badge
                                variant={
                                  viagem.status === "aberta"
                                    ? "default"
                                    : viagem.status === "fechada"
                                    ? "secondary"
                                    : "destructive"
                                }
                              >
                                {viagem.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Data e Hora
                                  </p>
                                  <p className="font-medium">
                                    {viagem.dataHora
                                      ? new Date(
                                          viagem.dataHora
                                        ).toLocaleString("pt-BR", {
                                          dateStyle: "short",
                                          timeStyle: "short",
                                        })
                                      : "Data não disponível"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Capacidade
                                  </p>
                                  <p className="font-medium">
                                    {viagem.capacidadeMax} passageiros
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {viagem.status === "aberta" && (
                                <Button
                                  variant="default"
                                  size="sm"
                                  className="flex-1 gap-2"
                                  onClick={() =>
                                    handleOpenReservaDialog(viagem)
                                  }
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                  Reservar
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 gap-2 bg-transparent"
                                onClick={() =>
                                  handleOpenEditViagemDialog(viagem)
                                }
                              >
                                <Edit className="w-4 h-4" />
                                Editar
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 gap-2 text-destructive hover:text-destructive bg-transparent"
                                onClick={() => handleDeleteViagem(viagem.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                                Excluir
                              </Button>
                            </div>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="agendamentos" className="mt-0">
            {reservasDoUsuario.length === 0 ? (
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Nenhum agendamento encontrado
                  </CardTitle>
                  <CardDescription>
                    Quando você fizer reservas de viagens, elas aparecerão aqui.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="p-4 rounded-full bg-muted mb-4">
                      <Calendar className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <p className="text-lg font-medium text-foreground mb-2">
                      Nenhuma reserva ainda
                    </p>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Explore as viagens disponíveis e faça sua primeira
                      reserva.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {reservasDoUsuario.map((reserva) => {
                  const viagem = getViagemById(reserva.viagemId);
                  const carro = viagem ? getCarroById(viagem.carroId) : null;

                  return (
                    <Card
                      key={reserva.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 h-48 md:h-auto bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                          {carro?.foto ? (
                            <img
                              src={carro.foto}
                              alt={carro.Modelo}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Car className="w-12 h-12 text-slate-300" />
                          )}
                        </div>

                        <div className="flex-1">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="flex items-center gap-2">
                                  <Calendar className="w-5 h-5 text-primary" />
                                  {carro?.Modelo || "Carro não encontrado"}
                                </CardTitle>
                                <CardDescription className="font-mono">
                                  {carro?.Placa}
                                </CardDescription>
                              </div>
                              <Badge
                                variant={
                                  reserva.status === "confirmada"
                                    ? "default"
                                    : reserva.status === "cancelada"
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {reserva.status}
                              </Badge>
                            </div>
                          </CardHeader>

                          <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Data e Hora
                                </p>
                                <p className="font-medium text-sm">
                                  {viagem?.dataHora
                                    ? new Date(viagem.dataHora).toLocaleString(
                                        "pt-BR",
                                        {
                                          dateStyle: "short",
                                          timeStyle: "short",
                                        }
                                      )
                                    : "N/A"}
                                </p>
                              </div>

                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Capacidade
                                </p>
                                <p className="font-medium text-sm">
                                  {viagem?.capacidadeMax || 0} passageiros
                                </p>
                              </div>

                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Lotação 4
                                </p>
                                <p className="font-medium text-sm">
                                  {reserva.aceitaLotacao4
                                    ? "Aceita"
                                    : "Não aceita"}
                                </p>
                              </div>
                            </div>

                            {reserva.status === "confirmada" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full text-destructive bg-transparent"
                                onClick={() => handleCancelReserva(reserva.id)}
                              >
                                Cancelar Reserva
                              </Button>
                            )}
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog de Carros */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {editingCar ? "Editar Carro" : "Adicionar Novo Carro"}
              </DialogTitle>
              <DialogDescription>
                {editingCar
                  ? "Atualize as informações do veículo abaixo."
                  : "Preencha os dados do novo veículo para adicionar à frota."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="modelo">Modelo</Label>
                <Input
                  id="modelo"
                  placeholder="Ex: Toyota Corolla 2024"
                  value={formData.Modelo}
                  onChange={(e) =>
                    setFormData({ ...formData, Modelo: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="placa">Placa</Label>
                <Input
                  id="placa"
                  placeholder="Ex: ABC-1234"
                  value={formData.Placa}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      Placa: e.target.value.toUpperCase(),
                    })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="foto">URL da Foto (opcional)</Label>
                <Input
                  id="foto"
                  type="string"
                  placeholder="https://exemplo.com/foto.jpg"
                  value={formData.foto}
                  onChange={(e) =>
                    setFormData({ ...formData, foto: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="ativo">Status do Veículo</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {formData.Ativo ? "Ativo" : "Inativo"}
                  </span>
                  <Switch
                    id="ativo"
                    checked={formData.Ativo}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, Ativo: checked })
                    }
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Salvando..."
                  : editingCar
                  ? "Salvar Alterações"
                  : "Adicionar Carro"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog de Viagens */}
      <Dialog open={isViagemDialogOpen} onOpenChange={setIsViagemDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleViagemSubmit}>
            <DialogHeader>
              <DialogTitle>
                {editingViagem ? "Editar Viagem" : "Adicionar Nova Viagem"}
              </DialogTitle>
              <DialogDescription>
                {editingViagem
                  ? "Atualize as informações da viagem abaixo."
                  : "Preencha os dados da nova viagem disponível para reservas."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="carroId">Carro</Label>
                <Select
                  value={viagemFormData.carroId}
                  onValueChange={(value) =>
                    setViagemFormData({ ...viagemFormData, carroId: value })
                  }
                  required
                >
                  <SelectTrigger id="carroId">
                    <SelectValue placeholder="Selecione um carro ativo" />
                  </SelectTrigger>
                  <SelectContent>
                    {carros
                      .filter((c: any) => c.Ativo)
                      .map((carro: any) => (
                        <SelectItem key={carro.id} value={carro.id}>
                          {carro.Modelo} - {carro.Placa}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="dataHora">Data e Hora</Label>
                <Input
                  id="dataHora"
                  type="datetime-local"
                  value={viagemFormData.dataHora}
                  onChange={(e) =>
                    setViagemFormData({
                      ...viagemFormData,
                      dataHora: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="capacidadeMax">Capacidade Máxima</Label>
                <Input
                  id="capacidadeMax"
                  type="number"
                  min="1"
                  max="50"
                  value={viagemFormData.capacidadeMax}
                  onChange={(e) =>
                    setViagemFormData({
                      ...viagemFormData,
                      capacidadeMax: Number.parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={viagemFormData.status}
                  onValueChange={(value) =>
                    setViagemFormData({ ...viagemFormData, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aberta">Aberta</SelectItem>
                    <SelectItem value="fechada">Fechada</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseViagemDialog}
                disabled={isViagemSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isViagemSubmitting}>
                {isViagemSubmitting
                  ? "Salvando..."
                  : editingViagem
                  ? "Salvar Alterações"
                  : "Adicionar Viagem"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog de Reserva */}
      <Dialog open={isReservaDialogOpen} onOpenChange={setIsReservaDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleReservaSubmit}>
            <DialogHeader>
              <DialogTitle>Reservar Vaga</DialogTitle>
              <DialogDescription>
                Confirme sua reserva para esta viagem
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="rounded-lg bg-muted p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Carro:</span>
                  <span className="text-sm font-medium">
                    {getCarroById(viagemSelecionada?.carroId || "")?.Modelo}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Data e Hora:
                  </span>
                  <span className="text-sm font-medium">
                    {viagemSelecionada?.dataHora
                      ? new Date(viagemSelecionada.dataHora).toLocaleString(
                          "pt-BR",
                          {
                            dateStyle: "short",
                            timeStyle: "short",
                          }
                        )
                      : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Capacidade:
                  </span>
                  <span className="text-sm font-medium">
                    {viagemSelecionada?.capacidadeMax} passageiros
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                <Checkbox
                  id="aceitaLotacao4"
                  checked={reservaFormData.aceitaLotacao4}
                  onCheckedChange={(checked) =>
                    setReservaFormData({
                      aceitaLotacao4: checked as boolean,
                    })
                  }
                  required
                />
                <div className="space-y-1 leading-none">
                  <Label
                    htmlFor="aceitaLotacao4"
                    className="text-sm font-medium"
                  >
                    Aceito lotação de 4 passageiros
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Confirmo que aceito viajar com até 4 passageiros no veículo
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseReservaDialog}
                disabled={isReservaSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={
                  isReservaSubmitting || !reservaFormData.aceitaLotacao4
                }
              >
                {isReservaSubmitting ? "Reservando..." : "Confirmar Reserva"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
