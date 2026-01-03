import { adicionarReserva } from "@/services/reservas.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { viagemId, usuarioId, quantidadeVagas, valorTotal } = body;

    if (!viagemId || !usuarioId || !quantidadeVagas) {
      return NextResponse.json(
        {
          error:
            "Parâmetros obrigatórios ausentes: viagemId, usuarioId, quantidadeVagas",
        },
        { status: 400 }
      );
    }

    const reserva = await adicionarReserva({
      viagemId,
      usuarioId,
      quantidadeVagas,
      valorTotal: valorTotal || quantidadeVagas * 10,
    });

    return NextResponse.json(reserva, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Erro ao criar reserva",
      },
      { status: 500 }
    );
  }
}
