import { Navigate, Route, Routes } from "react-router-dom";
import { PlayersListPagePreview } from "../../pages/PlayersListPage/PlayersListPage";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { HomepagePreview } from "../../pages/HomePage/Homepage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import paths from "../../paths/paths";
import { Suspense } from "react";
import Header from "../Header/Header";
import Errorpage from "../../pages/ErrorPage/ErrorPage";

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
    </>
  );
};

export default App;
