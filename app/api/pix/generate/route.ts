import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, value, expirationDate, description } = body;

    console.log("[v0] Gerando PIX para reserva:", {
      orderId,
      value,
      description,
    });

    if (!orderId || !value) {
      return NextResponse.json(
        { error: "Parâmetros obrigatórios ausentes" },
        { status: 400 }
      );
    }

    const endpoint = "https://api.mercadopago.com/v1/orders";
    const mercadoPagoApiKey = process.env.MERCADO_PAGO_API_KEY;

    if (!mercadoPagoApiKey) {
      console.error("[v0] MERCADO_PAGO_API_KEY não está configurada");
      return NextResponse.json(
        { error: "MERCADO_PAGO_API_KEY não configurada" },
        { status: 500 }
      );
    }

    const payload = {
      type: "online",
      external_reference: `reserva_${orderId}`,
      total_amount: value.toString(),
      payer: {
        email: "reservas@exemplo.com",
        first_name: "Cliente",
      },
      transactions: {
        payments: [
          {
            amount: value.toString(),
            payment_method: {
              id: "pix",
              type: "bank_transfer",
            },
          },
        ],
      },
    };

    console.log(
      "[v0] Payload enviado para Mercado Pago:",
      JSON.stringify(payload, null, 2)
    );

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${mercadoPagoApiKey}`,
        "X-Idempotency-Key": `idempotency_${orderId}_${Date.now()}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "[v0] Erro na API do Mercado Pago:",
        response.status,
        errorText
      );
      return NextResponse.json(
        {
          error: `Erro ao gerar PIX: ${response.status}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    console.log(
      "[v0] Resposta do Mercado Pago:",
      JSON.stringify(data, null, 2)
    );

    const payment = data.transactions?.payments?.[0];

    console.log("[v0] Payment data:", JSON.stringify(payment, null, 2));
    console.log("[v0] QR Code data:", {
      qr_code: payment?.payment_method?.qr_code ? "exists" : "missing",
      qr_code_base64: payment?.payment_method?.qr_code_base64
        ? "exists"
        : "missing",
    });

    const qrCodeData = {
      orderId: data.id,
      qr_code: payment?.payment_method?.qr_code,
      qr_code_base64: payment?.payment_method?.qr_code_base64,
      ticket_url: payment?.payment_method?.ticket_url,
      expiration_date: payment?.date_of_expiration,
      status: data.status,
      total_amount: data.total_amount,
    };

    console.log("[v0] Enviando resposta:", JSON.stringify(qrCodeData, null, 2));

    return NextResponse.json(qrCodeData);
  } catch (error) {
    console.error("[v0] Erro ao gerar QR Code PIX:", error);
    return NextResponse.json(
      {
        error: "Falha ao gerar QR Code PIX",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
