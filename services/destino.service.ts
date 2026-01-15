import { getFirestoreInstance } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

interface Destino {
  id: string;
  origem: string;
  destino: string;
  foto: string;
  ativo: boolean;
}

export async function adicionarDestino(
  destino: Omit<Destino, "id">
): Promise<Destino> {
  const db = getFirestoreInstance();
  const destinoRef = collection(db, "destinos");
  const docRef = await addDoc(destinoRef, destino);

  return { id: docRef.id, ...destino };
}

export async function listarDestinos(): Promise<Destino[]> {
  const db = getFirestoreInstance();
  const destinoRef = collection(db, "destinos");
  const querySnapshot = await getDocs(destinoRef);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Destino[];
}

export async function editarDestino(
  id: string,
  destino: Partial<Destino>
): Promise<Partial<Destino> & { id: string }> {
  const db = getFirestoreInstance();
  const destinoRef = doc(db, "destinos", id);

  await updateDoc(destinoRef, destino);

  return { id, ...destino };
}

export async function excluirDestino(id: string): Promise<{ id: string }> {
  const db = getFirestoreInstance();
  const destinoRef = doc(db, "destinos", id);
  await deleteDoc(destinoRef);
  return { id };
}
