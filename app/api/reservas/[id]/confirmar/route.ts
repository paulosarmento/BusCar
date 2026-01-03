import { confirmarPagamentoReserva } from "@/services/reservas.service";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { mercadoPagoOrderId } = body;

    if (!mercadoPagoOrderId) {
      return NextResponse.json(
        { error: "mercadoPagoOrderId é obrigatório" },
        { status: 400 }
      );
    }

    console.log(
      `[API] Confirmando pagamento - Reserva: ${id}, Order: ${mercadoPagoOrderId}`
    );

    try {
      const reserva = await confirmarPagamentoReserva(id, mercadoPagoOrderId);
      console.log(`[API] Pagamento confirmado com sucesso para reserva ${id}`);
      return NextResponse.json(reserva);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      if (
        errorMessage.includes("já foi confirmada") ||
        errorMessage.includes("já está confirmada")
      ) {
        console.log(
          `[API] Reserva ${id} já estava confirmada, retornando sucesso`
        );
        return NextResponse.json({
          message: "Reserva já confirmada anteriormente",
          alreadyConfirmed: true,
        });
      }

      console.error(
        `[API] Erro ao confirmar pagamento da reserva ${id}:`,
        errorMessage
      );
      throw error;
    }
  } catch (error) {
    console.error("[API] Erro geral ao confirmar pagamento:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao confirmar pagamento",
      },
      { status: 500 }
    );
  }
}
