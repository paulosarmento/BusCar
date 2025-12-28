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
import { CarroFormData } from "@/types/types";

interface CarroDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;

  formData: CarroFormData;
  setFormData: React.Dispatch<React.SetStateAction<CarroFormData>>;

  editingCar: boolean;
  isSubmitting: boolean;

  onSubmit(e: React.FormEvent): void;
  onClose(): void;
}

export function CarroDialog({
  open,
  onOpenChange,
  formData,
  setFormData,
  editingCar,
  isSubmitting,
  onSubmit,
  onClose,
}: CarroDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>
              {editingCar ? "Editar Carro" : "Adicionar Novo Carro"}
            </DialogTitle>
            <DialogDescription>
              {editingCar
                ? "Atualize as informações do veículo abaixo."
                : "Preencha os dados do novo veículo para adicionar à frota."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="modelo">Modelo</Label>
              <Input
                id="modelo"
                value={formData.modelo}
                onChange={(e) =>
                  setFormData({ ...formData, modelo: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="placa">Placa</Label>
              <Input
                id="placa"
                value={formData.placa}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    placa: e.target.value.toUpperCase(),
                  })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="foto">URL da Foto</Label>
              <Input
                id="foto"
                value={formData.foto || ""}
                onChange={(e) =>
                  setFormData({ ...formData, foto: e.target.value })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Status do Veículo</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {formData.ativo ? "Ativo" : "Inativo"}
                </span>
                <Switch
                  checked={formData.ativo}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, ativo: checked })
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Salvando..."
                : editingCar
                ? "Salvar Alterações"
                : "Adicionar Carro"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
