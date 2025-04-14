
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import Dashboard from './Dashboard';
import Transactions from './Transactions';
import Users from './Users';
import Databases from './Databases';
import Settings from './Settings';
import NotFound from './NotFound';
import Permissions from './Permissions';
import Servers from './Servers';

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
      <Route path="/users" element={<MainLayout><Users /></MainLayout>} />
      <Route path="/transactions" element={<MainLayout><Transactions /></MainLayout>} />
      <Route path="/databases" element={<MainLayout><Databases /></MainLayout>} />
      <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
      <Route path="/permissions" element={<MainLayout><Permissions /></MainLayout>} />
      <Route path="/servers" element={<MainLayout><Servers /></MainLayout>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Index;
