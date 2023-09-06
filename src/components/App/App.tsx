import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import PlayersListPage from "../../pages/PlayersListPage/PlayersListPage";

const App = (): React.ReactElement => {
  return (
    <div className="container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/home" element={<PlayersListPage />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
