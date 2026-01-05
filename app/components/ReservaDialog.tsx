"use client";

import React from "react";
import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./Ui/dialog";
import { Button } from "./Ui/button";
import { Input } from "./Ui/input";
import { Label } from "./Ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./Ui/alert";

import type { ReservaDialogProps } from "@/types/types";
import { PixPayment } from "./PixPayment";
import { usePixPayment } from "@/hooks/usePixPayment";

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
  showPayment = false,
  reservaAtual = null,
  onPaymentSuccess,
}: ReservaDialogProps) {
  function getValorPorVaga(tipo?: string): number {
    switch (tipo) {
      case "carro":
        return 5;
      case "moto":
        return 3;
      case "van":
        return 10;
      case "spin":
        return 7;
      case "doblo":
        return 7;
      default:
        return 2; // valor padrão
    }
  }
  const carro = getCarroById(viagem?.carroId || "");
  const valorPorVaga = getValorPorVaga(carro?.tipo);

  const vagasDisponiveis = useMemo(() => {
    if (!viagem) return 0;
    return viagem.capacidadeMax - viagem.vagasReservadas;
  }, [viagem]);

  if (!viagem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-auto">
        {showPayment && reservaAtual ? (
          <div>
            <PixPayment
              reservaId={reservaAtual.id}
              quantidadeVagas={reservaAtual.quantidadeVagas}
              valorPorVaga={valorPorVaga}
              onPaymentSuccess={onPaymentSuccess}
              onClose={onClose}
            />
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Reservar Vagas</DialogTitle>
              <DialogDescription>
                Escolha quantas vagas deseja reservar nesta viagem
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              {/* Resumo da Viagem */}
              <div className="rounded-lg bg-muted p-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Destino:</span>
                  <span className="font-medium">{viagem.destino}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Carro:</span>
                  <span className="font-medium">{carro?.modelo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data:</span>
                  <span className="font-medium">
                    {new Date(viagem.dataHora as string).toLocaleString(
                      "pt-BR",
                      {
                        dateStyle: "short",
                        timeStyle: "short",
                      }
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Vagas disponíveis:
                  </span>
                  <span className="font-semibold text-primary">
                    {vagasDisponiveis}
                  </span>
                </div>
              </div>

              {/* Alerta de vagas esgotadas */}
              {vagasDisponiveis === 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Não há vagas disponíveis para esta viagem
                  </AlertDescription>
                </Alert>
              )}

              {/* Campo de quantidade */}
              <div className="grid gap-2">
                <Label htmlFor="quantidade">Quantidade de vagas</Label>
                <Input
                  id="quantidade"
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
                      reservarCarro: false,
                    })
                  }
                  disabled={vagasDisponiveis === 0}
                  required
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="reservarCarro"
                    checked={formData.reservarCarro}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        reservarCarro: e.target.checked,
                        quantidadeVagas: e.target.checked
                          ? vagasDisponiveis
                          : 1,
                      }))
                    }
                  />

                  <label htmlFor="reservarCarro">Reservar {carro?.tipo}</label>
                </div>

                <p className="text-xs text-muted-foreground">
                  Máximo permitido: {vagasDisponiveis}{" "}
                  {vagasDisponiveis === 1 ? "vaga" : "vagas"}
                </p>
              </div>

              {/* Cálculo do valor total */}
              <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Valor total</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.quantidadeVagas}{" "}
                      {formData.quantidadeVagas === 1 ? "vaga" : "vagas"} × R$
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(valorPorVaga)}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(formData.quantidadeVagas * valorPorVaga)}
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || vagasDisponiveis === 0}
              >
                {isSubmitting ? "Processando..." : "Prosseguir para Pagamento"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
