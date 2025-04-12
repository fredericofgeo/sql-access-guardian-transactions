
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertCircle, 
  ArrowRight, 
  Database, 
  Lock, 
  ServerCrash, 
  ShieldAlert, 
  Users 
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

// Dados de exemplo
const transactionsData = [
  { day: "Seg", count: 125 },
  { day: "Ter", count: 89 },
  { day: "Qua", count: 190 },
  { day: "Qui", count: 107 },
  { day: "Sex", count: 142 },
  { day: "Sáb", count: 45 },
  { day: "Dom", count: 20 },
];

const recentTransactions = [
  { id: 1, user: "marcos.silva", query: "SELECT * FROM Clientes", time: "10:23", status: "success" },
  { id: 2, user: "ana.rodrigues", query: "UPDATE Produtos SET preco = 29.99", time: "09:45", status: "warning" },
  { id: 3, user: "carlos.gomes", query: "DELETE FROM Pedidos WHERE status = 'cancelado'", time: "08:17", status: "error" },
  { id: 4, user: "julia.santos", query: "INSERT INTO Categorias (nome) VALUES ('Nova')", time: "08:02", status: "success" }
];

const accessAttempts = [
  { id: 1, user: "usuario.desconhecido", ip: "192.168.1.55", time: "11:42", status: "blocked" },
  { id: 2, user: "root", ip: "10.0.0.15", time: "10:30", status: "blocked" },
  { id: 3, user: "admin.teste", ip: "172.16.254.1", time: "09:24", status: "allowed" }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Visão geral dos acessos e transações SQL.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline">Baixar Relatório</Button>
          <Button>Novo Usuário</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">
              +2 novos usuários hoje
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Transações Hoje</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">
              +12% desde ontem
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tentativas de Acesso</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              24 bloqueados hoje
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Alertas de Segurança</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              3 não resolvidos
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Transações por Dia</CardTitle>
            <CardDescription>Monitoramento de volume de transações nos últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={transactionsData}>
                <XAxis 
                  dataKey="day" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Bar 
                  dataKey="count" 
                  fill="currentColor" 
                  radius={[4, 4, 0, 0]} 
                  className="fill-primary" 
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-0.5">
              <CardTitle>Transações Recentes</CardTitle>
              <CardDescription>Últimas queries executadas no sistema</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      transaction.status === "success" ? "bg-success" : 
                      transaction.status === "warning" ? "bg-warning" : "bg-destructive"
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{transaction.user}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[180px] lg:max-w-[240px]">
                        {transaction.query}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {transaction.time}
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full">
                Ver todas as transações
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-0.5">
              <CardTitle>Tentativas de Acesso Recentes</CardTitle>
              <CardDescription>Últimas tentativas de acesso ao servidor</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accessAttempts.map((attempt) => (
                <div key={attempt.id} className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {attempt.status === "blocked" ? (
                      <ServerCrash className="h-5 w-5 text-destructive" />
                    ) : (
                      <Database className="h-5 w-5 text-success" />
                    )}
                    <div>
                      <p className="text-sm font-medium">{attempt.user}</p>
                      <p className="text-xs text-muted-foreground">IP: {attempt.ip}</p>
                    </div>
                  </div>
                  <div className="text-xs">
                    <span className={`px-2 py-1 rounded-full ${
                      attempt.status === "blocked" 
                        ? "bg-destructive/10 text-destructive" 
                        : "bg-success/10 text-success"
                    }`}>
                      {attempt.status === "blocked" ? "Bloqueado" : "Permitido"}
                    </span>
                    <p className="text-muted-foreground mt-1 text-right">{attempt.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-0.5">
              <CardTitle>Alertas de Segurança</CardTitle>
              <CardDescription>Problemas que precisam de atenção</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-destructive">Acesso Não Autorizado</h4>
                    <p className="text-sm mt-1">Múltiplas tentativas de login com o usuário 'sa' detectadas do IP 192.168.1.45</p>
                    <Button variant="destructive" size="sm" className="mt-3">
                      Resolver
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-warning/10 border border-warning/20 rounded-md p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-warning">Permissão Excessiva</h4>
                    <p className="text-sm mt-1">O usuário 'desenvolvedor5' tem permissões de admin em 3 bancos de produção</p>
                    <Button variant="outline" size="sm" className="mt-3 border-warning/50 text-warning hover:text-warning">
                      Revisar
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 border border-border rounded-md p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold">Atualização Disponível</h4>
                    <p className="text-sm mt-1 text-muted-foreground">Nova versão do SQL Server disponível com patches de segurança</p>
                    <Button variant="outline" size="sm" className="mt-3">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
