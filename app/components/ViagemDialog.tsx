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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/Ui/select";
import { Carro, ViagemFormData } from "@/types/types";

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Editar Viagem" : "Adicionar Nova Viagem"}
            </DialogTitle>
            <DialogDescription>
              {editing
                ? "Atualize as informações da viagem."
                : "Preencha os dados da nova viagem."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Carro</Label>
              <Select
                value={formData.carroId}
                onValueChange={(value) =>
                  setFormData({ ...formData, carroId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um carro ativo" />
                </SelectTrigger>
                <SelectContent>
                  {carros
                    .filter((c) => c.ativo)
                    .map((carro) => (
                      <SelectItem key={carro.id} value={carro.id}>
                        {carro.modelo} - {carro.placa}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Data e Hora</Label>
              <Input
                type="datetime-local"
                value={formData.dataHora}
                onChange={(e) =>
                  setFormData({ ...formData, dataHora: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>Capacidade Máxima</Label>
              <Input
                type="number"
                min={1}
                value={formData.capacidadeMax}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    capacidadeMax: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
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
              {isSubmitting
                ? "Salvando..."
                : editing
                ? "Salvar Alterações"
                : "Adicionar Viagem"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
