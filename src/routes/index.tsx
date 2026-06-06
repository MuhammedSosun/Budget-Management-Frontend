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
import WorkspacesPage from "../views/Workspace/WorkspacesPage";
import TransactionPage from "../views/Transactions/TransactionPage";
import BudgetPage from "../views/Budgets/BudgetsPage";
import ForgotPassword from "../components/Auth/ForgotPassword";
import ResetPassword from "../components/Auth/ResetPassword";
import NotificationsPage from "../views/Notifications/NotificationPage";
import AIReviewPage from "../views/AIReview/AIReveiwPage";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/transactions" element={<TransactionPage />} />
          <Route path="/budgets" element={<BudgetPage />} />
          <Route path="/workspace" element={<WorkspacesPage />} />
          <Route path="/ai-review" element={<AIReviewPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRouter;
