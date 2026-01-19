"use client";
import {
  Menu,
  MessageCircle,
  X,
  User,
  LogIn,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "@/lib/translations";
import Link from "next/link";
import { WA_LINK } from "@/lib/whatsApp";
import { ImageLogo } from "./ImageLogo";

export default function Header() {
  const { language, isReady } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Bloqueia o scroll do corpo da página quando o menu está aberto
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const t = translations[language];

  const navLinks = [
    { href: "/rio", label: t.viagensRio },
    { href: "/lagos", label: t.regiaoLagos },
    { href: "/tours", label: t.tours },
    { href: "/contact", label: t.contato },
  ];

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md py-3"
            : "bg-white py-5 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <div className="flex-shrink-0 relative z-50">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                aria-label="Home"
              >
                <ImageLogo />
              </Link>
            </div>

            {/* DESKTOP NAVIGATION */}
            <nav
              className={`hidden md:flex items-center gap-8 transition-opacity duration-300 ${
                isReady ? "opacity-100" : "opacity-0"
              }`}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-[#005F8C] transition-colors relative group py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#005F8C] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* DESKTOP ACTIONS */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#005F8C] transition-colors px-3 py-2"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>

              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-full shadow-lg shadow-green-200 hover:shadow-green-300 hover:-translate-y-0.5 transition-all duration-300 text-sm font-bold"
              >
                <MessageCircle className="w-4 h-4" />
                <span
                  className={`transition-opacity duration-300 ${
                    isReady ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {t.reservar}
                </span>
              </a>
            </div>

            {/* MOBILE TOGGLE BUTTON */}
            <div className="md:hidden flex items-center gap-3">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366] text-white shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              <button
                className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => setMobileOpen(true)}
                aria-label="Abrir menu"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE MENU STRUCTURE --- */}

      {/* 1. OVERLAY / BACKDROP (A Parte Escura) */}
      {/* Clicar aqui fecha o menu. Só aparece se mobileOpen for true */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* 2. DRAWER / MENU LATERAL */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-[85%] max-w-[320px] bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden flex flex-col ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cabeçalho do Menu Lateral */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <span className="text-lg font-bold text-slate-800">Menu</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 text-slate-500 hover:bg-slate-100 hover:text-red-500 rounded-full transition-colors"
            aria-label="Fechar menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Lista de Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-5 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between p-3.5 text-base font-semibold text-slate-700 rounded-lg active:bg-slate-50 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
            >
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          ))}
        </nav>

        {/* Rodapé do Menu (Ações Principais) */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-3">
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <LogIn className="w-5 h-5" />
            Acessar Conta
          </Link>

          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#25D366] text-white font-bold shadow-md hover:bg-[#20bd5a] transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{t.reservar}</span>
          </a>
        </div>
      </aside>
    </>
  );
}
