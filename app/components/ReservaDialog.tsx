"use client";
import { useMemo, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Ui/select";
import { MapPin, Users } from "lucide-react";
import type { ReservaDialogProps } from "@/types/types";
import { PixPayment } from "./PixPayment";

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
  const carro = getCarroById(viagem?.carroId || "");

  // Define o valor por vaga baseado no tipo do carro
  const valorPorVaga = useMemo(() => {
    switch (carro?.tipo) {
      case "van":
        return 25;
      case "spin":
        return 30;
      default:
        return 20;
    }
  }, [carro?.tipo]);

  // Cálculo Simples de Vagas Disponíveis (Capacidade Total - Reservadas)
  const vagasDisponiveis = useMemo(() => {
    if (!viagem) return 0;
    const ocupadas = viagem.vagasReservadas || 0;
    return Math.max(0, viagem.capacidadeMax - ocupadas);
  }, [viagem]);

  const paradasEmbarque = useMemo(
    () =>
      viagem?.paradas?.filter(
        (p) => p.tipo === "embarque" || p.tipo === "ambos"
      ) || [],
    [viagem]
  );

  const paradasDesembarque = useMemo(
    () =>
      viagem?.paradas?.filter(
        (p) => p.tipo === "desembarque" || p.tipo === "ambos"
      ) || [],
    [viagem]
  );

  // --- CORREÇÃO DO ID ---
  // Quando o modal abre, se houver paradas cadastradas, limpamos o valor "padrao"
  // para forçar o usuário a selecionar uma opção válida e enviar o ID correto.
  useEffect(() => {
    if (open && viagem) {
      setFormData((prev) => {
        const deveLimparEmbarque =
          paradasEmbarque.length > 0 && prev.paradaEmbarqueId === "padrao";
        const deveLimparDesembarque =
          paradasDesembarque.length > 0 &&
          prev.paradaDesembarqueId === "padrao";

        if (deveLimparEmbarque || deveLimparDesembarque) {
          return {
            ...prev,
            paradaEmbarqueId: deveLimparEmbarque ? "" : prev.paradaEmbarqueId,
            paradaDesembarqueId: deveLimparDesembarque
              ? ""
              : prev.paradaDesembarqueId,
          };
        }
        return prev;
      });
    }
  }, [
    open,
    viagem,
    paradasEmbarque.length,
    paradasDesembarque.length,
    setFormData,
  ]);

  if (!viagem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-auto">
        {showPayment && reservaAtual ? (
          <PixPayment
            reservaId={reservaAtual.id}
            quantidadeVagas={reservaAtual.quantidadeVagas}
            valorPorVaga={valorPorVaga}
            onPaymentSuccess={onPaymentSuccess}
            onClose={onClose}
          />
        ) : (
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Reservar Vagas</DialogTitle>
              <DialogDescription>
                Viagem para{" "}
                <span className="font-bold text-primary">{viagem.destino}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {/* ALERTA DE VAGAS */}
              <div
                className={`p-3 rounded-md border flex items-center gap-3 ${
                  vagasDisponiveis > 0
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                <Users className="w-5 h-5" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">Disponibilidade</p>
                  <p className="text-xs">
                    {vagasDisponiveis > 0
                      ? `Restam ${vagasDisponiveis} vagas no total.`
                      : "Viagem lotada."}
                  </p>
                </div>
              </div>

              {/* Seleção de Paradas */}
              <div className="grid gap-4 p-4 border rounded-lg bg-slate-50">
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2 font-medium">
                    <MapPin className="w-4 h-4 text-green-600" /> Embarque
                  </Label>
                  <Select
                    value={formData.paradaEmbarqueId || undefined}
                    onValueChange={(v) =>
                      setFormData((prev) => ({ ...prev, paradaEmbarqueId: v }))
                    }
                    required
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Selecione onde subir..." />
                    </SelectTrigger>
                    <SelectContent>
                      {paradasEmbarque.length > 0 ? (
                        paradasEmbarque.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.nome}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="padrao">
                          Ponto de Encontro Padrão
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label className="flex items-center gap-2 font-medium">
                    <MapPin className="w-4 h-4 text-red-600" /> Desembarque
                  </Label>
                  <Select
                    value={formData.paradaDesembarqueId || undefined}
                    onValueChange={(v) =>
                      setFormData((prev) => ({
                        ...prev,
                        paradaDesembarqueId: v,
                      }))
                    }
                    required
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Selecione onde descer..." />
                    </SelectTrigger>
                    <SelectContent>
                      {paradasDesembarque.length > 0 ? (
                        paradasDesembarque.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.nome}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="padrao">
                          Destino Final Padrão
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Quantidade de Vagas */}
              <div className="grid gap-2">
                <Label>Quantidade de assentos</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={1}
                    max={vagasDisponiveis}
                    value={formData.quantidadeVagas}
                    onChange={(e) => {
                      let val = parseInt(e.target.value);
                      if (isNaN(val)) val = 1;
                      if (val > vagasDisponiveis) val = vagasDisponiveis;
                      if (val < 1) val = 1;

                      setFormData((prev) => ({
                        ...prev,
                        quantidadeVagas: val,
                        valorTotal: val * valorPorVaga,
                      }));
                    }}
                    disabled={vagasDisponiveis === 0}
                    required
                    className="max-w-[100px]"
                  />
                  <div className="flex-1 text-right">
                    <span className="text-xs text-muted-foreground block">
                      Total a pagar
                    </span>
                    <span className="text-lg font-bold text-primary">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(formData.valorTotal || valorPorVaga)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                type="submit"
                // TRAVA O BOTÃO SE OS CAMPOS ESTIVEREM VAZIOS
                disabled={
                  isSubmitting ||
                  !formData.paradaEmbarqueId ||
                  !formData.paradaDesembarqueId ||
                  vagasDisponiveis === 0 ||
                  formData.quantidadeVagas > vagasDisponiveis
                }
              >
                {isSubmitting ? "Processando..." : "Ir para Pagamento"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
