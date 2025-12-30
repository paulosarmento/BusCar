"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./Ui/card";
import { TabsContent } from "./Ui/tabs";
import { Button } from "./Ui/button";
import { Badge } from "./Ui/badge";
import {
  MapPin,
  Plus,
  Car,
  Clock,
  Users,
  Edit,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { Carro, Viagem } from "@/types/types";

interface ViagensTabProps {
  viagens: Viagem[];
  carrosAtivosCount: number;
  getCarroById: (id: string) => Carro | undefined;

  onAddViagem(): void;
  onEditViagem(viagem: Viagem): void;
  onDeleteViagem(id: string): void;
  onReservar(viagem: Viagem): void;
}

export function ViagensTab({
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
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Nenhuma viagem cadastrada
            </CardTitle>
            <CardDescription>
              Crie viagens disponíveis para reservas.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              className="gap-2"
              onClick={onAddViagem}
              disabled={carrosAtivosCount === 0}
            >
              <Plus className="w-4 h-4" />
              {carrosAtivosCount === 0
                ? "Cadastre um carro ativo primeiro"
                : "Cadastrar Viagem"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {viagens.map((viagem) => {
            const carro = getCarroById(viagem.carroId);

            // 🔹 backend é a fonte da verdade
            const vagasReservadas = viagem.vagasReservadas ?? 0;
            const vagasDisponiveis = Math.max(
              0,
              viagem.capacidadeMax - vagasReservadas
            );

            const disponivel =
              viagem.status === "aberta" && vagasDisponiveis > 0;

            return (
              <Card
                key={viagem.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0">
                    {carro?.foto ? (
                      <img
                        src={carro.foto}
                        alt={carro.modelo}
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
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            {viagem.destino}
                          </CardTitle>

                          <CardDescription className="font-mono">
                            {carro?.modelo} — {carro?.placa}
                          </CardDescription>

                          {viagem.isTour && (
                            <Badge variant="secondary" className="mt-1">
                              Tour
                            </Badge>
                          )}
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
                              {new Date(
                                viagem.dataHora as string
                              ).toLocaleString("pt-BR", {
                                dateStyle: "short",
                                timeStyle: "short",
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Vagas disponíveis
                            </p>
                            <p className="font-medium">
                              {vagasDisponiveis} / {viagem.capacidadeMax}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {disponivel && (
                          <Button
                            size="sm"
                            className="flex-1 gap-2"
                            onClick={() => onReservar(viagem)}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Reservar
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => onEditViagem(viagem)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-destructive"
                          onClick={() => onDeleteViagem(viagem.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
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
  );
}
