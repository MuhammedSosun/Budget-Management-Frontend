import LoginForm from "../../components/Auth/LoginForm";
import "./Login.scss";

function LoginPage() {
  return (
    <div className="login-page-wrapper">
      <div className="brand-logo">Bütçem.</div>
      <div className="login-card-container">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
