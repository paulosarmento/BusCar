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
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export interface Viagem {
  id?: string;
  dataHora: Date | Timestamp | string;
  carroId: string;
  capacidadeMax: number;
  status: "aberta" | "fechada" | "cancelada";
  createdAt?: Date | Timestamp | string;
}

export async function listarViagens() {
  const db = getFirestoreInstance();
  const viagensRef = collection(db, "viagens");
  const querySnapshot = await getDocs(viagensRef);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      dataHora:
        data.dataHora instanceof Timestamp
          ? data.dataHora.toDate().toISOString()
          : data.dataHora,
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : data.createdAt,
    };
  }) as Viagem[];
}

export async function adicionarViagem(
  viagem: Omit<Viagem, "id" | "createdAt">
) {
  const db = getFirestoreInstance();

  const carroRef = doc(db, "carros", viagem.carroId);
  const carroDoc = await getDoc(carroRef);

  if (!carroDoc.exists()) {
    throw new Error("Carro não encontrado");
  }

  const carroData = carroDoc.data();
  if (!carroData.Ativo) {
    throw new Error(
      "Carro não está ativo. Apenas carros ativos podem ter viagens agendadas."
    );
  }

  const capacidadeMax = viagem.capacidadeMax || 4;

  const dataHoraTimestamp =
    typeof viagem.dataHora === "string"
      ? Timestamp.fromDate(new Date(viagem.dataHora))
      : viagem.dataHora instanceof Date
      ? Timestamp.fromDate(viagem.dataHora)
      : viagem.dataHora;

  const viagensRef = collection(db, "viagens");
  const conflictQuery = query(
    viagensRef,
    where("carroId", "==", viagem.carroId),
    where("dataHora", "==", dataHoraTimestamp)
  );
  const conflictSnapshot = await getDocs(conflictQuery);

  if (!conflictSnapshot.empty) {
    throw new Error(
      "Já existe uma viagem agendada para este carro neste horário"
    );
  }

  const viagemData = {
    ...viagem,
    capacidadeMax,
    status: viagem.status || ("aberta" as const),
    createdAt: Timestamp.now(),
    dataHora: dataHoraTimestamp,
  };

  const docRef = await addDoc(viagensRef, viagemData);

  return {
    id: docRef.id,
    ...viagemData,
    dataHora:
      viagemData.dataHora instanceof Timestamp
        ? viagemData.dataHora.toDate().toISOString()
        : viagemData.dataHora,
    createdAt:
      viagemData.createdAt instanceof Timestamp
        ? viagemData.createdAt.toDate().toISOString()
        : viagemData.createdAt,
  };
}

export async function editarViagem(id: string, viagem: Partial<Viagem>) {
  const db = getFirestoreInstance();

  if (viagem.carroId) {
    const carroRef = doc(db, "carros", viagem.carroId);
    const carroDoc = await getDoc(carroRef);

    if (!carroDoc.exists()) {
      throw new Error("Carro não encontrado");
    }

    const carroData = carroDoc.data();
    if (!carroData.Ativo) {
      throw new Error("Carro não está ativo");
    }
  }

  const viagemData: any = { ...viagem };

  if (viagem.dataHora) {
    viagemData.dataHora =
      typeof viagem.dataHora === "string"
        ? Timestamp.fromDate(new Date(viagem.dataHora))
        : viagem.dataHora instanceof Date
        ? Timestamp.fromDate(viagem.dataHora)
        : viagem.dataHora;

    const viagemAtual = await buscarViagem(id);
    const carroId = viagem.carroId || viagemAtual.carroId;

    const viagensRef = collection(db, "viagens");
    const conflictQuery = query(
      viagensRef,
      where("carroId", "==", carroId),
      where("dataHora", "==", viagemData.dataHora)
    );
    const conflictSnapshot = await getDocs(conflictQuery);

    // Verificar se existe conflito com outra viagem (não a atual)
    const hasConflict = conflictSnapshot.docs.some((doc) => doc.id !== id);
    if (hasConflict) {
      throw new Error(
        "Já existe uma viagem agendada para este carro neste horário"
      );
    }
  }

  const viagemRef = doc(db, "viagens", id);
  await updateDoc(viagemRef, viagemData);

  return { id, ...viagemData };
}

export async function excluirViagem(id: string) {
  const db = getFirestoreInstance();
  const viagemRef = doc(db, "viagens", id);
  await deleteDoc(viagemRef);
  return { id };
}

export async function buscarViagem(id: string) {
  const db = getFirestoreInstance();
  const viagemRef = doc(db, "viagens", id);
  const viagemDoc = await getDoc(viagemRef);

  if (!viagemDoc.exists()) {
    throw new Error("Viagem não encontrada");
  }

  const data = viagemDoc.data();
  return {
    id: viagemDoc.id,
    ...data,
    dataHora:
      data.dataHora instanceof Timestamp
        ? data.dataHora.toDate().toISOString()
        : data.dataHora,
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString()
        : data.createdAt,
  } as Viagem;
}

export async function listarViagensDisponiveis() {
  const db = getFirestoreInstance();
  const viagensRef = collection(db, "viagens");

  // Query para viagens abertas e futuras
  const q = query(
    viagensRef,
    where("status", "==", "aberta"),
    where("dataHora", ">=", Timestamp.now()),
    orderBy("dataHora", "asc")
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      dataHora:
        data.dataHora instanceof Timestamp
          ? data.dataHora.toDate().toISOString()
          : data.dataHora,
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : data.createdAt,
    };
  }) as Viagem[];
}

export function observarViagensDisponiveis(
  callback: (viagens: Viagem[]) => void
) {
  const db = getFirestoreInstance();
  const viagensRef = collection(db, "viagens");

  const q = query(
    viagensRef,
    where("status", "==", "aberta"),
    where("dataHora", ">=", Timestamp.now()),
    orderBy("dataHora", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const viagens = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        dataHora:
          data.dataHora instanceof Timestamp
            ? data.dataHora.toDate().toISOString()
            : data.dataHora,
        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate().toISOString()
            : data.createdAt,
      };
    }) as Viagem[];

    callback(viagens);
  });
}
