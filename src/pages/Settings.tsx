
import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Bell,
  Database,
  Key,
  Lock,
  Mail,
  Save,
  Server,
  Settings,
  ShieldAlert,
  User,
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/components/ui/use-toast";

// Form schemas for validation
const generalSettingsSchema = z.object({
  companyName: z.string().min(2, {
    message: "Nome da empresa deve ter pelo menos 2 caracteres.",
  }),
  adminEmail: z.string().email({
    message: "Email inválido.",
  }),
  language: z.string(),
  timezone: z.string(),
  dateFormat: z.string(),
  sessionTimeout: z.number().min(5).max(1440),
});

const securitySettingsSchema = z.object({
  passwordPolicy: z.object({
    minLength: z.number().min(8).max(32),
    requireUppercase: z.boolean(),
    requireLowercase: z.boolean(),
    requireNumbers: z.boolean(),
    requireSpecialChars: z.boolean(),
    passwordExpiration: z.number().min(0).max(365),
  }),
  loginAttempts: z.number().min(1).max(10),
  twoFactorAuth: z.boolean(),
});

const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean(),
  securityAlerts: z.boolean(),
  systemUpdates: z.boolean(),
  databaseAlerts: z.boolean(),
  dailySummary: z.boolean(),
  emailTemplate: z.string().optional(),
});

const logSettingsSchema = z.object({
  logLevel: z.string(),
  retentionPeriod: z.number().min(1).max(730),
  logQueries: z.boolean(),
  logFailedLogins: z.boolean(),
  logSchemaChanges: z.boolean(),
  logAuditEvents: z.boolean(),
});

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [advancedOptionsOpen, setAdvancedOptionsOpen] = useState(false);
  const { toast } = useToast();

  // Initialize forms with default values
  const generalForm = useForm<z.infer<typeof generalSettingsSchema>>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      companyName: "Empresa S.A.",
      adminEmail: "admin@empresa.com",
      language: "pt-BR",
      timezone: "America/Sao_Paulo",
      dateFormat: "DD/MM/YYYY",
      sessionTimeout: 30,
    },
  });

  const securityForm = useForm<z.infer<typeof securitySettingsSchema>>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: false,
        passwordExpiration: 90,
      },
      loginAttempts: 5,
      twoFactorAuth: false,
    },
  });

  const notificationForm = useForm<z.infer<typeof notificationSettingsSchema>>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      emailNotifications: true,
      securityAlerts: true,
      systemUpdates: true,
      databaseAlerts: true,
      dailySummary: false,
      emailTemplate: "",
    },
  });

  const logForm = useForm<z.infer<typeof logSettingsSchema>>({
    resolver: zodResolver(logSettingsSchema),
    defaultValues: {
      logLevel: "INFO",
      retentionPeriod: 90,
      logQueries: true,
      logFailedLogins: true,
      logSchemaChanges: true,
      logAuditEvents: true,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    toast({
      title: "Configurações salvas",
      description: "As configurações foram salvas com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <Button onClick={() => onSubmit(generalForm.getValues())}>
          <Save className="mr-2 h-4 w-4" />
          Salvar Configurações
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 w-full">
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="mr-2 h-4 w-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="logs">
            <Server className="mr-2 h-4 w-4" />
            Logs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configure as preferências gerais do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...generalForm}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={generalForm.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome da Empresa</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome da Empresa" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={generalForm.control}
                      name="adminEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email do Administrador</FormLabel>
                          <FormControl>
                            <Input placeholder="admin@empresa.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={generalForm.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Idioma</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um idioma" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                              <SelectItem value="en-US">English (US)</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={generalForm.control}
                      name="timezone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fuso Horário</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um fuso horário" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="America/Sao_Paulo">Brasília (GMT-3)</SelectItem>
                              <SelectItem value="America/New_York">New York (GMT-4)</SelectItem>
                              <SelectItem value="UTC">UTC</SelectItem>
                              <SelectItem value="Europe/London">Londres (GMT+1)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={generalForm.control}
                      name="dateFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Formato de Data</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um formato" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={generalForm.control}
                      name="sessionTimeout"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tempo de Sessão (minutos)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                          </FormControl>
                          <FormDescription>
                            Tempo para expiração automática da sessão.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Collapsible
                    open={advancedOptionsOpen}
                    onOpenChange={setAdvancedOptionsOpen}
                    className="space-y-2"
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        Opções Avançadas
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 transition-transform ${
                            advancedOptionsOpen ? "rotate-180" : ""
                          }`}
                        >
                          <path
                            d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2">
                      <Card className="mt-4">
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="db-prefix">Prefixo de Tabelas</Label>
                              <Input id="db-prefix" placeholder="sql_" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="connection-timeout">Timeout de Conexão (s)</Label>
                              <Input id="connection-timeout" type="number" placeholder="30" defaultValue={30} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="max-connections">Número Máximo de Conexões</Label>
                              <Input id="max-connections" type="number" placeholder="100" defaultValue={100} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="connection-pool">Tamanho do Pool de Conexões</Label>
                              <Input id="connection-pool" type="number" placeholder="10" defaultValue={10} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="custom-config">Configuração Personalizada</Label>
                              <Textarea 
                                id="custom-config" 
                                placeholder="Configurações adicionais no formato JSON"
                                className="h-24"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CollapsibleContent>
                  </Collapsible>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={() => generalForm.reset()}>
                Restaurar Padrões
              </Button>
              <Button onClick={() => {
                generalForm.handleSubmit(onSubmit)();
              }}>
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>
                Configure as políticas de segurança do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...securityForm}>
                <form className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Política de Senhas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={securityForm.control}
                        name="passwordPolicy.minLength"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Comprimento Mínimo</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={e => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={securityForm.control}
                        name="passwordPolicy.passwordExpiration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiração de Senha (dias)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>
                              0 = Nunca expira
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div className="space-y-4">
                        <FormField
                          control={securityForm.control}
                          name="passwordPolicy.requireUppercase"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>Maiúsculas Obrigatórias</FormLabel>
                                <FormDescription>
                                  Exige pelo menos uma letra maiúscula
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={securityForm.control}
                          name="passwordPolicy.requireLowercase"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>Minúsculas Obrigatórias</FormLabel>
                                <FormDescription>
                                  Exige pelo menos uma letra minúscula
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="space-y-4">
                        <FormField
                          control={securityForm.control}
                          name="passwordPolicy.requireNumbers"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>Números Obrigatórios</FormLabel>
                                <FormDescription>
                                  Exige pelo menos um número
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={securityForm.control}
                          name="passwordPolicy.requireSpecialChars"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>Caracteres Especiais</FormLabel>
                                <FormDescription>
                                  Exige pelo menos um caracter especial
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={securityForm.control}
                      name="loginAttempts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tentativas de Login</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={e => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Número máximo de tentativas antes do bloqueio
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={securityForm.control}
                      name="twoFactorAuth"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Autenticação em Dois Fatores</FormLabel>
                            <FormDescription>
                              Habilitar 2FA para todos os usuários
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Chaves de API</h3>
                    <Button variant="outline" className="mb-4">
                      <Key className="mr-2 h-4 w-4" />
                      Gerar Nova Chave de API
                    </Button>
                    <div className="rounded-lg border shadow-sm">
                      <div className="p-4 flex items-center justify-between border-b">
                        <div>
                          <h4 className="font-medium">API-1234-ABCD-5678-EFGH</h4>
                          <p className="text-sm text-muted-foreground">Criada em 15/03/2025</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Produção</Badge>
                          <Button variant="ghost" size="icon">
                            <ShieldAlert className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between border-b">
                        <div>
                          <h4 className="font-medium">API-5678-WXYZ-9012-JKLM</h4>
                          <p className="text-sm text-muted-foreground">Criada em 20/02/2025</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Desenvolvimento</Badge>
                          <Button variant="ghost" size="icon">
                            <ShieldAlert className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={() => securityForm.reset()}>
                Restaurar Padrões
              </Button>
              <Button onClick={() => {
                securityForm.handleSubmit(onSubmit)();
              }}>
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>
                Configure como e quando receber notificações.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...notificationForm}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <h3 className="text-lg font-medium">Notificações por Email</h3>
                    <FormField
                      control={notificationForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <div className="flex items-center">
                              <FormLabel>Notificações por Email</FormLabel>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Mail className="ml-2 h-4 w-4 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Habilita todas as notificações por email</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <FormDescription>
                              Enviar notificações importantes por email
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <h3 className="text-lg font-medium mt-4">Tipos de Notificação</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={notificationForm.control}
                        name="securityAlerts"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Alertas de Segurança</FormLabel>
                              <FormDescription>
                                Login suspeito, tentativas de acesso não autorizado
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={!notificationForm.watch('emailNotifications')}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationForm.control}
                        name="systemUpdates"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Atualizações do Sistema</FormLabel>
                              <FormDescription>
                                Novas funcionalidades, correções e manutenções
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={!notificationForm.watch('emailNotifications')}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationForm.control}
                        name="databaseAlerts"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Alertas de Banco de Dados</FormLabel>
                              <FormDescription>
                                Erros, problemas de conexão, uso elevado
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={!notificationForm.watch('emailNotifications')}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationForm.control}
                        name="dailySummary"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Relatório Diário</FormLabel>
                              <FormDescription>
                                Resumo de atividades e estatísticas diárias
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={!notificationForm.watch('emailNotifications')}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <h3 className="text-lg font-medium mt-4">Email Template</h3>
                    <SheetTrigger asChild>
                      <Button variant="outline">
                        <Mail className="mr-2 h-4 w-4" />
                        Editar Template de Email
                      </Button>
                    </SheetTrigger>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={() => notificationForm.reset()}>
                Restaurar Padrões
              </Button>
              <Button onClick={() => {
                notificationForm.handleSubmit(onSubmit)();
              }}>
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>

          <Sheet>
            <SheetContent className="sm:max-w-[600px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Template de Email</SheetTitle>
                <SheetDescription>
                  Personalize o modelo de email para notificações.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <div className="mb-4">
                  <Label htmlFor="template-subject">Assunto</Label>
                  <Input id="template-subject" defaultValue="[SQL Guardian] Notificação: {{tipo}}" className="mt-1" />
                </div>
                <div className="mb-4">
                  <Label>Tipo de Template</Label>
                  <ToggleGroup type="single" defaultValue="html" className="mt-1">
                    <ToggleGroupItem value="html">HTML</ToggleGroupItem>
                    <ToggleGroupItem value="text">Texto</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div className="mb-4">
                  <Label htmlFor="template-content">Conteúdo do Template</Label>
                  <Textarea 
                    id="template-content" 
                    className="mt-1 h-[300px] font-mono"
                    defaultValue={`<!DOCTYPE html>
<html>
<head>
  <title>{{assunto}}</title>
</head>
<body>
  <h1>{{titulo}}</h1>
  <p>Olá {{nome}},</p>
  <p>{{mensagem}}</p>
  <hr />
  <p>SQL Guardian - Gerenciamento de Acesso a SQL Server</p>
</body>
</html>`}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Variáveis Disponíveis</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant="outline">{'{{nome}}'}</Badge>
                    <Badge variant="outline">{'{{assunto}}'}</Badge>
                    <Badge variant="outline">{'{{titulo}}'}</Badge>
                    <Badge variant="outline">{'{{mensagem}}'}</Badge>
                    <Badge variant="outline">{'{{tipo}}'}</Badge>
                    <Badge variant="outline">{'{{data}}'}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Restaurar Padrão</Button>
                <Button>Salvar Template</Button>
              </div>
            </SheetContent>
          </Sheet>
        </TabsContent>
        
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Logs</CardTitle>
              <CardDescription>
                Configure como os logs são gerados e armazenados.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...logForm}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={logForm.control}
                      name="logLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nível de Log</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um nível" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="DEBUG">DEBUG</SelectItem>
                              <SelectItem value="INFO">INFO</SelectItem>
                              <SelectItem value="WARN">WARN</SelectItem>
                              <SelectItem value="ERROR">ERROR</SelectItem>
                              <SelectItem value="FATAL">FATAL</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Define o nível mínimo de mensagens a serem registradas
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={logForm.control}
                      name="retentionPeriod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Período de Retenção (dias)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={e => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Tempo de armazenamento dos registros de log
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Eventos para Registro</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={logForm.control}
                        name="logQueries"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Registrar Queries</FormLabel>
                              <FormDescription>
                                Registrar todas as consultas SQL executadas
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={logForm.control}
                        name="logFailedLogins"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Falhas de Login</FormLabel>
                              <FormDescription>
                                Registrar tentativas de login malsucedidas
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={logForm.control}
                        name="logSchemaChanges"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Alterações de Schema</FormLabel>
                              <FormDescription>
                                Registrar mudanças na estrutura do banco de dados
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={logForm.control}
                        name="logAuditEvents"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Eventos de Auditoria</FormLabel>
                              <FormDescription>
                                Registrar eventos importantes para auditoria
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Exportação de Logs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Exportar para Arquivo</h4>
                            <p className="text-sm text-muted-foreground">
                              Salvar logs em formato CSV ou JSON
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Exportar
                          </Button>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Exportar para Sistema Externo</h4>
                            <p className="text-sm text-muted-foreground">
                              Enviar logs para um sistema SIEM
                            </p>
                          </div>
                          <Toggle>
                            <Database className="h-4 w-4" />
                          </Toggle>
                        </div>
                      </Card>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={() => logForm.reset()}>
                Restaurar Padrões
              </Button>
              <Button onClick={() => {
                logForm.handleSubmit(onSubmit)();
              }}>
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
