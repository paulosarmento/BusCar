import {
  buscarReserva,
  editarReserva,
  excluirReserva,
} from "@/services/reservas.service";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const reserva = await buscarReserva(id);
    return NextResponse.json(reserva);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Erro ao buscar reserva" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const reserva = await editarReserva(id, body);
    return NextResponse.json(reserva);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Erro ao editar reserva" },
      { status: 500 }
    );
  }
}

export async function DELETE(context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await excluirReserva(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao excluir reserva" },
      { status: 500 }
    );
  }
}
