import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../views/Auth/LoginPage";
import Home from "../views/Home";
import RegisterPage from "../views/Auth/RegisterPage";
import Unauthorized from "../views/UnauthorizedPage/Unauthorizedpage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import GeneralPage from "../views/GeneralPage";
import Profile from "../views/Profile/Profile";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<GeneralPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
