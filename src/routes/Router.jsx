import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../components/Login/LoginPage";
import Layout from "./Layout";
import TournamentList from "../components/Tournament/TournamentList";
import Profile from "../components/Profile/Profile"
import ProtectedRoute from "./AuthRoutes";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    element: (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>  
    ),  // Componente general que envuelve las rutas
    children: [ 
      {       
        index: true,  // Ruta principal
        element: <TournamentList />  // Elemento para el index
      },
      {
        path : "/profile",
        element : <Profile/>
      }
    ]
  }
]);
export default router