import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import FinalizarCompraPage from './pages/FinalizarCompra/FinalizarCompraPage';
import MedicamentosListaComprador from './pages/Medicamentos/MedicamentosListaComprador';
import MedicamentoCreate from './pages/Medicamentos/MedicamentoCreate';
import MedicamentosListaAdmin from './pages/Medicamentos/MedicamentosListaAdmin';
import { Login } from './pages/Login/Login';
import { AdminDashboard } from './pages/Dashboard/Dashboard';
import { AuthProvider, AuthContext } from './contexts/auth';
import { useContext } from 'react';
import CadastroUsuario from './pages/CadastrarUsuario/CadastroUsuario';
import Navegacao from './pages/SideBar/Navegacao';
import { toast } from 'react-toastify';
import FAQ from './pages/Duvidas/Faq';
import PageNotFound from './pages/SideBar/404';
import { ListarVendasAdmin } from './pages/VendasAdmin/VendasAdmin';
import { ListaCompras } from './pages/ListaCompras/ListaCompras';
import FormCadastrarComprador from './pages/CadastrarUsuario/FormCadastroComprador';

const AppRouter = () => {
  const PrivateAdmin = ({ children }) => {
    //Verifica se o usuário está autenticado e se é admin
    const { authenticated, user } = useContext(AuthContext);
    if (!authenticated || user.tipoUsuario !== 'Administrador') {
      toast.error('Acesso negado para esse tipo de usuário.');
      return <Navigate to="/" />;
    }
    return children; //Se estiver autenticado, retorna o children
  };
  const PrivateComprador = ({ children }) => {
    //Verifica se o usuário é um comprador
    const { authenticated, user } = useContext(AuthContext);
    if (!authenticated || user.tipoUsuario !== 'Comprador') {
      return <Navigate to="/" />;
    }
    return children; //Se estiver autenticado, retorna o children
  };
  // <--- aqui é onde você configura as rotas da sua aplicação
  return (
    <Router>
      <AuthProvider>
        <Navegacao />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/faq" element={<FAQ />} />
          <Route exact path="/*" element={<PageNotFound />} />
          <Route
            exact
            path="/admin/dashboard"
            element={
              <PrivateAdmin>
                <AdminDashboard />
              </PrivateAdmin>
            }
          />
          <Route
            path="/admin/cadastro/usuario"
            element={
              <PrivateAdmin>
                <CadastroUsuario />
              </PrivateAdmin>
            }
          />
          <Route
            path="/admin/medicamentos/create"
            element={
              <PrivateAdmin>
                <MedicamentoCreate />
              </PrivateAdmin>
            }
          />
          <Route
            path="/admin/medicamentos"
            element={
              <PrivateAdmin>
                <MedicamentosListaAdmin />
              </PrivateAdmin>
            }
          />
          <Route
            exact
            path="/admin/vendas/lista"
            element={
              <PrivateAdmin>
                <ListarVendasAdmin />
              </PrivateAdmin>
            }
          />
          <Route
            path="/comprador/medicamentos"
            element={
              <PrivateComprador>
                <MedicamentosListaComprador />
              </PrivateComprador>
            }
          />
          <Route
            path="/comprador/minhas-compras"
            element={
              <PrivateComprador>
                <ListaCompras />
              </PrivateComprador>
            }
           />
           <Route
            path="/comprador/cadastro"
            element={
              <PrivateComprador>
                <FormCadastrarComprador />
              </PrivateComprador>
            }
          />
          <Route
            path="/finalizar"
            element={
              <PrivateComprador>
                <FinalizarCompraPage />
              </PrivateComprador>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
