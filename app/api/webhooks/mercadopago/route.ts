import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json(body, { status: 200 });
}

async function processarPagamentoAprovado(reservaId: string) {
  try {
    // Lógica para processar o pagamento aprovado
  } catch (error) {
    console.error("Erro ao processar pagamento aprovado:", error);
  }
}
