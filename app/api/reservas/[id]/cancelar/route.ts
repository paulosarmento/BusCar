import { cancelarReserva } from "@/services/reservas.service";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    console.log("[v0] Cancelando reserva:", id);

    const reserva = await cancelarReserva(id);

    return NextResponse.json(
      {
        success: true,
        message: "Reserva cancelada com sucesso",
        reserva,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[v0] Erro ao cancelar reserva:", error);

    const status = error.message?.includes("não encontrada") ? 404 : 400;

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Erro ao cancelar reserva",
      },
      { status }
    );
  }
}
