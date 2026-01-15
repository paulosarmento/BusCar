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
} from "./Ui/select";
import {
  Car,
  Hash,
  Users,
  Image as ImageIcon,
  UploadCloud,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  CAPACIDADE_POR_TIPO,
  CarroFormData,
  TipoCarro,
  TIPOS_CARRO,
} from "@/types/types";

interface CarroDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;

  formData: CarroFormData;
  setFormData: React.Dispatch<React.SetStateAction<CarroFormData>>;

  editingCar: boolean;
  isSubmitting: boolean;

  onSubmit(e: React.FormEvent): void;
  onClose(): void;
  handleUploadFoto(e: React.ChangeEvent<HTMLInputElement>): void;
  uploadingFoto: boolean;
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
  handleUploadFoto,
  uploadingFoto,
}: CarroDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              {editingCar ? (
                <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                  <Car className="w-5 h-5" />
                </div>
              ) : (
                <div className="p-2 bg-green-50 rounded-full text-green-600">
                  <Car className="w-5 h-5" />
                </div>
              )}
              {editingCar ? "Editar Veículo" : "Novo Veículo"}
            </DialogTitle>
            <DialogDescription>
              {editingCar
                ? "Atualize os dados técnicos e a foto do veículo."
                : "Preencha as informações para cadastrar na frota."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* LINHA 1: Modelo e Placa */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="modelo" className="flex items-center gap-2">
                  Modelo do Veículo
                </Label>
                <Input
                  id="modelo"
                  placeholder="Ex: Van Executiva, Sprinter..."
                  value={formData.modelo}
                  onChange={(e) =>
                    setFormData({ ...formData, modelo: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="placa" className="flex items-center gap-2">
                  <Hash className="w-3.5 h-3.5 text-muted-foreground" />
                  Placa
                </Label>
                <Input
                  id="placa"
                  placeholder="ABC-1234"
                  value={formData.placa}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      placa: e.target.value.toUpperCase(),
                    })
                  }
                  required
                  // Estilo visual de placa
                  className="font-mono uppercase tracking-widest text-slate-700 font-bold placeholder:font-sans placeholder:tracking-normal"
                  maxLength={8}
                />
              </div>
            </div>

            {/* LINHA 2: Tipo e Capacidade (Visual Integrado) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 grid gap-2">
                <Label htmlFor="tipo">Categoria / Tipo</Label>
                <Select
                  value={formData.tipo}
                  onValueChange={(value) => {
                    const tipo = value as TipoCarro;
                    setFormData({
                      ...formData,
                      tipo,
                      capacidade: CAPACIDADE_POR_TIPO[tipo],
                    });
                  }}
                  required
                >
                  <SelectTrigger className="bg-slate-50">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPOS_CARRO.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="capacidade" className="text-muted-foreground">
                  Lotação
                </Label>
                <div className="h-10 w-full rounded-md border bg-slate-100 px-3 py-2 text-sm flex items-center gap-2 text-slate-600 font-medium">
                  <Users className="w-4 h-4 text-slate-400" />
                  {formData.capacidade || 0} Lugares
                </div>
              </div>
            </div>

            {/* LINHA 3: Upload de Foto */}
            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" /> Foto do Veículo
              </Label>

              <div className="flex gap-4 items-start">
                {/* Área de Preview */}
                <div className="relative w-32 h-24 bg-slate-100 rounded-lg border border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center group">
                  {uploadingFoto ? (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : null}

                  {formData.foto ? (
                    <img
                      src={formData.foto}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Car className="w-8 h-8 text-slate-300" />
                  )}
                </div>

                {/* Área de Input */}
                <div className="flex-1 space-y-2">
                  <Input
                    id="foto"
                    type="file"
                    accept="image/*"
                    onChange={handleUploadFoto}
                    disabled={uploadingFoto}
                    className="cursor-pointer file:cursor-pointer file:text-primary file:font-semibold file:bg-blue-50 file:border-0 file:rounded-md file:px-2 file:mr-4 hover:file:bg-blue-100 transition-all text-sm text-slate-500"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Formatos: JPG, PNG. Tamanho máx: 5MB.
                    <br />
                    <span className="text-orange-500 italic">
                      Recomendado foto horizontal.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* LINHA 4: Status (Card Toggle) */}
            <div
              className={`flex items-center justify-between p-3 rounded-lg border ${
                formData.ativo
                  ? "bg-green-50 border-green-100"
                  : "bg-red-50 border-red-100"
              } transition-colors`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    formData.ativo
                      ? "bg-white text-green-600"
                      : "bg-white text-red-600"
                  }`}
                >
                  {formData.ativo ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-bold ${
                      formData.ativo ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {formData.ativo ? "Veículo Ativo" : "Veículo Inativo"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formData.ativo
                      ? "Disponível para novas viagens"
                      : "Indisponível / Manutenção"}
                  </span>
                </div>
              </div>
              <Switch
                checked={formData.ativo}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, ativo: checked })
                }
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || uploadingFoto}
              className="w-full sm:w-auto"
            >
              {uploadingFoto ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                </>
              ) : isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...
                </>
              ) : editingCar ? (
                "Salvar Alterações"
              ) : (
                "Cadastrar Veículo"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
