import { Button } from "./Ui/button";
import { Badge } from "./Ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Ui/card";
import { Separator } from "./Ui/separator";
import {
  Calendar,
  CreditCard,
  MapPin,
  QrCode,
  Users,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface ReservaDetailProps {
  id: string;
  usuarioId: string;
  viagemId: string;
  status: string;
  valorTotal: number;
  quantidadeVagas: number;
  codigoDaReserva: number;
  // Novos campos opcionais para exibição
  nomeEmbarque?: string;
  nomeDesembarque?: string;
  dataViagem?: string;

  onGerarPix: () => void;
}

export function ReservaDetail({
  id,
  status,
  valorTotal,
  quantidadeVagas,
  codigoDaReserva,
  nomeEmbarque,
  nomeDesembarque,
  dataViagem,
  onGerarPix,
}: ReservaDetailProps) {
  const isPendente = status === "pendente_pagamento";
  const isConfirmada = status === "confirmada";

  return (
    <div className="space-y-6">
      {/* Cabeçalho do Bilhete */}
      <div className="flex flex-col items-center justify-center space-y-2 text-center bg-slate-50 p-4 rounded-lg border border-dashed border-slate-300">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          Código da Reserva
        </span>
        <span className="text-3xl font-mono font-bold text-primary tracking-tighter">
          #{codigoDaReserva}
        </span>
        <Badge
          variant={
            isConfirmada ? "default" : isPendente ? "secondary" : "destructive"
          }
          className="mt-2"
        >
          {status.replace("_", " ").toUpperCase()}
        </Badge>
      </div>

      <div className="grid gap-4">
        {/* Informações Principais */}
        <div className="flex items-center justify-between p-3 border rounded-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-full">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Passageiros</p>
              <p className="text-xs text-muted-foreground">
                {quantidadeVagas} {quantidadeVagas === 1 ? "vaga" : "vagas"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-slate-700">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(valorTotal)}
            </p>
          </div>
        </div>

        {/* Roteiro (Embarque e Desembarque) */}
        {(nomeEmbarque || nomeDesembarque) && (
          <div className="space-y-3 p-3 border rounded-md bg-slate-50">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2 flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Roteiro Selecionado
            </h4>

            <div className="relative pl-4 border-l-2 border-slate-200 space-y-4 ml-1">
              {/* Bolinha Verde - Embarque */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-green-500 ring-4 ring-white" />
                <div>
                  <p className="text-[10px] font-bold text-green-600 uppercase">
                    Embarque
                  </p>
                  <p className="text-sm font-medium text-slate-800">
                    {nomeEmbarque || "Ponto de Encontro Padrão"}
                  </p>
                  {dataViagem && (
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(dataViagem).toLocaleString("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </p>
                  )}
                </div>
              </div>

              {/* Bolinha Vermelha - Desembarque */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-red-500 ring-4 ring-white" />
                <div>
                  <p className="text-[10px] font-bold text-red-600 uppercase">
                    Desembarque
                  </p>
                  <p className="text-sm font-medium text-slate-800">
                    {nomeDesembarque || "Destino Final"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Ações */}
      <div className="flex flex-col gap-2">
        {isPendente && (
          <Button className="w-full gap-2" onClick={onGerarPix}>
            <QrCode className="w-4 h-4" />
            Pagar com PIX
          </Button>
        )}

        {isConfirmada && (
          <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">Reserva Confirmada</span>
          </div>
        )}
      </div>
    </div>
  );
}
