import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import FinalizarCompraPage from './pages/FinalizarCompra/FinalizarCompraPage';
import Medicamentos from './pages/Medicamentos/Medicamentos';
import MedicamentoCreate from './pages/Medicamentos/MedicamentoCreate';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/Dashboard/Dashboard';
import { AuthProvider, AuthContext } from './contexts/auth';
import { useContext } from 'react';
import CadastroUsuario from './pages/CadastrarUsuario/cadastroUsuario';
import Navegacao from './pages/SideBar/Navegacao';
import { ListarVendas } from './pages/ListarVendas/ListarVendas';

const AppRouter = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);
    if (loading) {
      return <div className="loading">Carregando...</div>;
    }
    if (!authenticated) {
      return <Navigate to="/" />;
    }
    return children; //Se estiver autenticado, retorna o children
  };
  // <--- aqui é onde você configura as rotas da sua aplicação
  return (
    <Router>
      <Navegacao />
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/dashboard"
            element={
              <Private>
                <AdminDashboard />
              </Private>
            }
          />
          <Route
            path="/admin/cadastro/usuario"
            element={
              <Private>
                <CadastroUsuario />
              </Private>
            }
          />
           <Route
            path="/admin/vendas"
            element={
              <Private>
                <ListarVendas />
              </Private>
            }
          />
          <Route path="/medicamentos" element={<Medicamentos />} />
          <Route path="/medicamentos/create" element={<MedicamentoCreate />} />
          <Route path="/finalizar" element={<FinalizarCompraPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
