"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./Ui/card";
import { Button } from "./Ui/button";
import { Badge } from "./Ui/badge";
import {
  Car,
  Plus,
  Edit,
  Trash2,
  Users,
  Fuel,
  AlertCircle,
  MoreHorizontal,
  Zap,
} from "lucide-react";
import { Carro } from "@/types/types";

interface CarrosTabProps {
  carrosInativos: Carro[];
  onAdd: () => void;
  onEdit: (carro: Carro) => void;
  onDelete: (id: string) => void;
  carrosAtivos: Carro[];
  qtdCarros: number;
}

export function CarrosTab({
  carrosInativos,
  onAdd,
  onEdit,
  onDelete,
  carrosAtivos,
  qtdCarros,
}: CarrosTabProps) {
  // ESTADO VAZIO (Nenhum carro no sistema)
  if (qtdCarros === 0) {
    return (
      <Card className="border-dashed bg-slate-50/50">
        <CardHeader className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border border-slate-100">
            <Car className="w-8 h-8 text-slate-300" />
          </div>
          <CardTitle className="text-xl">Sua frota está vazia</CardTitle>
          <p className="text-muted-foreground text-sm mt-2">
            Cadastre seus veículos para começar a criar viagens e gerenciar
            reservas.
          </p>
        </CardHeader>
        <CardContent className="flex justify-center pb-12">
          <Button className="gap-2" onClick={onAdd}>
            <Plus className="w-4 h-4" />
            Cadastrar Primeiro Veículo
          </Button>
        </CardContent>
      </Card>
    );
  }

  // COMPONENTE DE CARD REUTILIZÁVEL (Para evitar repetição de código)
  const CarCard = ({
    carro,
    inativo = false,
  }: {
    carro: Carro;
    inativo?: boolean;
  }) => (
    <Card
      className={`group overflow-hidden transition-all hover:shadow-lg border-slate-200 ${
        inativo
          ? "opacity-80 grayscale-[0.3] bg-slate-50 border-dashed"
          : "bg-white"
      }`}
    >
      {/* Imagem do Carro */}
      <div className="aspect-video bg-slate-100 relative flex items-center justify-center overflow-hidden">
        {carro.foto ? (
          <img
            src={carro.foto}
            alt={carro.modelo}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Car className="w-16 h-16 text-slate-300" />
        )}

        {/* Badge de Status */}
        <div className="absolute top-3 right-3">
          <Badge
            variant={carro.ativo ? "default" : "destructive"}
            className="shadow-sm"
          >
            {carro.ativo ? "Ativo" : "Inativo"}
          </Badge>
        </div>

        {/* Badge de Placa (Estilo Placa Real) */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded border border-slate-300 shadow-sm">
          <span className="text-xs font-mono font-bold text-slate-800 tracking-wider">
            {carro.placa}
          </span>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold text-slate-800 truncate">
            {carro.modelo}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2 rounded">
            <Users className="w-4 h-4 text-primary" />
            <span className="font-medium">
              {carro.capacidade}{" "}
              <span className="text-xs text-muted-foreground font-normal">
                lugares
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2 rounded capitalize">
            {carro.tipo && carro.tipo.toLowerCase().includes("elétrico") ? (
              <Zap className="w-4 h-4 text-yellow-500" />
            ) : (
              <Fuel className="w-4 h-4 text-primary" />
            )}
            <span className="font-medium truncate">
              {carro.tipo || "Padrão"}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex gap-2 border-t bg-slate-50/30 p-4">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 bg-white hover:bg-slate-50"
          onClick={() => onEdit(carro)}
        >
          <Edit className="w-4 h-4 mr-2" />
          Editar
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 bg-white text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
          onClick={() => onDelete(carro.id)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header da Aba com botão de Adicionar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg border shadow-sm">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Car className="w-5 h-5 text-primary" />
            Gestão de Frota
          </h2>
          <p className="text-sm text-muted-foreground">
            {qtdCarros} veículo(s) cadastrado(s) no total.
          </p>
        </div>
        <Button onClick={onAdd} size="sm" className="gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          Novo Veículo
        </Button>
      </div>

      {/* Grid de Ativos */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Veículos Operacionais ({carrosAtivos.length})
        </h3>

        {carrosAtivos.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {carrosAtivos.map((carro) => (
              <CarCard key={carro.id} carro={carro} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed text-slate-400">
            Nenhum veículo ativo no momento.
          </div>
        )}
      </div>

      {/* Grid de Inativos (Só mostra se houver) */}
      {carrosInativos.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 mt-8 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Inativos / Manutenção ({carrosInativos.length})
          </h3>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {carrosInativos.map((carro) => (
              <CarCard key={carro.id} carro={carro} inativo />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
