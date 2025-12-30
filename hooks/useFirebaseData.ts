"use client";

import { FirebaseData } from "@/types/types";
import { useState } from "react";

export function useFirebaseData() {
  const [data, setData] = useState<FirebaseData>({
    carros: [],
    viagens: [],
    reservas: [],
  });

  const carros = data.carros;
  const viagens = data.viagens;
  const reservas = data.reservas;
  const [loading, setLoading] = useState(true);
  const carrosAtivos = carros.filter((c) => c.ativo);
  const carrosInativos = carros.filter((c) => !c.ativo);
  const viagensAbertas = viagens.filter((v) => v.status === "aberta").length;
  const reservasConfirmadas = reservas.filter(
    (v) => v.status === "confirmada"
  ).length;

  async function fetchData() {
    try {
      const res = await fetch("/api/firebase");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    loading,
    fetchData,
    carrosAtivos,
    carrosInativos,
    viagensAbertas,
    reservasConfirmadas,
    carros,
    viagens,
    reservas,
  };
}
