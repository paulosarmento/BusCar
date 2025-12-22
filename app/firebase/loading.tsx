export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean to-ocean-dark">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        <p className="text-white text-lg">Carregando...</p>
      </div>
    </div>
  );
}

