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

export interface Viagem {
  id: string;
  carroId: string;
  dataHora: string;
  capacidadeMax: number;
  status: string;
}

export interface Carro {
  id: string;
  Modelo: string;
  Placa: string;
  foto?: string;
}

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
              Crie viagens disponíveis para que os clientes possam fazer
              reservas.
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
                : "Cadastrar Primeira Viagem"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {viagens.map((viagem) => {
            const carro = getCarroById(viagem.carroId);

            return (
              <Card
                key={viagem.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 h-48 md:h-auto bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0">
                    {carro?.foto ? (
                      <img
                        src={carro.foto}
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
                          <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            {carro?.Modelo || "Carro não encontrado"}
                          </CardTitle>
                          <CardDescription className="font-mono">
                            {carro?.Placa}
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
                                ? new Date(viagem.dataHora).toLocaleString(
                                    "pt-BR",
                                    {
                                      dateStyle: "short",
                                      timeStyle: "short",
                                    }
                                  )
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
                          className="flex-1 gap-2 bg-transparent"
                          onClick={() => onEditViagem(viagem)}
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 gap-2 text-destructive bg-transparent"
                          onClick={() => onDeleteViagem(viagem.id)}
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
  );
}
