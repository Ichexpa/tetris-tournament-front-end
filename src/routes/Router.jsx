import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../components/Login/LoginPage";
import Layout from "./Layout";
import TournamentList from "../components/Tournament/TournamentList";
import Profile from "../components/Profile/Profile"
import Ranking from "../components/Users/Ranking";
import TournamentResults from "../components/Users/TournamentResults";
import TournamentBracket from "../components/Tournament/TournamentBracket";
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
    ),  // Componente general que envuelve y protege las rutas que Layout envuelve
    children: [ 
      {       
        index: true,  // Ruta principal
        element: <TournamentList />  // Componente para el index
      },
      {
        path :  "/tournament/bracket/:id_tournament",
        element : <TournamentBracket/>
      },
      {
        path : "/profile/:id_player",
        element : <Profile/>
      },
      {
        path : "/ranking",
        element : <Ranking/>
      },
      {
        path : "/results",
        element : <TournamentResults/>
      }
    ]
  }
]);
export default router