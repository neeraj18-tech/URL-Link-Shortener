import { Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import AboutPage from "../components/AboutPage";
import RegisterPage from "../components/RegisterPage";
import LoginPage from "../components/LoginPage";
import DashboardLayout from "../dashboard/DashboardLayout";
import PrivateRoute from "../PrivateRoute";
import ErrorPage from "../components/ErrorPage";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />

      <Route
        path="/register"
        element={
          <PrivateRoute publicPage={true}>
            <RegisterPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PrivateRoute publicPage={true}>
            <LoginPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute publicPage={false}>
            <DashboardLayout />
          </PrivateRoute>
        }
      />

      <Route
        path="*"
        element={
            <ErrorPage/>
        }
      />

      <Route
        path="/error"
        element={
            <ErrorPage/>
        }
      />
    </Routes>
  );
};

export default MainRouter;
