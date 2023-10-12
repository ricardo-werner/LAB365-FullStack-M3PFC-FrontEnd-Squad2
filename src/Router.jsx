import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";


const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="#" />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;