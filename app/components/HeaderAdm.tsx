import { Car, LogOut, ShieldCheck, UserCircle, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./Ui/avatar";
import { Button } from "./Ui/button";
import { Badge } from "./Ui/badge"; // Certifique-se de ter este componente ou remova o import

export function HeaderAdm({ user, setActiveTab, logout }: any) {
  // 1. Lógica para descobrir o tipo de usuário
  // Se tiver provider 'password', é o Admin que você criou.
  const isAdmin = user?.providerData?.some(
    (p: any) => p.providerId === "password"
  );

  // 2. Configurações visuais baseadas no tipo
  const roleConfig = isAdmin
    ? {
        title: "Painel Administrativo",
        subtitle: "Gestão de Frota e Reservas",
        label: "ADMIN",
        labelColor: "bg-zinc-900 text-white hover:bg-zinc-800", // Escuro/Sério
        icon: <ShieldCheck className="w-6 h-6 text-primary" />,
        iconBg: "bg-primary/10",
      }
    : {
        title: "Área do Cliente",
        subtitle: "Minhas Viagens e Perfil",
        label: "CLIENTE",
        labelColor:
          "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200", // Azul/Amigável
        icon: <Car className="w-6 h-6 text-blue-600" />,
        iconBg: "bg-blue-50",
      };

  // Pega as iniciais para o Avatar caso não tenha foto
  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-20 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* LADO ESQUERDO: Logo e Título Dinâmico */}
          <div
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => setActiveTab(isAdmin ? "carros" : "viagens")}
          >
            <div
              className={`p-2.5 rounded-xl transition-colors ${roleConfig.iconBg}`}
            >
              {roleConfig.icon}
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-primary transition-colors">
                {roleConfig.title}
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {roleConfig.subtitle}
              </p>
            </div>
          </div>

          {/* LADO DIREITO: Perfil do Usuário */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
              <div className="hidden md:flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    {user.displayName ||
                      (isAdmin ? "Administrador" : "Usuário")}
                  </span>
                  {/* Badge indicando o nível */}
                  <Badge
                    variant="outline"
                    className={`text-[10px] h-5 px-1.5 border-0 ${roleConfig.labelColor}`}
                  >
                    {roleConfig.label}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground max-w-[150px] truncate">
                  {user.email}
                </p>
              </div>

              <Avatar className="h-10 w-10 border-2 border-white shadow-sm ring-1 ring-slate-100">
                {/* Se for Google, geralmente tem photoURL */}
                <AvatarImage src={user.photoURL} alt={user.displayName} />
                <AvatarFallback
                  className={
                    isAdmin
                      ? "bg-primary text-white"
                      : "bg-blue-100 text-blue-600"
                  }
                >
                  {user.displayName ? (
                    getInitials(user.displayName)
                  ) : (
                    <UserCircle className="w-6 h-6" />
                  )}
                </AvatarFallback>
              </Avatar>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Sair do sistema"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
