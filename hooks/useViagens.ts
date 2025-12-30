"use client";

import { UseViagensProps, Viagem, ViagemFormData } from "@/types/types";
import { useState } from "react";

interface UseViagensExtendedProps extends UseViagensProps {
  onViagemRemovida?: (viagemId: string) => void;
}

export function useViagens({
  fetchData,
  onViagemRemovida,
}: UseViagensExtendedProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingViagem, setEditingViagem] = useState<Viagem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ViagemFormData>({
    carroId: "",
    destino: "",
    isTour: false,
    dataHora: "",
    capacidadeMax: 0,
    vagasReservadas: 0,
    status: "aberta",
  });

  function openAddDialog() {
    setEditingViagem(null);
    setFormData({
      carroId: "",
      destino: "",
      isTour: false,
      dataHora: "",
      capacidadeMax: 0,
      vagasReservadas: 0,
      status: "aberta",
    });
    setIsDialogOpen(true);
  }

  function openEditDialog(viagem: Viagem) {
    const date = new Date(viagem.dataHora as string);
    setEditingViagem(viagem);
    setFormData({
      ...viagem,
      dataHora: !isNaN(date.getTime()) ? date.toISOString().slice(0, 16) : "",
    });
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setEditingViagem(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingViagem
        ? `/api/viagens/${editingViagem.id}`
        : "/api/viagens";

      const method = editingViagem ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      await fetchData();
      closeDialog();
    } finally {
      setIsSubmitting(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta viagem?")) return;

    await fetch(`/api/viagens/${id}`, { method: "DELETE" });

    // 🔥 ATUALIZA RESERVAS LOCALMENTE
    onViagemRemovida?.(id);

    await fetch(`/api/viagens/${id}/reservas`, { method: "DELETE" });

    // 🔥 ATUALIZA RESERVAS LOCALMENTE
    onViagemRemovida?.(id);

    await fetchData();
  }

  return {
    isDialogOpen,
    setIsDialogOpen,
    editingViagem,
    isSubmitting,
    formData,
    setFormData,
    openAddDialog,
    openEditDialog,
    closeDialog,
    submit,
    remove,
  };
}
