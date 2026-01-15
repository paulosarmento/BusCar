import { adicionarDestino, listarDestinos } from "@/services/destino.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const destino = await adicionarDestino(body);
    return NextResponse.json(destino, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao adicionar destino" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const destinos = await listarDestinos();
    return NextResponse.json(destinos);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar destinos" },
      { status: 500 }
    );
  }
}
