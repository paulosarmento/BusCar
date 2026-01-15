"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Ui/card";
import { Button } from "./Ui/button";
import { Badge } from "./Ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  Navigation,
  Map,
  CornerDownRight,
} from "lucide-react";

// Atualizamos a interface para incluir as paradas (opcional)
interface Destino {
  id: string;
  origem: string;
  destino: string;
  foto: string;
  ativo: boolean;
  paradas?: string[]; // Lista de cidades intermediárias
}

interface DestinosTabsProps {
  destinosInativos: Destino[];
  onAdd: () => void;
  onEdit: (destino: Destino) => void;
  onDelete: (id: string) => void;
  destinosAtivos: Destino[];
  qtdDestinos: number;
}

export function DestinosTabs({
  destinosInativos,
  onAdd,
  onEdit,
  onDelete,
  destinosAtivos,
  qtdDestinos,
}: DestinosTabsProps) {
  // Estado Vazio
  if (qtdDestinos === 0) {
    return (
      <Card className="border-dashed bg-slate-50">
        <CardHeader className="text-center pb-8 pt-8">
          <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2">
            <Map className="w-6 h-6 text-muted-foreground" />
          </div>
          <CardTitle>Nenhuma rota cadastrada</CardTitle>
          <CardDescription>
            Crie as rotas de origem, paradas e destino para iniciar as viagens.
          </CardDescription>
          <div className="pt-4">
            <Button onClick={onAdd} className="gap-2">
              <Plus className="w-4 h-4" />
              Criar Primeira Rota
            </Button>
          </div>
        </CardHeader>
      </Card>
    );
  }

  // Componente interno para renderizar o Card da Rota
  const RouteCard = ({ destino }: { destino: Destino }) => (
    <Card
      key={destino.id}
      className={`group transition-all hover:shadow-md border-l-4 ${
        destino.ativo ? "border-l-primary" : "border-l-slate-300 opacity-80"
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Badge
              variant={destino.ativo ? "outline" : "secondary"}
              className={`${
                destino.ativo
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {destino.ativo ? "Rota Ativa" : "Desativada"}
            </Badge>

            {/* Badge indicando quantas paradas existem */}
            {destino.paradas && destino.paradas.length > 0 && (
              <Badge
                variant="secondary"
                className="text-xs font-normal bg-yellow-50 text-yellow-700 border-yellow-200"
              >
                {destino.paradas.length}{" "}
                {destino.paradas.length === 1 ? "parada" : "paradas"}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        {/* VISUAL DE GPS / TIMELINE */}
        <div className="relative pl-4 space-y-4 mt-2">
          {/* Linha Conectora (fundo) */}
          <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-slate-200 border-l border-dashed border-slate-300" />

          {/* 1. Origem (Verde) */}
          <div className="relative flex items-center gap-3">
            <div className="absolute -left-[16px] w-3 h-3 rounded-full bg-green-500 ring-4 ring-white shadow-sm z-10" />
            <div>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                Sai de
              </p>
              <p className="text-lg font-bold text-slate-800 leading-tight">
                {destino.origem}
              </p>
            </div>
          </div>

          {/* 2. Paradas Intermediárias (Amarelo) */}
          {destino.paradas &&
            destino.paradas.map((parada, idx) => (
              <div key={idx} className="relative flex items-center gap-3 py-1">
                {/* Bolinha menor alinhada */}
                <div className="absolute -left-[14px] w-2 h-2 rounded-full bg-yellow-400 ring-2 ring-white z-10" />

                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                  <CornerDownRight className="w-3 h-3 opacity-40" />
                  {parada}
                </div>
              </div>
            ))}

          {/* 3. Destino (Vermelho) */}
          <div className="relative flex items-center gap-3 pt-1">
            <div className="absolute -left-[16px] w-3 h-3 rounded-full bg-red-500 ring-4 ring-white shadow-sm z-10" />
            <div>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                Chega em
              </p>
              <p className="text-lg font-bold text-slate-800 leading-tight">
                {destino.destino}
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 hover:bg-slate-50"
          onClick={() => onEdit(destino)}
        >
          <Edit className="w-4 h-4 mr-2 text-blue-600" />
          Editar
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 hover:bg-red-50 border-red-100 text-red-600 hover:text-red-700"
          onClick={() => onDelete(destino.id)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* SEÇÃO DE ROTAS ATIVAS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Navigation className="w-5 h-5 text-primary" />
            Rotas Disponíveis
          </h3>
          <span className="text-sm text-muted-foreground">
            {destinosAtivos.length}{" "}
            {destinosAtivos.length === 1 ? "rota" : "rotas"}
          </span>
        </div>

        {destinosAtivos.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {destinosAtivos.map((destino) => (
              <RouteCard key={destino.id} destino={destino} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic p-4 bg-slate-50 rounded-md">
            Nenhuma rota ativa no momento.
          </p>
        )}
      </div>

      {/* SEÇÃO DE ROTAS INATIVAS */}
      {destinosInativos.length > 0 && (
        <div className="pt-4 border-t">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
            Arquivadas / Inativas
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 opacity-75 grayscale-[0.5] hover:grayscale-0 transition-all">
            {destinosInativos.map((destino) => (
              <RouteCard key={destino.id} destino={destino} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
