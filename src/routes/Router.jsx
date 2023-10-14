import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FinalizarCompraPage from '../pages/FinalizarCompra/FinalizarCompraPage';
import Medicamentos from '../pages/Medicamentos/Medicamentos';
import MedicamentoCreate from '../pages/Medicamentos/MedicamentoCreate';
import AdminDashboard from '../pages/Dashboard/Dashboad';
import LoginAdmin from '../pages/login/login';
import RotaPrivada from './RouterPrivadas';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <RotaPrivada redirectTo="/">
              <AdminDashboard />
            </RotaPrivada>
          }
        />
        <Route path="/" element={<LoginAdmin />} />
        {/* <Route path="/login" element={<LoginAdmin />} /> */}
        <Route path="/medicamentos" element={<Medicamentos />} />
        <Route path="/medicamentos/create" element={<MedicamentoCreate />} />
        <Route path="/finalizar" element={<FinalizarCompraPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
