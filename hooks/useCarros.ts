"use client";

import { getStorageInstance } from "@/lib/firebase";
import { Carro, CarroFormData, UseCarrosParams } from "@/types/types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

export function useCarros({ fetchData }: UseCarrosParams) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Carro | null>(null);
  const [formData, setFormData] = useState<CarroFormData>({
    modelo: "",
    placa: "",
    ativo: true,
    foto: "",
    tipo: "carro",
    capacidade: 4,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [uploadingFoto, setUploadingFoto] = useState(false);
  const handleUploadFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFoto(true);

    try {
      const storage = getStorageInstance();

      const fileRef = ref(storage, `fotos/${crypto.randomUUID()}-${file.name}`);

      await uploadBytes(fileRef, file);

      const url = await getDownloadURL(fileRef);

      setFormData((prev) => ({
        ...prev,
        foto: url,
      }));
    } finally {
      setUploadingFoto(false);
    }
  };

  const openAddDialog = () => {
    setEditingCar(null);
    setFormData({
      modelo: "",
      placa: "",
      ativo: true,
      foto: "",
      tipo: "carro",
      capacidade: 4,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (carro: Carro) => {
    setEditingCar(carro);
    setFormData({
      modelo: carro.modelo,
      placa: carro.placa,
      ativo: carro.ativo,
      foto: carro.foto || "",
      tipo: carro.tipo,
      capacidade: carro.capacidade,
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingCar(null);
    setFormData({
      modelo: "",
      placa: "",
      ativo: true,
      foto: "",
      capacidade: 4,
      tipo: "carro",
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!formData.modelo || !formData.placa) return;

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
    handleUploadFoto,
    uploadingFoto,
  };
}
