import { useSearchParams } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";
import Header from "../../components/Layout/Header/Header";
import "./Login.scss";

function LoginPage() {
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/home";

  return (
    <div className="login-page-wrapper">
      <Header />
      <div className="brand-logo">Bütçem.</div>
      <div className="login-card-container">
        <LoginForm onSuccessRedirect={returnUrl} />
      </div>
    </div>
  );
}

export default LoginPage;
