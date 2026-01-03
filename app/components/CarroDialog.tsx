"use client";

import { useState } from "react";

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
  CAPACIDADE_POR_TIPO,
  CarroFormData,
  TipoCarro,
  TIPOS_CARRO,
} from "@/types/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Ui/select";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getStorageInstance } from "@/lib/firebase";

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
              <Label htmlFor="tipo">Tipo</Label>
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
                <SelectTrigger>
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
              <Label htmlFor="capacidade">Capacidade</Label>
              <input
                id="capacidade"
                type="number"
                value={formData.capacidade}
                disabled
                className="h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">
                A capacidade é definida automaticamente conforme o tipo do
                veículo
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="foto">Foto</Label>
              <Input
                id="foto"
                type="file"
                accept="image/*"
                onChange={handleUploadFoto}
              />

              {formData.foto && (
                <img
                  src={formData.foto}
                  alt="Preview da foto"
                  className="mt-2 h-32 w-full object-cover rounded-md border"
                />
              )}
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
            <Button type="submit" disabled={isSubmitting || uploadingFoto}>
              {uploadingFoto
                ? "Enviando imagem..."
                : isSubmitting
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
