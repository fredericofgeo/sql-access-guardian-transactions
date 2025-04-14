
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
import { useToast } from "@/components/ui/use-toast";
import {
  AlertCircle,
  CheckCircle2,
  HardDrive,
  Heart,
  LineChart,
  Plus,
  RefreshCcw,
  Router,
  Search,
  Server,
  Settings,
  Trash,
  WifiOff,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock data for servers
const mockServers = [
  {
    id: "srv1",
    name: "SQL-PROD-01",
    ip: "10.0.1.100",
    type: "physical",
    os: "Windows Server 2022",
    status: "online",
    location: "Data center principal",
    cpu: 24,
    cpuUsage: 35,
    memory: 128,
    memoryUsage: 42,
    disk: 2048,
    diskUsage: 68,
    lastPing: "2025-04-14T11:45:00",
    databases: 8,
  },
  {
    id: "srv2",
    name: "ORACLE-PROD-01",
    ip: "10.0.1.101",
    type: "physical",
    os: "Oracle Linux 8",
    status: "online",
    location: "Data center principal",
    cpu: 32,
    cpuUsage: 62,
    memory: 256,
    memoryUsage: 75,
    disk: 4096,
    diskUsage: 45,
    lastPing: "2025-04-14T11:44:00",
    databases: 3,
  },
  {
    id: "srv3",
    name: "PG-ANALYTICS",
    ip: "10.0.1.120",
    type: "virtual",
    os: "Ubuntu Server 22.04",
    status: "online",
    location: "Data center secundário",
    cpu: 16,
    cpuUsage: 28,
    memory: 64,
    memoryUsage: 53,
    disk: 1024,
    diskUsage: 37,
    lastPing: "2025-04-14T11:42:00",
    databases: 5,
  },
  {
    id: "srv4",
    name: "SQL-DEV-01",
    ip: "10.0.2.100",
    type: "virtual",
    os: "Windows Server 2019",
    status: "maintenance",
    location: "Ambiente de desenvolvimento",
    cpu: 8,
    cpuUsage: 12,
    memory: 32,
    memoryUsage: 40,
    disk: 512,
    diskUsage: 55,
    lastPing: "2025-04-14T10:30:00",
    databases: 12,
  },
  {
    id: "srv5",
    name: "SQL-BACKUP",
    ip: "10.0.3.50",
    type: "virtual",
    os: "Windows Server 2022",
    status: "offline",
    location: "Data center secundário",
    cpu: 8,
    cpuUsage: 0,
    memory: 64,
    memoryUsage: 0,
    disk: 8192,
    diskUsage: 32,
    lastPing: "2025-04-13T22:15:00",
    databases: 2,
  },
];

// Mock data for server metrics history
const mockMetricsHistory = [
  { timestamp: "2025-04-14T08:00:00", cpu: 28, memory: 45, disk: 68 },
  { timestamp: "2025-04-14T09:00:00", cpu: 32, memory: 47, disk: 68 },
  { timestamp: "2025-04-14T10:00:00", cpu: 45, memory: 52, disk: 68 },
  { timestamp: "2025-04-14T11:00:00", cpu: 38, memory: 50, disk: 68 },
  { timestamp: "2025-04-14T12:00:00", cpu: 35, memory: 42, disk: 68 },
];

// Mock data for alerts
const mockAlerts = [
  {
    id: "alert1",
    severity: "high",
    server: "ORACLE-PROD-01",
    message: "CPU utilização acima de 80% por mais de 15 minutos",
    timestamp: "2025-04-14T10:15:00",
    acknowledged: false,
  },
  {
    id: "alert2",
    severity: "medium",
    server: "SQL-PROD-01",
    message: "Espaço em disco abaixo de 20% disponível",
    timestamp: "2025-04-14T09:30:00",
    acknowledged: true,
  },
  {
    id: "alert3",
    severity: "low",
    server: "PG-ANALYTICS",
    message: "Aumento anormal na utilização de memória",
    timestamp: "2025-04-14T08:45:00",
    acknowledged: false,
  },
  {
    id: "alert4",
    severity: "critical",
    server: "SQL-BACKUP",
    message: "Servidor offline - falha na comunicação",
    timestamp: "2025-04-13T22:15:00",
    acknowledged: true,
  },
];

const ServersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddServerDialogOpen, setIsAddServerDialogOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("overview");
  const { toast } = useToast();

  const filteredServers = mockServers.filter(server => 
    server.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    server.ip.includes(searchTerm) ||
    server.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddServer = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddServerDialogOpen(false);
    toast({
      title: "Servidor Adicionado",
      description: "O novo servidor foi adicionado com sucesso.",
    });
  };

  const handleDeleteServer = () => {
    setIsDeleteAlertOpen(false);
    toast({
      title: "Servidor Removido",
      description: "O servidor foi removido com sucesso.",
      variant: "destructive",
    });
  };

  const handleRestart = (serverId: string) => {
    const server = mockServers.find(s => s.id === serverId);
    toast({
      title: "Reinicialização Iniciada",
      description: `Reiniciando o servidor ${server?.name}...`,
    });
  };

  const handleRefresh = (serverId: string) => {
    const server = mockServers.find(s => s.id === serverId);
    toast({
      title: "Dados Atualizados",
      description: `Dados do servidor ${server?.name} atualizados.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-red-500";
      case "maintenance":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Servidores</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Pesquisar servidores..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddServerDialogOpen(true)}>
            <Plus className="mr-1 h-4 w-4" />
            Adicionar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <Server className="mr-2 h-4 w-4" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <LineChart className="mr-2 h-4 w-4" />
            Métricas
          </TabsTrigger>
          <TabsTrigger value="alerts">
            <AlertCircle className="mr-2 h-4 w-4" />
            Alertas
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredServers.map((server) => (
              <Card key={server.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-2">
                      <div className={`h-3 w-3 rounded-full mt-1.5 ${getStatusColor(server.status)}`}></div>
                      <div>
                        <CardTitle>{server.name}</CardTitle>
                        <CardDescription>{server.ip}</CardDescription>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        server.type === "physical" 
                          ? "default" 
                          : "secondary"
                      }
                    >
                      {server.type === "physical" ? "Físico" : "Virtual"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">Sistema:</span>
                      <span>{server.os}</span>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">CPU:</span>
                        <span>{server.cpuUsage}% ({server.cpu} cores)</span>
                      </div>
                      <Progress value={server.cpuUsage} className="h-1" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Memória:</span>
                        <span>{server.memoryUsage}% ({server.memory} GB)</span>
                      </div>
                      <Progress value={server.memoryUsage} className="h-1" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Disco:</span>
                        <span>{server.diskUsage}% ({server.disk} GB)</span>
                      </div>
                      <Progress value={server.diskUsage} className="h-1" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Último ping:</span>
                      <span>{new Date(server.lastPing).toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bancos de dados:</span>
                      <span>{server.databases}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRefresh(server.id)}
                  >
                    <RefreshCcw className="mr-2 h-3 w-3" />
                    Atualizar
                  </Button>
                  <div className="space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => {
                        setSelectedServer(server.id);
                        setIsDeleteAlertOpen(true);
                      }}
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRestart(server.id)}
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
            {filteredServers.length === 0 && (
              <Card className="col-span-full p-6 flex flex-col items-center justify-center text-center">
                <Server className="h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="font-medium text-lg">Nenhum servidor encontrado</h3>
                <p className="text-muted-foreground mt-1 mb-4">
                  {searchTerm 
                    ? "Nenhum servidor corresponde à sua pesquisa." 
                    : "Você ainda não adicionou nenhum servidor."}
                </p>
                <Button onClick={() => setIsAddServerDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Servidor
                </Button>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Métricas de Servidores</CardTitle>
              <CardDescription>
                Monitoramento de desempenho dos servidores nas últimas 24 horas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {mockServers.filter(s => s.status === "online").map(server => (
                  <div key={server.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${getStatusColor(server.status)}`}></div>
                        <h3 className="font-medium">{server.name}</h3>
                        <span className="text-sm text-muted-foreground">({server.ip})</span>
                      </div>
                      <Button variant="outline" size="sm">Ver Detalhes</Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>CPU</span>
                          <span className={server.cpuUsage > 80 ? "text-red-500 font-medium" : ""}>
                            {server.cpuUsage}%
                          </span>
                        </div>
                        <Progress 
                          value={server.cpuUsage} 
                          className={`h-2 ${server.cpuUsage > 80 ? "bg-red-200" : ""}`}
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Memória</span>
                          <span className={server.memoryUsage > 80 ? "text-red-500 font-medium" : ""}>
                            {server.memoryUsage}%
                          </span>
                        </div>
                        <Progress 
                          value={server.memoryUsage}
                          className={`h-2 ${server.memoryUsage > 80 ? "bg-red-200" : ""}`}
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Disco</span>
                          <span className={server.diskUsage > 80 ? "text-red-500 font-medium" : ""}>
                            {server.diskUsage}%
                          </span>
                        </div>
                        <Progress 
                          value={server.diskUsage}
                          className={`h-2 ${server.diskUsage > 80 ? "bg-red-200" : ""}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                {mockServers.filter(s => s.status !== "online").map(server => (
                  <div key={server.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${getStatusColor(server.status)}`}></div>
                        <h3 className="font-medium">{server.name}</h3>
                        <span className="text-sm text-muted-foreground">({server.ip})</span>
                      </div>
                      <Badge 
                        variant={server.status === "offline" ? "destructive" : "outline"}
                      >
                        {server.status === "offline" ? (
                          <div className="flex items-center gap-1">
                            <WifiOff className="h-3 w-3" />
                            Offline
                          </div>
                        ) : "Em Manutenção"}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-center items-center h-20 bg-muted/20 rounded-md text-muted-foreground">
                      Não há métricas disponíveis para este servidor
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg">Alertas de Servidores</CardTitle>
                <CardDescription>
                  Monitoramento de alertas e eventos dos servidores
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Configurar Alertas
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Severidade</TableHead>
                    <TableHead>Servidor</TableHead>
                    <TableHead className="w-[400px]">Mensagem</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${getSeverityColor(alert.severity)}`}></div>
                          <span className="capitalize">
                            {alert.severity === "critical" ? "Crítico" : 
                             alert.severity === "high" ? "Alto" :
                             alert.severity === "medium" ? "Médio" : "Baixo"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{alert.server}</TableCell>
                      <TableCell>{alert.message}</TableCell>
                      <TableCell>{new Date(alert.timestamp).toLocaleString('pt-BR')}</TableCell>
                      <TableCell>
                        {alert.acknowledged ? (
                          <Badge variant="outline" className="bg-muted/30">Reconhecido</Badge>
                        ) : (
                          <Badge>Ativo</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {!alert.acknowledged && (
                          <Button variant="outline" size="sm">
                            Reconhecer
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Server Dialog */}
      <Dialog open={isAddServerDialogOpen} onOpenChange={setIsAddServerDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleAddServer}>
            <DialogHeader>
              <DialogTitle>Adicionar Servidor</DialogTitle>
              <DialogDescription>
                Configure a conexão com um novo servidor de banco de dados.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  placeholder="Ex: SQL-DEV-02"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ip" className="text-right">
                  IP / Hostname
                </Label>
                <Input
                  id="ip"
                  placeholder="Ex: 10.0.2.105"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="os" className="text-right">
                  Sistema
                </Label>
                <Input
                  id="os"
                  placeholder="Ex: Windows Server 2022"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Localização
                </Label>
                <Input
                  id="location"
                  placeholder="Ex: Data center principal"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Tipo</Label>
                <div className="flex items-center space-x-4 col-span-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="physical" />
                    <Label htmlFor="physical" className="text-sm font-normal">Físico</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="virtual" defaultChecked />
                    <Label htmlFor="virtual" className="text-sm font-normal">Virtual</Label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-start-2 col-span-3 flex items-center space-x-2">
                  <Checkbox id="validate" defaultChecked />
                  <Label htmlFor="validate" className="text-sm font-normal">
                    Testar conexão antes de adicionar
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddServerDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Adicionar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Server Alert */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso removerá permanentemente este servidor e todos os seus dados de monitoramento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteServer} className="bg-destructive text-destructive-foreground">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ServersPage;
