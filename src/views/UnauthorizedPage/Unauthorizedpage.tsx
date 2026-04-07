import { useNavigate } from "react-router-dom";
import "./unauthorizedPage.scss";
import Button from "../../components/ui/Button/Button";

function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <main className="unauthorized-page">
      <section className="unauthorized-page__card">
        <div className="unauthorized-page__code">401</div>

        <h1 className="unauthorized-page__title">Session Expired</h1>

        <p className="unauthorized-page__description">
          Your session has expired or you are not authenticated. Please log in
          again to continue.
        </p>

        <div className="unauthorized-page__actions">
          <Button variant="primary" onClick={() => navigate("/login")}>
            Go to Login
          </Button>

          <Button variant="danger" onClick={() => navigate("/home")}>
            Back to Home
          </Button>
        </div>
      </section>
    </main>
  );
}

export default UnauthorizedPage;
