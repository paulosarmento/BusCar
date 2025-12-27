"use client";

import { useState } from "react";

export interface Viagem {
  id: string;
  carroId: string;
  dataHora: string;
  capacidadeMax: number;
  status: "aberta" | "fechada" | string;
  createdAt?: string;
}

export interface ViagemFormData {
  carroId: string;
  dataHora: string;
  capacidadeMax: number;
  status: string;
}

interface UseViagensProps {
  fetchData: () => Promise<void>;
}

export function useViagens({ fetchData }: UseViagensProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingViagem, setEditingViagem] = useState<Viagem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ViagemFormData>({
    carroId: "",
    dataHora: "",
    capacidadeMax: 4,
    status: "aberta",
  });

  function openAddDialog() {
    setEditingViagem(null);
    setFormData({
      carroId: "",
      dataHora: "",
      capacidadeMax: 4,
      status: "aberta",
    });
    setIsDialogOpen(true);
  }

  function openEditDialog(viagem: Viagem) {
    setEditingViagem(viagem);

    let dataHoraFormatted = "";
    if (viagem.dataHora) {
      const date = new Date(viagem.dataHora);
      if (!isNaN(date.getTime())) {
        dataHoraFormatted = date.toISOString().slice(0, 16);
      }
    }

    setFormData({
      carroId: viagem.carroId,
      dataHora: dataHoraFormatted,
      capacidadeMax: viagem.capacidadeMax,
      status: viagem.status,
    });

    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setEditingViagem(null);
    setFormData({
      carroId: "",
      dataHora: "",
      capacidadeMax: 4,
      status: "aberta",
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingViagem) {
        const res = await fetch(`/api/viagens/${editingViagem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Erro ao editar viagem");
        }
      } else {
        const res = await fetch("/api/viagens", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Erro ao criar viagem");
        }
      }

      await fetchData();
      closeDialog();
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta viagem?")) return;

    try {
      const res = await fetch(`/api/viagens/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Erro ao excluir viagem");
      }

      await fetchData();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir viagem");
    }
  }

  return {
    // estado
    isDialogOpen,
    setIsDialogOpen,
    isSubmitting,
    editingViagem,
    formData,
    setFormData,

    // ações
    openAddDialog,
    openEditDialog,
    closeDialog,
    submit,
    remove,
  };
}
