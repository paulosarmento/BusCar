"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/Ui/dialog";
import { Button } from "./Ui/button";
import { Input } from "./Ui/input";
import { Label } from "./Ui/label";
import { Switch } from "./Ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Ui/select";
import { Carro, ViagemFormData, Parada, TipoParada } from "@/types/types";
import { useCallback, useMemo, useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Calendar,
  Car as CarIcon,
  Map as MapIcon,
  CornerDownRight,
} from "lucide-react";

// Interface local caso não esteja no types global ainda
interface Destino {
  id: string;
  origem: string;
  destino: string;
  paradas?: string[];
  ativo: boolean;
}

interface ViagemDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  formData: ViagemFormData;
  setFormData: React.Dispatch<React.SetStateAction<ViagemFormData>>;
  carros: Carro[];
  destinos?: Destino[];
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
  destinos = [],
  editing,
  isSubmitting,
  onSubmit,
  onClose,
}: ViagemDialogProps) {
  const [nomeParada, setNomeParada] = useState("");
  const [tipoParada, setTipoParada] = useState<TipoParada>("ambos");
  // Estado visual para controlar o Select de Rota
  const [rotaSelecionada, setRotaSelecionada] = useState<string>("");

  // Limpa a seleção de rota quando o dialog fecha ou abre
  useEffect(() => {
    if (!open) {
      setRotaSelecionada("");
      setNomeParada("");
    }
  }, [open]);

  const carrosMap = useMemo(
    () => new Map(carros.map((c) => [c.id, c])),
    [carros]
  );

  const getCarroById = useCallback(
    (id: string) => carrosMap.get(id),
    [carrosMap]
  );

  // --- LÓGICA DE CARREGAR ROTA ---
  const handleSelectRota = (rotaId: string) => {
    const rota = destinos?.find((d) => d.id === rotaId);
    if (!rota) return;

    setRotaSelecionada(rotaId); // Marca visualmente qual rota foi escolhida

    // Converte as strings de paradas da Rota para objetos Parada da Viagem
    const paradasConvertidas: Parada[] = (rota.paradas || []).map((nome) => ({
      id: crypto.randomUUID(),
      nome: nome,
      tipo: "ambos",
    }));

    setFormData((prev) => ({
      ...prev,
      origem: rota.origem,
      destino: rota.destino,
      paradas: paradasConvertidas,
    }));
  };

  // Função auxiliar para atualizar campos de texto e limpar a seleção da rota
  // (pois se o usuário digita, não é mais exatamente a rota pré-definida)
  const handleInputChange = (field: keyof ViagemFormData, value: string) => {
    setRotaSelecionada(""); // Reseta o select para "Customizado"
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const adicionarParada = () => {
    if (!nomeParada.trim()) return;
    const nova: Parada = {
      id: crypto.randomUUID(),
      nome: nomeParada,
      tipo: tipoParada,
    };

    setRotaSelecionada(""); // Consideramos uma alteração customizada
    setFormData((prev) => ({
      ...prev,
      paradas: [...(prev.paradas || []), nova],
    }));
    setNomeParada("");
  };

  const removerParada = (id: string) => {
    setRotaSelecionada(""); // Consideramos uma alteração customizada
    setFormData((prev) => ({
      ...prev,
      paradas: prev.paradas.filter((p) => p.id !== id),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {editing ? "Editar Viagem" : "Agendar Nova Viagem"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados operacionais e o trajeto.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* SEÇÃO 1: DADOS OPERACIONAIS */}
            <div className="bg-slate-50 p-4 rounded-lg border grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="flex items-center gap-2">
                  <CarIcon className="w-4 h-4 text-primary" /> Veículo
                </Label>
                <Select
                  value={formData.carroId || ""} // Proteção contra undefined
                  onValueChange={(value) => {
                    const carro = getCarroById(value);
                    setFormData({
                      ...formData,
                      carroId: value,
                      capacidadeMax: carro?.capacidade || 0,
                    });
                  }}
                  required
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {carros
                      .filter((c) => c.ativo)
                      .map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.modelo} — {c.placa} ({c.capacidade} lug.)
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" /> Data e Hora
                </Label>
                <Input
                  type="datetime-local"
                  className="bg-white"
                  value={formData.dataHora || ""} // Proteção contra undefined
                  onChange={(e) =>
                    setFormData({ ...formData, dataHora: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* SEÇÃO 2: TRAJETO INTELIGENTE */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <MapIcon className="w-4 h-4" /> Definição de Trajeto
                </Label>

                {/* SELECT DE ROTA RÁPIDA */}
                {!editing && destinos && destinos.length > 0 && (
                  <Select
                    value={rotaSelecionada}
                    onValueChange={handleSelectRota}
                  >
                    <SelectTrigger className="w-[200px] h-8 text-xs bg-blue-50 border-blue-200 text-blue-700">
                      <SelectValue placeholder="⚡ Carregar Rota Salva" />
                    </SelectTrigger>
                    <SelectContent>
                      {destinos
                        .filter((d) => d.ativo)
                        .map((rota) => (
                          <SelectItem key={rota.id} value={rota.id}>
                            {rota.origem} ➝ {rota.destino}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* VISUAL DE TIMELINE */}
              <div className="relative border-l-2 border-dashed border-slate-200 ml-3 pl-6 space-y-4">
                {/* ORIGEM */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-3 w-3 h-3 rounded-full bg-green-500 ring-4 ring-white shadow-sm" />
                  <div className="grid gap-1.5">
                    <Label className="text-xs font-bold uppercase text-green-700">
                      Origem
                    </Label>
                    <Input
                      value={formData.origem || ""} // CORREÇÃO PRINCIPAL: || ""
                      onChange={(e) =>
                        handleInputChange("origem", e.target.value)
                      }
                      required
                      placeholder="De onde sai?"
                    />
                  </div>
                </div>

                {/* LISTA DE PARADAS */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground">
                    Paradas / Waypoints
                  </Label>

                  {formData.paradas?.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-2 bg-slate-50 p-2 rounded border group"
                    >
                      <CornerDownRight className="w-4 h-4 text-slate-400" />
                      <span className="flex-1 font-medium text-sm text-slate-700">
                        {p.nome}
                      </span>
                      <span className="text-[10px] uppercase bg-white border px-1.5 py-0.5 rounded text-slate-500">
                        {p.tipo}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removerParada(p.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}

                  {/* INPUT DE NOVA PARADA */}
                  <div className="flex gap-2 items-center pt-2">
                    <Input
                      placeholder="Adicionar parada extra..."
                      value={nomeParada}
                      onChange={(e) => setNomeParada(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          adicionarParada();
                        }
                      }}
                      className="h-8 text-sm"
                    />
                    <Select
                      value={tipoParada}
                      onValueChange={(v: any) => setTipoParada(v)}
                    >
                      <SelectTrigger className="w-[110px] h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="embarque">Embarque</SelectItem>
                        <SelectItem value="desembarque">Desembarque</SelectItem>
                        <SelectItem value="ambos">Ambos</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      size="sm"
                      onClick={adicionarParada}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* DESTINO */}
                <div className="relative pt-2">
                  <div className="absolute -left-[31px] top-5 w-3 h-3 rounded-full bg-red-500 ring-4 ring-white shadow-sm" />
                  <div className="grid gap-1.5">
                    <Label className="text-xs font-bold uppercase text-red-700">
                      Destino Final
                    </Label>
                    <Input
                      value={formData.destino || ""} // CORREÇÃO PRINCIPAL: || ""
                      onChange={(e) =>
                        handleInputChange("destino", e.target.value)
                      }
                      required
                      placeholder="Para onde vai?"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SEÇÃO 3: OPÇÕES EXTRAS */}
            <div className="flex items-center justify-between border-t pt-4">
              <div className="space-y-0.5">
                <Label className="text-sm">Modo Tour / Excursão</Label>
                <p className="text-xs text-muted-foreground">
                  Esta viagem é um passeio fechado?
                </p>
              </div>
              <Switch
                checked={formData.isTour || false} // Proteção contra undefined
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isTour: checked })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Agendando..." : "Confirmar Viagem"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
