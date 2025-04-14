
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import Dashboard from './Dashboard';
import Transactions from './Transactions';
import Users from './Users';
import Databases from './Databases';
import Settings from './Settings';
import NotFound from './NotFound';

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
      <Route path="/users" element={<MainLayout><Users /></MainLayout>} />
      <Route path="/transactions" element={<MainLayout><Transactions /></MainLayout>} />
      <Route path="/databases" element={<MainLayout><Databases /></MainLayout>} />
      <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
      {/* Rotas para serem implementadas posteriormente */}
      <Route path="/permissions" element={<MainLayout><div className="p-4">Página de Permissões em Desenvolvimento</div></MainLayout>} />
      <Route path="/servers" element={<MainLayout><div className="p-4">Página de Servidores em Desenvolvimento</div></MainLayout>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Index;
