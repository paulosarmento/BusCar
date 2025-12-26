import { editarCarro, excluirCarro } from "@/services/cars.service";
import { type NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const carro = await editarCarro(id, body);

    return NextResponse.json(carro);
  } catch (error) {
    console.error("Erro ao editar carro:", error);
    return NextResponse.json(
      { error: "Erro ao editar carro" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await excluirCarro(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir carro:", error);
    return NextResponse.json(
      { error: "Erro ao excluir carro" },
      { status: 500 }
    );
  }
}
