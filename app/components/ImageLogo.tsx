"use client";
import Image from "next/image";

export function ImageLogo() {
  return (
    // Removida lógica de estado para evitar re-renderização visual
    <div className="relative w-[140px] md:w-[170px] h-[48px] md:h-[59px] flex items-center select-none">
      <Image
        src="/images/logo.png"
        alt="RJ Transfer Logo"
        fill
        sizes="(max-width: 768px) 140px, 170px"
        style={{ objectFit: "contain", objectPosition: "left" }}
        priority // Garante carregamento imediato (LCP)
        quality={100}
        draggable={false}
      />
    </div>
  );
}
