"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/Ui/card";
import { TabsContent } from "../components/Ui/tabs";
import { Button } from "../components/Ui/button";
import { Badge } from "../components/Ui/badge";
import { Calendar, Car, ArrowRight } from "lucide-react";
import { Carro, Reserva, Viagem } from "@/types/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Ui/dialog";
import { ReservaDetail } from "./ReservaDetail";

interface AgendamentosTabProps {
  role: string;
  reservas: Reserva[];
  getViagemById: (id: string) => Viagem | undefined;
  getCarroById: (id: string) => Carro | undefined;
  reservaAtual: Reserva | null;

  onCancelReserva: (id: string) => void;
  onVerDetalhes: (id: string) => void;
  modalAberta: boolean;
  setModalAberta: React.Dispatch<React.SetStateAction<boolean>>;
  handleGerarPix: (reserva: Reserva, viagem: Viagem) => void;
  viagemSelecionada: Viagem | null;
}

export function AgendamentosTab({
  role,
  reservas,
  reservaAtual,
  getViagemById,
  getCarroById,
  onCancelReserva,
  modalAberta,
  setModalAberta,
  onVerDetalhes,
  handleGerarPix,
}: AgendamentosTabProps) {
  // --- NOVA LÓGICA INTELIGENTE DE PARADAS ---
  const resolveNomeParada = (
    id: string | undefined,
    tipo: "embarque" | "desembarque",
    viagem: Viagem | undefined
  ) => {
    if (!viagem) return "--";
    const paradas = viagem.paradas || [];

    // 1. Se o usuário escolheu uma parada específica (ID não é "padrao")
    if (id && id !== "padrao") {
      const encontrada = paradas.find((p) => p.id === id);
      if (encontrada) return encontrada.nome;
    }

    // 2. Se for "padrao", buscamos a parada principal na lista
    if (tipo === "embarque") {
      // Pega a primeira que for "embarque" ou "ambos"
      const pEmbarque = paradas.find(
        (p) => p.tipo === "embarque" || p.tipo === "ambos"
      );
      // Fallback se não achar: Origem genérica ou texto fixo
      return pEmbarque ? pEmbarque.nome : "Ponto de Encontro";
    }

    if (tipo === "desembarque") {
      // Pega a primeira que for "desembarque" ou "ambos"
      // Dica: num array ordenado, idealmente pegaríamos a última, mas o find pega a primeira.
      // Se sua lista de paradas estiver em ordem cronológica, o find funciona bem para definir o padrão.
      const pDesembarque = paradas.find(
        (p) => p.tipo === "desembarque" || p.tipo === "ambos"
      );

      // Fallback: Usa o Destino principal da Viagem (ex: "Rio de Janeiro")
      return pDesembarque ? pDesembarque.nome : viagem.destino;
    }

    return "--";
  };

  // Prepara dados para o Modal
  const getDetalhesReservaAtual = () => {
    if (!reservaAtual) return null;
    const viagem = getViagemById(reservaAtual.viagemId);

    const nomeEmbarque = resolveNomeParada(
      reservaAtual.paradaEmbarqueId,
      "embarque",
      viagem
    );

    const nomeDesembarque = resolveNomeParada(
      reservaAtual.paradaDesembarqueId,
      "desembarque",
      viagem
    );

    return { viagem, nomeEmbarque, nomeDesembarque };
  };

  const detalhesAtual = getDetalhesReservaAtual();

  return (
    <TabsContent value="agendamentos" className="mt-0">
      {reservas.length === 0 ? (
        <Card className="border-dashed bg-slate-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Nenhum agendamento
            </CardTitle>
            <CardDescription>
              Você ainda não possui viagens agendadas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="p-4 rounded-full bg-white shadow-sm mb-4">
                <Car className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <p className="text-sm text-muted-foreground">
                Faça sua primeira reserva na aba "Viagens".
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {reservas.map((reserva) => {
            const viagem = getViagemById(reserva.viagemId);
            const carro = viagem ? getCarroById(viagem.carroId) : undefined;
            const viagemExiste = Boolean(viagem);
            const podeCancelar =
              viagemExiste && reserva.status === "confirmada";

            // Busca nomes corrigidos para o Card da Lista
            const nomeEmbarqueLista = resolveNomeParada(
              reserva.paradaEmbarqueId,
              "embarque",
              viagem
            );

            const nomeDesembarqueLista = resolveNomeParada(
              reserva.paradaDesembarqueId,
              "desembarque",
              viagem
            );

            return (
              <Card
                key={reserva.id}
                className="overflow-hidden hover:shadow-md transition-all group border-l-4 border-l-primary"
              >
                <div className="flex flex-col md:flex-row">
                  {/* FOTO DO CARRO */}
                  <div className="md:w-48 bg-slate-100 flex items-center justify-center min-h-[160px] relative">
                    {carro?.foto ? (
                      <img
                        src={carro.foto}
                        alt={carro.modelo}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Car className="w-12 h-12 text-slate-300" />
                    )}
                    <Badge
                      variant={
                        reserva.status === "confirmada"
                          ? "default"
                          : "secondary"
                      }
                      className="absolute top-2 left-2 shadow-sm"
                    >
                      {reserva.status === "pendente_pagamento"
                        ? "Pendente"
                        : reserva.status}
                    </Badge>
                  </div>

                  <div className="flex-1 p-1">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {viagemExiste ? viagem!.destino : "Viagem removida"}
                          </CardTitle>
                          <CardDescription>
                            {carro
                              ? `${carro.modelo} • ${carro.placa}`
                              : "Carro não disponível"}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-primary">
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(reserva.valorTotal)}
                          </span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      {/* Datas e Vagas */}
                      <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {viagem?.dataHora
                            ? new Date(
                                viagem.dataHora as string
                              ).toLocaleString("pt-BR", {
                                dateStyle: "short",
                                timeStyle: "short",
                              })
                            : "--"}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Car className="w-4 h-4" />
                          {reserva.quantidadeVagas}{" "}
                          {reserva.quantidadeVagas > 1 ? "assentos" : "assento"}
                        </div>
                      </div>

                      {/* CARD VISUAL DE EMBARQUE/DESEMBARQUE NA LISTA */}
                      <div className="bg-slate-50 border rounded-md p-3 mb-4 grid grid-cols-[1fr,auto,1fr] gap-2 items-center">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-green-600 uppercase">
                            Embarque
                          </span>
                          <span
                            className="text-sm font-medium leading-tight truncate"
                            title={nomeEmbarqueLista}
                          >
                            {nomeEmbarqueLista}
                          </span>
                        </div>

                        <ArrowRight className="w-4 h-4 text-slate-300" />

                        <div className="flex flex-col text-right">
                          <span className="text-[10px] font-bold text-red-600 uppercase">
                            Desembarque
                          </span>
                          <span
                            className="text-sm font-medium leading-tight truncate"
                            title={nomeDesembarqueLista}
                          >
                            {nomeDesembarqueLista}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        {podeCancelar && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() => onCancelReserva(reserva.id)}
                          >
                            Cancelar
                          </Button>
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            onVerDetalhes(reserva.id);
                            setModalAberta(true);
                          }}
                        >
                          Ver Detalhes / Pagamento
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

      {/* MODAL DE DETALHES */}
      <Dialog open={modalAberta} onOpenChange={setModalAberta}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Viagem</DialogTitle>
          </DialogHeader>

          {reservaAtual && detalhesAtual && (
            <ReservaDetail
              id={reservaAtual.id}
              usuarioId={reservaAtual.usuarioId}
              viagemId={reservaAtual.viagemId}
              status={reservaAtual.status}
              valorTotal={reservaAtual.valorTotal}
              quantidadeVagas={reservaAtual.quantidadeVagas}
              codigoDaReserva={reservaAtual.codigoDaReserva}
              // Passando os nomes corrigidos
              nomeEmbarque={detalhesAtual.nomeEmbarque}
              nomeDesembarque={detalhesAtual.nomeDesembarque}
              dataViagem={detalhesAtual.viagem?.dataHora as string}
              onGerarPix={() =>
                handleGerarPix(
                  reservaAtual,
                  getViagemById(reservaAtual.viagemId)!
                )
              }
            />
          )}
        </DialogContent>
      </Dialog>
    </TabsContent>
  );
}
