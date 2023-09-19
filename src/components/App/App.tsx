import { Navigate, Route, Routes } from "react-router-dom";
import { PlayersListPagePreview } from "../../pages/PlayersListPage/PlayersListPage";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { HomepagePreview } from "../../pages/HomePage/Homepage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import paths from "../../paths/paths";
import Header from "../Header/Header";
import Errorpage from "../../pages/ErrorPage/ErrorPage";
import NewPlayerPage from "../../pages/NewPlayerPage/NewPlayerPage";
import { PlayerDetailPagePreview } from "../../pages/PlayerDetailPage/PlayerDetailPage";
import Footer from "../Footer/Footer";

const App = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  return (
    <>
      {user && <Header />}
      <main className="main-container">
        <Routes>
          <Route
            path={paths.homepage}
            element={
              <Suspense>
                <HomepagePreview />
              </Suspense>
            }
          />
          <Route
            path={paths.players}
            element={
              <ProtectedRoute>
                <Suspense>
                  <PlayersListPagePreview />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path={paths.addplayer}
            element={
              <ProtectedRoute>
                <Suspense>
                  <NewPlayerPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path={`${paths.players}/:id`}
            element={
              <ProtectedRoute>
                <Suspense>
                  <PlayerDetailPagePreview />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route path={paths.root} element={<Navigate to={paths.homepage} />} />
          <Route
            path={paths.error}
            element={
              <Suspense>
                <Errorpage />
              </Suspense>
            }
          />
        </Routes>
        <ToastContainer />
      </main>
      <Footer />
    </>
  );
};

export default App;
