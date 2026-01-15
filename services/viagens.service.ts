import { useReservas } from "@/hooks/useReservas";
import { getFirestoreInstance } from "@/lib/firebase";
import { Carro, Reserva, Viagem } from "@/types/types";
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
  runTransaction,
} from "firebase/firestore";

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
// viagens.ts

export async function adicionarViagem(
  viagem: Omit<Viagem, "id" | "createdAt">
) {
  const db = getFirestoreInstance();
  // ... validações de carro ...

  const viagensRef = collection(db, "viagens");
  const dataHoraTimestamp = Timestamp.fromDate(
    new Date(viagem.dataHora as string)
  );

  const viagemData = {
    ...viagem,
    paradas: viagem.paradas || [], // GARANTIR QUE SALVE O ARRAY
    status: "aberta" as const,
    createdAt: Timestamp.now(),
    dataHora: dataHoraTimestamp,
  };

  const docRef = await addDoc(viagensRef, viagemData);
  return { id: docRef.id, ...viagemData };
}

export async function editarViagem(id: string, viagem: Partial<Viagem>) {
  const db = getFirestoreInstance();
  const viagemRef = doc(db, "viagens", id);

  const data: any = { ...viagem };
  if (viagem.dataHora) {
    data.dataHora = Timestamp.fromDate(new Date(viagem.dataHora as string));
  }

  // O Firestore atualizará o array de paradas automaticamente se ele estiver no objeto 'data'
  await updateDoc(viagemRef, data);
  return { id, ...data };
}

// export async function adicionarViagem(
//   viagem: Omit<Viagem, "id" | "createdAt">
// ) {
//   const db = getFirestoreInstance();

//   const carroRef = doc(db, "carros", viagem.carroId);
//   const carroDoc = await getDoc(carroRef);

//   if (!carroDoc.exists()) {
//     throw new Error("Carro não encontrado");
//   }

//   const carroData = carroDoc.data() as Carro;
//   if (!carroData.ativo) {
//     throw new Error("Carro não está ativo");
//   }

//   const capacidadeMax = viagem.capacidadeMax || 4;

//   const dataHoraTimestamp =
//     typeof viagem.dataHora === "string"
//       ? Timestamp.fromDate(new Date(viagem.dataHora))
//       : viagem.dataHora instanceof Date
//       ? Timestamp.fromDate(viagem.dataHora)
//       : viagem.dataHora;

//   const viagensRef = collection(db, "viagens");

//   const conflictQuery = query(
//     viagensRef,
//     where("carroId", "==", viagem.carroId),
//     where("dataHora", "==", dataHoraTimestamp)
//   );

//   const conflictSnapshot = await getDocs(conflictQuery);
//   if (!conflictSnapshot.empty) {
//     throw new Error("Já existe uma viagem para este carro neste horário");
//   }

//   const viagemData = {
//     ...viagem,
//     capacidadeMax,
//     status: "aberta" as const,
//     createdAt: Timestamp.now(),
//     dataHora: dataHoraTimestamp,
//   };

//   const docRef = await addDoc(viagensRef, viagemData);

//   return {
//     id: docRef.id,
//     ...viagemData,
//     dataHora:
//       viagemData.dataHora instanceof Timestamp
//         ? viagemData.dataHora.toDate().toISOString()
//         : viagemData.dataHora,
//     createdAt:
//       viagemData.createdAt instanceof Timestamp
//         ? viagemData.createdAt.toDate().toISOString()
//         : viagemData.createdAt,
//   };
// }

// export async function editarViagem(id: string, viagem: Partial<Viagem>) {
//   const db = getFirestoreInstance();
//   const viagemRef = doc(db, "viagens", id);

//   const data: any = { ...viagem };

//   if (viagem.dataHora) {
//     data.dataHora =
//       typeof viagem.dataHora === "string"
//         ? Timestamp.fromDate(new Date(viagem.dataHora))
//         : viagem.dataHora instanceof Date
//         ? Timestamp.fromDate(viagem.dataHora)
//         : viagem.dataHora;
//   }

//   await updateDoc(viagemRef, data);
//   return { id, ...data };
// }

export async function excluirViagem(id: string) {
  const db = getFirestoreInstance();
  const viagemRef = doc(db, "viagens", id);
  const reservasRef = collection(db, "reservas");

  return await runTransaction(db, async (transaction) => {
    const viagemSnap = await transaction.get(viagemRef);

    if (!viagemSnap.exists()) {
      throw new Error("Viagem não encontrada");
    }

    const reservasQuery = query(
      reservasRef,
      where("viagemId", "==", id),
      where("status", "==", "confirmada")
    );

    const reservasSnap = await getDocs(reservasQuery);

    reservasSnap.forEach((reservaDoc) => {
      transaction.update(reservaDoc.ref, {
        status: "cancelada",
      });
    });

    transaction.delete(viagemRef);

    return {
      viagemId: id,
      reservasCanceladas: reservasSnap.size,
    };
  });
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
