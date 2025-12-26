import {
  adicionarReserva,
  listarReservasPorViagem,
} from "@/services/reservas.service";
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const reserva = await adicionarReserva(body);
    return NextResponse.json(reserva);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao criar reserva" },
      { status: 500 }
    );
  }
}
