"use client";

import { useEffect, useState } from "react";
import { getAuthInstance } from "@/lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useRouter } from "next/navigation";

export function useAuthGuard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuthInstance();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return user;
}
