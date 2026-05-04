import RegisterForm from "../../components/Auth/RegisterForm";
import Header from "../../components/Layout/Header/Header";
import Container from "../../components/ui/Container/PageContainer";
import "./AuthPage.scss";

function RegisterPage() {
  return (
    <div className="auth-page-wrapper">
      <Container size="large">
        <Header />

        <div className="auth-page-wrapper__content">
          <div className="brand-logo">Bütçem.</div>

          <RegisterForm />
        </div>
      </Container>
    </div>
  );
}

export default RegisterPage;
