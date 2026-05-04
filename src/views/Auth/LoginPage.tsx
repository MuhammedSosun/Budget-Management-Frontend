import { useSearchParams } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";
import Header from "../../components/Layout/Header/Header";
import "./AuthPage.scss";
import Container from "../../components/ui/Container/PageContainer";

function LoginPage() {
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/home";

  return (
    <div className="auth-page-wrapper">
      <Container size="large">
        <Header />

        <div className="auth-page-wrapper__content">
          <div className="brand-logo">Bütçem.</div>

          <LoginForm onSuccessRedirect={returnUrl} />
        </div>
      </Container>
    </div>
  );
}
export default LoginPage;
