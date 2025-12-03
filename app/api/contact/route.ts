import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";

const bodySchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  message: z.string().min(5, "Mensagem deve ter pelo menos 5 caracteres"),
});

const WEBHOOK_URL = process.env.WEBHOOK_URL!;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = bodySchema.parse(body);

    const messageData = {
      embeds: [
        {
          title: "Mensagem de Contato",
          color: 0x4983f5,
          fields: [
            {
              name: "Nome",
              value: name,
              inline: true,
            },
            {
              name: "E-mail",
              value: email,
              inline: true,
            },
            {
              name: "Telefone",
              value: phone,
            },
            {
              name: "Mensagem",
              value: message,
            },
          ],
        },
      ],
    };

    await axios.post(WEBHOOK_URL, messageData);

    return NextResponse.json({
      success: true,
      message: "Mensagem enviada com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao processar contato:", error);
    return NextResponse.json(
      { error: "Erro ao enviar mensagem" },
      { status: 400 }
    );
  }
}
