"use client";

import { useState } from "react";
import type React from "react";
import type { Viagem } from "./useViagens";

export interface Reserva {
  id: string;
  viagemId: string;
  usuarioId: string;
  aceitaLotacao4: boolean;
  status: "confirmada" | "cancelada" | string;
  createdAt?: string;
}

export interface ReservaFormData {
  aceitaLotacao4: boolean;
}

interface UseReservasProps {
  userId: string | undefined;
  fetchData: () => Promise<void>;
}

export function useReservas({ userId, fetchData }: UseReservasProps) {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viagemSelecionada, setViagemSelecionada] = useState<Viagem | null>(
    null
  );

  const [formData, setFormData] = useState<ReservaFormData>({
    aceitaLotacao4: false,
  });

  const reservasDoUsuario = reservas.filter((r) => r.usuarioId === userId);

  const reservasConfirmadas = reservasDoUsuario.filter(
    (r) => r.status === "confirmada"
  ).length;

  const reservasCanceladas = reservasDoUsuario.filter(
    (r) => r.status === "cancelada"
  ).length;

  async function fetchReservas() {
    try {
      const res = await fetch("/api/firebase");
      const data = await res.json();
      setReservas(data.reservas || []);
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
      setReservas([]);
    }
  }

  function openDialog(viagem: Viagem) {
    setViagemSelecionada(viagem);
    setFormData({ aceitaLotacao4: false });
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setViagemSelecionada(null);
    setFormData({ aceitaLotacao4: false });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!viagemSelecionada || !userId) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          viagemId: viagemSelecionada.id,
          usuarioId: userId,
          aceitaLotacao4: formData.aceitaLotacao4,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Erro ao criar reserva");
      }

      await fetchData();
      await fetchReservas();
      closeDialog();
      alert("Reserva criada com sucesso!");
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function cancelar(id: string) {
    if (!confirm("Tem certeza que deseja cancelar esta reserva?")) return;

    try {
      const res = await fetch(`/api/reservas/${id}/cancelar`, {
        method: "POST",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Erro ao cancelar reserva");
      }

      await fetchReservas();
      alert("Reserva cancelada com sucesso!");
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  }

  return {
    // estado
    reservas,
    reservasDoUsuario,
    reservasConfirmadas,
    reservasCanceladas,
    viagemSelecionada,
    formData,
    isDialogOpen,
    isSubmitting,

    // setters
    setFormData,
    setIsDialogOpen,

    // ações
    fetchReservas,
    openDialog,
    closeDialog,
    submit,
    cancelar,
  };
}
