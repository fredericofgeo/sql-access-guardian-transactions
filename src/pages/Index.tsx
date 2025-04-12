
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import Dashboard from './Dashboard';
import Transactions from './Transactions';
import Users from './Users';
import NotFound from './NotFound';

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
      <Route path="/users" element={<MainLayout><Users /></MainLayout>} />
      <Route path="/transactions" element={<MainLayout><Transactions /></MainLayout>} />
      {/* Rotas para serem implementadas posteriormente */}
      <Route path="/permissions" element={<MainLayout><div className="p-4">Página de Permissões em Desenvolvimento</div></MainLayout>} />
      <Route path="/servers" element={<MainLayout><div className="p-4">Página de Servidores em Desenvolvimento</div></MainLayout>} />
      <Route path="/databases" element={<MainLayout><div className="p-4">Página de Bancos de Dados em Desenvolvimento</div></MainLayout>} />
      <Route path="/settings" element={<MainLayout><div className="p-4">Página de Configurações em Desenvolvimento</div></MainLayout>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Index;
