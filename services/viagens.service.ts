import { getAdminDb } from "@/lib/firebase-admin";

export async function listarTudoFirestore() {
  const adminDb = getAdminDb();

  const collections = await adminDb.listCollections();
  const result: Record<string, any[]> = {};

  for (const col of collections) {
    const snap = await col.get();
    result[col.id] = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  return result;
}
