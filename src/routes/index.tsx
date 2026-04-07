import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "../views/LandingPage";
import LoginPage from "../views/Auth/LoginPage";
import Home from "../views/Home";
import RegisterPage from "../views/Auth/RegisterPage";
import Unauthorized from "../views/UnauthorizedPage/Unauthorizedpage";
import ProtectedRoute from "./ProtectedRoute";
import TransactionPage from "../views/Transactions/TransactionPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/transactions" element={<TransactionPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
