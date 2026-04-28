import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "../views/LandingPage";
import LoginPage from "../views/Auth/LoginPage";
import Home from "../views/Home";
import RegisterPage from "../views/Auth/RegisterPage";
import Unauthorized from "../views/UnauthorizedPage/Unauthorizedpage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
