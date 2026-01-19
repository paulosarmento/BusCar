"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/Ui/dialog";
import { Button } from "../../components/Ui/button";
import { Input } from "../../components/Ui/input";
import { Label } from "../../components/Ui/label";
import { Switch } from "../../components/Ui/switch";
import {
  MapPin,
  Plus,
  Trash2,
  ArrowRightLeft,
  CornerDownRight,
} from "lucide-react";
import { useState, useEffect } from "react";

// Atualizamos a interface para incluir as paradas e a flag de volta
export interface DestinoFormData {
  origem: string;
  destino: string;
  paradas: string[]; // Lista de cidades intermediárias
  foto: string;
  ativo: boolean;
  criarVolta?: boolean; // Campo auxiliar para a UI
}

interface DestinoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: DestinoFormData;
  setFormData: React.Dispatch<React.SetStateAction<DestinoFormData>>;
  editing: boolean;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export function DestinoDialog({
  open,
  onOpenChange,
  formData,
  setFormData,
  editing,
  isSubmitting,
  onSubmit,
  onClose,
}: DestinoDialogProps) {
  // Função para adicionar uma parada vazia
  const addParada = () => {
    setFormData({
      ...formData,
      paradas: [...(formData.paradas || []), ""],
    });
  };

  // Função para remover uma parada específica
  const removeParada = (index: number) => {
    const novasParadas = [...(formData.paradas || [])];
    novasParadas.splice(index, 1);
    setFormData({ ...formData, paradas: novasParadas });
  };

  // Função para atualizar o texto de uma parada
  const updateParada = (index: number, valor: string) => {
    const novasParadas = [...(formData.paradas || [])];
    novasParadas[index] = valor;
    setFormData({ ...formData, paradas: novasParadas });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {editing ? "Editar Rota" : "Criar Nova Rota"}
            </DialogTitle>
            <DialogDescription>
              Defina o trajeto completo. Adicione paradas onde o cliente pode
              embarcar ou desembarcar.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            {/* TIMELINE DE ROTA */}
            <div className="relative ml-4 pl-8 space-y-6">
              {/* LINHA CONECTORA (Aparece atrás dos inputs) */}
              <div className="absolute left-[7px] top-6 bottom-6 w-0.5 bg-slate-200 border-l-2 border-dashed border-slate-300 z-0" />

              {/* 1. ORIGEM (Verde) */}
              <div className="relative z-10 group">
                <div className="absolute -left-[35px] top-9 w-4 h-4 rounded-full bg-green-500 ring-4 ring-white shadow-sm transition-transform group-hover:scale-110" />
                <div className="grid gap-1.5">
                  <Label
                    htmlFor="origem"
                    className="text-xs font-bold uppercase text-green-700"
                  >
                    Ponto de Partida
                  </Label>
                  <Input
                    id="origem"
                    placeholder="Ex: Rio de Janeiro (Aeroportos)"
                    value={formData.origem}
                    onChange={(e) =>
                      setFormData({ ...formData, origem: e.target.value })
                    }
                    disabled={isSubmitting}
                    required
                    className="font-medium border-green-200 focus:border-green-500 bg-green-50/30"
                  />
                </div>
              </div>

              {/* 2. PARADAS INTERMEDIÁRIAS (Amarelo/Azul) */}
              {formData.paradas &&
                formData.paradas.map((parada, index) => (
                  <div
                    key={index}
                    className="relative z-10 animate-in fade-in slide-in-from-top-2 duration-300"
                  >
                    {/* Ícone de Parada */}
                    <div className="absolute -left-[35px] top-3 w-4 h-4 rounded-full bg-yellow-400 ring-4 ring-white shadow-sm flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-yellow-700 rounded-full" />
                    </div>

                    <div className="flex gap-2 items-center">
                      <CornerDownRight className="w-4 h-4 text-muted-foreground opacity-50" />
                      <div className="flex-1">
                        <Input
                          placeholder={`Parada ${index + 1} (Ex: São Pedro)`}
                          value={parada}
                          onChange={(e) => updateParada(index, e.target.value)}
                          disabled={isSubmitting}
                          className="h-9 text-sm bg-slate-50"
                          required
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-muted-foreground hover:text-red-500 hover:bg-red-50"
                        onClick={() => removeParada(index)}
                        disabled={isSubmitting}
                        title="Remover parada"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

              {/* BOTÃO ADICIONAR PARADA (Meio da linha) */}
              <div className="relative z-10 -ml-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addParada}
                  className="h-8 gap-1 text-xs border-dashed border-slate-400 text-slate-600 hover:border-primary hover:text-primary bg-white"
                  disabled={isSubmitting}
                >
                  <Plus className="w-3 h-3" />
                  Adicionar Parada
                </Button>
              </div>

              {/* 3. DESTINO (Vermelho) */}
              <div className="relative z-10 group">
                <div className="absolute -left-[35px] top-9 w-4 h-4 rounded-full bg-red-500 ring-4 ring-white shadow-sm transition-transform group-hover:scale-110" />
                <div className="grid gap-1.5">
                  <Label
                    htmlFor="destino"
                    className="text-xs font-bold uppercase text-red-700"
                  >
                    Destino Final
                  </Label>
                  <Input
                    id="destino"
                    placeholder="Ex: Armação dos Búzios"
                    value={formData.destino}
                    onChange={(e) =>
                      setFormData({ ...formData, destino: e.target.value })
                    }
                    disabled={isSubmitting}
                    required
                    className="font-medium border-red-200 focus:border-red-500 bg-red-50/30"
                  />
                </div>
              </div>
            </div>

            {/* OPÇÕES ADICIONAIS */}
            <div className="mt-8 space-y-4 border-t pt-6">
              {/* SWITCH GERAR VOLTA */}
              {!editing && (
                <div className="flex items-center justify-between border border-blue-100 bg-blue-50/50 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 p-1.5 rounded-full">
                      <ArrowRightLeft className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="space-y-0.5">
                      <Label
                        className="text-sm font-semibold text-blue-900 cursor-pointer"
                        htmlFor="criarVolta"
                      >
                        Criar rota de volta automaticamente?
                      </Label>
                      <p className="text-xs text-blue-600/80">
                        Gera também a rota inversa (
                        {formData.destino || "Destino"} ➝{" "}
                        {formData.origem || "Origem"})
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="criarVolta"
                    checked={formData.criarVolta}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, criarVolta: checked })
                    }
                    className="data-[state=checked]:bg-blue-600"
                    disabled={isSubmitting}
                  />
                </div>
              )}

              {/* FOTO URL (Opcional, escondido num accordion ou simples) */}
              <div className="grid gap-2">
                <Label htmlFor="foto" className="text-xs text-muted-foreground">
                  Foto de Capa (URL - Opcional)
                </Label>
                <Input
                  id="foto"
                  placeholder="https://..."
                  className="h-8 text-xs"
                  value={formData.foto}
                  onChange={(e) =>
                    setFormData({ ...formData, foto: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Salvando..."
                : editing
                ? "Salvar Alterações"
                : "Criar Rotas"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
