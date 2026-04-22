import { useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header/Header";
import { useTranslation } from "react-i18next";

function LandingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <div>
        <h1></h1>

        <button onClick={() => navigate("/login")}>{t("login")}</button>
        <button onClick={() => navigate("/register")}>{t("register")}</button>
      </div>
    </div>
  );
}

export default LandingPage;
