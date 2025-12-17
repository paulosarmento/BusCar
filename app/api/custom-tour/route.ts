import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    if (!process.env.WEBHOOK_URL) {
      throw new Error("WEBHOOK_URL não configurada");
    }

    const body = await request.json();

    const { destinations, notes, cel } = body;

    const destinationsText =
      destinations && destinations.length > 0
        ? destinations
            .map((d: { name: string }, i: number) => `${i + 1}. ${d.name}`)
            .join("\n")
        : "Nenhum destino selecionado";

    const notesText =
      notes && notes.trim() ? notes : "Sem observações adicionais";

    const messageData = {
      content: "🎯 Nova solicitação de Tour Personalizado",
      embeds: [
        {
          title: "Tour Personalizado",
          color: 0x10b981,
          fields: [
            {
              name: "👤 Solicitante",
              value: "Anonimo",
            },
            {
              name: "📞 Celular",
              value: cel,
            },
            {
              name: "📍 Destinos Selecionados",
              value: destinationsText,
            },
            {
              name: "💬 Observações",
              value: notesText,
            },
            {
              name: "⏱️ Número de Destinos",
              value: destinations?.length?.toString() || "0",
              inline: true,
            },
            {
              name: "🕐 Duração Estimada",
              value:
                destinations?.length === 0
                  ? "-"
                  : destinations?.length === 1
                  ? "4-6 horas"
                  : destinations?.length === 2
                  ? "6-8 horas"
                  : "8-12 horas",
              inline: true,
            },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    await axios.post(process.env.WEBHOOK_URL, messageData, {
      headers: { "Content-Type": "application/json" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao processar tour personalizado:", error);
    // UX: sempre retorna sucesso para o usuário
    return NextResponse.json({ success: true });
  }
}
