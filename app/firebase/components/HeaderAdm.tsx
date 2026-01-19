import { Car, LogOut, ShieldCheck, UserCircle } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/Ui/avatar";
import { Button } from "../../components/Ui/button";
import { Badge } from "../../components/Ui/badge";

export function HeaderAdm({ user, setActiveTab, logout }: any) {
  const isAdmin = user?.providerData?.some(
    (p: any) => p.providerId === "password"
  );

  const roleConfig = isAdmin
    ? {
        title: "Painel Administrativo",
        subtitle: "Gestão de Frota e Reservas",
        label: "ADMIN",
        labelColor: "bg-zinc-900 text-white hover:bg-zinc-800",
        icon: <ShieldCheck className="w-5 h-5 text-primary" />,
        iconBg: "bg-primary/10",
      }
    : {
        title: "Área do Cliente",
        subtitle: "Minhas Viagens e Perfil",
        label: "CLIENTE",
        labelColor:
          "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200",
        icon: <Car className="w-5 h-5 text-blue-600" />,
        iconBg: "bg-blue-50",
      };

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    // AJUSTES CRÍTICOS:
    // 1. bg-white (Sólido) -> Remove a transparência que ficava feia no mobile.
    // 2. top-[76px] -> Calcula a altura do Header Principal para ficar logo abaixo dele.
    // 3. z-40 -> Fica abaixo do Header Principal (z-50) mas acima do conteúdo.
    <header className="border-b bg-white sticky top-[76px] z-40 shadow-sm transition-all duration-300 mt-2">
      <div className="container mx-auto px-4 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* LADO ESQUERDO */}
          <div
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => setActiveTab(isAdmin ? "carros" : "viagens")}
          >
            <div
              className={`p-2 rounded-lg transition-colors shrink-0 ${roleConfig.iconBg}`}
            >
              {roleConfig.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base md:text-lg font-bold text-slate-800 leading-tight group-hover:text-primary transition-colors">
                  {roleConfig.title}
                </h1>
                <Badge
                  variant="outline"
                  className={`md:hidden text-[10px] h-5 px-1.5 border-0 ${roleConfig.labelColor}`}
                >
                  {roleConfig.label}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {roleConfig.subtitle}
              </p>
            </div>
          </div>

          {/* LADO DIREITO */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-3 pl-0 md:pl-4 md:border-l border-slate-100">
              <div className="hidden md:flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    {user.displayName ||
                      (isAdmin ? "Administrador" : "Usuário")}
                  </span>
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

              <Avatar className="h-9 w-9 md:h-10 md:w-10 border-2 border-white shadow-sm ring-1 ring-slate-100">
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
                    <UserCircle className="w-5 h-5 md:w-6 md:h-6" />
                  )}
                </AvatarFallback>
              </Avatar>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors h-9 w-9 md:h-10 md:w-10"
              title="Sair do sistema"
            >
              <LogOut className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
