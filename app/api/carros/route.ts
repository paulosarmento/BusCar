import { adicionarCarro, listarCarros } from "@/services/cars.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const carro = await adicionarCarro(body);
    return NextResponse.json(carro, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao adicionar carro" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const carros = await listarCarros();
    return NextResponse.json(carros);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar carros" },
      { status: 500 }
    );
  }
}
