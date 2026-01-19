"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plane, ArrowLeft, Loader2, LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Novo estado para controlar o carregamento inicial da verificação de sessão
  const [checkingAuth, setCheckingAuth] = useState(true);

  const router = useRouter();

  // EFEITO: Verifica se já existe um usuário logado ao carregar a página
  useEffect(() => {
    let unsubscribe: () => void;

    const checkAuthStatus = async () => {
      try {
        const { auth } = await import("@/lib/firebase");
        const { onAuthStateChanged } = await import("firebase/auth");

        if (auth) {
          unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              // Se já estiver logado, manda direto para o dashboard
              // Usamos 'replace' para não deixar voltar para login pelo botão "voltar"
              router.replace("/firebase");
            } else {
              // Se não estiver logado, libera o carregamento da tela
              setCheckingAuth(false);
            }
          });
        } else {
          setCheckingAuth(false);
        }
      } catch (err) {
        console.error("Erro ao verificar autenticação:", err);
        setCheckingAuth(false);
      }
    };

    checkAuthStatus();

    // Limpeza do listener ao desmontar
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { auth, getFirebaseError } = await import("@/lib/firebase");
      const { signInWithEmailAndPassword } = await import("firebase/auth");

      if (!auth) {
        const firebaseError = getFirebaseError?.();
        throw new Error(
          firebaseError
            ? `Erro de configuração: ${firebaseError}`
            : "Erro de configuração do Firebase."
        );
      }

      await signInWithEmailAndPassword(auth, email, password);
      router.push("/firebase");
    } catch (err: any) {
      if (
        err?.code === "auth/invalid-email" ||
        err?.code === "auth/user-not-found" ||
        err?.code === "auth/wrong-password" ||
        err?.code === "auth/invalid-credential"
      ) {
        setError("Email ou senha incorretos.");
      } else {
        setError("Ocorreu um erro ao tentar entrar. Tente novamente.");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setLoading(true);
    try {
      const { auth, getFirebaseError } = await import("@/lib/firebase");
      const { GoogleAuthProvider, signInWithPopup } = await import(
        "firebase/auth"
      );

      if (!auth) {
        throw new Error("Firebase não inicializado.");
      }

      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);
      router.push("/firebase");
    } catch (err: any) {
      console.error(err);
      if (err?.code !== "auth/popup-closed-by-user") {
        setError("Erro ao autenticar com Google.");
      }
    } finally {
      setLoading(false);
    }
  }

  // Se estiver verificando a autenticação inicial, mostra um loader em tela cheia (ou no container)
  if (checkingAuth) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white pt-20 lg:pt-0">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-[#005F8C] animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse">
            Verificando sessão...
          </p>
        </div>
      </div>
    );
  }

  return (
    // min-h-screen com pt-20 para compensar o Header fixo do RootLayout
    <div className="min-h-screen w-full flex bg-white pt-20 lg:pt-0 mt-6 ">
      {/* Lado Esquerdo - Formulário */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-12 relative z-10 animate-in slide-in-from-left-4 duration-500">
        {/* Link de Voltar (caso o Header não esteja visível ou para UX) */}
        <div className="absolute top-6 left-6 hidden lg:block">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#005F8C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o site
          </Link>
        </div>

        <div className="w-full max-w-sm space-y-8">
          {/* Logo e Cabeçalho */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-[#005F8C]/10 rounded-2xl flex items-center justify-center mb-2">
                <Plane className="w-8 h-8 text-[#005F8C]" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Bem-vindo de volta
            </h1>
            <p className="text-slate-500">Entre para gerenciar suas viagens</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@rjtransfer.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#005F8C] focus:ring-4 focus:ring-[#005F8C]/10 transition-all outline-none font-medium text-slate-900 placeholder:text-slate-400 disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#005F8C] focus:ring-4 focus:ring-[#005F8C]/10 transition-all outline-none font-medium text-slate-900 placeholder:text-slate-400 disabled:opacity-50"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                <span className="block w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#005F8C] hover:bg-[#004a6e] text-white font-bold py-3.5 rounded-xl transition-all transform hover:translate-y-[-1px] active:translate-y-[1px] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Entrar
                </>
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-slate-400 font-medium">
                  Ou continue com
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-3 hover:shadow-md disabled:opacity-70"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
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
              Google
            </button>
          </form>

          {/* Footer do Form */}
          <p className="text-center text-sm text-slate-500">
            {"Não tem uma conta? "}
            <a
              href="/signup"
              className="font-bold text-[#005F8C] hover:underline"
            >
              Criar conta
            </a>
          </p>
        </div>
      </div>

      {/* Lado Direito - Imagem Hero */}
      <div className="hidden lg:block lg:w-1/2 relative bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2670&auto=format&fit=crop"
          alt="Rio de Janeiro"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#005F8C]/90 via-[#005F8C]/40 to-transparent mix-blend-multiply" />

        <div className="absolute bottom-0 left-0 right-0 p-16 text-white z-20">
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Gerencie sua frota e<br />
            viagens em um só lugar.
          </h2>
          <p className="text-lg text-white/90 max-w-md font-light">
            Acesse o painel administrativo da RJ Transfer para controlar
            agendamentos e clientes.
          </p>
        </div>
      </div>
    </div>
  );
}
