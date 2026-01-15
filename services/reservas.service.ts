import { getFirestoreInstance } from "@/lib/firebase";
import type { Reserva } from "@/types/types";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
  query,
  where,
  runTransaction,
} from "firebase/firestore";

// --- LISTAGEM ---
export async function listarReservas() {
  const db = getFirestoreInstance();
  const reservasRef = collection(db, "reservas");
  const querySnapshot = await getDocs(reservasRef);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Reserva[];
}

export async function listarReservasPorViagem(viagemId: string) {
  const db = getFirestoreInstance();
  const reservasRef = collection(db, "reservas");
  const q = query(reservasRef, where("viagemId", "==", viagemId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Reserva[];
}

// --- ADICIONAR (RESERVAR) ---
export async function adicionarReserva(
  reserva: Omit<Reserva, "id" | "createdAt" | "status"> & {
    quantidadeVagas: number;
  }
) {
  const db = getFirestoreInstance();

  if (reserva.quantidadeVagas < 1) {
    throw new Error("Quantidade de vagas inválida");
  }

  const viagemRef = doc(db, "viagens", reserva.viagemId);

  return await runTransaction(db, async (transaction) => {
    const viagemSnap = await transaction.get(viagemRef);
    if (!viagemSnap.exists()) {
      throw new Error("Viagem não encontrada");
    }

    const viagemData = viagemSnap.data();

    if (viagemData.status !== "aberta") {
      throw new Error("Esta viagem não está disponível para reservas");
    }

    // VERIFICAÇÃO SIMPLES E SEGURA DE CAPACIDADE
    // Apenas verifica se a quantidade total reservada cabe no carro.
    const vagasReservadasAtual = viagemData.vagasReservadas ?? 0;
    const capacidadeMax = viagemData.capacidadeMax;
    const vagasDisponiveis = capacidadeMax - vagasReservadasAtual;

    if (reserva.quantidadeVagas > vagasDisponiveis) {
      throw new Error(`Vagas insuficientes. Disponíveis: ${vagasDisponiveis}`);
    }

    const reservasRef = collection(db, "reservas");
    const novaReservaRef = doc(reservasRef);

    // Salva o ID que veio do formulário. Se vier vazio (o que o Dialog impede agora), salva "padrao".
    const pEmbarque = reserva.paradaEmbarqueId || "padrao";
    const pDesembarque = reserva.paradaDesembarqueId || "padrao";

    const reservaData = {
      ...reserva,
      paradaEmbarqueId: pEmbarque,
      paradaDesembarqueId: pDesembarque,
      status: "pendente_pagamento" as const,
      createdAt: Timestamp.now(),
    };

    transaction.set(novaReservaRef, reservaData);

    return {
      id: novaReservaRef.id,
      ...reservaData,
    };
  });
}

// --- CONFIRMAÇÃO DE PAGAMENTO ---
export async function confirmarPagamentoReserva(
  reservaId: string,
  mercadoPagoOrderId: string
) {
  const db = getFirestoreInstance();
  const reservaRef = doc(db, "reservas", reservaId);

  return await runTransaction(db, async (transaction) => {
    const reservaSnap = await transaction.get(reservaRef);
    if (!reservaSnap.exists()) throw new Error("Reserva não encontrada");
    const reservaData = reservaSnap.data();

    if (reservaData.status === "confirmada") {
      return { id: reservaId, ...reservaData, alreadyConfirmed: true };
    }

    if (reservaData.status !== "pendente_pagamento") {
      throw new Error(`Reserva inválida: ${reservaData.status}`);
    }

    const viagemRef = doc(db, "viagens", reservaData.viagemId);
    const viagemSnap = await transaction.get(viagemRef);
    if (!viagemSnap.exists()) throw new Error("Viagem não encontrada");

    const viagemData = viagemSnap.data();
    const vagasReservadasAtual = viagemData.vagasReservadas ?? 0;
    const capacidadeMax = viagemData.capacidadeMax;
    const quantidadeVagas = reservaData.quantidadeVagas ?? 1;

    // Bloqueio final de segurança
    if (vagasReservadasAtual + quantidadeVagas > capacidadeMax) {
      transaction.update(reservaRef, {
        status: "cancelada",
        motivo: "overbooking",
      });
      throw new Error("A viagem lotou antes da confirmação.");
    }

    transaction.update(reservaRef, {
      status: "confirmada",
      mercadoPagoOrderId,
      confirmedAt: Timestamp.now(),
    });

    // Incrementa vagas reservadas no total da viagem
    transaction.update(viagemRef, {
      vagasReservadas: vagasReservadasAtual + quantidadeVagas,
    });

    return {
      id: reservaId,
      ...reservaData,
      status: "confirmada",
      mercadoPagoOrderId,
    };
  });
}

// --- CANCELAR E LIBERAR VAGA ---
export async function cancelarReserva(id: string) {
  const db = getFirestoreInstance();
  const reservaRef = doc(db, "reservas", id);

  return await runTransaction(db, async (transaction) => {
    const reservaSnap = await transaction.get(reservaRef);
    if (!reservaSnap.exists()) throw new Error("Reserva não encontrada");
    const reservaData = reservaSnap.data();

    if (reservaData.status === "cancelada") throw new Error("Já cancelada");
    if (reservaData.status === "concluida")
      throw new Error("Viagem já realizada");

    if (reservaData.status === "confirmada") {
      const viagemRef = doc(db, "viagens", reservaData.viagemId);
      const viagemSnap = await transaction.get(viagemRef);

      if (viagemSnap.exists()) {
        const viagemData = viagemSnap.data();
        const vagasAtuais = viagemData.vagasReservadas ?? 0;
        const qtd = reservaData.quantidadeVagas ?? 1;

        // Devolve as vagas para o total
        transaction.update(viagemRef, {
          vagasReservadas: Math.max(0, vagasAtuais - qtd),
        });
      }
    }

    transaction.update(reservaRef, {
      status: "cancelada",
      cancelledAt: Timestamp.now(),
    });

    return { id, status: "cancelada", ...reservaData };
  });
}

// --- UTILITÁRIOS ---
export async function buscarReserva(id: string) {
  const db = getFirestoreInstance();
  const reservaRef = doc(db, "reservas", id);
  const reservaDoc = await getDoc(reservaRef);
  if (!reservaDoc.exists()) throw new Error("Reserva não encontrada");
  return { id: reservaDoc.id, ...reservaDoc.data() } as Reserva;
}

export async function editarReserva(id: string, reserva: Partial<Reserva>) {
  const db = getFirestoreInstance();
  const reservaRef = doc(db, "reservas", id);
  await updateDoc(reservaRef, reserva);
  return { id, ...reserva };
}

export async function excluirReserva(id: string) {
  const db = getFirestoreInstance();
  const reservaRef = doc(db, "reservas", id);
  await deleteDoc(reservaRef);
  return { id };
}
