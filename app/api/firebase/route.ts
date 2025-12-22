import { listarTudoFirestore } from "@/services/viagens.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await listarTudoFirestore();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar dados do Firestore" },
      { status: 500 }
    );
  }
}
