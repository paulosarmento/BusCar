"use client";

import { useMemo, useState } from "react";
import type React from "react";
import type {
  Reserva,
  ReservaFormData,
  UseReservasProps,
  Viagem,
} from "@/types/types";
import { useFirebaseData } from "./useFirebaseData";

export function useReservas({ userId }: UseReservasProps) {
  const { fetchData } = useFirebaseData();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viagemSelecionada, setViagemSelecionada] = useState<Viagem | null>(
    null
  );

  const [showPayment, setShowPayment] = useState(false);
  const [reservaAtual, setReservaAtual] = useState<Reserva | null>(null);

  const [formData, setFormData] = useState<ReservaFormData>({
    quantidadeVagas: 1,
    reservarCarro: false,
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

  const reservasPendentes = useMemo(
    () => reservas.filter((r) => r.status === "pendente_pagamento"),
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

  /* ===================== UI ===================== */

  function openDialog(viagem: Viagem) {
    setViagemSelecionada(viagem);
    setFormData({ quantidadeVagas: 1, reservarCarro: false });
    setShowPayment(false);
    setReservaAtual(null);
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setViagemSelecionada(null);
    setShowPayment(false);
    setReservaAtual(null);
    setFormData({ quantidadeVagas: 1, reservarCarro: false });
  }

  /* ===================== ACTIONS ===================== */

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!viagemSelecionada || !userId) return;

    setIsSubmitting(true);

    try {
      const valorTotal = formData.quantidadeVagas * 20; // R$ 20 por vaga ideal

      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          viagemId: viagemSelecionada.id,
          usuarioId: userId,
          quantidadeVagas: formData.quantidadeVagas,
          status: "pendente_pagamento",
          valorTotal,
        }),
      });

      if (!res.ok) throw new Error("Erro ao criar reserva");

      const reservaCriada = await res.json();
      setReservaAtual(reservaCriada);
      setShowPayment(true); // Mostrar tela de pagamento

      await fetchReservas();
      await fetchData();
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
      alert("Erro ao criar reserva. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function confirmarPagamento(
    reservaId: string,
    mercadoPagoOrderId: string
  ) {
    try {
      const res = await fetch(`/api/reservas/${reservaId}/confirmar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mercadoPagoOrderId }),
      });

      if (!res.ok) throw new Error("Erro ao confirmar pagamento");

      await fetchReservas();
      await fetchData();
      closeDialog();
    } catch (error) {
      console.error("Erro ao confirmar pagamento:", error);
      throw error;
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
    reservasPendentes,
    viagemSelecionada,
    reservaAtual,
    formData,
    isDialogOpen,
    isSubmitting,
    showPayment,
    setFormData,
    setIsDialogOpen,
    setShowPayment,
    fetchReservas,
    openDialog,
    closeDialog,
    submit,
    confirmarPagamento,
    cancelar,
  };
}
