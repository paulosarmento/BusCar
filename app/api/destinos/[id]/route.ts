import { editarDestino, excluirDestino } from "@/services/destino.service";
import { NextResponse } from "next/server";

// Rota para EDITAR um destino
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const destino = await editarDestino(id, body);

    return NextResponse.json(destino);
  } catch (error) {
    console.error("Erro ao editar destino:", error);
    return NextResponse.json(
      { error: "Erro ao editar destino" },
      { status: 500 }
    );
  }
}

// Rota para DELETAR um destino
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await excluirDestino(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir destino:", error);
    return NextResponse.json(
      { error: "Erro ao excluir destino" },
      { status: 500 }
    );
  }
}
