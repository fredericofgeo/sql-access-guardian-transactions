
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  CheckCircle2,
  Database,
  Lock,
  Plus,
  Search,
  Shield,
  Trash,
  UserCog,
  Users,
} from "lucide-react";

// Mock data for roles
const mockRoles = [
  {
    id: "role1",
    name: "Administrador",
    description: "Acesso completo a todas as funcionalidades",
    users: 3,
    isSystem: true,
  },
  {
    id: "role2",
    name: "Desenvolvedor",
    description: "Acesso às bases de dados, sem permissões administrativas",
    users: 8,
    isSystem: false,
  },
  {
    id: "role3",
    name: "Analista",
    description: "Acesso somente leitura às bases de dados",
    users: 12,
    isSystem: false,
  },
  {
    id: "role4",
    name: "Auditor",
    description: "Acesso às logs e histórico de transações",
    users: 2,
    isSystem: true,
  },
];

// Mock data for permissions
const mockPermissionMatrix = [
  {
    id: "perm1",
    resource: "Bancos de Dados",
    icon: Database,
    permissions: {
      "role1": ["view", "create", "edit", "delete"],
      "role2": ["view", "create", "edit"],
      "role3": ["view"],
      "role4": ["view"],
    }
  },
  {
    id: "perm2",
    resource: "Usuários",
    icon: Users,
    permissions: {
      "role1": ["view", "create", "edit", "delete"],
      "role2": [],
      "role3": [],
      "role4": ["view"],
    }
  },
  {
    id: "perm3",
    resource: "Permissões",
    icon: Shield,
    permissions: {
      "role1": ["view", "create", "edit", "delete"],
      "role2": [],
      "role3": [],
      "role4": ["view"],
    }
  },
  {
    id: "perm4",
    resource: "Servidores",
    icon: Database,
    permissions: {
      "role1": ["view", "create", "edit", "delete"],
      "role2": ["view"],
      "role3": [],
      "role4": ["view"],
    }
  },
  {
    id: "perm5",
    resource: "Transações",
    icon: Database,
    permissions: {
      "role1": ["view", "delete"],
      "role2": ["view"],
      "role3": ["view"],
      "role4": ["view"],
    }
  },
];

// Mock data for user permissions
const mockUserPermissions = [
  {
    id: "user1",
    name: "Admin",
    email: "admin@empresa.com",
    role: "Administrador",
    customPermissions: false,
    lastUpdated: "2025-04-10T14:30:00",
  },
  {
    id: "user2",
    name: "João Silva",
    email: "joao@empresa.com",
    role: "Desenvolvedor",
    customPermissions: true,
    lastUpdated: "2025-04-12T10:45:00",
  },
  {
    id: "user3",
    name: "Maria Oliveira",
    email: "maria@empresa.com",
    role: "Analista",
    customPermissions: false,
    lastUpdated: "2025-04-13T09:15:00",
  },
  {
    id: "user4",
    name: "Carlos Mendes",
    email: "carlos@empresa.com",
    role: "Auditor",
    customPermissions: true,
    lastUpdated: "2025-04-14T11:30:00",
  },
];

// Permission types and their display names
const permissionTypes = [
  { id: "view", label: "Visualizar", description: "Permitir visualizar o recurso" },
  { id: "create", label: "Criar", description: "Permitir criar novos recursos" },
  { id: "edit", label: "Editar", description: "Permitir editar recursos existentes" },
  { id: "delete", label: "Excluir", description: "Permitir excluir recursos" },
];

const PermissionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false);
  const [isDeleteRoleAlertOpen, setIsDeleteRoleAlertOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [editingPermissions, setEditingPermissions] = useState(false);
  const { toast } = useToast();

  const filteredRoles = mockRoles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = mockUserPermissions.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRole = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddRoleDialogOpen(false);
    toast({
      title: "Perfil Adicionado",
      description: "O novo perfil de acesso foi adicionado com sucesso.",
    });
  };

  const handleDeleteRole = () => {
    setIsDeleteRoleAlertOpen(false);
    toast({
      title: "Perfil Removido",
      description: "O perfil de acesso foi removido com sucesso.",
      variant: "destructive",
    });
  };

  const handleSavePermissions = () => {
    setEditingPermissions(false);
    toast({
      title: "Permissões Atualizadas",
      description: "As permissões foram atualizadas com sucesso.",
    });
  };

  const hasPermission = (roleId: string, resourceId: string, permType: string) => {
    const resource = mockPermissionMatrix.find(p => p.id === resourceId);
    if (!resource) return false;
    return resource.permissions[roleId]?.includes(permType) || false;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Permissões</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Pesquisar perfis ou usuários..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddRoleDialogOpen(true)}>
            <Plus className="mr-1 h-4 w-4" />
            Novo Perfil
          </Button>
        </div>
      </div>

      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="roles">
            <Shield className="mr-2 h-4 w-4" />
            Perfis de Acesso
          </TabsTrigger>
          <TabsTrigger value="matrix">
            <Lock className="mr-2 h-4 w-4" />
            Matriz de Permissões
          </TabsTrigger>
          <TabsTrigger value="users">
            <UserCog className="mr-2 h-4 w-4" />
            Usuários e Permissões
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="roles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRoles.map((role) => (
              <Card key={role.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {role.name}
                        {role.isSystem && (
                          <Badge variant="outline" className="ml-2">Sistema</Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Usuários:</span>
                      <span>{role.users}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 flex justify-end">
                  <div className="space-x-2">
                    {!role.isSystem && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => {
                          setSelectedRole(role.id);
                          setIsDeleteRoleAlertOpen(true);
                        }}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="matrix">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg">Matriz de Permissões</CardTitle>
                <CardDescription>
                  Gerenciar permissões para cada recurso e perfil de acesso
                </CardDescription>
              </div>
              {editingPermissions ? (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setEditingPermissions(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSavePermissions}>
                    Salvar Alterações
                  </Button>
                </div>
              ) : (
                <Button variant="outline" onClick={() => setEditingPermissions(true)}>
                  Editar Permissões
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-48">Recurso</TableHead>
                    {mockRoles.map(role => (
                      <TableHead key={role.id}>
                        {role.name}
                        {role.isSystem && (
                          <Badge variant="outline" className="ml-2 text-xs">Sistema</Badge>
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPermissionMatrix.map(resource => (
                    <TableRow key={resource.id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <resource.icon className="h-4 w-4" />
                        {resource.resource}
                      </TableCell>
                      {mockRoles.map(role => (
                        <TableCell key={`${resource.id}-${role.id}`}>
                          {editingPermissions ? (
                            <div className="flex flex-col gap-2">
                              {permissionTypes.map(perm => (
                                <div key={perm.id} className="flex items-center gap-2">
                                  <Checkbox 
                                    id={`${resource.id}-${role.id}-${perm.id}`}
                                    checked={hasPermission(role.id, resource.id, perm.id)}
                                    disabled={role.isSystem}
                                  />
                                  <Label htmlFor={`${resource.id}-${role.id}-${perm.id}`} className="text-xs">
                                    {perm.label}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="space-y-1">
                              {resource.permissions[role.id]?.length > 0 ? (
                                resource.permissions[role.id].map(perm => (
                                  <Badge key={perm} variant="outline" className="mr-1">
                                    {permissionTypes.find(p => p.id === perm)?.label || perm}
                                  </Badge>
                                ))
                              ) : (
                                <span className="text-xs text-muted-foreground">Sem acesso</span>
                              )}
                            </div>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Permissões de Usuários</CardTitle>
              <CardDescription>
                Gerenciar perfis de acesso e permissões personalizadas para cada usuário
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Perfil de Acesso</TableHead>
                    <TableHead>Permissões Personalizadas</TableHead>
                    <TableHead>Última Atualização</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        {user.customPermissions ? (
                          <Badge variant="secondary">Sim</Badge>
                        ) : (
                          <span className="text-muted-foreground">Não</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(user.lastUpdated).toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Editar Permissões
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Role Dialog */}
      <Dialog open={isAddRoleDialogOpen} onOpenChange={setIsAddRoleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleAddRole}>
            <DialogHeader>
              <DialogTitle>Adicionar Perfil de Acesso</DialogTitle>
              <DialogDescription>
                Crie um novo perfil de acesso e defina suas permissões.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  placeholder="Ex: Operador"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Descrição
                </Label>
                <Input
                  id="description"
                  placeholder="Ex: Acesso operacional às bases de dados"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">
                  Baseado em
                </Label>
                <div className="col-span-3">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um perfil base..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mockRoles.map(role => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="none">Nenhum (começar do zero)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    O novo perfil herdará as permissões do perfil selecionado
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddRoleDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                Criar e Configurar Permissões
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Role Alert */}
      <AlertDialog open={isDeleteRoleAlertOpen} onOpenChange={setIsDeleteRoleAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso removerá permanentemente este perfil de acesso.
              Os usuários associados perderão suas permissões.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRole} className="bg-destructive text-destructive-foreground">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PermissionsPage;
