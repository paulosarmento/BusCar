import { getFirestoreInstance } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

export interface Reserva {
  id?: string;
  viagemId: string;
  usuarioId: string;
  aceitaLotacao4: boolean;
  status: "confirmada" | "cancelada" | "concluida";
  createdAt?: Date | Timestamp;
}

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

export async function listarReservasPorUsuario(usuarioId: string) {
  const db = getFirestoreInstance();
  const reservasRef = collection(db, "reservas");
  const q = query(reservasRef, where("usuarioId", "==", usuarioId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Reserva[];
}

export async function adicionarReserva(
  reserva: Omit<Reserva, "id" | "createdAt" | "status">
) {
  const db = getFirestoreInstance();

  // Validar que a viagem existe
  const viagemRef = doc(db, "viagens", reserva.viagemId);
  const viagemDoc = await getDoc(viagemRef);

  if (!viagemDoc.exists()) {
    throw new Error("Viagem não encontrada");
  }

  const viagemData = viagemDoc.data();

  // Verificar se a viagem está aberta
  if (viagemData.status !== "aberta") {
    throw new Error("Esta viagem não está disponível para reservas");
  }

  // Verificar capacidade disponível
  const reservasExistentes = await listarReservasPorViagem(reserva.viagemId);
  const reservasConfirmadas = reservasExistentes.filter(
    (r) => r.status === "confirmada"
  );

  if (reservasConfirmadas.length >= viagemData.capacidadeMax) {
    throw new Error("Esta viagem já atingiu a capacidade máxima");
  }

  // Verificar se o usuário já tem reserva para esta viagem
  const reservaExistente = reservasConfirmadas.find(
    (r) => r.usuarioId === reserva.usuarioId
  );

  if (reservaExistente) {
    throw new Error("Você já possui uma reserva confirmada para esta viagem");
  }

  // Validar campo obrigatório aceitaLotacao4
  if (typeof reserva.aceitaLotacao4 !== "boolean") {
    throw new Error("Campo aceitaLotacao4 é obrigatório");
  }

  // Adicionar reserva com status inicial "confirmada"
  const reservaData = {
    ...reserva,
    status: "confirmada" as const,
    createdAt: Timestamp.now(),
  };

  const reservasRef = collection(db, "reservas");
  const docRef = await addDoc(reservasRef, reservaData);

  return { id: docRef.id, ...reservaData };
}

export async function editarReserva(id: string, reserva: Partial<Reserva>) {
  const db = getFirestoreInstance();
  const reservaRef = doc(db, "reservas", id);

  // Verificar se a reserva existe
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

  console.log("[v0] Buscando reserva para cancelar:", id);

  // Verificar se a reserva existe
  const reservaDoc = await getDoc(reservaRef);
  if (!reservaDoc.exists()) {
    console.error("[v0] Reserva não encontrada:", id);
    throw new Error("Reserva não encontrada");
  }

  const reservaData = reservaDoc.data();
  console.log("[v0] Status atual da reserva:", reservaData.status);

  // Verificar se a reserva pode ser cancelada
  if (reservaData.status === "cancelada") {
    throw new Error("Esta reserva já foi cancelada");
  }

  if (reservaData.status === "concluida") {
    throw new Error("Não é possível cancelar uma reserva já concluída");
  }

  await updateDoc(reservaRef, { status: "cancelada" });

  console.log("[v0] Reserva cancelada com sucesso:", id);

  return { id, status: "cancelada", ...reservaData };
}

export function observarReservas(callback: (reservas: any[]) => void) {
  const db = getFirestoreInstance();
  const reservasRef = collection(db, "reservas");
  const q = query(reservasRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const reservas = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(reservas);
  });
}
