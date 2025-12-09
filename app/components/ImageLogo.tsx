import Image from "next/image";
import { useState } from "react";

/**
 * Logo com verificação de carregamento e fallback
 */
export const ImageLogo = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <a href="/" className="flex items-center gap-2">
      {!loaded && !error && (
        <div className="w-[170px] h-[59px] bg-white/90 animate-pulse rounded-md" />
      )}

      {!error ? (
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={170}
          height={170}
          priority
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={loaded ? "block" : "hidden"}
        />
      ) : (
        <span className="text-2xl font-semibold text-[#005F8C]">BusCar</span>
      )}
    </a>
  );
};
