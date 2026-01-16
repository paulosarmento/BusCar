import { useState } from "react";

export default function MapaTour() {
  const [interativo, setInterativo] = useState(false);

  return (
    <div className="w-full px-4 md:px-20 py-10">
      <div
        className="relative w-full h-[480px] rounded-xl overflow-hidden shadow-lg border border-gray-200"
        onMouseLeave={() => setInterativo(false)} // Reseta quando o mouse sai
      >
        {/* Camada Invisível que bloqueia o Scroll */}
        {!interativo && (
          <div
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 cursor-pointer group"
            onClick={() => setInterativo(true)}
          >
            <span className="bg-white px-4 py-2 rounded-full shadow-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Clique para interagir com o mapa
            </span>
          </div>
        )}

        {/* O seu Iframe do My Maps */}
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1r9vC9ULvWNTrnJddxmBia12w9diieyE&ehbc=2E312F"
          className={`w-full h-full transition-all ${
            interativo ? "pointer-events-auto" : "pointer-events-none"
          }`}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
