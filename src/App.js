import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import LoginLayout from './components/layout/LoginLayout';
import Change from './pages/change-password/Change';
import Recover from './pages/recover-password/Recover';
import DashboardLayout from './components/layout/DashboardLayout';
import Cadastre from './pages/cadastre/Cadastre';
import Products from './pages/products/Product';
import Balcon from './pages/dashboard/balcon/Balcon';
import Commands from './pages/commands/Commands';
import ProductCreation from './pages/products/ProductCreation';
import Index from './pages/dashboard/Index';
import Wallet from './pages/dashboard/wallet/Wallet';
import ProductEdit from './pages/products/ProductEdit';
import NewItem from './pages/commands/NewItem';
import Payment from './pages/commands/Payment';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginLayout><Login /></LoginLayout>} />
          <Route path='/change-password' element={<LoginLayout><Change /></LoginLayout>} />
          <Route path='/cadastre' element={<LoginLayout><Cadastre /></LoginLayout>} />
          <Route path='/recover-password' element={<LoginLayout><Recover /></LoginLayout>} />
          <Route path='/dashboard' element={<DashboardLayout><Index /></DashboardLayout>} />
          <Route path='/products' element={<DashboardLayout><Products /></DashboardLayout>} />
          <Route path='/new-product' element={<DashboardLayout><ProductCreation /></DashboardLayout>} />
          <Route path='/edit-product' element={<DashboardLayout><ProductEdit /></DashboardLayout>} />
          <Route path='/balcon' element={<DashboardLayout><Balcon /></DashboardLayout>} />
          <Route path='/wallet' element={<DashboardLayout><Wallet /></DashboardLayout>} />
          <Route path='/commands' element={<DashboardLayout><Commands /></DashboardLayout>} />
          <Route path='/new-item' element={<DashboardLayout><NewItem /></DashboardLayout>} />
          <Route path='/payment' element={<DashboardLayout><Payment /></DashboardLayout>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;