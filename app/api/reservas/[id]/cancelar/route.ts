import { cancelarReserva } from "@/services/reservas.service";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const reserva = await cancelarReserva(id);

    return NextResponse.json(reserva);
  } catch (error) {
    console.error("Erro ao cancelar reserva:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Erro ao cancelar reserva",
      },
      { status: 500 }
    );
  }
}
