"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "./Ui/card";
import { TabsContent } from "./Ui/tabs";
import { Button } from "./Ui/button";
import { Badge } from "./Ui/badge";
import {
  Plus,
  Car,
  Clock,
  Users,
  Edit,
  Trash2,
  CheckCircle2,
  CornerDownRight,
  ArrowDown,
  Map,
} from "lucide-react";
import { Carro, Viagem } from "@/types/types";

interface ViagensTabProps {
  viagens: Viagem[];
  carrosAtivosCount: number;
  getCarroById: (id: string) => Carro | undefined;
  role: string;

  onAddViagem(): void;
  onEditViagem(viagem: Viagem): void;
  onDeleteViagem(id: string): void;
  onReservar(viagem: Viagem): void;
}

export function ViagensTab({
  role,
  viagens,
  carrosAtivosCount,
  getCarroById,
  onAddViagem,
  onEditViagem,
  onDeleteViagem,
  onReservar,
}: ViagensTabProps) {
  return (
    <TabsContent value="viagens" className="mt-0">
      {viagens.length === 0 ? (
        <Card className="border-dashed bg-slate-50/50">
          <CardHeader className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border border-slate-100">
              <Map className="w-8 h-8 text-slate-300" />
            </div>
            <CardTitle className="text-xl">Nenhuma viagem agendada</CardTitle>
            <CardDescription>
              Configure novas viagens para começar a vender passagens.
            </CardDescription>
            <div className="pt-6">
              <Button
                onClick={onAddViagem}
                disabled={carrosAtivosCount === 0}
                className="gap-2 shadow-md"
              >
                <Plus className="w-4 h-4" />
                {carrosAtivosCount === 0
                  ? "Cadastre um carro primeiro"
                  : "Criar Nova Viagem"}
              </Button>
            </div>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-6">
          {viagens.map((viagem) => {
            const carro = getCarroById(viagem.carroId);

            // Cálculos de vaga
            const vagasReservadas = viagem.vagasReservadas ?? 0;
            const vagasDisponiveis = Math.max(
              0,
              viagem.capacidadeMax - vagasReservadas
            );
            const ocupacaoPorcentagem =
              (vagasReservadas / viagem.capacidadeMax) * 100;

            const disponivel =
              viagem.status === "aberta" && vagasDisponiveis > 0;

            // Formatação de Data
            const dataObj = new Date(viagem.dataHora as string);
            const hora = dataObj.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            });
            const diaSemana = dataObj.toLocaleDateString("pt-BR", {
              weekday: "long",
            });

            return (
              <Card
                key={viagem.id}
                className="overflow-hidden hover:shadow-lg transition-all group border-0 shadow-md ring-1 ring-slate-200"
              >
                <div className="flex flex-col lg:flex-row min-h-[220px]">
                  {/* --- ESQUERDA: ROTA (Estilo Ticket) --- */}
                  <div className="flex-1 relative bg-slate-50 flex flex-col justify-center p-6">
                    {/* Fundo Decorativo (Pontilhado sutil) */}
                    <div className="absolute inset-0 opacity-[0.4] [background-image:radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]" />

                    {/* Conteúdo da Rota (Acima do fundo) */}
                    <div className="relative z-10">
                      {/* Badge de Status */}
                      <div className="flex justify-between items-start mb-6">
                        <Badge
                          variant={
                            viagem.status === "aberta" ? "default" : "secondary"
                          }
                          className="shadow-sm"
                        >
                          {viagem.status === "aberta"
                            ? "Agendada"
                            : viagem.status}
                        </Badge>
                        {viagem.isTour && (
                          <Badge
                            variant="outline"
                            className="bg-white border-purple-200 text-purple-700 shadow-sm"
                          >
                            Excursão / Tour
                          </Badge>
                        )}
                      </div>

                      {/* TIMELINE VISUAL */}
                      <div className="relative pl-4">
                        {/* Linha Tracejada Central */}
                        <div className="absolute left-[6.5px] top-3 bottom-3 w-[2px] border-l-2 border-dashed border-slate-300" />

                        {/* Ícone de Fluxo (Seta no meio da linha) */}
                        <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 bg-slate-50 text-slate-400 p-0.5 rounded-full border border-slate-200">
                          <ArrowDown className="w-3 h-3" />
                        </div>

                        {/* Origem */}
                        <div className="relative flex items-center gap-4 mb-6">
                          <div className="absolute -left-[11px] w-3.5 h-3.5 rounded-full bg-green-500 ring-4 ring-slate-50 shadow-sm z-10" />
                          <div>
                            <p className="text-[10px] uppercase text-green-700 font-bold tracking-wider mb-0.5">
                              Origem
                            </p>
                            <p className="text-lg font-bold text-slate-800 leading-none">
                              {viagem.origem}
                            </p>
                          </div>
                        </div>

                        {/* Paradas (Renderiza se houver) */}
                        {viagem.paradas && viagem.paradas.length > 0 && (
                          <div className="pl-4 py-2 space-y-2 mb-6 border-l-2 border-slate-200 ml-[-2px]">
                            {viagem.paradas.map((p, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2"
                              >
                                <CornerDownRight className="w-3.5 h-3.5 text-slate-400" />
                                <span className="text-sm font-medium text-slate-600">
                                  {p.nome}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Destino */}
                        <div className="relative flex items-center gap-4 mt-6">
                          <div className="absolute -left-[11px] w-3.5 h-3.5 rounded-full bg-red-500 ring-4 ring-slate-50 shadow-sm z-10" />
                          <div>
                            <p className="text-[10px] uppercase text-red-700 font-bold tracking-wider mb-0.5">
                              Destino
                            </p>
                            <p className="text-lg font-bold text-slate-800 leading-none">
                              {viagem.destino}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Borda Picotada (Direita no Desktop, Baixo no Mobile) */}
                    <div className="hidden lg:block absolute right-0 top-2 bottom-2 w-[1px] border-r-2 border-dashed border-slate-300 opacity-50" />
                    <div className="lg:hidden absolute bottom-0 left-2 right-2 h-[1px] border-b-2 border-dashed border-slate-300 opacity-50" />
                  </div>

                  {/* --- DIREITA: DETALHES (Fundo Branco Limpo) --- */}
                  <div className="lg:w-[340px] bg-white p-6 flex flex-col justify-between relative">
                    {/* Semi-circles para efeito de ticket (Opcional, charme visual) */}
                    <div className="hidden lg:block absolute -left-3 top-1/2 w-6 h-6 bg-slate-100 rounded-full z-20" />

                    <div className="space-y-6">
                      {/* Bloco de Data e Hora */}
                      <div className="flex items-center gap-4">
                        <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-lg text-center min-w-[60px] shadow-sm">
                          <span className="block text-xs font-bold text-red-500 uppercase">
                            {dataObj
                              .toLocaleDateString("pt-BR", { month: "short" })
                              .replace(".", "")}
                          </span>
                          <span className="block text-2xl font-black text-slate-800">
                            {dataObj.getDate()}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 text-primary font-bold mb-0.5">
                            <Clock className="w-4 h-4" /> {hora}
                          </div>
                          <p className="text-sm text-muted-foreground capitalize">
                            {diaSemana}
                          </p>
                        </div>
                      </div>

                      {/* Info do Carro */}
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                        {carro?.foto ? (
                          <img
                            src={carro.foto}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                            alt="Carro"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border">
                            <Car className="w-5 h-5 text-slate-400" />
                          </div>
                        )}
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-slate-800 truncate">
                            {carro?.modelo || "Carro Indefinido"}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            Placa: {carro?.placa}
                          </p>
                        </div>
                      </div>

                      {/* Barra de Progresso */}
                      <div>
                        <div className="flex justify-between text-xs mb-2">
                          <span className="font-semibold text-slate-500">
                            Lotação
                          </span>
                          <span
                            className={
                              vagasDisponiveis === 0
                                ? "text-red-600 font-bold"
                                : "text-green-600 font-bold"
                            }
                          >
                            {vagasDisponiveis} vagas restantes
                          </span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                          <div
                            className={`h-full transition-all duration-500 ${
                              vagasDisponiveis === 0
                                ? "bg-red-500"
                                : "bg-green-500"
                            }`}
                            style={{ width: `${ocupacaoPorcentagem}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Botões */}
                    <div className="grid grid-cols-2 gap-2 mt-8 pt-4 border-t border-slate-100">
                      {disponivel ? (
                        <Button
                          className="col-span-2 shadow-sm bg-primary hover:bg-primary/90"
                          onClick={() => onReservar(viagem)}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Reservar Vaga
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          disabled
                          className="col-span-2 opacity-80"
                        >
                          Esgotado
                        </Button>
                      )}
                      {role === "admin" && (
                        <div className="grid grid-cols-2 gap-2 col-span-2 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEditViagem(viagem)}
                            className="text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-600 hover:bg-red-50"
                            onClick={() => onDeleteViagem(viagem.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Excluir
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </TabsContent>
  );
}
