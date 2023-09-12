import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import PlayersListPage from "../../pages/PlayersListPage/PlayersListPage";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import HomePage from "../../pages/HomePage/Homepage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import paths from "../../paths/paths";
import Loading from "../Loading/Loading";

const App = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  return (
    <>
      {user && <Header />}
      <main className="main-container">
        <Routes>
          <Route path={paths.homepage} element={<HomePage />} />
          <Route
            path={paths.players}
            element={
              <ProtectedRoute>
                <PlayersListPage />
              </ProtectedRoute>
            }
          />
          <Route path={paths.root} element={<Navigate to={paths.homepage} />} />
        </Routes>
      </main>
      <Loading />
    </>
  );
};

export default App;
