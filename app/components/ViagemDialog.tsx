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
import { Switch } from "../components/Ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/Ui/select";
import { Carro, ViagemFormData } from "@/types/types";
import { useCallback, useMemo } from "react";

interface ViagemDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;

  formData: ViagemFormData;
  setFormData: React.Dispatch<React.SetStateAction<ViagemFormData>>;

  carros: Carro[];
  editing: boolean;
  isSubmitting: boolean;

  onSubmit(e: React.FormEvent): void;
  onClose(): void;
}

export function ViagemDialog({
  open,
  onOpenChange,
  formData,
  setFormData,
  carros,
  editing,
  isSubmitting,
  onSubmit,
  onClose,
}: ViagemDialogProps) {
  const carrosMap = useMemo(
    () => new Map(carros.map((c) => [c.id, c])),
    [carros]
  );
  const getCarroById = useCallback(
    (id: string) => carrosMap.get(id),
    [carrosMap]
  );

  const carroSelecionado = getCarroById(formData.carroId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Editar Viagem" : "Adicionar Viagem"}
            </DialogTitle>
            <DialogDescription>
              A capacidade é definida automaticamente pelo carro selecionado.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Carro */}
            <div className="grid gap-2">
              <Label>Carro</Label>
              <Select
                value={formData.carroId}
                onValueChange={(value) => {
                  const carro = getCarroById(value);

                  if (!carro) return;

                  setFormData({
                    ...formData,
                    carroId: value,
                    capacidadeMax: carro?.capacidade,
                  });
                }}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um carro ativo" />
                </SelectTrigger>
                <SelectContent>
                  {carros
                    .filter((c) => c.ativo)
                    .map((carro) => (
                      <SelectItem key={carro.id} value={carro.id}>
                        {carro.modelo} — {carro.placa} ({carro.capacidade}{" "}
                        vagas)
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Destino */}
            <div className="grid gap-2">
              <Label>Destino</Label>
              <Input
                value={formData.destino}
                onChange={(e) =>
                  setFormData({ ...formData, destino: e.target.value })
                }
                required
              />
            </div>

            {/* Data */}
            <div className="grid gap-2">
              <Label>Data e Hora</Label>
              <Input
                type="datetime-local"
                value={formData.dataHora}
                onChange={(e) =>
                  setFormData({ ...formData, dataHora: e.target.value })
                }
                required
              />
            </div>

            {/* Capacidade (somente leitura) */}
            <div className="grid gap-2">
              <Label>Capacidade Máxima</Label>
              <Input
                value={
                  carroSelecionado
                    ? `${carroSelecionado.capacidade} passageiros`
                    : "-"
                }
                disabled
              />
            </div>

            {/* Tour */}
            <div className="flex items-center justify-between">
              <Label>É um tour?</Label>
              <Switch
                checked={formData.isTour}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isTour: checked })
                }
              />
            </div>

            {/* Status */}
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value as any })
                }
              >
                <SelectTrigger>
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
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
