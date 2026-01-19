import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Verifica se a URL do Webhook existe
    if (!process.env.WEBHOOK_URL) {
      console.error("WEBHOOK_URL não definida no .env");
      return NextResponse.json(
        { error: "Configuração de servidor inválida" },
        { status: 500 }
      );
    }

    // Monta a mensagem bonita (Embed)
    const discordPayload = {
      content: "📨 **Nova solicitação de Contato**",
      embeds: [
        {
          title: "Fale Conosco",
          description: "Mensagem recebida através do formulário do site.",
          color: 0x005f8c, // Cor azul da sua marca (pode mudar se quiser, ex: 0x10b981 para verde)
          fields: [
            {
              name: "👤 Nome",
              value: name || "Não informado",
              inline: true, // Coloca lado a lado
            },
            {
              name: "📧 E-mail",
              value: email || "Não informado",
              inline: true, // Coloca lado a lado
            },
            {
              name: "📞 Telefone",
              value: phone || "Não informado",
              inline: false, // Linha inteira
            },
            {
              name: "💬 Mensagem",
              value: message ? `\`\`\`${message}\`\`\`` : "Sem mensagem", // Coloca em um bloco de código para destacar
              inline: false,
            },
          ],
          footer: {
            text: "RJ Transfer & Tour",
          },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    // Envia para o Discord
    await axios.post(process.env.WEBHOOK_URL, discordPayload, {
      headers: { "Content-Type": "application/json" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao processar contato:", error);
    return NextResponse.json(
      { error: "Erro interno ao enviar mensagem" },
      { status: 500 }
    );
  }
}
