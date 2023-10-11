import { Login } from "./pages/Login";
import { createBrowserRouter } from "react-router-dom";

export const AppRouter = createBrowserRouter([
  // <--- aqui é onde você configura as rotas da sua aplicação
  {
    path: "/",
    element: <Login />,
  },
]);
