import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import FinalizarCompraPage from "./pages/FinalizarCompra/FinalizarCompraPage";
import Medicamentos from './pages/Medicamentos/Medicamentos';
import MedicamentoCreate from './pages/Medicamentos/MedicamentoCreate';

const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="#" />} />
                <Route path="/medicamentos" element={<Medicamentos />} />
                <Route path="/medicamentos/create" element={<MedicamentoCreate />} />
                <Route path="/finalizar" element={<FinalizarCompraPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;