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
import { Checkbox } from "../components/Ui/checkbox";
import { Label } from "../components/Ui/label";

interface Viagem {
  carroId: string;
  dataHora: string;
  capacidadeMax: number;
}

interface Carro {
  Modelo: string;
}

interface ReservaFormData {
  aceitaLotacao4: boolean;
}

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Reservar Vaga</DialogTitle>
            <DialogDescription>
              Confirme sua reserva para esta viagem
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <div className="flex justify-between">
                <span>Carro:</span>
                <span>{getCarroById(viagem?.carroId || "")?.Modelo}</span>
              </div>
              <div className="flex justify-between">
                <span>Data e Hora:</span>
                <span>
                  {viagem?.dataHora
                    ? new Date(viagem.dataHora).toLocaleString("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })
                    : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Capacidade:</span>
                <span>{viagem?.capacidadeMax} passageiros</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 rounded-md border p-4">
              <Checkbox
                checked={formData.aceitaLotacao4}
                onCheckedChange={(checked) =>
                  setFormData({ aceitaLotacao4: checked as boolean })
                }
              />
              <div>
                <Label>Aceito lotação de 4 passageiros</Label>
                <p className="text-sm text-muted-foreground">
                  Confirmo que aceito viajar com até 4 passageiros
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.aceitaLotacao4}
            >
              {isSubmitting ? "Reservando..." : "Confirmar Reserva"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
