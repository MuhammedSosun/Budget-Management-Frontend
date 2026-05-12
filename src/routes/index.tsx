import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../views/Auth/LoginPage";
import Home from "../views/Home";
import RegisterPage from "../views/Auth/RegisterPage";
import Unauthorized from "../views/UnauthorizedPage/Unauthorizedpage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AppLayout from "../components/AppLayout/AppLayout";
import SettingsPage from "../views/SettingPage";
import VerifyEmailPage from "../views/Auth/VerifyEmailPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRouter;
