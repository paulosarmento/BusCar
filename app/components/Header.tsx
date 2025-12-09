"use client";

import Image from "next/image";
import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "@/lib/translations";
import Link from "next/link";

const WA_NUMBER = "5535984331369"; // exemplo: "5521999887766"
const WA_LINK = `https://wa.me/${WA_NUMBER}`;

export default function Header() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const t = translations[language];

  return (
    <header className="w-full bg-white/90 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-semibold text-[#005F8C]">
          <a href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={170}
              height={170}
              priority
            ></Image>
          </a>
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/rio">{t.viagensRio}</Link>
          <Link href="/lagos">{t.regiaoLagos}</Link>
          <Link href="/tours">{t.tours}</Link>
          <Link href="/contact">{t.contato}</Link>

          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transform transition"
          >
            <MessageCircle className="w-5 h-5" />
            {t.reservar}
          </a>
        </nav>

        {/* Menu mobile toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-md">
          <nav className="flex flex-col px-6 py-4 gap-4">
            <Link href="/rio">{t.viagensRio}</Link>
            <Link href="/lagos">{t.regiaoLagos}</Link>
            <Link href="/tours">{t.tours}</Link>
            <Link href="/contact">{t.contato}</Link>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transform transition"
            >
              <MessageCircle className="w-5 h-5" />
              {t.reservar}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
