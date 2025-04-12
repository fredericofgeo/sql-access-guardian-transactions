
import { cn } from "@/lib/utils";
import { 
  BarChart4, 
  Database, 
  History, 
  Lock, 
  Server, 
  Settings, 
  Users 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();
  
  const navigationItems = [
    { name: "Dashboard", path: "/", icon: BarChart4 },
    { name: "Usuários", path: "/users", icon: Users },
    { name: "Permissões", path: "/permissions", icon: Lock },
    { name: "Servidores", path: "/servers", icon: Server },
    { name: "Bancos de Dados", path: "/databases", icon: Database },
    { name: "Transações", path: "/transactions", icon: History },
    { name: "Configurações", path: "/settings", icon: Settings },
  ];

  return (
    <div
      className={cn(
        "bg-card text-card-foreground border-r border-border flex flex-col h-screen fixed z-40 transition-all duration-300",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className={cn("flex items-center", isOpen ? "" : "justify-center w-full")}>
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
            SG
          </div>
          {isOpen && (
            <h1 className="ml-3 font-semibold text-lg">SQL Guardian</h1>
          )}
        </div>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="space-y-1 px-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 rounded-md transition-colors",
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-secondary text-muted-foreground hover:text-foreground",
                !isOpen && "justify-center"
              )}
            >
              <item.icon className={cn("h-5 w-5", location.pathname === item.path ? "text-primary" : "")} />
              {isOpen && <span className="ml-3 truncate">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-border">
        <div className={cn("flex items-center", isOpen ? "" : "justify-center")}>
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            A
          </div>
          {isOpen && (
            <div className="ml-3">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-muted-foreground">admin@empresa.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
