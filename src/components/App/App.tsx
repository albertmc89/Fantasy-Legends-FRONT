import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import PlayersListPage from "../../pages/PlayersListPage/PlayersListPage";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import HomePage from "../../pages/HomePage/Homepage";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const App = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  return (
    <>
      {user && <Header />}
      <div className="container">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/players"
            element={
              <ProtectedRoute>
                <PlayersListPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
