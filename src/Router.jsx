import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import FinalizarCompraPage from "./pages/FinalizarCompra/FinalizarCompraPage";

const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="#" />} />
                <Route path="/finalizar" element={<FinalizarCompraPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;