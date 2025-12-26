import { listarReservasPorViagem } from "@/services/reservas.service";
import { NextResponse } from "next/server";

export async function GET(context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const reservas = await listarReservasPorViagem(id);
    return NextResponse.json(reservas);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar reservas da viagem" },
      { status: 500 }
    );
  }
}
