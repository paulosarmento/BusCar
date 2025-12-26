import { adicionarViagem, listarViagens } from "@/services/viagens.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const viagens = await listarViagens();
    return NextResponse.json(viagens);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar viagens" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.carroId || !body.dataHora) {
      return NextResponse.json(
        { error: "Campos obrigatórios: carroId, dataHora" },
        { status: 400 }
      );
    }

    const viagemData = {
      ...body,
      capacidadeMax: body.capacidadeMax || 4,
    };

    const viagem = await adicionarViagem(viagemData);
    return NextResponse.json(viagem, { status: 201 });
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
      { error: error.message || "Erro ao adicionar viagem" },
      { status: 500 }
    );
  }
}
