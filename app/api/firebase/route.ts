import { listarCarros } from "@/services/cars.service";
import { listarReservas } from "@/services/reservas.service";
import { listarViagens } from "@/services/viagens.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const carros = await listarCarros();
    const viagens = await listarViagens();
    const reservas = await listarReservas();

    return NextResponse.json({
      carros,
      viagens,
      reservas,
    });
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 500 }
    );
  }
}
