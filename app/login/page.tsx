"use client";

import type React from "react";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { Plane, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { auth } from "@/lib/firebase";

const googleProvider = new GoogleAuthProvider();

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      // if (auth === null) return;
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/firebase");
    } catch {
      setError("Email ou senha inválidos");
    }
  }

  async function handleGoogleLogin() {
    try {
      // if (auth === null) return;
      await signInWithPopup(auth, googleProvider);
      router.push("/firebase");
    } catch (err) {
      console.error(err);
      setError("Erro ao autenticar com Google");
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background relative">
        <Link
          href="/"
          className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o site
        </Link>

        <div className="w-full max-w-md space-y-8">
          {/* Logo and header */}
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
                <Plane className="w-7 h-7 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-balance">
              Bem-vindo de volta
            </h1>
            <p className="text-muted-foreground text-lg">
              Entre para explorar o mundo
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full h-12 text-base" size="lg">
              Entrar
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou continue com
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full h-12 text-base bg-transparent"
              size="lg"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continuar com Google
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            {"Não tem uma conta? "}
            <a
              href="/signup"
              className="font-medium text-primary hover:underline"
            >
              Criar conta
            </a>
          </p>
        </div>
      </div>

      {/* Right side - Image/Hero */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="/breathtaking-tropical-beach-with-crystal-clear-tur.jpg"
          alt="Destino paradisíaco"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <h2 className="text-4xl font-bold mb-4 text-balance">
            Descubra destinos incríveis
          </h2>
          <p className="text-lg text-white/90 max-w-md text-pretty">
            Planeje suas próximas aventuras e explore lugares extraordinários ao
            redor do mundo
          </p>
        </div>
      </div>
    </div>
  );
}
