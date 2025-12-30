import { getFirestoreInstance } from "@/lib/firebase";
import { Carro, Viagem } from "@/types/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

/* =========================
 * LISTAR
 * ========================= */
export async function listarCarros(): Promise<Carro[]> {
  const db = getFirestoreInstance();
  const carrosRef = collection(db, "carros");
  const querySnapshot = await getDocs(carrosRef);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Carro[];
}

/* =========================
 * ADICIONAR
 * ========================= */
export async function adicionarCarro(carro: Omit<Carro, "id">): Promise<Carro> {
  const db = getFirestoreInstance();
  const carrosRef = collection(db, "carros");
  const docRef = await addDoc(carrosRef, carro);

  return { id: docRef.id, ...carro };
}

/* =========================
 * EDITAR (COM BLOQUEIO CORRETO)
 * ========================= */
export async function editarCarro(
  id: string,
  carro: Partial<Carro>
): Promise<Partial<Carro> & { id: string }> {
  const db = getFirestoreInstance();
  const carroRef = doc(db, "carros", id);

  // 🔹 Buscar viagens vinculadas
  const viagensRef = collection(db, "viagens");
  const q = query(viagensRef, where("carroId", "==", id));
  const viagensSnap = await getDocs(q);

  if (!viagensSnap.empty && typeof carro.capacidade === "number") {
    viagensSnap.docs.forEach((viagemDoc) => {
      const viagem = viagemDoc.data() as Viagem;

      const vagasReservadas = viagem.vagasReservadas ?? 0;

      if (vagasReservadas > carro.capacidade!) {
        throw new Error(
          `Não é possível alterar o carro. A viagem "${viagem.destino}" possui ${vagasReservadas} vagas reservadas, excedendo a nova capacidade (${carro.capacidade}).`
        );
      }
    });
  }

  // 🔹 Atualiza o carro
  await updateDoc(carroRef, carro);

  // 🔹 Propagar mudanças para viagens
  if (!viagensSnap.empty) {
    const batch = writeBatch(db);

    viagensSnap.docs.forEach((viagemDoc) => {
      const viagem = viagemDoc.data() as Viagem;

      batch.update(viagemDoc.ref, {
        ...(carro.capacidade !== undefined && {
          capacidadeMax: carro.capacidade,
        }),
        ...(carro.tipo !== undefined && { tipoCarro: carro.tipo }),
      });
    });

    await batch.commit();
  }

  return { id, ...carro };
}

/* =========================
 * EXCLUIR
 * ========================= */
export async function excluirCarro(id: string): Promise<{ id: string }> {
  const db = getFirestoreInstance();
  const carroRef = doc(db, "carros", id);
  await deleteDoc(carroRef);
  return { id };
}
