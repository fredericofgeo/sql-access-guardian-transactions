
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Filter, Search, SlidersHorizontal } from "lucide-react";

// Dados de exemplo
const transactions = [
  { 
    id: "TX-3945", 
    query: "SELECT * FROM Clientes WHERE cidade = 'São Paulo'", 
    user: "ana.silva", 
    db: "DB_Comercial", 
    server: "SQL01", 
    date: "12/04/2025", 
    time: "10:23:45", 
    status: "success", 
    duration: "42ms" 
  },
  { 
    id: "TX-3944", 
    query: "UPDATE Produtos SET preco = 29.99 WHERE categoria_id = 5", 
    user: "marcos.oliveira", 
    db: "DB_Produtos", 
    server: "SQL01", 
    date: "12/04/2025", 
    time: "10:20:12", 
    status: "success", 
    duration: "156ms" 
  },
  { 
    id: "TX-3943", 
    query: "DELETE FROM Pedidos WHERE status = 'cancelado' AND data < '2023-01-01'", 
    user: "carlos.santos", 
    db: "DB_Pedidos", 
    server: "SQL02", 
    date: "12/04/2025", 
    time: "10:15:33", 
    status: "warning", 
    duration: "523ms" 
  },
  { 
    id: "TX-3942", 
    query: "INSERT INTO Funcionarios (nome, cargo, departamento) VALUES ('João Silva', 'Analista', 'TI')", 
    user: "patricia.lima", 
    db: "DB_RH", 
    server: "SQL03", 
    date: "12/04/2025", 
    time: "10:10:07", 
    status: "success", 
    duration: "78ms" 
  },
  { 
    id: "TX-3941", 
    query: "TRUNCATE TABLE LogsTemporarios", 
    user: "admin", 
    db: "DB_Sistema", 
    server: "SQL01", 
    date: "12/04/2025", 
    time: "10:05:58", 
    status: "error", 
    duration: "218ms" 
  },
  { 
    id: "TX-3940", 
    query: "EXEC sp_AtualizaEstoque", 
    user: "sistema", 
    db: "DB_Estoque", 
    server: "SQL02", 
    date: "12/04/2025", 
    time: "10:01:23", 
    status: "success", 
    duration: "1246ms" 
  },
];

export default function Transactions() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transações</h2>
          <p className="text-muted-foreground">Histórico de queries SQL executadas nos servidores.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline">Exportar</Button>
          <Button>Limpar Histórico</Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Transações</CardTitle>
          <CardDescription>Visualize e analise todas as transações SQL do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar transações..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="success">Sucesso</SelectItem>
                  <SelectItem value="warning">Alerta</SelectItem>
                  <SelectItem value="error">Erro</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Servidor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="sql01">SQL01</SelectItem>
                  <SelectItem value="sql02">SQL02</SelectItem>
                  <SelectItem value="sql03">SQL03</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead className="w-[300px]">Query</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Banco de Dados</TableHead>
                  <TableHead>Servidor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {transaction.query}
                    </TableCell>
                    <TableCell>{transaction.user}</TableCell>
                    <TableCell>{transaction.db}</TableCell>
                    <TableCell>{transaction.server}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.time}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === "success" 
                          ? "bg-success/10 text-success"
                          : transaction.status === "warning"
                          ? "bg-warning/10 text-warning"
                          : "bg-destructive/10 text-destructive"
                      }`}>
                        {transaction.status === "success" 
                          ? "Sucesso" 
                          : transaction.status === "warning" 
                          ? "Alerta" 
                          : "Erro"}
                      </span>
                    </TableCell>
                    <TableCell>{transaction.duration}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando 6 de 1,234 resultados
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
