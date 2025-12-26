import {
  editarViagem,
  excluirViagem,
  buscarViagem,
} from "@/services/viagens.service";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const viagem = await buscarViagem(id);
    return NextResponse.json(viagem);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Erro ao buscar viagem" },
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

    const viagem = await editarViagem(id, body);
    return NextResponse.json(viagem);
  } catch (error: any) {
    console.error(error);

    if (
      error.message?.includes("não está ativo") ||
      error.message?.includes("não encontrado") ||
      error.message?.includes("já existe uma viagem")
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: error.message || "Erro ao editar viagem" },
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
    await excluirViagem(id);
    return NextResponse.json({
      success: true,
      message: "Viagem excluída com sucesso",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Erro ao excluir viagem" },
      { status: 500 }
    );
  }
}
