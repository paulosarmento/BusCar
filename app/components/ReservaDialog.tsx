"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/Ui/dialog";
import { Button } from "../components/Ui/button";
import { Input } from "../components/Ui/input";
import { Label } from "../components/Ui/label";
import { Carro, ReservaFormData, Viagem } from "@/types/types";
import { useMemo } from "react";

interface ReservaDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;

  viagem: Viagem | null;
  getCarroById(id: string): Carro | undefined;

  formData: ReservaFormData;
  setFormData: React.Dispatch<React.SetStateAction<ReservaFormData>>;

  isSubmitting: boolean;
  onSubmit(e: React.FormEvent): void;
  onClose(): void;
}

export function ReservaDialog({
  open,
  onOpenChange,
  viagem,
  getCarroById,
  formData,
  setFormData,
  isSubmitting,
  onSubmit,
  onClose,
}: ReservaDialogProps) {
  const carro = getCarroById(viagem?.carroId || "");

  const vagasDisponiveis = useMemo(() => {
    if (!viagem) return 0;
    return viagem.capacidadeMax - viagem.vagasReservadas;
  }, [viagem]);

  if (!viagem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Reservar Vagas</DialogTitle>
            <DialogDescription>
              Escolha quantas vagas deseja reservar nesta viagem
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Resumo */}
            <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Destino:</span>
                <span>{viagem.destino}</span>
              </div>
              <div className="flex justify-between">
                <span>Carro:</span>
                <span>{carro?.modelo}</span>
              </div>
              <div className="flex justify-between">
                <span>Data:</span>
                <span>
                  {new Date(viagem.dataHora as string).toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Vagas disponíveis:</span>
                <span>{vagasDisponiveis}</span>
              </div>
            </div>

            {/* Quantidade */}
            <div className="grid gap-2">
              <Label>Quantidade de vagas</Label>
              <Input
                type="number"
                min={1}
                max={vagasDisponiveis}
                value={formData.quantidadeVagas}
                onChange={(e) =>
                  setFormData({
                    quantidadeVagas: Math.min(
                      Math.max(1, Number(e.target.value)),
                      vagasDisponiveis
                    ),
                  })
                }
                required
              />
              <p className="text-xs text-muted-foreground">
                Máximo permitido: {vagasDisponiveis}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || vagasDisponiveis === 0}
            >
              {isSubmitting ? "Reservando..." : "Confirmar Reserva"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
