"use client";

import { useState } from "react";

export interface FirebaseData {
  carros: any[];
  viagens: any[];
}

export function useFirebaseData() {
  const [data, setData] = useState<FirebaseData>({
    carros: [],
    viagens: [],
  });
  const [loading, setLoading] = useState(true);

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
  };
}
