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

    const vagasReservadasAtual = viagemData.vagasReservadas ?? 0;
    const capacidadeMax = viagemData.capacidadeMax;

    const vagasDisponiveis = capacidadeMax - vagasReservadasAtual;

    if (reserva.quantidadeVagas > vagasDisponiveis) {
      throw new Error(`Vagas insuficientes. Disponíveis: ${vagasDisponiveis}`);
    }

    // Verificar se o usuário já tem reserva confirmada
    const reservasRef = collection(db, "reservas");
    const q = query(
      reservasRef,
      where("viagemId", "==", reserva.viagemId),
      where("usuarioId", "==", reserva.usuarioId),
      where("status", "==", "confirmada")
    );

    const reservasSnap = await getDocs(q);

    if (!reservasSnap.empty) {
      throw new Error("Usuário ja possui reserva confirmada");
    }

    // Criar reserva com status pendente_pagamento
    const reservaRef = doc(reservasRef);
    const reservaData = {
      ...reserva,
      status: "pendente_pagamento" as const,
      createdAt: Timestamp.now(),
    };

    transaction.set(reservaRef, reservaData);

    // NÃO atualiza vagas ainda - só quando pagamento for confirmado

    return {
      id: reservaRef.id,
      ...reservaData,
    };
  });
}

export async function editarReserva(id: string, reserva: Partial<Reserva>) {
  const db = getFirestoreInstance();
  const reservaRef = doc(db, "reservas", id);

  const reservaDoc = await getDoc(reservaRef);
  if (!reservaDoc.exists()) {
    throw new Error("Reserva não encontrada");
  }

  await updateDoc(reservaRef, reserva);
  return { id, ...reserva };
}

export async function excluirReserva(id: string) {
  const db = getFirestoreInstance();
  const reservaRef = doc(db, "reservas", id);
  await deleteDoc(reservaRef);
  return { id };
}

export async function buscarReserva(id: string) {
  const db = getFirestoreInstance();
  const reservaRef = doc(db, "reservas", id);
  const reservaDoc = await getDoc(reservaRef);

  if (!reservaDoc.exists()) {
    throw new Error("Reserva não encontrada");
  }

  return { id: reservaDoc.id, ...reservaDoc.data() } as Reserva;
}

export async function cancelarReserva(id: string) {
  const db = getFirestoreInstance();
  const reservaRef = doc(db, "reservas", id);

  return await runTransaction(db, async (transaction) => {
    const reservaSnap = await transaction.get(reservaRef);

    if (!reservaSnap.exists()) {
      throw new Error("Reserva não encontrada");
    }

    const reservaData = reservaSnap.data();

    if (reservaData.status === "cancelada") {
      throw new Error("Esta reserva já foi cancelada");
    }

    if (reservaData.status === "concluida") {
      throw new Error("Não é possível cancelar uma reserva concluída");
    }

    if (reservaData.status === "confirmada") {
      const viagemRef = doc(db, "viagens", reservaData.viagemId);
      const viagemSnap = await transaction.get(viagemRef);

      if (!viagemSnap.exists()) {
        throw new Error("Viagem não encontrada");
      }

      const viagemData = viagemSnap.data();
      const vagasReservadasAtual = viagemData.vagasReservadas ?? 0;
      const quantidadeVagas = reservaData.quantidadeVagas ?? 1;

      // Devolver vagas para a viagem
      const novasVagasReservadas = Math.max(
        0,
        vagasReservadasAtual - quantidadeVagas
      );

      transaction.update(viagemRef, {
        vagasReservadas: novasVagasReservadas,
      });
    }

    // Atualizar reserva
    transaction.update(reservaRef, {
      status: "cancelada",
    });

    return {
      id,
      status: "cancelada",
      ...reservaData,
    };
  });
}

export async function confirmarPagamentoReserva(
  reservaId: string,
  mercadoPagoOrderId: string
) {
  const db = getFirestoreInstance();
  const reservaRef = doc(db, "reservas", reservaId);

  return await runTransaction(db, async (transaction) => {
    const reservaSnap = await transaction.get(reservaRef);

    if (!reservaSnap.exists()) {
      throw new Error("Reserva não encontrada");
    }

    const reservaData = reservaSnap.data();

    if (reservaData.status === "confirmada") {
      console.log(`Reserva ${reservaId} já estava confirmada`);
      return { id: reservaId, ...reservaData, alreadyConfirmed: true };
    }

    if (reservaData.status !== "pendente_pagamento") {
      throw new Error(
        `Esta reserva não está pendente de pagamento. Status atual: ${reservaData.status}`
      );
    }

    const viagemRef = doc(db, "viagens", reservaData.viagemId);
    const viagemSnap = await transaction.get(viagemRef);

    if (!viagemSnap.exists()) {
      throw new Error("Viagem não encontrada");
    }

    const viagemData = viagemSnap.data();
    const vagasReservadasAtual = viagemData.vagasReservadas ?? 0;
    const quantidadeVagas = reservaData.quantidadeVagas ?? 1;

    transaction.update(reservaRef, {
      status: "confirmada",
      mercadoPagoOrderId,
      confirmedAt: Timestamp.now(),
    });

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
