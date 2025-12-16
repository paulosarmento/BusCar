import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";

/**
 * Schema EXTREMAMENTE tolerante
 * (serve só para shape, não para bloquear)
 */
const bodySchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
});

const normalizePhone = (phone?: string) =>
  phone ? phone.replace(/\D/g, "") : "";

const normalizeText = (value?: string, fallback = "-") =>
  value && value.trim().length > 0 ? value.trim() : fallback;

export async function POST(request: Request) {
  try {
    if (!process.env.WEBHOOK_URL) {
      throw new Error("WEBHOOK_URL não configurada");
    }

    const body = await request.json();

    // 🚫 NUNCA lança erro
    const parsed = bodySchema.safeParse(body);

    const data = parsed.success ? parsed.data : {};

    const name = normalizeText(data.name, "Não informado");
    const email = normalizeText(data.email, "Não informado");
    const phone = normalizePhone(data.phone) || "Não informado";
    const message = normalizeText(
      data.message,
      "Mensagem enviada sem conteúdo"
    );

    const messageData = {
      content: "📩 Nova mensagem de contato",
      embeds: [
        {
          title: "Mensagem de Contato",
          color: 0x4983f5,
          fields: [
            { name: "Nome", value: name },
            { name: "E-mail", value: email },
            { name: "Telefone", value: phone },
            { name: "Mensagem", value: message },
          ],
        },
      ],
    };

    await axios.post(process.env.WEBHOOK_URL, messageData, {
      headers: { "Content-Type": "application/json" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao processar contato:", error);

    /**
     * UX ABSOLUTA:
     * nunca devolve erro para o usuário
     */
    return NextResponse.json({ success: true });
  }
}
