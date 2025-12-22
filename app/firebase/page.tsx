"use client";
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
import { LogOut, Database, MapPin, Plane, Calendar, Users } from "lucide-react";
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
    // if (!auth) return;
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
    // if (!auth) return;
    await signOut(auth);
  }

  const getCollectionIcon = (collectionName: string) => {
    const name = collectionName.toLowerCase();

    // if (name.includes("user")) return Users;
    // if (name.includes("travel") || name.includes("trip")) return Plane;
    // if (name.includes("booking") || name.includes("reservation"))
    //   return Calendar;
    // if (name.includes("destination") || name.includes("location"))
    //   return MapPin;
    return Database;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-light via-white to-ocean-light/20">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Plane className="w-8 h-8 text-ocean" />
              <h1 className="text-2xl font-bold text-ocean">
                Dashboard de Viagens
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-ocean text-white">
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-ocean-dark">
                    {user.displayName || "Viajante"}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="gap-2 bg-transparent"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-ocean-dark mb-2">
            Bem-vindo de volta!
          </h2>
          <p className="text-muted-foreground">
            Aqui estão os dados das suas coleções Firebase
          </p>
        </div>

        {Object.keys(dados).length === 0 ? (
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Nenhum dado encontrado
              </CardTitle>
              <CardDescription>
                Suas coleções Firebase aparecerão aqui quando houver dados
                disponíveis.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(dados).map(([collection, docs]) => {
              const Icon = getCollectionIcon(collection);
              return (
                <Card
                  key={collection}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 capitalize">
                        <div className="p-2 rounded-lg bg-ocean/10">
                          <Icon className="w-5 h-5 text-ocean" />
                        </div>
                        {collection}
                      </CardTitle>
                      <span className="text-sm font-semibold text-ocean bg-ocean/10 px-3 py-1 rounded-full">
                        {docs.length} {docs.length === 1 ? "item" : "itens"}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {docs.map((doc, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="space-y-2">
                            {Object.entries(doc).map(([key, value]) => (
                              <div key={key} className="flex flex-col">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                  {key}
                                </span>
                                <span className="text-sm text-foreground break-all">
                                  {typeof value === "object"
                                    ? JSON.stringify(value, null, 2)
                                    : String(value)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
