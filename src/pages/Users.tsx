
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Edit, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Trash
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Dados de exemplo
const users = [
  { 
    id: 1, 
    name: "Ana Silva", 
    username: "ana.silva", 
    email: "ana.silva@empresa.com", 
    role: "DBA", 
    status: "active", 
    lastLogin: "12/04/2025 08:32" 
  },
  { 
    id: 2, 
    name: "Carlos Santos", 
    username: "carlos.santos", 
    email: "carlos.santos@empresa.com", 
    role: "Desenvolvedor", 
    status: "active", 
    lastLogin: "12/04/2025 09:15" 
  },
  { 
    id: 3, 
    name: "Patrícia Lima", 
    username: "patricia.lima", 
    email: "patricia.lima@empresa.com", 
    role: "Analista", 
    status: "active", 
    lastLogin: "11/04/2025 17:42" 
  },
  { 
    id: 4, 
    name: "Marcos Oliveira", 
    username: "marcos.oliveira", 
    email: "marcos.oliveira@empresa.com", 
    role: "Admin", 
    status: "active", 
    lastLogin: "11/04/2025 16:05" 
  },
  { 
    id: 5, 
    name: "Julia Costa", 
    username: "julia.costa", 
    email: "julia.costa@empresa.com", 
    role: "Gerente", 
    status: "inactive", 
    lastLogin: "05/04/2025 11:23" 
  },
  { 
    id: 6, 
    name: "Roberto Almeida", 
    username: "roberto.almeida", 
    email: "roberto.almeida@empresa.com", 
    role: "Suporte", 
    status: "blocked", 
    lastLogin: "01/04/2025 09:30" 
  },
];

export default function Users() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Usuários</h2>
          <p className="text-muted-foreground">Gerenciamento de usuários com acesso ao SQL Server.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
          <CardDescription>Gerencie os usuários que têm acesso ao sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar usuários..." className="pl-9" />
            </div>
            <div className="hidden md:flex gap-2">
              <Button variant="outline">Exportar</Button>
              <Button variant="outline">Importar</Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Último Login</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          user.status === "active" 
                            ? "bg-success/10 text-success hover:bg-success/20 border-success/20" 
                            : user.status === "inactive"
                            ? "bg-muted hover:bg-muted/80 border-muted-foreground/20" 
                            : "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20"
                        }
                      >
                        {user.status === "active" 
                          ? "Ativo" 
                          : user.status === "inactive" 
                          ? "Inativo" 
                          : "Bloqueado"}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando 6 de 24 usuários
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm">
                Próxima
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
