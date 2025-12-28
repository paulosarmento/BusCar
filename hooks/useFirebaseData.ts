"use client";

import { FirebaseData } from "@/types/types";
import { useState } from "react";

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
