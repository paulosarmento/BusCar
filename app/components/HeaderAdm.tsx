import { Car, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "./Ui/avatar";
import { Button } from "./Ui/button";

export function HeaderAdm({ user, setActiveTab, logout }: any) {
  return (
    <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Car className="w-6 h-6 text-primary" />
            </div>
            <div onClick={() => setActiveTab("carros")}>
              <h1 className="text-xl font-bold text-foreground">
                Dashboard Administrativo
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Gestão de Frota e Agendamentos
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="border-2 border-primary/20">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-foreground">
                  {user.displayName || "Administrador"}
                </p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="gap-2 bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
