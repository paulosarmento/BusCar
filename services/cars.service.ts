import { getFirestoreInstance } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export interface Carro {
  id?: string;
  Modelo: string;
  Placa: string;
  Ativo: boolean;
  foto?: string;
}

export async function listarCarros() {
  const db = getFirestoreInstance();
  const carrosRef = collection(db, "carros");
  const querySnapshot = await getDocs(carrosRef);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Carro[];
}

export async function adicionarCarro(carro: Omit<Carro, "id">) {
  const db = getFirestoreInstance();
  const carrosRef = collection(db, "carros");
  const docRef = await addDoc(carrosRef, carro);
  return { id: docRef.id, ...carro };
}

export async function editarCarro(id: string, carro: Partial<Carro>) {
  const db = getFirestoreInstance();
  const carroRef = doc(db, "carros", id);
  await updateDoc(carroRef, carro);
  return { id, ...carro };
}

export async function excluirCarro(id: string) {
  const db = getFirestoreInstance();
  const carroRef = doc(db, "carros", id);
  await deleteDoc(carroRef);
  return { id };
}
