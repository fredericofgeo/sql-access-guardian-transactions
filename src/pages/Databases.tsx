
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Database,
  Plus,
  RefreshCcw,
  Search,
  ServerCrash,
  Settings,
  Trash,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Database driver types
type DatabaseDriver = "sqlserver" | "postgresql" | "oracle";

// Default ports for different database types
const defaultPorts: Record<DatabaseDriver, number> = {
  sqlserver: 1433,
  postgresql: 5432,
  oracle: 1521
};

// Mock data for databases
const mockDatabases = [
  {
    id: "1",
    name: "Production DB",
    server: "sql-prod-01.company.com",
    status: "online",
    version: "SQL Server 2019",
    lastSync: "2025-04-14T08:30:00",
    connections: 24,
    driver: "sqlserver"
  },
  {
    id: "2",
    name: "Development DB",
    server: "sql-dev-01.company.com",
    status: "online",
    version: "SQL Server 2022",
    lastSync: "2025-04-14T10:15:00",
    connections: 7,
    driver: "sqlserver"
  },
  {
    id: "3",
    name: "Analytics PostgreSQL",
    server: "pg-analytics.company.com",
    status: "online",
    version: "PostgreSQL 15",
    lastSync: "2025-04-14T09:30:00",
    connections: 12,
    driver: "postgresql"
  },
  {
    id: "4", 
    name: "Legacy Oracle",
    server: "oracle-legacy.company.com",
    status: "maintenance",
    version: "Oracle 19c",
    lastSync: "2025-04-13T14:45:00",
    connections: 3,
    driver: "oracle"
  },
  {
    id: "5",
    name: "Test DB",
    server: "sql-test-01.company.com",
    status: "offline",
    version: "SQL Server 2019",
    lastSync: "2025-04-12T14:22:00",
    connections: 0,
    driver: "sqlserver"
  },
];

// Mock data for recent queries
const mockRecentQueries = [
  {
    id: "q1",
    query: "SELECT * FROM customers WHERE region = 'EU'",
    database: "Production DB",
    user: "admin@empresa.com",
    timestamp: "2025-04-14T10:30:00",
    duration: 235,
  },
  {
    id: "q2",
    query: "UPDATE products SET stock = stock - 1 WHERE product_id = 'ABC123'",
    database: "Production DB",
    user: "admin@empresa.com",
    timestamp: "2025-04-14T10:28:00",
    duration: 42,
  },
  {
    id: "q3",
    query: "INSERT INTO audit_log (user_id, action, timestamp) VALUES (101, 'login', GETDATE())",
    database: "Development DB",
    user: "dev@empresa.com",
    timestamp: "2025-04-14T10:15:00",
    duration: 18,
  },
  {
    id: "q4",
    query: "SELECT product_name, SUM(sales) FROM sales GROUP BY product_name",
    database: "Analytics PostgreSQL",
    user: "analyst@empresa.com",
    timestamp: "2025-04-14T11:05:00",
    duration: 342,
  },
  {
    id: "q5",
    query: "SELECT * FROM employees WHERE department_id = 10",
    database: "Legacy Oracle",
    user: "legacy@empresa.com",
    timestamp: "2025-04-14T09:15:00",
    duration: 156,
  },
];

// Helper function to get database icon by driver type
const getDatabaseIcon = (driver: string) => {
  switch (driver) {
    case "postgresql":
      return <Database className="h-4 w-4 text-blue-500" />;
    case "oracle":
      return <Database className="h-4 w-4 text-red-500" />;
    case "sqlserver":
    default:
      return <Database className="h-4 w-4 text-primary" />;
  }
};

// Helper function to get version display name
const getVersionDisplay = (version: string) => {
  return version;
};

const DatabasesPage = () => {
  const [isNewDbDialogOpen, setIsNewDbDialogOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedDb, setSelectedDb] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [driverType, setDriverType] = useState<DatabaseDriver>("sqlserver");
  const [port, setPort] = useState<number>(defaultPorts.sqlserver);
  const { toast } = useToast();

  const filteredDatabases = mockDatabases.filter(db => 
    db.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    db.server.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDriverChange = (value: DatabaseDriver) => {
    setDriverType(value);
    setPort(defaultPorts[value]);
  };

  const handleAddDatabase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewDbDialogOpen(false);
    toast({
      title: "Database Added",
      description: "The new database connection has been successfully added.",
    });
  };

  const handleDelete = () => {
    setIsDeleteAlertOpen(false);
    toast({
      title: "Database Removed",
      description: "The database connection has been removed.",
      variant: "destructive",
    });
  };

  const handleTest = (dbId: string) => {
    const db = mockDatabases.find(db => db.id === dbId);
    toast({
      title: "Connection Test",
      description: `Successfully connected to ${db?.name} (${db?.driver.toUpperCase()})`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bancos de Dados</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Pesquisar bancos de dados..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => setIsNewDbDialogOpen(true)}
          >
            <Plus className="mr-1 h-4 w-4" />
            Adicionar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="databases" className="space-y-4">
        <TabsList>
          <TabsTrigger value="databases">
            <Database className="mr-2 h-4 w-4" />
            Bancos de Dados
          </TabsTrigger>
          <TabsTrigger value="queries">
            <Search className="mr-2 h-4 w-4" />
            Queries Recentes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="databases" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredDatabases.map((db) => (
              <Card key={db.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {getDatabaseIcon(db.driver)}
                      <div>
                        <CardTitle className="text-lg">{db.name}</CardTitle>
                        <CardDescription>{db.server}</CardDescription>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        db.status === "online" 
                          ? "default" 
                          : db.status === "offline" 
                            ? "destructive" 
                            : "outline"
                      }
                    >
                      {db.status === "online" 
                        ? "Online" 
                        : db.status === "offline" 
                          ? "Offline" 
                          : "Manutenção"
                      }
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tipo:</span>
                      <span>
                        {db.driver === "sqlserver" ? "SQL Server" : 
                         db.driver === "postgresql" ? "PostgreSQL" : 
                         db.driver === "oracle" ? "Oracle" : "Desconhecido"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Versão:</span>
                      <span>{getVersionDisplay(db.version)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Última Sincronização:</span>
                      <span>{new Date(db.lastSync).toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Conexões Ativas:</span>
                      <span>{db.connections}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleTest(db.id)}
                  >
                    Testar Conexão
                  </Button>
                  <div className="space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => {
                        setSelectedDb(db.id);
                        setIsDeleteAlertOpen(true);
                      }}
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
            {filteredDatabases.length === 0 && (
              <Card className="col-span-full p-6 flex flex-col items-center justify-center text-center">
                <ServerCrash className="h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="font-medium text-lg">Nenhum banco de dados encontrado</h3>
                <p className="text-muted-foreground mt-1 mb-4">
                  {searchTerm 
                    ? "Nenhum banco de dados corresponde à sua pesquisa." 
                    : "Você ainda não adicionou nenhum banco de dados."}
                </p>
                <Button onClick={() => setIsNewDbDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Banco de Dados
                </Button>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="queries">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Queries Recentes</CardTitle>
              <CardDescription>
                Lista das consultas SQL executadas recentemente nos bancos de dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-96">Query</TableHead>
                    <TableHead>Banco de Dados</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Data e Hora</TableHead>
                    <TableHead className="text-right">Duração (ms)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRecentQueries.map((query) => (
                    <TableRow key={query.id}>
                      <TableCell className="font-mono text-xs">
                        {query.query}
                      </TableCell>
                      <TableCell>{query.database}</TableCell>
                      <TableCell>{query.user}</TableCell>
                      <TableCell>
                        {new Date(query.timestamp).toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={
                          query.duration < 50 
                            ? "outline" 
                            : query.duration < 200 
                              ? "secondary" 
                              : "default"
                        }>
                          {query.duration}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add New Database Dialog */}
      <Dialog open={isNewDbDialogOpen} onOpenChange={setIsNewDbDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleAddDatabase}>
            <DialogHeader>
              <DialogTitle>Adicionar Banco de Dados</DialogTitle>
              <DialogDescription>
                Configure a conexão com um novo banco de dados.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  placeholder="Ex: Produção"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="driver" className="text-right">
                  Tipo
                </Label>
                <div className="col-span-3">
                  <Select
                    value={driverType}
                    onValueChange={(value) => handleDriverChange(value as DatabaseDriver)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de banco" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sqlserver">SQL Server</SelectItem>
                      <SelectItem value="postgresql">PostgreSQL</SelectItem>
                      <SelectItem value="oracle">Oracle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="server" className="text-right">
                  Servidor
                </Label>
                <Input
                  id="server"
                  placeholder={
                    driverType === "sqlserver" 
                      ? "Ex: sql-server.empresa.com" 
                      : driverType === "postgresql"
                        ? "Ex: pg-server.empresa.com"
                        : "Ex: oracle-server.empresa.com"
                  }
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="port" className="text-right">
                  Porta
                </Label>
                <Input
                  id="port"
                  placeholder={port.toString()}
                  className="col-span-3"
                  type="number"
                  value={port}
                  onChange={(e) => setPort(parseInt(e.target.value) || defaultPorts[driverType])}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Usuário
                </Label>
                <Input
                  id="username"
                  placeholder={
                    driverType === "sqlserver" 
                      ? "Ex: sa" 
                      : driverType === "postgresql"
                        ? "Ex: postgres"
                        : "Ex: system"
                  }
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="database" className="text-right">
                  Database
                </Label>
                <Input
                  id="database"
                  placeholder={
                    driverType === "sqlserver" 
                      ? "master" 
                      : driverType === "postgresql"
                        ? "postgres"
                        : "ORCL"
                  }
                  className="col-span-3"
                  defaultValue={
                    driverType === "sqlserver" 
                      ? "master" 
                      : driverType === "postgresql"
                        ? "postgres"
                        : "ORCL"
                  }
                />
              </div>
              {driverType === "oracle" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sid" className="text-right">
                    SID/Service
                  </Label>
                  <Input
                    id="sid"
                    placeholder="Ex: ORCL"
                    className="col-span-3"
                    defaultValue="ORCL"
                  />
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-start-2 col-span-3 flex items-center space-x-2">
                  <Checkbox id="validate" defaultChecked />
                  <Label htmlFor="validate" className="text-sm font-normal">
                    Validar conexão antes de salvar
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsNewDbDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Adicionar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Database Alert */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso removerá permanentemente a conexão com o banco de dados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DatabasesPage;
