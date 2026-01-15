"use client";

import { getStorageInstance } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

// Interface alinhada com o DestinoDialog
export interface DestinoFormData {
  ativo: boolean;
  foto: string;
  origem: string;
  destino: string;
  paradas: string[]; // Adicionado: Lista de cidades
  criarVolta?: boolean; // Adicionado: Flag para criar retorno
}

export interface Destino {
  id: string;
  origem: string;
  destino: string;
  foto: string;
  ativo: boolean;
  paradas?: string[]; // Adicionado no tipo do banco também
}

interface UseDestinosParams {
  fetchData: () => Promise<void>;
}

export function useDestinos({ fetchData }: UseDestinosParams) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDestino, setEditingDestino] = useState<Destino | null>(null);

  // Estado inicial atualizado
  const [formData, setFormData] = useState<DestinoFormData>({
    ativo: true,
    foto: "",
    origem: "",
    destino: "",
    paradas: [], // Inicia vazio
    criarVolta: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingFoto, setUploadingFoto] = useState(false);

  // Mantido caso você queira usar upload de arquivo no futuro
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
    setEditingDestino(null);
    setFormData({
      ativo: true,
      foto: "",
      origem: "",
      destino: "",
      paradas: [],
      criarVolta: false,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (destino: Destino) => {
    setEditingDestino(destino);
    setFormData({
      ativo: destino.ativo,
      foto: destino.foto || "",
      origem: destino.origem,
      destino: destino.destino,
      paradas: destino.paradas || [], // Carrega as paradas existentes
      criarVolta: false, // Edição não cria volta automática
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingDestino(null);
    setFormData({
      ativo: true,
      foto: "",
      origem: "",
      destino: "",
      paradas: [],
      criarVolta: false,
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // 1. Prepara os dados para salvar (remove o campo 'criarVolta' que não vai pro banco)
      const payloadPrincipal = {
        origem: formData.origem,
        destino: formData.destino,
        foto: formData.foto,
        ativo: formData.ativo,
        paradas: formData.paradas.filter((p) => p.trim() !== ""), // Limpa paradas vazias
      };

      const url = editingDestino
        ? `/api/destinos/${editingDestino.id}`
        : "/api/destinos";

      const method = editingDestino ? "PUT" : "POST";

      // Requisição Principal
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadPrincipal),
      });

      if (!res.ok) {
        throw new Error("Erro ao salvar destino");
      }

      // 2. Lógica de CRIAR VOLTA AUTOMÁTICA (Apenas na criação)
      if (!editingDestino && formData.criarVolta) {
        // Inverte Origem <-> Destino
        // Inverte a ordem das paradas (ex: Rio -> Niteroi -> Buzios vira Buzios -> Niteroi -> Rio)
        const paradasInvertidas = [...formData.paradas]
          .filter((p) => p.trim() !== "")
          .reverse();

        const payloadVolta = {
          origem: formData.destino,
          destino: formData.origem,
          foto: formData.foto,
          ativo: formData.ativo,
          paradas: paradasInvertidas,
        };

        // Faz uma segunda chamada para criar a volta
        await fetch("/api/destinos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadVolta),
        });
      }

      await fetchData();
      closeDialog();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar destino");
    } finally {
      setIsSubmitting(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta rota?")) return;

    try {
      const res = await fetch(`/api/destinos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao excluir destino");

      await fetchData();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir destino");
    }
  };

  return {
    isDialogOpen,
    setIsDialogOpen,
    editingDestino,
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
