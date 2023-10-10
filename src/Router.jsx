import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { CarrinhoPage } from "./pages/Carrinho/CarrinhoPage";


const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="#" />} />
                <Route path="/carrinho" element={<CarrinhoPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;