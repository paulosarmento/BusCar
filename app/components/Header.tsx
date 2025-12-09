"use client";

import Image from "next/image";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";

const LINKS = [
  { name: "Rio", href: "/rio" },
  { name: "Lagos", href: "/lagos" },
  { name: "tours", href: "/tours" },
  { name: "contato", href: "/contact" },
];

const WA_NUMBER = "5535984331369"; // exemplo: "5521999887766"
const WA_LINK = `https://wa.me/${WA_NUMBER}`;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
          {LINKS.map((links) => (
            <a
              key={links.name}
              href={links.href}
              className="text-slate-700 hover:text-[#005F8C] font-medium transition"
            >
              {links.name}
            </a>
          ))}

          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transform transition"
          >
            <MessageCircle className="w-5 h-5" />
            Reservar
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
            {LINKS.map((links) => (
              <a
                key={links.name}
                href={links.href}
                className="text-slate-700 hover:text-[#005F8C] font-medium transition"
                onClick={() => setMobileOpen(false)}
              >
                {links.name}
              </a>
            ))}

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transform transition"
            >
              <MessageCircle className="w-5 h-5" />
              Reservar
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
