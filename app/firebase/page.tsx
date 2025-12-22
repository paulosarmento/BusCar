export const dynamic = "force-dynamic";

("use client");

import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/card";
import { Avatar, AvatarFallback } from "../components/avatar";
import { LogOut, Database, Plane } from "lucide-react";
import { Button } from "../components/button";

export default function Home() {
  const [dados, setDados] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/firebase")
      .then((res) => res.json())
      .then((data) => {
        setDados(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean to-ocean-dark">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          <p className="text-white text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  async function logout() {
    await signOut(auth);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-light via-white to-ocean-light/20">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Plane className="w-8 h-8 text-ocean" />
            <h1 className="text-2xl font-bold text-ocean">
              Dashboard de Viagens
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback className="bg-ocean text-white">
                {user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="gap-2 bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {Object.keys(dados).length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Nenhum dado encontrado</CardTitle>
              <CardDescription>
                Suas coleções Firebase aparecerão aqui.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(dados).map(([collection, docs]) => (
              <Card key={collection}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{collection}</span>
                    <span className="text-sm text-muted-foreground">
                      {docs.length} itens
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 max-h-[400px] overflow-y-auto">
                  {docs.map((doc, idx) => (
                    <pre key={idx} className="text-xs bg-muted p-3 rounded">
                      {JSON.stringify(doc, null, 2)}
                    </pre>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
