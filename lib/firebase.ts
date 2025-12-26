import { getAuth, type Auth } from "firebase/auth";
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

// Get environment variables
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

// Validate required environment variables
function validateFirebaseConfig() {
  const missing: string[] = [];

  if (!apiKey) missing.push("NEXT_PUBLIC_FIREBASE_API_KEY");
  if (!authDomain) missing.push("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
  if (!projectId) missing.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID");

  if (missing.length > 0) {
    console.error(
      `❌ Firebase configuration error: Missing environment variables:\n${missing.join(
        "\n"
      )}\n\n` +
        `Please configure these variables in your .env.local file or Vercel environment settings.`
    );
    return false;
  }

  return true;
}

export const firebaseConfig = {
  apiKey: apiKey || "",
  authDomain: authDomain || "",
  projectId: projectId || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase only on client side and avoid re-initialization
let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let initializationError: string | null = null;

if (typeof window !== "undefined") {
  // Only initialize on client side
  if (validateFirebaseConfig()) {
    try {
      app =
        getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      authInstance = getAuth(app);
    } catch (error: any) {
      initializationError =
        error?.message || "Unknown Firebase initialization error";
      console.error("Firebase initialization error:", error);
      console.error("Firebase config:", {
        apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : "MISSING",
        authDomain,
        projectId,
      });
    }
  } else {
    initializationError = "Firebase environment variables are not configured";
  }
}

function initializeFirebase() {
  if (!app && firebaseConfig.apiKey) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return app;
}
let db: Firestore | null = null;

export function getFirestoreInstance(): Firestore {
  if (!db) {
    const firebaseApp = initializeFirebase();
    if (firebaseApp) {
      db = getFirestore(firebaseApp);
    }
  }

  if (!db) {
    throw new Error(
      "Firestore não inicializado. Verifique as variáveis de ambiente."
    );
  }
  return db;
}
export function getAuthInstance(): Auth {
  if (typeof window === "undefined") {
    throw new Error("Auth só pode ser usado no cliente");
  }

  if (!auth) {
    const firebaseApp = initializeFirebase();
    if (firebaseApp) {
      auth = getAuth(firebaseApp);
    }
  }

  if (!auth) {
    throw new Error(
      "Firebase Auth não inicializado. Verifique as variáveis de ambiente."
    );
  }
  return auth;
}

export let auth = authInstance;
export const getFirebaseError = () => initializationError;
