"use client";

import { useMemo, useState } from "react";
import type React from "react";
import {
  Reserva,
  ReservaFormData,
  UseReservasProps,
  Viagem,
} from "@/types/types";

export function useReservas({ userId, fetchData }: UseReservasProps) {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viagemSelecionada, setViagemSelecionada] = useState<Viagem | null>(
    null
  );

  const [formData, setFormData] = useState<ReservaFormData>({
    quantidadeVagas: 1,
  });

  /* ===================== DERIVAÇÕES ===================== */

  const reservasDoUsuario = useMemo(
    () => reservas.filter((r) => r.usuarioId === userId),
    [reservas, userId]
  );

  const reservasConfirmadas = useMemo(
    () => reservas.filter((r) => r.status === "confirmada"),
    [reservas]
  );

  const reservasCanceladas = useMemo(
    () => reservas.filter((r) => r.status === "cancelada"),
    [reservas]
  );

  /* ===================== FETCH ===================== */

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

  /* ===================== SYNC LOCAL ===================== */

  function syncReservasPorViagem(viagemId: string, novoStatus: "cancelada") {
    setReservas((prev) =>
      prev.map((reserva) =>
        reserva.viagemId === viagemId
          ? { ...reserva, status: novoStatus }
          : reserva
      )
    );
  }

  /* ===================== UI ===================== */

  function openDialog(viagem: Viagem) {
    setViagemSelecionada(viagem);
    setFormData({ quantidadeVagas: 1 });
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setViagemSelecionada(null);
    setFormData({ quantidadeVagas: 1 });
  }

  /* ===================== ACTIONS ===================== */

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
          quantidadeVagas: formData.quantidadeVagas,
        }),
      });

      if (!res.ok) throw new Error("Erro ao criar reserva");

      await fetchReservas();
      await fetchData();
      closeDialog();
    } finally {
      setIsSubmitting(false);
    }
  }

  async function cancelar(id: string) {
    if (!confirm("Tem certeza que deseja cancelar esta reserva?")) return;

    await fetch(`/api/reservas/${id}/cancelar`, { method: "POST" });
    await fetchReservas();
    await fetchData();
  }

  return {
    reservas,
    reservasDoUsuario,
    reservasConfirmadas,
    reservasCanceladas,
    viagemSelecionada,
    formData,
    isDialogOpen,
    isSubmitting,
    setFormData,
    setIsDialogOpen,
    fetchReservas,
    syncReservasPorViagem, // 🔥 IMPORTANTE
    openDialog,
    closeDialog,
    submit,
    cancelar,
  };
}
