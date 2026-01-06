import { TipoCarro } from "@/types/types";
import { Button } from "./Ui/button";

interface ReservaDetailProps {
  id: string;
  usuarioId: string;
  viagemId: string;
  status: string;
  valorTotal: number;
  quantidadeVagas: number;
  codigoDaReserva: number;

  onGerarPix: () => void;
}

export function ReservaDetail({
  id,
  status,
  valorTotal,
  quantidadeVagas,
  codigoDaReserva,
  onGerarPix,
}: ReservaDetailProps) {
  return (
    <div className="space-y-2 rounded-lg border p-4">
      <h2 className="text-lg font-semibold">Detalhes da Reserva</h2>

      <p>
        <strong>ID:</strong> {id}
      </p>

      <p>
        <strong>Status:</strong> {status}
      </p>

      <p>
        <strong>Quantidade de vagas:</strong> {quantidadeVagas}
      </p>


      <p>
        <strong>Valor total:</strong>{" "}
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(valorTotal)}
      </p>

      <p>
        <strong>Código da reserva:</strong> {codigoDaReserva}
      </p>

      {/* Botão aparece somente se ainda não estiver paga */}
      {status !== "confirmada" && (
        <Button className="mt-4 w-full" variant="default" onClick={onGerarPix}>
          Gerar Pix novamente
        </Button>
      )}
    </div>
  );
}
