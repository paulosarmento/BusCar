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
import { Calendar, Car } from "lucide-react";

export interface Reserva {
  id: string;
  viagemId: string;
  status: "confirmada" | "cancelada" | string;
  aceitaLotacao4: boolean;
}

export interface Viagem {
  id: string;
  carroId: string;
  dataHora: string;
  capacidadeMax: number;
}

export interface Carro {
  id: string;
  Modelo: string;
  Placa: string;
  foto?: string;
}

interface AgendamentosTabProps {
  reservas: Reserva[];

  getViagemById: (id: string) => Viagem | undefined;
  getCarroById: (id: string) => Carro | undefined;

  onCancelReserva: (id: string) => void;
}

export function AgendamentosTab({
  reservas,
  getViagemById,
  getCarroById,
  onCancelReserva,
}: AgendamentosTabProps) {
  return (
    <TabsContent value="agendamentos" className="mt-0">
      {reservas.length === 0 ? (
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
              <p className="text-lg font-medium mb-2">Nenhuma reserva ainda</p>
              <p className="text-sm text-muted-foreground max-w-sm">
                Explore as viagens disponíveis e faça sua primeira reserva.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {reservas.map((reserva) => {
            const viagem = getViagemById(reserva.viagemId);
            const carro = viagem ? getCarroById(viagem.carroId) : undefined;

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
                            {reserva.aceitaLotacao4 ? "Aceita" : "Não aceita"}
                          </p>
                        </div>
                      </div>

                      {reserva.status === "confirmada" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-destructive bg-transparent"
                          onClick={() => onCancelReserva(reserva.id)}
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
  );
}
