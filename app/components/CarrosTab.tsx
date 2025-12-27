import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./Ui/card";
import { Button } from "./Ui/button";
import { Badge } from "./Ui/badge";
import { Car, Plus, Edit, Trash2 } from "lucide-react";

export function CarrosTab({ carros, onAdd, onEdit, onDelete }: any) {
  if (carros.length === 0) {
    return (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            Nenhum carro cadastrado
          </CardTitle>
          <CardDescription>
            Comece adicionando veículos à sua frota.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="gap-2" onClick={onAdd}>
            <Plus className="w-4 h-4" />
            Cadastrar Primeiro Carro
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {carros.map((carro: any) => (
        <Card key={carro.id} className="group overflow-hidden">
          <div className="aspect-video bg-muted flex items-center justify-center relative">
            {carro.foto ? (
              <img
                src={carro.foto}
                alt={carro.Modelo}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
            ) : (
              <Car className="w-16 h-16 text-muted-foreground" />
            )}
            <Badge
              variant={carro.Ativo ? "default" : "destructive"}
              className="absolute top-3 right-3"
            >
              {carro.Ativo ? "Ativo" : "Inativo"}
            </Badge>
          </div>

          <CardHeader>
            <CardTitle>{carro.Modelo}</CardTitle>
            <CardDescription className="font-mono">
              {carro.Placa}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={() => onEdit(carro)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-destructive"
              onClick={() => onDelete(carro.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
