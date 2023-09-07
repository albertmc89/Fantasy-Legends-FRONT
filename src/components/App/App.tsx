import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import HomePage from "../../pages/HomePage/Homepa";
import PlayersListPage from "../../pages/PlayersListPage/PlayersListPage";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const App = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  return (
    <div className="container">
      {user && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/players" element={<PlayersListPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
