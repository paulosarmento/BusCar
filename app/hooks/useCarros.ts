"use client";

import { useState } from "react";

export interface Carro {
  id: string;
  Modelo: string;
  Placa: string;
  Ativo: boolean;
  foto: string;
}

export interface CarroFormData {
  Modelo: string;
  Placa: string;
  Ativo: boolean;
  foto: string;
}

interface UseCarrosParams {
  fetchData: () => Promise<void>;
}

export function useCarros({ fetchData }: UseCarrosParams) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Carro | null>(null);
  const [formData, setFormData] = useState<CarroFormData>({
    Modelo: "",
    Placa: "",
    Ativo: true,
    foto: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openAddDialog = () => {
    setEditingCar(null);
    setFormData({ Modelo: "", Placa: "", Ativo: true, foto: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (carro: Carro) => {
    setEditingCar(carro);
    setFormData({
      Modelo: carro.Modelo,
      Placa: carro.Placa,
      Ativo: carro.Ativo,
      foto: carro.foto || "",
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingCar(null);
    setFormData({ Modelo: "", Placa: "", Ativo: true, foto: "" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!formData.Modelo || !formData.Placa) return;

    setIsSubmitting(true);

    try {
      const url = editingCar ? `/api/carros/${editingCar.id}` : "/api/carros";

      const method = editingCar ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(
          editingCar ? "Erro ao editar carro" : "Erro ao adicionar carro"
        );
      }

      await fetchData();
      closeDialog();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar carro");
    } finally {
      setIsSubmitting(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este carro?")) return;

    try {
      const res = await fetch(`/api/carros/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao excluir carro");

      await fetchData();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir carro");
    }
  };

  return {
    isDialogOpen,
    setIsDialogOpen,
    editingCar,
    formData,
    setFormData,
    isSubmitting,
    openAddDialog,
    openEditDialog,
    closeDialog,
    submit,
    remove,
  };
}
